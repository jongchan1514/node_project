$(document).ready(function(){
	$("#data").click(function(){
		var id = $(".id").val();
		var pw = $(".pw").val();

		var params = {
			'id' : id
		   ,'pw' : pw
		}
		console.log(params);
		$.ajax({
			url:'/about',
			dataType : 'json',
			type : 'POST',
			data : params,
			success : function(res){
				console.log(res);
			}
		})
	})
})