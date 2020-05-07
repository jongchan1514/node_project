const crypto = require('crypto');

let encryptionKey;

function encryption(password){
	crypto.randomBytes(64, (err, buf) => {
		const salt = buf.toString('base64')
		console.log(salt)
		crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) =>{
			console.log(key.toString('base64'))
			encryptionKey = key.toString('base64');
		})
	})
	test(password,encryptionKey);
}
function test(password,key){
		crypto.pbkdf2(password, key, 100, 64, 'sha512', function(err, key){
			console.log(key.toString('base64'));
		})
}
module.exports = encryption

https://m.blog.naver.com/PostView.nhn?blogId=tpgns8488&logNo=221336473460&proxyReferer=https:%2F%2Fwww.google.com%2F

https://surhommejk.tistory.com/487?category=782632

// 비밀번호 저장하기
// 1. CSPRNG를 사용해서 임의의 소금값을 생성한다.
// 2. 소금값을 비밀번호 앞에 덧붙이고 SHA256 같은 표준 암호화 해시 함수를 사용해서 해시한다.
// 3. 소금값과 해시값을 사용자 계정 테이블에 저장한다.

// 비밀번호 유효성 검사
// 1. 사용자의 소금값과 비밀번호 해시값을 데이터베이스에서 찾는다.
// 2. 입력한 비밀번호에 소금값을 덧붙이고 비밀번호 해싱에 사용했던 동일한 해싱함수를 사용하여 해싱한다.
// 3. 입력한 비밀번호로 생성한 해싱값과 저장되어 있는 해싱값과 비교해서 일치하는지 확인하고 동일 하면 비밀번호가 정확한 비밀번호를 입력한것이고 아니면 잘못된 비밀번호를 입력한 것이다.
