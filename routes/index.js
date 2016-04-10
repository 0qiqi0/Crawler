var express = require('express');
var router = express.Router();
var async=require('async');
var db=require('../db');
router.get('/', function(req, res, next) {
  //读到分类和文章的列表
 async.parallel([
   function(cb){
    db.category(cb);
   },
   function(cb){
     db.article(cb);
   }
 ],function(err,result){
    console.log(result)
    res.render('index', {
        categories:result[0],
        articles:result[1]
        }
    );
 })

});

module.exports = router;
