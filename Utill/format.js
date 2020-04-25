const mybatisMapper = require('mybatis-mapper');  //매핑할 마이바티스

var format = function(namespace,id,params){
	
	mybatisMapper.createMapper([ './Utill/sql.xml' ]);  //예) xml파일이 D드라이브에 있다면, D:/매퍼.xml
	
	var param = params;
	var format = {language: 'sql', indent: '  '};	//질의문 형식
	var query = mybatisMapper.getStatement(namespace, id, param, format);	//첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.
	
	return query;
}
module.exports = format