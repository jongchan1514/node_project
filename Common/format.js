const mybatisMapper = require('mybatis-mapper');  //매핑할 마이바티스

var format = function(mybatis_namespace, mybatis_id, params){
	
	mybatisMapper.createMapper([ './Utill/'+mybatis_namespace+'.xml' ]);  //매퍼 파일 경로
	
	var param = params;
	var format = {language: 'sql', indent: '  '};	//질의문 형식
	var query = mybatisMapper.getStatement(mybatis_namespace, mybatis_id, param, format);	//첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.
	
	return query;
}
module.exports = format