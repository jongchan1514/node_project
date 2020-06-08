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
		if(!Obj.eq(i).val()){
		   alert(Obj.eq(i).attr("nm")+"은(는) 필수입니다.");
		   return false;
		}
	}
	return true;
}