const mybatis = require('./format');
const getData = require('./db');

let namespace, id, crud, params, result;

var mod = {
	 func : [
		 {
			 url : "/" , 
			 type : "GET" , 
			 callback :  function func(req, res){
				 res.render('index.html')
				 console.log("index")
			 }
		 },
		 {
			 url : "/about" , 
			 type : "POST" , 
			 callback : function func(req, res){
				 namespace = "management"					// mybatis namespace 정의
				 id = "login"								// mybatis id값 정의
				 crud = "SELECT"							// query 분기를 위한 종류 정의
				 params = req.body;							// 웹에서 요청한 데이터를 params 변수로 받아오기
				 let sql = mybatis(namespace,id,params);	// query 생성 하기
				 getData(sql,crud,function(result){
					console.log("result : " + JSON.stringify(result));
					var data = JSON.stringify(result)	
					res.send(data);
				 })
			 }
		 }
	 ]
}
module.exports = mod
	
