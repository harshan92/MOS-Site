const router=require('express').Router();
const async=require("async");
const Category=require('../models/category');
const Product=require('../models/product');

router.get("/test1", (req, res, next)=>{
    function first(callback){
        var firstName="Harshan";
        callback(null, firstName);
    }

    function second(firstName, callback){
        var lastName="Madhuranga";
        console.log(`${firstName} ${lastName}`);
    }

    async.waterfall([first, second]);
})

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
    const page=req.query.page;
    async.waterfall([
        function(callback){
            Product.count({category:req.params.id}, (err, count)=>{
                var totalProducts=count;
                callback(err, totalProducts);
            })
        }
    ])
});

module.exports=router;