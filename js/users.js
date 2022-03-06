(async function() {
  const myHeaders = new Headers({
    'Authorization': 'Token ' + localStorage.getItem('CognitoIdentityServiceProvider.2ld7vl8f5uknh7n37ac5ohve6j.temirlan.i-at-mvpngn.com.accessToken'),
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  const response = await fetch({
    method: 'GET',
    headers: myHeaders,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  });
  const result = await response.json();
  console.log(result);
})()