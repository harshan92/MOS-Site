const router=require("express").Router();
const Product=require("../models/product");
const multer=require("multer");

const checkJWT=require("../middlewares/check-jwt");

const faker=require('faker');

var upload = multer({ dest: 'uploads/' });

router.route("/products")
.get(checkJWT, (req, res, next)=>{
    Product.find({owner:req.decoded.user._id})
    .populate("owner")
    .populate("category")
    .exec((err, products)=>{
        if(products){
            res.json({
                success:true,
                message:"Products",
                products:products
            })
        }
    })
})
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

//to generate testing data
router.get("/faker/test", (req, res, next)=>{
    for(var i=0;i<20;i++){
        let product=new Product();
        product.category="5e94628447c0270bf0d90a53";
        product.owner="5e92adaabd68e0227068eb8d";
        product.image=faker.image.animals();
        product.title=faker.commerce.productName();
        product.description=faker.lorem.words();
        product.price=faker.commerce.price();
        product.save();
    }
    res.json({
        message:"Successfully added 20 pictures."
    })
})
module.exports=router;