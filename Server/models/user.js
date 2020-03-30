const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const bcrypt=require("bcrypt-nodejs");
const crypto=require("crypto");

const UserSchema=new Schema({
    email:{type:String, unique:true, lowercase:true},
    username:String,
    first_name:String,
    last_name:String,
    password:String,
    picture:String,
    isSeller:{type:Boolean, default:false},
    address:{
        addr1:String,
        addr2:String,
        city:String,
        state:String,
        country:String,
        postalCode:String
    },
    created_at:{type:Date, default:Date.now}
});

//hash password before save the user
UserSchema.pre('save', function(next){
    var user=this;
    if(!user.isModified("password")) return next();

    bcrypt.hash(user.password,nukk,null, function(err, hash){
        if(err) return next(err);
        user.password=hash;
        return next();
    });
});

//password comparision method
UserSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.gravatar=function(size){
    if(!this.size) size=200;
    if(!this.email) return 'https://gravatar.com/avatar/?s'+size+"&d=retro";
    var md5=crypto()
}