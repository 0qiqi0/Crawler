/**
 * Created by dell on 2016/4/10.
 */
var mysql=require('mysql');

var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'crawler'
});

exports.category=function(callback){
    pool.query('select * from category',function(err,rows){
        //console.log(rows);
        callback(err,rows)
    });
}

exports.article=function(callback){
    pool.query('select * from article',function(err,rows){
        //console.log(rows);
        callback(err,rows)
    });
}