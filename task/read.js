/**
 * Created by dell on 2016/4/10.
 */
var url='http://top.baidu.com/category?c=10&fr=topindex'
//获取网页
var request=require('request');
//解析dom
var cheerio=require('cheerio');
//转码,gbk---utf8
var iconv=require('iconv-lite');
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
        console.log(item);
    })
});

function regParams(url){
    var obj={};
    var reg=/([^?&=]*)=([^?&]*)/g;
    url.replace(reg,function(src,$1,$2){
        obj[$1]=$2;
    })
    return obj;
}

var artileUrl='http://top.baidu.com/buzz?b=353&c=10&fr=topbuzz_b355_c10';
request({url:artileUrl,encoding:null},function(err,res,body){
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
        console.log(item);
        items.push(item);
    })
});