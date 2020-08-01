$('.trigger').on('click', function() {
	if($('.modal-wrapper').hasClass('open')){
		console.log("open");
	}else{
		$('.modal-wrapper').toggleClass('open');
		$('.page-wrapper').toggleClass('blur-it');	
	}
	console.log(this.text);
	$('.menuName').text(this.text);
 return false;
});
$('.btn-close').on('click', function(){
	$('.modal-wrapper').toggleClass('open');
	$('.page-wrapper').toggleClass('blur-it');
	return false;
})