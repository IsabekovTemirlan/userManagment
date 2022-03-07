(async function () {
  try {
    const token = await AppContext.authToken
    // if (!token) window.location.href = '/signin.html';

    const myHeaders = new Headers({
      'Authorization': token
    });

    const response = await fetch(_config.api.invokeUrl + '/users', {
      method: 'GET',
      headers: myHeaders,
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    });
    console.log(response);
    const result = await response.json();
    console.log(result);

  } catch (error) {
    console.log(error)
    // window.location.href = '/signin.html';
  }
})()