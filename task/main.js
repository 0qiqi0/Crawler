/**
 * Created by dell on 2016/4/10.
 */
//读取分类，读取文章列表，保存之
var read=require('./read.js');
var save=require('./save');
var async=require('async');
var url='http://top.baidu.com/category?c=10&fr=topindex';
//串行执行
var categories=[];
var articles=[];
async.series([
    function(done){
        read.category(url,function(err,list){
            categories=list;
            done(err);
        })
    },
    //把分类的列表保存到数据库中
    function(done){
        save.category(categories,done)
    },
    function(done){
        async.forEach(categories,function(category,next){
            read.article('http://top.baidu.com/buzz?b='+category.id+'&c=10&fr=topbuzz_b355_c10',category.id,function(err,list){
                articles=articles.concat(list);
                next();//代表一个类的结束了
            })
        },done)
    },
    function(done){
        save.article(articles,done)
    }
],function(err,result){
    console.log('所有任务完成')
})
