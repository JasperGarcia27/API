const jwt = require("jsonwebtoken");
const secret = "EcommerceAPI"



// Token creation
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {})
}




module.exports.verify = (req, res, next) => {

	console.log(req.headers.authorization)

	let token = req.headers.authorization;


	if(typeof token === "undefined") {
		return res.send({auth: "Failed. No Token"});
	}
	else {
		console.log(token);
		token = token.slice(7, token.length);
		console.log(token);


		jwt.verify(token, secret, function(err, decodedToken) {
			if(err) {

				return res.send({
					auth: "Failed",
					message: err.message
				})
			}
			else {
				console.log(decodedToken);
				req.user = decodedToken;
				

				next();
				
			}
		})
	}
}


module.exports.verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin) {

		next();
	}
	else {
		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}

// Token Decryption
module.exports.decode = (token) => {

	if(typeof token !== "undefined") {
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if(err) {
				return null;
			}
			else {
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	}
	else {
		return null;
	}
}
