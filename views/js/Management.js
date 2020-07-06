$(document).ready(function(){

	let flag = false;

	$(".signin").on("click", function(){
	  if(!flag){
		$(".move").addClass("moving");
		$(".move").removeClass("start");
		$(".form").addClass("movingForm");
		$(".form").removeClass("startForm");
		$(".hello").show();
		$(".welcome").hide();
		$(".move").css("background-position", "right");

		setTimeout(function(){
		  $(".title").text("Sign-in in to Pixmy");
		  $(".light").text("Or use your email account");
		  $(".name").hide();
		  $(".p-button").text("SIGN UP");
		  $(".b-button").text("SIGN IN");
		  $(".forgot").show();
		  $(".form").css("border-radius","10px 0px 0px 10px");
		  $(".move").css("border-radius","0px 10px 10px 0px");
		}, 200);

		flag=true;
	  }else{
		$(".move").removeClass("moving");
		$(".move").addClass("start");
		$(".form").removeClass("movingForm");
		$(".form").addClass("startForm");
		$(".hello").hide();
		$(".welcome").show();
		$(".move").css("background-position", "left");

		setTimeout(function(){
		  $(".title").text("Create Account");
		  $(".light").text("Or use your email for registration");
		  $(".name").show();
		  $(".p-button").text("SIGN UP");
		  $(".b-button").text("SIGN IN");
		  $(".forgot").hide();
		  $(".form").css("border-radius","0px 10px 10px 0px");
		  $(".move").css("border-radius","10px 0px 0px 10px");
		}, 200);

		flag=false;
	  }
	});
	$("#submit").click(function(){
		if(!flag){
			$("input[nm=Name]").attr('not_null','true');
			if(effectiveness("input", "not_null", "true")){
				var params = {
					 'Name' : $(".name").val()
					,'Email' : $(".email").val()
					,'Password' : $(".password").val()
				}
				fnet('/Management/SignUp','json','POST',params,function(res){
					alert(res.Msg);
				})
			}
		}else if(flag){
			$("input[nm=Name]").attr('not_null','fales');
			if(effectiveness("input", "not_null", "true")){
				var params = {
					 'Email' : $(".email").val()
					,'Password' : $(".password").val()
				}
				fnet('/Management/SignIn','json','POST',params,function(res){
					if(res.State){
					   	location.href= "/Wellcome/Main.do";
					}else{
						alert(res.Msg);
					}
				})
			}
		}
	})
})