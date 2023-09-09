
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// ->> this function not in use so does not build it. it is mainly use to build administry page where we need all data 
// export const getAllusers  =  async(req,res)=>{};

export const login = async(req , res, next) => {
try {
    const {email , password} = req.body;

    const user = await User.findOne({email}).select("+password");
    
    if (!user) return next (new ErrorHandler("invalid email or password", 404));
    
  //   if (!user)
  //   return res.status(404).json({
  //      success: false,
  //      message: "invalid email or password",
  // });
  
  const isMatch = await bcrypt.compare(password ,user.password);
  
  if (!isMatch)
  // return res.status(404).json({
  //    success: false,
  //    message: "invalid email or password",
  // });
  return next (new ErrorHandler("invalid email or password", 404));
  
  sendCookies(user , res, `welcome back, ${user.name}`,200);
} catch (error) {
    next(error);
}

};

export const register =  async(req,res)=>{
 try {
    const {name , email , password} = req.body;

    let user  = await User.findOne({email});
   
   //    if (user)
   //    return res.status(404).json({
   //       success: false,
   //       message: "User already exist",
   // });
   
   if (user) return next (new ErrorHandler("User already exist", 404));
   
   const hashedPassword  = await bcrypt.hash(password , 10);
   
    user  =await User.create({ name,  email, password: hashedPassword });
   
      sendCookies(user, res, "Registered successfully", 201);
 } catch (error) {
      next(error);  
 }

};



export const getMyProfile = (req,res) =>{

   
   res.status(200).json({
    success: true,
    user: req.user,
   })


};

export const logout = (req , res) =>{
    res
    .status(200)
    .cookie("token","",{expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development"?false :true, 

    })
    .json({
        success:true,  
        user: req.user,
    })
}





