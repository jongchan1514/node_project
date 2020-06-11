function RequestPost(url, dataType, type, params, Callback){
	$.ajax({
		url:url,
		dataType : dataType,
		type : type,
		data : params,
		success : Callback
	})
}

function effectiveness(TagName, AttrName, AttrVal){
	var Comvine = TagName+"["+AttrName+"="+AttrVal+"]"
	var Obj = $(Comvine);
	for(var i = 0; i < Obj.length; i++){
		var Check = Obj.eq(i).attr("nm");
		var data = Obj.eq(i).val();
		if(!Obj.eq(i).val()){
			alert(MsgConversion(Check)+"은(는) 필수입니다.");
			return false;
		}else{
			var result = DataRegExp(Check, data); 
			if(!result.State){
				alert(result.Msg);
				return false;
			}
		}
	}
	return true;
}
function MsgConversion (Check){
	var Msg
	switch (Check){
		case "Name" :
			Msg = "이름";
			break;
		case "Password" :
			Msg = "비밀번호";
			break;
		case "Email" :
			Msg = "이메일";
			break;
		case "Birthday" :
			Msg = "생년월일";
			break;
		case "PhonNumber" :
			Msg = "전화번호";
			break;
		default :
			Msg = "오류";
	}
	return Msg;
}

function DataRegExp(Check,Data){
	
	var userIdCheck = RegExp(/^[A-Za-z0-9_\-]{5,20}$/);																  //ID를 체크하기위한 정규식
	var passwdCheck = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/); //비밀번호를 체크하기위한 정규식
	var nameCheck = RegExp(/^[가-힣]{2,6}$/);																		 //이름을 체크하기위한 정규식
	var nickNameCheck = RegExp(/^[가-힣a-zA-Z0-9]{2,10}$/);															     //닉네임을 체크하기위한 정규식
	var emailCheck = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);										  //이메일을 체크하기위한 정규식
	var birthdayCheck = RegExp(/^(19|20)[0-9]{2}(0[1-9]|1[1-2])(0[1-9]|[1-2][0-9]|3[0-1])$/);							  //생년월일을 체크하기위한 정규식
	var phonNumberCheck = RegExp(/^01[0179][0-9]{7,8}$/);																  //전화번호를 체크하기위한 정규식
	
	var result = {};
	switch (Check){
		case "Name" :
			if(!nameCheck.test(Data)){
				result.Msg = "이름형식이 잘못되었습니다. 이름은 한글 2~6자 사이로 입력되어야합니다."
				result.State = false;
			}else{
				result.State = true;
			}
			break;
		case "Password" :
			if(!passwdCheck.test(Data)){
				result.Msg = "비밀번호형식이 잘못되었습니다. 비밀번호는 영문,숫자,특수문자를 모두 포함한 8~16자 사이로 입력되어야합니다."
				result.State = false;
			}else{
				result.State = true;
			}
			break;
		case "Email" :
			if(!emailCheck.test(Data)){
				result.Msg = "이메일형식이 잘못되었습니다."
				result.State = false;
			}else{
				result.State = true;
			}
			break;
		case "Birthday" :
			if(!birthdayCheck.test(Data)){
				result.Msg = "생년월일 형식이 잘못되었습니다."
				result.State = false;
			}else{
				result.State = true;
			}
			break;
		case "PhonNumber" :
			if(!phonNumberCheck.test(Data)){
				result.Msg = "전화번호 형식이 잘못되었습니다."
				result.State = false;
			}else{
				result.State = true;
			}
			break;
		default :
			result.Msg ="잘못된 접근방식입니다."
			result.State = false;
	}
	return result;
}