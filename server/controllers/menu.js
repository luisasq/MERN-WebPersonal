const Menu = require("../models/menu");

async function createMenu (req,res){
    const menu = new Menu(req.body);

    menu.save((error,menuStored) => {
        if(error){
            res.status(400).send({msg: "Error al crear el menú"});
        }else{
            res.status(200).send(menuStored);
        }
    })
}

async function getMenu(req,res){
    const {active} = req.query;
    
    let response=null;

    if(active === undefined){
        response = await Menu.find().sort({order: "asc"});
    }else{
        response = await Menu.find({active}).sort({order: "asc"});
    }

    if(!response){
        res.status(400).send("No se ha encontrado ningún menú");
    }else{
        res.status(200).send(response);
    }
}

async function updateMenu(req,res){
    const {id} = req.params;

    const menuData=req.body;

    Menu.findByIdAndUpdate({_id: id}, menuData, (error) => {
        if(error){
            res.status(400).send({msg: "Error al actualizar el menú"});
        }else{
            res.status(200).send({msg: "Actualización correcta"});
        }
    })
}

async function deleteMenu(req,res){
    const {id} = req.params;

    Menu.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: "Error al eliminar el menú"})
        }else{
            res.status(200).send({msg: "Menú eliminado"});
        }
    })
}
module.exports = {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,
};