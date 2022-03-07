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
    if (result && result.body) {
      const data = JSON.parse(result.body);
      if (data && data.Items) {
        setUsers(data.Items);
      }
    }
  } catch (error) {
    console.log(error)
  }
})()

function setUsers(data) {
  const container = document.getElementById('usersContainer');
  container.insertAdjacentHTML('afterbegin', data.map(mapData).filter(Boolean).join(''));
  const btns = document.querySelectorAll('#deleteBtn');
  btns.forEach(btn => {
    const id = btn.dataset.id;
    btn.onclick = () => {
      if (id) {
        const res = confirm('Delete ' + data.find(i => i.UserId === id)?.fullName || '')
        if (res) deleteUser(id);
      }
    }
  })
}

function mapData(item, idx) {
  if (item) {
    return `<tr>
    <td>${idx + 1}</td>
    <td>${item?.fullName || '-'}<t/d>
    <td>${item?.email || '-'}</td>
    <td>${item?.phone || '-'}</td>
    <td>${item?.age || '-'}</td>
    <td id="deleteBtn" data-id="${item.UserId}"><button>delete</button></td>
    </tr>`;
  }
}

function deleteUser(id) {
  console.log(id)
}