const Company = require("../models/company.model");

const registerCompany = async (req,res) =>{
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"company name is required",
                success:false
            })
        }

        const existingCompany = await Company.findOne({name: companyName});
        if(existingCompany){
            return res.status(400).json({
                message:"Company already exists",
                success:false
            })
        }
        const company = await Company.create({
            name:companyName,
            userId:req.id,
            logo:""
        })
        return res.status(201).json({
            message:"company created successfully",
            company,
            success:true
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }

}

const getCompany = async (req, res)=>{
    try{
        const userId=req.id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
            message:"companies not found",
            success:false
        })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const getCompanyById = async (req, res)=>{
    try{
        const companyId=req.params.id
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
            message:"company not found",
            success:false
        })
        }
        return res.status(200).json({
            company,
            success:true
        })
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const updateCompany = async (req, res)=>{
    try{
        const{name , description , website ,location } = req.body;
        const file = req.file;
        //idhar cloudnary aayenga

        const updateData = {name , description , website ,location }
        const company = await Company.findByIdAndUpdate(req.params.id , updateData , {new:true})
        if(!company){
            return res.status(404).json({
            message:"company not found",
            success:false})
        }
        return res.status(200).json({
            message:"company data updated",
            company,
            success:true
        })
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

module.exports = {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
};
