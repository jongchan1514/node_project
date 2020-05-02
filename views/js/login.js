$(document).ready(function(){
	$("#data").click(function(){
		var params = {
			'id' : $(".id").val()
		   ,'pw' : $(".pw").val()
		}
		console.log(params);
		$.ajax({
			url:'/Login',
			dataType : 'json',
			type : 'POST',
			data : params,
			success : function(res){
				switch(res.UserCheck){
					case 0 :
						alert("로그인 실패");
						break;
					case 1 :
						alert("Login Success");
						location.href="/Main";
						break;
					default :
						alert("알수없는 오류");
						break;
				}
			}
		})
	})
})