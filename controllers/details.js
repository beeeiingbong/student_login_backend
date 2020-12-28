const Details= require('../models/details')

// exports.getAllDetails = async(req,res,next)=>{}

exports.postDetails =async(req,res,next)=>{
    const newDetails = new Details(req.body)
    newDetails.createdBy = req.user.id;
    try{
        const details=await newDetails.save()
        res.status(201).json(details)
    }
    catch(error){
        error.status = 400
        next(error);
    }
}

exports.getDetails = async(req,res,next)=>{
    const { detailsId } = req.params;
    try {
        const sID= await Details.findById(detailsId)
        res.status(200).json(sID)
    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.updateDetails = async(req,res,next)=>{
    const {detailsId}= req.params;
    try {
        await Details.findByIdAndUpdate(detailsId, req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.deleteDetails = async(req,res,next)=>{}