//引入上一级目录下的mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
var router=express.Router();
//添加路由
//1.登录接口
router.post('/login',(req,res)=>{
    var $uname=req.body.uname;
    var $upwd=req.body.upwd;
	if(!$uname){
	   res.send({code:401,msg:"用户名不存在"});
	   return;
	}
	if(!$upwd){
	   res.send({code:401,msg:"密码不存在"});
	   return;
	}
	pool.query('select * from xz_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{
	  if(result.length>0){
	    res.send("登录成功");
	  }else{
	    res.send("用户名或密码错误");
	  }
	});
});
//2.用户列表
router.get('/userlist',(req,res)=>{
  pool.query('select * from xz_user',(err,result)=>{
    res.send(result);
  });
});
//3.用户注册
router.post("/register",(req,res)=>{
   var obj=req.body;
   console.log(obj);
   var $code=400;
   for(var key in obj){
	  $code++;
	  if(!obj[key]){
      res.send({code:$code,msg:key+"require"});
	  return;
   }
   }
  pool.query('insert into xz_user set ?',[obj],(err,result)=>{

	if(result.affectedRows>0){
	  res.send({code:200,msg:"注册成功"});
	}else{
	  res.send({code:301,msg:"注册失败"});
	}
  });
});
//4.用户删除
router.get("/sc",(req,res)=>{

  var $uid=req.query.uid;
  if(!$uid){
    res.send({code:401,msg:$uid+"require"});
	return;
  }
  pool.query("delete from xz_user where uid=?",[$uid],(err,result)=>{
    if(result.affectedRows>0){
	  res.send("1");
	}else{
	  res.send({code:301,msg:$uid+"删除失败"});
	}
  });
});
//5.用户修改
router.post("/updateUser",(req,res)=>{
  var obj=req.body;
  console.log(obj);
  var $upwd=obj.upwd;
  var $phone=obj.phone;
  var $email=obj.email;
  var $gender=obj.gender;
  var $uid=obj.uid;
  for(var key in obj){
    if(!obj[key]){
	  res.send({code:404,msg:key+"require"});
	  return;
	}
  }
  pool.query("update xz_user set upwd=?,phone=?,email=?,gender=? where uid=?",[$upwd,$phone,$email,$gender,$uid],(err,result)=>{
    if(result.affectedRows>0){
	  res.send({code:200,msg:"修改成功"})
	}else{
	  res.send({code:404,msg:"修改失败"})
	  }
  });
});
//6.用户检索
router.get("/queryuser",(req,res)=>{
  var uid=req.query.uid;
  if(!uid){
    res.send({code:404,msg:uid+"require"});
	return;
  }
  pool.query("select * from xz_user where uid=?",[uid],(err,result)=>{
    if(err) throw err;
	if(result.length>0){
	  res.send(result[0]);
	}else{
	  res.send("0");
	}
  });
});
//7.用户修改2
router.post("/update",(req,res)=>{ 
  var obj=req.body;
  console.log(obj);
  var $uid=obj.uid;
  var $uname=obj.uname;
  var $upwd=obj.upwd;
  var $email=obj.email;
  var $phone=obj.phone;
  var $user_name=obj.user_name;
  var $gender=obj.gender;
  for(var key in obj){
    if(!obj[key]){
	  res.send({code:404,msg:key+"require"});
	  return;
	}
  }
   pool.query("update xz_user set user_name=?,upwd=?,email=?,uname=?,phone=?,gender=? where uid=?",[$user_name,$upwd,$email,$uname,$phone,$gender,$uid],(err,result)=>{
	if(err) throw err
    if(result.affectedRows>0){                           
	  //res.send("<script>alert('修改成功');location.href='http://127.0.0.1:3000/02_list.html'</script>")
	  res.send("1");
	}else{
	  res.send({code:404,msg:"修改失败"})
	  }
  });
});
//8.用户注册

//导出路由器
module.exports=router;