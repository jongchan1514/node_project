const mysql = require('mysql');  //My-sql을 사용하였다.
const info = require("../Common/db_info")
const pool = mysql.createPool(info); // 접속 정보를 이용하여 풀 만들기

var DB = (function(){
	function result(sql,type,callback){
		var data = {};
		pool.getConnection(function(err,connection){
			if(connection){
				if(err){
					connection.release();
					data.state = false;
					data.msg = "connection 오류";
					callback(data);
                	throw err;
				}else{
					connection.query(sql, function (err, rows) {
						connection.release();
						var data = {};
						if (!err) {
							data.state = true;
							data.result = rows;
							data.msg = "SQL 성공";
							callback(data);
						}
						else {
							data.state = false;
							data.result = err;
							data.msg = "SQL 실패";
							callback(data);
						}
					});
				}
				connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            	});
			}else{
				data.state = false;
				data.msg = "Pool 생성오류"
				callback(data);
			}
		})
	}
	return{
		query : result
	}
})();

function getData(sql,crud,cb){
	DB.query(sql, crud, function(data, err){
		if(err){
			console.log("오류")
			console.log("err : " + JSON.stringify(err)); 
		}else{
			if(!data.state){
			   console.log(data.msg);
			}else{
				console.log("DB성공")
				cb(data);
			}
		}
	})
}
module.exports = getData