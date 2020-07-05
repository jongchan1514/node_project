const express = require('express');
const app = express();
const ejs = require('ejs');
const dirPath = require("path");
const bodyParser = require('body-parser');
const routelist = require('./Common/routelist');

app.engine("html", ejs.renderFile);         // 뷰엔진 html : ejs 매핑 정의
app.set('view engine', 'ejs');
app.use(express.static(dirPath.join(__dirname, "/views"))); // 정적파일 경로 정의
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());                 		 // json형식의 데이터를 body 객치로 받을수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

//라우터를 사용 (특정 경로로 들어오는 요청에 대하여 함수를 수행 시킬 수가 있는 기능을 express 가 제공해 주는것)
const router = express.Router();

router.route('/').get(function func(req, res){
				fs.readFile('./view/Management',(err,data)=>{
					res.render('./view/Management',{ title: 'Management' });
					res.end(data);
				})
			});	
	  
for(var i = 0; i < routelist.length; i++){
	let RootPath = routelist[i].Path;
	let FilePath = routelist[i].File
	let Mod = require(FilePath);
	for(var j = 0; j < Mod.length; j++){
		let Path = RootPath + Mod[j].url;
		let Type = Mod[j].type;
		let CallBack =  Mod[j].callback;
		switch(Type){
			case "GET":                    
			router.route(Path).get(CallBack);
			break;
			case "POST":                   
			router.route(Path).post(CallBack);
			break;
		}	
	}
};

app.use('/', router);      
app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});


var server = app.listen(3000, ()=>{
    console.log("회원관리 프로젝트 서버 시작")
});