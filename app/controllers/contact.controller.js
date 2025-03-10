const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.findOne = async (req, res, next) =>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id = ${req.params.id}`
            )
        );
    }
};
exports.update = async (req, res, next) =>{
    if(Object.keys(req.body).length ===0){
        return next(new ApiError(400, "data to update can not be emty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({massege: "Contact was updated succeccfuly"});
    } catch(error){
        return next(
            new ApiError(404, `Error updating contact with id =${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) =>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next (new ApiError(404, " Contact not found "));
        }
        return res.send({massege: "Contact was deleted successfuly"});
    } catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete contact with id =${req.params.id}`
            )
        );
    }
};
exports.deleteAll = async (req, res, next) =>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.deleteAll();
        return res.send({
            massege: `${deleteCount} contacts were deleted successfuly`, 
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
   
};
exports.findAllFavorite = async (_req, res, next) =>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};
exports.findAll = async (req, res, next)=>{
    let document = [];
    try{
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            document = await contactService.findByName(name);

        }
        else{
            document = await contactService.find({});
        }
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(document)
}
exports.create = async(req,res,next) =>{
    if(!req.body?.name){
        return next(new ApiError(400, "name can not be emty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(500, "An error occurred while creting the contact")
        );
    }
};
