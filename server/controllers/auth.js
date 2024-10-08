const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

function register(req,res){

    const {firsname,lastname, email,password} = req.body;
    
    if(!email) res.status(400).send({msg: "El email es obligatorio"});
    if(!password) res.status(400).send({msg: "Las contraseña es obligatoria"});

    const user = new User({
        firsname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    });
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword;   
    
    user.save((error, userStorage) => {
        if(error){
            res.status(400).send({msg: "Error al crear usuario"});
        }else{
            res.status(200).send(userStorage)
        }
    })
}

function login(req,res){
    const {email, password} = req.body

    if(!email) res.status(400).send({msg: "El email es obligatorio"});
    if(!password) res.status(400).send({msg: "Las contraseña es obligatoria"});
    const emailLowerCase = email.toLowerCase();

    User.findOne({email: emailLowerCase},(error,userStore)=>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else{
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({msg: "Error del servidor"});
                }else if(!check){
                    res.status(400).send({msg: "Contraseña incorrecta"});
                }else if(!userStore.active){
                    res.status(401).send({msg: "Usuario no autorizado o no activo"});
                }else{
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefresToken(userStore),
                    });
                }
            });
        }
    })
}

function refreshAccessToken(req,res){
    const {token} = req.body;

    if(!token) res.status(400).send({msg: "Token requerido"});

    const {user_id} = jwt.decode(token);

    User.findOne({ _id: user_id}, (error, userStorage) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else{
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            });
        }
    })

}

module.exports = {
    register,
    login,
    refreshAccessToken,
}