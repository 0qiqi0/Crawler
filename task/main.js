/**
 * Created by dell on 2016/4/10.
 */
var read=require('./read.js');
var url='http://top.baidu.com/category?c=10&fr=topindex'
read.category(url,function(err,categories){
    console.log(categories);
})

var artileUrl='http://top.baidu.com/buzz?b=353&c=10&fr=topbuzz_b355_c10';
read.article(artileUrl,function(err,articles){
    console.log(articles);
})