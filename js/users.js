(async function () {
  try {
    const token = await AppContext.authToken
    const url = _config.api.invokeUrl + '/users';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
      cache: 'no-cache'
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
  container.insertAdjacentHTML('afterbegin', data.sort(compareDates).map(mapData).filter(Boolean).join(''));
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
    <td>${item?.created ? new Date(item.created).toLocaleDateString() : '-'}</td>
    <td id="deleteBtn" data-id="${item.UserId}"><button>delete</button></td>
    </tr>`;
  }
}

async function deleteUser(id) {
  try {
    const token = await AppContext.authToken
    const url = _config.api.invokeUrl + '/users';

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      },
      body: JSON.stringify({id})
    });
    if (response) {
      console.log(response);
      const data = await response.json();
      if (data) {
        location.reload();
      }
    }
  } catch (error) {
    console.error(error)
  }
}

function compareDates(a, b) {
  if (a.created && b.created) return new Date(b.created) - new Date(a.created);
  else return 0
}