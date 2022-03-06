/*global WildRydes _config AmazonCognitoIdentity AWSCognito*/

const AppContext = window.AppContext || {};

(function () {
	var signinUrl = '/signin.html';

	var poolData = {
		UserPoolId: _config.cognito.userPoolId,
		ClientId: _config.cognito.userPoolClientId
	};

	var userPool;

	if (!(_config.cognito.userPoolId &&
			_config.cognito.userPoolClientId &&
			_config.cognito.region)) {
		document.getElementById('noCognitoMessage').style.display = 'block';
		// $('#noCognitoMessage').show();
		return;
	}

	userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	if (typeof AWSCognito !== 'undefined') {
		AWSCognito.config.region = _config.cognito.region;
	}

	WildRydes.signOut = function signOut() {
		userPool.getCurrentUser().signOut();
	};

	AppContext.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
		var cognitoUser = userPool.getCurrentUser();

		if (cognitoUser) {
			cognitoUser.getSession(function sessionCallback(err, session) {
				if (err) {
					reject(err);
				} else if (!session.isValid()) {
					resolve(null);
				} else {
					resolve(session.getIdToken().getJwtToken());
				}
			});
		} else {
			resolve(null);
		}
	});


	/*
	 * Cognito User Pool functions
	 */

	function register(email, password, onSuccess, onFailure) {
		var dataEmail = {
			Name: 'email',
			Value: email
		};
		var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

		userPool.signUp(toUsername(email), password, [attributeEmail], null,
			function signUpCallback(err, result) {
				if (!err) {
					onSuccess(result);
				} else {
					onFailure(err);
				}
			}
		);
	}

	function signin(email, password, onSuccess, onFailure) {
		var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
			Username: toUsername(email),
			Password: password
		});

		var cognitoUser = createCognitoUser(email);
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: onSuccess,
			onFailure: onFailure
		});
	}

	function verify(email, code, onSuccess, onFailure) {
		createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
			if (!err) {
				onSuccess(result);
			} else {
				onFailure(err);
			}
		});
	}

	function createCognitoUser(email) {
		return new AmazonCognitoIdentity.CognitoUser({
			Username: toUsername(email),
			Pool: userPool
		});
	}

	function toUsername(email) {
		return email.replace('@', '-at-');
	}

	/*
	 *  Event Handlers
	 */

	$(function onDocReady() {
		document.getElementById('signinForm').onsubmit = (e) => handleSignin(e);
		document.getElementById('registrationForm').onsubmit = (e) => handleRegister(e);
		document.getElementById('verifyForm').onsubmit = (e) => handleVerify(e);
	});

	function handleSignin(event) {
		event.preventDefault();
		const email = document.getElementById('emailInputSignin').value;
		const password = document.getElementById('passwordInputSignin').value;
		signin(email, password,
			function signinSuccess() {
				console.log('Successfully Logged In');
				window.location.href = 'ride.html';
			},
			function signinError(err) {
				alert(err);
			}
		);
	}

	function handleRegister(event) {
		event.preventDefault();
		const email = document.getElementById('emailInputRegister').value;
		const password = document.getElementById('passwordInputRegister').value;
		const password2 = document.getElementById('password2InputRegister').value;

		const onSuccess = function registerSuccess(result) {
			const cognitoUser = result.user;
			console.log('user name is ' + cognitoUser.getUsername());
			const confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
			if (confirmation) {
				window.location.href = 'verify.html';
			}
		};
		const onFailure = function registerFailure(err) {
			alert(err);
		};

		if (password === password2) {
			register(email, password, onSuccess, onFailure);
		} else {
			alert('Passwords do not match');
		}
	}

	function handleVerify(event) {
		const email = document.getElementById('emailInputVerify').value;
		const code = document.getElementById('codeInputVerify').value;
		event.preventDefault();
		verify(email, code,
			function verifySuccess(result) {
				console.log('call result: ' + result);
				console.log('Successfully verified');
				alert('Verification successful. You will now be redirected to the login page.');
				window.location.href = signinUrl;
			},
			function verifyError(err) {
				alert(err);
			}
		);
	}
}());
