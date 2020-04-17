const router=require('express').Router();
const Category=require('../models/category');
const Product=require('../models/product');

router.route('/categories')
.get((req, res, next)=>{
    Category.find({},(err, categories)=>{
        res.json({
            success:true,
            message:"Success",
            categories:categories
        })
    })
})
.post((req, res, next)=>{
    let category=new Category();
    category.name=req.body.category;
    category.save();

    res.json({
        success:true,
        message:"Successful"
    });
});

router.get('/categories/:id', (req, res, next)=>{
    const perPage=10;
    
    Product.find({category:req.params.id})
    .populate("category")
    .exec((err, products)=>{
        
        Product.count({category:req.params.id}, (err, totalProducts)=>{
            var categoryName="";
            // Category.findOne({_id:req.params.id},(err, category)=>{
            //     if(category){
            //         categoryName=category.name;
            //     }
                
            // });
            if(totalProducts!=0){
                categoryName=products[0].category.name;
            }
            res.json({
                success:true,
                message:'category',
                products:products,
                categoryName:categoryName,
                totalProducts:totalProducts,
                pages:Math.ceil(totalProducts/perPage)
            })
        })
    })
});

module.exports=router;