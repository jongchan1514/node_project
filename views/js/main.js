$(document).ready(function(){
	$("button").click(function(){
		var FileName = "/view/" + $(this).attr('value') +".html"
		location.href = FileName;
	})
})