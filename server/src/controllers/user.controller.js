const User = require('../database/model/user').User; // Importer le modèle user
const bcrypt=require('bcrypt');
const { sign } = require('jsonwebtoken');
const {verify}=require("jsonwebtoken");
var nodemailer = require('nodemailer');

// Route pour ajouter un client (*****register form*****)
  function add_User (req, res) {
    const {name,password,email}=req.body;
    bcrypt.hash(password,10).then((hash)=>{
        User.create({
            name:name,
            password:hash,
            email:email
        }).then(()=>{
            res.json("USER REGISTRED!!");
        }).catch((err)=>{
            if(err){
                res.status(400).json({error:err});
            }
        });
    });
  
}
//Route pour s'authentifier 

async function login_user(req, res) {
    const { name, password, email } = req.body;
    // Verify if a user exists with these credentials
    const user = await User.findOne({
      where: { name: name, email: email },
    });
    if (!user) {
      res.json({ error: "USER DOESN'T EXIST! TRY AN OTHER USERNAME AND EMAIL" });
    } else {
      const dbpassword = user.password;
      bcrypt.compare(password, dbpassword).then((match) => {
        if (!match) {
          res.json({ error: "Wrong password" });
        } else {
         const accesToken=sign( {name:user.name,id:user.id},"importantsecret",{expiresIn:"10h"});
        
          res.cookie("accesstoken",accesToken,{ httpOnly:true});    
          
          res.json(accesToken);
          
         
        }
      });
    }
    
  }


//route pour le profile 
 async function get_profile(req,res,next){
  //const user=await User.findByPk(req.user.id);
 const user=await User.findOne({where: { id: req.user.id} });  
 
  res.status(200).json({sucess:true,user})
}
//Route pour logout 
function logout(req,res){
  res.clearCookie('accesstoken');
  res.clearCookie('connect.sid');    
  console.log("logout")
  res.redirect('http://localhost:3000/');
}
//Route pour forget password 
async function forget_password(req,res){
const {email}=req.body;
try{
  const oldUser=await User.findOne({
    where: { email: email },
  });
  if(!oldUser){
    return(res.json({status:"user didn't exist!!!!!!"}))
  }
  const secret ="importantsecret"+oldUser.password;
  const token=sign( {email:oldUser.email,id:oldUser.id},secret,{expiresIn:"10h"});
  const link=`http://localhost:5000/users/resetPassword/${oldUser.id}/${token}`;
//**************************************************************************************************** */
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eyaouniessect@gmail.com',
    pass: 'kfxomsixkcxqwrkb'
  }
});

var mailOptions = {
  from: 'eyaouniessect@gmail.com',
  to: 'bella.totaayouta@gmail.com',
  subject: 'Reset Password',
  text: link
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});




//*********************************************************************************** */
  console.log(link,12)
}catch(err){   console.log(err)}
}

//Route reset password
async function reset_password(req,res){
const {id,token}=req.params;
console.log(req.params,"parametre url");
const oldUser=await User.findOne({
  where: { id: id },
});
//res.send(token)
const secret ="importantsecret"+oldUser.password;

try {
  const Verify=verify(token,secret);
  // this is made by ejs but i don't wont to do it like that 
 
 res.redirect(`http://localhost:3000/resetPassword/${oldUser.id}/${token}`);

//res.send("verified")
} catch (error) {
  res.send("Not verified")
}

}

//Route reset password post
async function reset_password_post(req,res){
  const {id,token}=req.params;
  const {password}=req.body;
  console.log(req.params,"parametre url");
  const oldUser=await User.findOne({
    where: { id: id },
  });
  if(!oldUser){
    return(res.json({status:"user didn't exist!!!!!!"}))
  }
  console.log(oldUser.password)
  const secret ="importantsecret"+oldUser.password;
  try {
    const Verify=verify(token,secret);
    const encryptedPassword=await bcrypt.hash(password,10);
    User.update({ password: encryptedPassword }, { where: { id: id } })
  .then(resultat => {
    console.log(resultat);
  })
  .catch(erreur => {
    console.log(erreur);
  });
  res.json({status:"password Updated"})
  } catch (error) {
    res.send("something went wrong password not updated")
  }
  
  }
  


module.exports = {
   add_User,login_user,get_profile,logout,forget_password,reset_password,reset_password_post
};
/*
try {
    // Récupérer les données de l'utilisateur à partir du corps de la requête
    const { name, password,email } = req.body;
   
    bcrypt.hash(password,10).then((hash)=>{
        const newUser = User.create({ name:name,password:hash,email:email });
    })
   

    // Renvoyer une réponse avec l'utilisateur créé
    res.status(201).json(newUser,"user Regitred!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur' });
  }*/