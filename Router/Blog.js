const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const fs = require('fs');

let mybatis_namespace, mybatis_id, mybatis_filename, params, salt, password, sql;

let func = [];

func[0] = {
			 url : "/Blog_input.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Blog_input',(err,data)=>{
					res.render('./view/Blog_input',{ title: 'Blog_input' });
					res.end(data);
				})
			}
		  }
func[1] = {
			 url : "/Blog_Main.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Blog_Main',(err,data)=>{
					res.render('./view/Blog_Main',{ title: 'Blog_Main' });
					res.end(data);
				})
			}
		  }

module.exports = func;