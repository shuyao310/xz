const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建空路由器
var router=express.Router();
//创建路由
//1.商品列表
//url: /list  method:get
router.get('/list',(req,res)=>{
  //获取数据
  var obj=req.query;
  console.log(obj);
  //将页码和数量转为整型
  var $pno=parseInt(obj.pno);
  var $count=parseInt(obj.count);
  //判断页码和数量是否为空
  //设置默认值
  if(!$pno) $pno=1;
  if(!$count) $count=10;
  console.log($pno,$count);
  //计算开始查询的值
  var start=($pno-1)*$count;
  //执行SQL语句，响应查询到的数据
  pool.query('SELECT * FROM xz_laptop LIMIT ?,?',[start,$count],(err,result)=>{
    if(err) throw err;
	res.send(result);
  });
});
//2.商品详情
router.get('/detail',(req,res)=>{
  //获取数据，
  var obj=req.query;
  var $lid=obj.lid;
  if(!$lid){
    res.send({code:401,msg:'lid required'});
	return;
  }
  //执行SQL语句，把查询的数据响应给浏览器
  pool.query('SELECT * FROM xz_laptop WHERE lid=?',[$lid],(err,result)=>{
    if(err) throw err;
	//判断数据是否为空
	if(result.length>0){
	  res.send(result);
	}else{
	  res.send({code:301,msg:'detail err'});
	}
  });
});
//3.商品删除
router.get('/delete',(req,res)=>{
  //获取数据
  var obj=req.query;
  var $lid=obj.lid;
  //验证是否为空
  if(!$lid) {
    res.send({code:401,msg:'lid required'});
	return;
  }
  //执行SQL语句
  pool.query('DELETE FROM xz_laptop WHERE lid=?',[$lid],(err,result)=>{
	if(err) throw err;
    //判断affectedRows属性值是否大于0
	if(result.affectedRows>0){
	  res.send({code:200,msg:'delete suc'});
	}else{
	  res.send({code:301,msg:'delete err'});
	}
  });
});
//4.商品添加
router.post('/add',(req,res)=>{
  //获取数据
  var obj=req.body;
  //console.log(obj);
  //判断是否为空
  //遍历对象的属性
  var $code=400;
  for(var key in obj){
	$code++;
    //console.log(key+'---'+obj[key]);
	//判断属性值是否为空
	if(!obj[key]){
	  res.send({code:$code,msg:key+' requried'});
	  return;
	}
  }
  //执行SQL语句
  pool.query('INSERT INTO xz_laptop SET ?',[obj],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	if(result.affectedRows>0){
	  res.send({code:200,msg:'add suc'});
	}
  });
});
//5.完成商品更改

//导出路由器
module.exports=router;
//在app.js服务器文件中挂载到/product下