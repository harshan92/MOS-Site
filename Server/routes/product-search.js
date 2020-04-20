const router=require('express').Router();

const algoliasearch = require("algoliasearch");
const client=algoliasearch('42DY0KCLMP', '3573f0cd76a234eb84d9aa5b9c853f70');
const index=client.initIndex('MOS1');

router.get('/',(req, res, next)=>{
    if(req.query.query){
        console.log(req.query.query);
        // with params
        index.search(req.query.query, {
            // attributesToRetrieve: ['title', 'description'],
            // hitsPerPage: 50,
        }).then(({ hits, page }) => {
            res.json({
                success:true,
                message:"Here is your search",
                status:200,
                content:hits,
                search_result:req.query.query
            })
        });
    }
});

module.exports=router;