function RequestPost(url, dataType, type, params, Callback){
	$.ajax({
		url:url,
		dataType : dataType,
		type : type,
		data : params,
		success : Callback
	})
}