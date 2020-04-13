const router=require("express").Router();
const Product=require("../models/product");
const multer=require("multer");

const checkJWT=require("../middlewares/check-jwt");

var upload = multer({ dest: 'uploads/' });
router.route("/products")
.get()
.post([checkJWT, upload.single("product_pictures")], (req, res, next)=>{
    let product=new Product();
    product.owner=req.decoded.user._id;
    product.category=req.body.categoryId;
    product.title=req.body.title;
    product.price=req.body.price;
    product.description=req.body.description;
    product.image=req.file.path;
    product.save();
    res.json({
        success:true,
        message:"Successfully added the product"
    })
});
module.exports=router;