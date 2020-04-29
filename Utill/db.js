const mysql = require('mysql');  //My-sql을 사용하였다.
const info = require("../Common/db_info")
const pool = mysql.createPool(info); // 접속 정보를 이용하여 풀 만들기

var DB = (function(){
	function result(sql,type,callback){
		var data = {};
		pool.getConnection(function(err,connection){
			if(connection){
				if(err){
					console.log("connection 오류");
					connection.release();
					data.state = false;
					callback(data);
                	throw err;
				}else{
					connection.query(sql, function (err, rows) {
						connection.release();
						var data = {};
						if (!err) {
							console.log("SQL 성공");
							data.state = true;
							data.result = rows;
							callback(data);
						}
						else {
							console.log("SQL 실패");
							data.state = false;
							data.result = err;
							callback(data);
						}
					});
				}
			}
			console.log("Pool 생성오류");
			connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
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
			   console.log("DB작동오류")
			   console.log(data.result);
			}else{
				console.log("DB성공")
				cb(data.result);
			}
		}
	})
}
module.exports = getData