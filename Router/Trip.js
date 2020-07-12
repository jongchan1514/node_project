const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const MenuList = require('../Common/MenuList');
const fs = require('fs');
let func = [];

func[0] = 
		{
			 url : "/Main.do" , 
			 type : "GET" , 
			 callback : (req, res)=>{
				MenuList(2,(result)=>{
					res.render('./view/Trip/Main',result);
				})
			 }
		}

module.exports = func;