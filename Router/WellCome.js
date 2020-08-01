const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const MenuList = require('../Common/MenuList');
const fs = require('fs');

let mybatis_namespace, mybatis_id, mybatis_filename, params, sql;

let func = [];

func[0] = {
			 url : "/Main.do" , 
			 type : "GET" , 
			 callback : (req, res)=>{
				MenuList(0,(result)=>{
					res.render('./view/WellCome/Main',result);
				})
			}
		}

module.exports = func;