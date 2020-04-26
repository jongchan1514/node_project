const mysql = require('mysql');  //My-sql을 사용하였다.
const info = require("../Common/db_info")
const pool = mysql.createPool(info); // 접속 정보를 이용하여 풀 만들기

var DB = (function(){
	function result(sql,type,callback){
		pool.getConnection(function(err,connection){
			if(err){
				connection.release();
				callback(err);
                throw err;
			}
			connection.query(sql, function (err, rows) {
                connection.release();
				if (!err) {
					callback(rows);
				}
				else {
					callback(err);
				}
            });
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
			console.log("err : " + JSON.stringify(err)); 
		}else{
			cb(data);
		}
	})
}
module.exports = getData