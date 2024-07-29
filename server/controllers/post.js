const Post = require("../models/post");
const image = require("../utils/image");

function createPost(req, res){
    const post = new Post(req.body);
    post.create_at = new Date(); //SE ASIGNA LA FECHA ACTUAL

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    post.save((error,posStored) => {
        if(error){
            res.status(400).send({msg: "Error al crear el post"});
        }else{
            res.status(201).send(posStored);
        }
    } )

}

function getPosts(req, res){
    const {page = 1, limit = 10} = req.query; // DATOS QUE SE OPTIENE DE UNA URL DESPUES DEL SIGO "?"

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc"}
    };

    Post.paginate({}, options, (error, postStored) => {
        if(error){
            res.status(400).send({msg: "Error al obtener los post"});
        }else{
            res.status(200).send(postStored);
        }
    })
}

function updatePost(req,res){
    const {id} = req.params; //DATO QUE SE OPTIENE DE LA URL SIN SIGONO "?"
    const postData = req.body; //DATOS QUE EL USUARIO QUIERE MODIFICAR 

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id: id}, postData, (error) => {
        if(error){
            res.status(400).send({msg: "Error al actualizar el post"});
        }else{
            res.status(200).send({msg: "Actualización correcta"});
        }
    })
}

function deletePost(req,res){
    const {id} = req.params;

    Post.findByIdAndDelete(id,(error) => {
        if(error){
            res.status(400).send({msg: "Error al eliminar el post"});
        }else{
            res.status(200).send({msg: "Post eliminado"});
        }
    })
}

function getPost(req,res){
    const {path} = req.params;

    Post.findOne({path}, (error, postStored) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!postStored){
            res.status(400).send({msg: "No se ha encontrado ningún post"});
        }else{
            res.status(200).send(postStored);
        }
        
    })
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
};