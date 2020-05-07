const mybatis = require('./format');
const getData = require('./db');
const encryption = require('./encryption');

let namespace, id, crud, params, result;

var mod = {
	 func : [
		 {
			 url : "/" , 
			 type : "GET" , 
			 callback :  function func(req, res){
				 res.redirect('./view/Login.html')
				 console.log("Login Page");
			 }
		 },
		{
			 url : "/Main" , 
			 type : "GET" , 
			 callback :  function func(req, res){
				 res.redirect('./view/Main.html')
				 console.log("Main Page");
			 }
		 },
		{
			 url : "/Gis" , 
			 type : "GET" , 
			 callback :  function func(req, res){
				 res.redirect('./view/Gis.html')
				 console.log("GIS Page");
			 }
		 },
		 		{
			 url : "/Notice" , 
			 type : "GET" , 
			 callback :  function func(req, res){
				 res.redirect('./view/Notice.html')
				 console.log("Notice Page");
			 }
		 },
		 {
			 url : "/Login" , 
			 type : "POST" , 
			 callback : function func(req, res){
				 namespace = "management"					// mybatis namespace 정의
				 id = "login"								// mybatis id값 정의
				 crud = "SELECT"							// query 분기를 위한 종류 정의
				 params = req.body;							// 웹에서 요청한 데이터를 params 변수로 받아오기
				 
				 // var password = params.pw;				암호화 진행중
				 // encryption(password);
				 
				 let sql = mybatis(namespace,id,params);	// query 생성 하기
				 getData(sql,crud,function(result){
				 	if(result.state){
				 		var data = result.result[0];
				 		res.json(data);
				 	}
				 })
			 }
		 }
	 ]
}
module.exports = mod