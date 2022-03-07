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
    const result = await response.json();
    if (result && result.data) {
      const data = JSON.parse(result.data);
      if (data.length) {
        setUsers(data)
      }
    }
  } catch (error) {
    console.log(error)
  }
})()

function setUsers(data) {
  const container = document.getElementById('usersContainer');
  container.insertAdjacentHTML('afterbegin', container.map(mapData).filter(Boolean).join(''));
}

function mapData(item) {
  if (item) {
    return `<li>${item.fullName}</li>`;
  }
}