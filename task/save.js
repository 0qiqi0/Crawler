var mysql=require('mysql');
var debug = require('debug')('crawl:save');
var async=require('async');
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'crawler'
});
//把分类列表存入数据库
exports.category=function(list,callback){
    async.forEach(list,function(item,cb){
        pool.query('replace into category(id,name,url) values(?,?,?)',[item.id,item.name,item.url],function(err,result){
            cb();
        })
    },callback);
}
//把文章列表存入数据库
exports.article=function(list,callback){
    async.forEach(list,function(item,cb){
            pool.query('replace into article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid],function(err,result){
                //console.error(err);
                cb();
            })
    },callback);
}






/*测试代码
exports.article([{
    name:'爱情',url:'sun',cid:3
}],function(result){
    console.log(result);
})*/
