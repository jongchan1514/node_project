const mybatis = require('./format');
const getData = require('./db');
const encryption = require('./encryption');
const fs = require('fs');
const crypto = require('crypto');

let mybatis_namespace, mybatis_id, mybatis_filename, params, salt, password, sql;

var mod = {
	 func : [
		 {
			 url : "/" , 
			 type : "GET" , 
			 callback :  function func(req, res){
				res.render('./view/Login.html',{ title: 'Login' });
			}
		 },
		 {
			 url : "/SignUp" , 
			 type : "POST" , 
			 callback : function func(req, res){
				 mybatis_namespace = "Validation"									// mybatis namespace 정의
				 mybatis_id = "User_Check"												// mybatis id값 정의
				 salt = crypto.randomBytes(128).toString('base64');					// randomByte Salt값 생성
				 password = encryption(req.body.Password , salt,(data)=>{			// 사용자 비밀번호와 Salt값으로 비밀번호 hash값 생성
					params = {														// sql 사용 할 파라메터 정의
						'Name' : req.body.Name,
						'Email' : req.body.Email,
						'Salt' : salt,
						'Password' : data.hash		
					}
					let sql = mybatis(mybatis_namespace, mybatis_id, params);		// query 생성 하기
					getData(sql,function(result){									// 완성 된 query로 sql 실행
						if(result.state){
							var data = result.result[0];
							// res.json(data);
							console.log(res.json);
						}
					}) 
				});
			 }
		 },
		{
			 url : "/SignIn" , 
			 type : "POST" , 
			 callback : function func(req, res){
				 namespace = "management"					// mybatis namespace 정의
				 id = "login"								// mybatis id값 정의
				 crud = "SELECT"							// query 분기를 위한 종류 정의
				 params = req.body;							// 웹에서 요청한 데이터를 params 변수로 받아오기
				 
				 console.log(params);
				 // var password = params.pw;				    //암호화 진행중
				 // encryption(password);
				 
				 // let sql = mybatis(namespace,id,params);	// query 생성 하기
				 // getData(sql,crud,function(result){
				 // 	if(result.state){
				 // 		var data = result.result[0];
				 // 		res.json(data);
				 // 	}
				 // })
			 }
		 }
	 ]
}
module.exports = mod