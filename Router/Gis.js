const mybatis = require('../Common/format');
const Mysql = require('../Common/db');
const fs = require('fs');
let func = [];

func[0] = 
		{
			 url : "/Main.do" , 
			 type : "GET" , 
			 callback : function func(req, res){
				fs.readFile('./view/Gis/Main',(err,data)=>{
					res.render('./view/Gis/Main',{ title: 'Gis' });
					res.end(data);
				})
			 }
		}

module.exports = func;