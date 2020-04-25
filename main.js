const express = require('express');
const app = express();
const ejs = require('ejs');
const dirPath = require("path");
const bodyParser = require('body-parser');
const mod = require('./Utill/mod').func;

app.engine("html", ejs.renderFile);         // 뷰엔진 html : ejs 매핑 정의
app.set('view engine', 'ejs');
app.use(express.static(dirPath.join(__dirname, "../views"))); // 정적파일 경로 정의
app.use(bodyParser.json());                 		 // json형식의 데이터를 pody 객치로 받을수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

//라우터를 사용 (특정 경로로 들어오는 요청에 대하여 함수를 수행 시킬 수가 있는 기능을 express 가 제공해 주는것)
const router = express.Router();
for(var i = 0; i < mod.length; i++){       // 동적 URL 매핑 시작 (반복문)
	var row = mod[i];                      // 관리 대상 모듈 가져오기
	var path = row.url;                // 접두사 주소 받아오기
	var callBack = row.callback;
	var type = row.type;
	switch(type){
		case "GET":                     // GET 방식일 경우 적용
		router.route(path).get(callBack);
		break;
		case "POST":                    // POST 방식일 경우 적용
		router.route(path).post(callBack);
		break;
	}
};
app.use('/', router);       //라우트 미들웨어를 등록한다


var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});