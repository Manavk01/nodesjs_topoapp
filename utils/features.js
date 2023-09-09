import jwt from "jsonwebtoken"

export const sendCookies =(user , res , message , statusCode=200)=>{
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

res.status(statusCode).cookie("token" ,token,{
  httpOnly: true,
  maxAge:15 * 60 *1000,
  // is se ya hoga ki kyuki apni frontend and backend alag alag url pr run kr rhe hai na isleya 
   sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
   secure: process.env.NODE_ENV === "Development"?false :true, 
}). 
json({
    success: true,
    message,
})
}