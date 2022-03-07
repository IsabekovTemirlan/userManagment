(async function () {
  try {
    const token = await AppContext.authToken

    const response = await fetch(_config.api.invokeUrl + '/users', {
      method: 'GET',
      headers: {
          'Authorization': token,
      },
      cache: 'no-cache',
    });
    console.log(response);
    const result = await response.json();
    console.log(result);

  } catch (error) {
    console.log(error)
    // window.location.href = '/signin.html';
  }
})()