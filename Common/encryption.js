
const pbkdf2_password = require('pbkdf2-password');
const pbkdf2 = pbkdf2_password();

let encryption = (password, salt, callback) => {
	
	pbkdf2({password:password, salt:salt}, function(err, pass, salt, hash){
    	let data = {
			'err' : err,
			'pass' : pass,
			'salt' : salt,
			'hash' : hash
		}
		callback(data);
	})
}
module.exports = encryption


