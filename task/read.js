/**
 * Created by dell on 2016/4/10.
 */
//获取网页
var request=require('request');
//解析dom
var cheerio=require('cheerio');
//转码,gbk---utf8
var iconv=require('iconv-lite');

exports.category=function(url,callback){
//res是响应对象，类型是可写可读流。（可写：write，end；可读：on-data）
    request({url:url,encoding:null},function(err,res,body){
        if(err){
            return console.error(err);
        }
        //把gbk编码的buff转成utf8编码的字符串
        body=iconv.decode(body,'gbk');
        //console.log(body);
        var $=cheerio.load(body);
        var items=[];
        $('.hd .title a').each(function(){
            var $me=$(this);
            var item={
                name:$me.text().trim(),//trim是去掉空格
                url:$me.attr('href')
            }
            //console.log(item.url);
            //var result=item.url.match(//);
            var params=regParams(item.url);
            item.id=params.b;
            items.push(item);
            //console.log(item);
        })
        callback(null,items);
    });
}



function regParams(url){
    var obj={};
    //{}是匹配的次数，（）：匹配括号中间的并获取这一匹配，
    // ^：匹配输入字符串的开始位置。[xyz]:匹配所包含的任一字符
    //[^xyz]:匹配未包含的任一字符。？：一次货0此
    //+一次或多次，*：0或者多次,g是全局
    var reg=/([^?&=]*)=([^?&]*)/g;
    url.replace(reg,function(src,$1,$2){
        //console.log(src)
        obj[$1]=$2;
    })
    return obj;
}

exports.article=function(url,callback){
    request({url:url,encoding:null},function(err,res,body){
        if(err){
            return console.error(err);
        }
        //把gbk编码的buff转成utf8编码的字符串
        body=iconv.decode(body,'gbk');
        //console.log(body);
        var $=cheerio.load(body);
        var items=[];
        $('.keyword a').each(function(){
            var $me=$(this);
            var item={
                name:$me.text().trim(),//trim是去掉空格
                url:$me.attr('href')
            }
            //console.log(item);
            items.push(item);
        })
        callback(null,items);
    });
}
