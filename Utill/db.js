const mysql = require('mysql');  //My-sql을 사용하였다.
const info = require("../Common/db_info")
const pool = mysql.createPool(info); // 접속 정보를 이용하여 풀 만들기

var DB = (function(){
	function result(sql,type,callback){
		var data = {};									// 결과데이터,상태값,메시지 등을 담을 객체 생성
		pool.getConnection(function(err,connection){	// 생성된 Pool에 Connection한다.
			if(connection){								// Connection 성공여부 체크
				if(err){								// Connection 오류 발생 
					connection.release();				// Connection 종료
					data.state = false;					// 실패 상태값
					data.msg = "Connection 오류";		   // console 출력할 메시지 지정
					callback(data);						// 결과 CallBack
                	throw err;							// 에러 예외처리
				}else{
					connection.query(sql, function (err, rows) {
						connection.release();			// SQL 처리 이후 연결 해제
						if (!err) {						// 모든 작업이 성공적으로 끝났을 경우	
							data.state = true;			// 결과 상태값 true
							data.result = rows;			// 결과값 전달
							data.msg = "SQL 성공";	   // 결과 메시지 지정
							callback(data);				// 작업결과 CallBack
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
				console.log(data.msg);
				cb(data);
			}
		}
	})
}
module.exports = getData