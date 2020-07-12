const mybatis = require('../Common/format');
const Mysql = require('../Common/db');

const MenuList = (param,callback) => {
	let mybatis_namespace = "CommonSelect"					
	let mybatis_id = "ListCall"								
	let params = {Codeno : param};
	
	let sql = mybatis(mybatis_namespace, mybatis_id, params);		
	Mysql(sql,(List_Check)=>{
		let data = List_Check.result;
		let res = {
			  Menu : data
			, length : data.length
		}
		callback(res);
	})
}
module.exports = MenuList;