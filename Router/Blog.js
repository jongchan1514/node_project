const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const MenuList = require('../Common/MenuList');
const fs = require('fs');

let mybatis_namespace, mybatis_id, mybatis_filename, params, salt, password, sql;

let func = [];

func[0] = {
			 url : "/Main.do" , 
			 type : "GET" , 
			 callback : (req, res)=>{
				MenuList(1,(result)=>{
					res.render('./view/Blog/Main',result);
				})
			}
		  }
module.exports = func;