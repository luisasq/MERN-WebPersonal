const NewsLetter = require("../models/newsLetter");

function suscribeEmail(req,res){
    const {email} = req.body;
    const newsLetter  = new NewsLetter({
        email: email.toLowerCase(),
    });

    if(!email) res.status(400).send({msg: "Email obligatorio"});

    newsLetter.save((error) =>{
        if(error){
            res.status(400).send({msg: "El email y aesta registrado"});
        }else{
            res.status(200).send({msg: "Email registrado"});
        }
    })
}

function getEmails(req,res){
    const {page = 1, limit =10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    NewsLetter.paginate({}, options, (error, emailsStored) => {
        if(error){
            res.status(400).send({msg: "Ërror al obtener los emails"});
        }else{
            res.status(200).send(emailsStored);
        }
    })
}

function deleteEmail(req,res){
    const {id} = req.params;

    NewsLetter.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: "Error al eliminar el registro" });
        }else{
            res.status(200).send({msg: "Eliminación correcta"});
        }
    })
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail,
}