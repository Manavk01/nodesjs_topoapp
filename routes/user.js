import express from "express"
import {   getMyProfile, register , login , logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
//import { User } from "../models/user.js"



const router = express.Router();
// router.get("/all" ,getAllusers);

router.post("/new",register);
router.post("/login", login);
router.get("/logout", logout);


router.get( "/me",isAuthenticated,getMyProfile);



export default  router ;