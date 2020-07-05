const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const fs = require('fs');

let mybatis_namespace, mybatis_id, mybatis_filename, params, sql;

let func = [];

func[0] = {
			 url : "/Blog_Main.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Main',(err,data)=>{
					res.render('./view/Main',{ title: 'Main' });
					res.end(data);
				})
			}
		}

module.exports = func;