const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudnary");

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
  
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const file = req.file 
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "user create sucessfull",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesnot exist with current role ",
        success: false,
      });
    }

    const tokenData = {
      UserID: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout sucessfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
      // console.log( fullname, email, phoneNumber, bio, skills )
// cloudinary upload
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }


    let skillsArray;
    if(skills){
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentection
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    // updating data
    if(fullname) user.fullname = fullname;
    if(email) user.email = email;
    if(phoneNumber) user.phoneNumber = phoneNumber;
    if(bio) user.profile.bio = bio;
    if(skills) user.profile.skills = skillsArray;
    
    //resume comes later here ....

    if (cloudResponse) {
      user.profile.resume  = cloudResponse.secure_url // save the  cloudinary url
      user.profile.resumeOriginalName = file.originalname
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
        message: "profile updated successfully",
        user,
        success: true,
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
};
