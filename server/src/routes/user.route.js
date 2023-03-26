const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user.controller');
const {validateToken}=require('../middlewares/AuthMiddleware');
const passport=require("passport");
const loginWithGoogleApi=require("../auth/authGoogle");

const succesLoginGoogleUrl="http://localhost:3000/clientpage";
const errorLoginGoogleUrl="http://localhost:3000/sign-in";
// Route pour register (ajouter un client)
router.post('/user', usercontroller.add_User);


// Route pour LOGIN 
router.post('/user/login', usercontroller.login_user);

//Route pour welcome page 
router.get('/user/profile',validateToken,usercontroller.get_profile);

//Route pour se connecter via google
router.get("/login/google",passport.authenticate("google",{scope:["profile","email"]}));

//route de redirection si authentification google est reussite
router.get("/google/callback",passport.authenticate("google",{
    failureMessage:"Cannot login to Google, please Try again later !",
    failureRedirect:errorLoginGoogleUrl,
    successRedirect:succesLoginGoogleUrl
}),
(req,res)=>{
    console.log("User :",req.user);
    res.send("Thank you for signing in !");
}
);
//route de logout
router.get("/logout",usercontroller.logout);

//Route de forget password
router.post("/forgetPassword",usercontroller.forget_password);
//Route Reset password 
router.get("/resetPassword/:id/:token",usercontroller.reset_password);
//route de modification password
router.post("/resetPassword/:id/:token",usercontroller.reset_password_post);
module.exports = router;