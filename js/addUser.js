const form = document.getElementById('addUserForm');
form.onsubmit = async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const phone = document.getElementById('userPhone').value;
  const age = document.getElementById('userAge').value;

  const token = await AppContext.authToken

  const response = await fetch(_config.api.invokeUrl + '/users', {
    method: 'POST',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      fullName, email, phone, age
    })
  });

  if (response) {
    const result = await response.json();
    const data = JSON.parse(result.body);
    if (data && data.text) alert(data.text);
    window.location.href = 'users.html';
  }

}