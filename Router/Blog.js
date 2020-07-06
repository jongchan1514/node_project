const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const fs = require('fs');

let mybatis_namespace, mybatis_id, mybatis_filename, params, salt, password, sql;

let func = [];

func[0] = {
			 url : "/input.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Blog/input',(err,data)=>{
					res.render('./view/Blog/input',{ title: 'Blog_input' });
					res.end(data);
				})
			}
		  }
func[1] = {
			 url : "/Main.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Blog/Main',(err,data)=>{
					res.render('./view/Blog/Main',{ title: 'Blog_Main' });
					res.end(data);
				})
			}
		  }

module.exports = func;