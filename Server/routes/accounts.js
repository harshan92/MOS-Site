const router=require("express").Router();

const jwt=require("jsonwebtoken");

const User=require("../models/user");
const config=require("../config");

const checkJWT=require("../middlewares/check-jwt");

router.post("/signup", (req, res, next)=>{
    let user=new User();
    user.usename=req.body.username;
    user.first_name=req.body.first_name;
    user.last_name=req.body.last_name;
    user.email=req.body.email;
    user.password=req.body.password;
    user.photo=user.gravatar();
    user.isSeller=req.body.isSeller;

    User.findOne({email: req.body.email}, (err, ext_user)=>{
        if(ext_user){
            res.json({
                success:false,
                code:1,
                message:"Account with that email is already exist"
            })
        }else{
            user.save();
            var token=jwt.sign({
                user:user
            }, config.secret, {
                expiresIn:"7d"
            });

            res.json({
                success:true,
                message:"Enjoy your token",
                token:token
            });
        }
    })
});

router.post("/signin", (req, res, next)=>{
    User.findOne({ email:req.body.email}, (err, user)=>{
        if(err) throw err;

        if(!user){
            res.json({
                success:false,
                message:"Authentication failed, user not found"
            });
        }else if(user){
            var validPassword=user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success:false,
                    message:"Authentication failed, wrong password"
                });
            }else{
                var token=jwt.sign({
                    user:user
                }, config.secret, {
                    expiresIn:"7d"
                });
    
                res.json({
                    success:true,
                    message:"Enjoy your token",
                    token:token
                });
            }
        }
    })
});

router.route("/profile")
    .get(checkJWT, (req, res, next)=>{
        User.findOne({_id:req.decoded.user._id}, (err, user)=>{
            res.json({
                success:true,
                user:user,
                message:"Successful"
            })
        })
    })
    .post(checkJWT, (req, res, next)=>{
        User.findOne({_id:req.decoded.user._id}, (err,user)=>{
            if(err) return next(err);
            if(req.body.first_name) user.first_name=req.body.first_name;
            if(req.body.last_name) user.last_name=req.body.last_name;
            if(req.body.email) user.email=req.body.email;
            if(req.body.password) user.password=req.body.password;

            user.isSeller=req.body.isSeller;

            user.save();

            res.json({
                success:true,
                message:"Successfully updated your profile"
            })
        })
    });

router.route("/address")
    .get(checkJWT, (req, res, next)=>{
        User.findOne({_id:req.decoded.user._id}, (err, user)=>{
            res.json({
                success:true,
                address:user.address,
                message:"Successful"
            })
        })
    })
    .post(checkJWT, (req, res, next)=>{
        User.findOne({_id:req.decoded.user._id}, (err,user)=>{
            if(err) return next(err);
            
            if(req.body.addr1) user.address.addr1=req.body.addr1;
            if(req.body.addr2) user.address.addr2=req.body.addr2;
            if(req.body.city) user.address.city=req.body.city;
            if(req.body.state) user.address.state=req.body.state;
            if(req.body.country) user.address.country=req.body.country;
            if(req.body.postalCode) user.address.postalCode=req.body.postalCode;

            user.save();

            res.json({
                success:true,
                message:"Successfully updated your address"
            })
        })
    });
module.exports=router;