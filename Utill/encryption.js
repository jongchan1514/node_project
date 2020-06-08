const crypto = require('crypto');

function encryption(password){
	// crypto.randomBytes(64, (err, buf) => {
	//   crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
	// 	  console.log(key);
	// 	  var salt = key.toString('base64');
	// 	  console.log("salt  값 : "+salt);
	// 	  test(password,salt);
	//   });
	// });
	var salt = "1234"
	test(password,salt);
}
function test(password,salt){
	var cipher = crypto.createCipher('aes192', salt);
	cipher.update(password, 'utf8', 'base64');
	var cipheredOutput = cipher.final('base64');
	
	var decipher = crypto.createDecipher('aes192', salt);
	decipher.update(cipheredOutput, 'base64', 'utf8');
	var decipheredOutput = decipher.final('utf8');

	//출력
	console.log('원래 문자열: ' + password);
	console.log('암호화: ' + cipheredOutput);
	console.log('암호화 해제: ' + decipheredOutput);
}
module.exports = encryption
