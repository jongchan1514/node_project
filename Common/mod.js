const mybatis = require('./format');
const Mysql = require('./db');
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
				fs.readFile('./view/Login',(err,data)=>{
					res.render('./view/Login',{ title: 'Login' });
					res.end(data);
				})
			}
		 },
		 {
			 url : "/SignUp" , 
			 type : "POST" , 
			 callback : function func(req, res){
				 mybatis_namespace = "Validation"									// mybatis namespace 정의
				 mybatis_id = "User_Check"												// mybatis id값 정의
				 salt = crypto.randomBytes(128).toString('base64');					// randomByte Salt값 생성
				 password = encryption(req.body.Password , salt,(hash_data)=>{			// 사용자 비밀번호와 Salt값으로 비밀번호 hash값 생성
					params = {														// sql 사용 할 파라메터 정의
						'Name' : req.body.Name,
						'Email' : req.body.Email,
						'Salt' : salt,
						'Password' : hash_data.hash
					}
					let ResultJson = {};
					sql = mybatis(mybatis_namespace, mybatis_id, params);		// query 생성 하기
					Mysql(sql,function(result){									// 완성 된 query로 sql 실행
						if(result.state){
							var data = result.result[0];
							if(data.user_check < 1){
								mybatis_namespace = "InsertData"									// mybatis namespace 정의
								mybatis_id = "User_Insert"												// mybatis id값 정의
								sql = mybatis(mybatis_namespace, mybatis_id, params);
								Mysql(sql,function(result){									// 완성 된 query로 sql 실행
									if(result.state){
										ResultJson.Msg = "회원정보가 성공적으로 등록되었습니다."
										res.json(ResultJson);
									}else{
										ResultJson.Msg = "올바르지못한 접근방식입니다."
										res.json(ResultJson);
									}
								})
							}else{
								ResultJson.Msg = "중복된 이메일이 있습니다 새로운 이메일을 입력해주세요."
								res.json(ResultJson);
							}
						}else{
							ResultJson.Msg = "올바르지못한 접근방식입니다."
							res.json(ResultJson);
						}
					}) 
				});
			 }
		 },
		{
			 url : "/SignIn" , 
			 type : "POST" , 
			 callback : function func(req, res){
				 mybatis_namespace = "Validation"					// mybatis namespace 정의
				 mybatis_id = "User_Check"								// mybatis id값 정의
				 params = req.body;							// 웹에서 요청한 데이터를 params 변수로 받아오기
				 sql = mybatis(mybatis_namespace, mybatis_id, params);		// query 생성 하기
				 
				 let ResultJson = {};
				 Mysql(sql,function(User_Check_result){									// 완성 된 query로 sql 실행
					if(User_Check_result.state){
						var data = User_Check_result.result[0];
						if(data.user_check < 1){
							ResultJson.Msg = "일치하는 회원정보를 찾을수 없습니다."
							ResultJson.State = false;
							res.json(ResultJson);
						}else{
							mybatis_namespace = "Validation"
							mybatis_id = "User_PassCheck"
							sql = mybatis(mybatis_namespace, mybatis_id, params);
							Mysql(sql,function(User_PassCheck_result){									// 완성 된 query로 sql 실행
								if(User_PassCheck_result.state){
									var data = data = Object.assign({}, User_PassCheck_result.result[0]);
									encryption(params.Password, data.Salt,(Hash_data)=>{
										if(data.Password == Hash_data.hash){
											ResultJson.State = true;
											res.json(ResultJson);
										}else{
											ResultJson.Msg = "비밀번호가 일치하지 않습니다."
											ResultJson.State = false;
											res.json(ResultJson);
										}
									})
								}else{
									ResultJson.Msg = "올바르지못한 접근방식입니다."
									ResultJson.State = false;
									res.json(ResultJson);
								}
							})
						}
					}else{
						ResultJson.Msg = "잘못된 접근방식입니다."
						ResultJson.State = false;
						res.json(ResultJson);
					}
				})
			}
		},
		{
			 url : "/Main.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Main',(err,data)=>{
					res.render('./view/Main',{ title: 'Main' });
					res.end(data);
				})
			}
		},
		{
			 url : "/Gis.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Gis',(err,data)=>{
					res.render('./view/Gis',{ title: 'Gis' });
					res.end(data);
				})
			 }
		},
		{
			 url : "/Blog_input.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Blog_input',(err,data)=>{
					res.render('./view/Blog_input',{ title: 'Gis' });
					res.end(data);
				})
			}
		},
		{
			 url : "/Blog_Main.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Blog_Main',(err,data)=>{
					res.render('./view/Blog_Main',{ title: 'Blog' });
					res.end(data);
				})
			}
		}
	 ]
}
module.exports = mod
//test
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign