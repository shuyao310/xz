//引入上一级目录下的mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
var router=express.Router();
//添加路由
//1.ajaxDemo
router.get("/ajaxdemo",(req,res)=>{
	res.send("这是我的第一个ajax");
});
//2.登录接口
router.get('/login',(req,res)=>{
	//获取用户名称和密码
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	if(!$uname){
	 res.send('用户名为空');
	 return;
	}
	if(!$upwd){
	 res.send('密码为空');
	 return;
	}
    //res.send('用户名:'+$uname+"..密码:"+$upwd);

	var sql="select * from xz_user "+ 
		"where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("用户名密码错误");
		}
	});
});
//3.userlist接口
router.get('/userlist',(req,res)=>{
 pool.query('select * from xz_user',(err,result)=>{
   res.send(result);
 });
});
//4.checkUname接口
router.get('/checkUname',(req,res)=>{
  var $uname=req.query.uname;
  var $upwd=req.query.upwd;
pool.query('select * from xz_user where uname=?'[$uname],(err,result)=>{
	console.log(result);
   if(result){
     res.send('用户名被占用');
   }else{
     res.send('用户名可用');
   }
});
});
//6.postlogin
router.post('/postlogin',(req,res)=>{
	//获取用户名称和密码
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
	 res.send('用户名为空');
	 return;
	}
	if(!$upwd){
	 res.send('密码为空');
	 return;
	}
   //res.send('用户名:'+$uname+"..密码:"+$upwd);
   var sql="select * from xz_user "+ 
		"where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("用户名密码错误");
		}
	});
});

//导出路由器
module.exports=router;