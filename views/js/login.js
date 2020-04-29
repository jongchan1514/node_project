$(document).ready(function(){
	$("#data").click(function(){
		var params = {
			'id' : $(".id").val()
		   ,'pw' : $(".pw").val()
		}
		console.log(params);
		$.ajax({
			url:'/about',
			dataType : 'json',
			type : 'POST',
			data : params,
			success : function(res){
				alert(res.UserCheck);
				switch(res.UserCheck){
					case 0 :
						alert("로그인 실패");
						break;
					case 1 :
						alert("로그인성공");
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