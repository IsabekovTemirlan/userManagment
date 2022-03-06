(async function () {
  const myHeaders = new Headers({
    'Authorization': 'Token ' + localStorage.getItem('CognitoIdentityServiceProvider.2ld7vl8f5uknh7n37ac5ohve6j.temirlan.i-at-mvpngn.com.accessToken'),
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  try {
    const response = await fetch('https://main.d3o1uetdft0902.amplifyapp.com/users', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error)
  }


})()