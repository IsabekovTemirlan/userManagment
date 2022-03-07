const form = document.getElementById('addUserForm');
form.onsubmit = async (e) => {
  e.preventDefault();

  const fullName = form.getElementById('userName').value;
  const email = form.getElementById('userEmail').value;
  const phone = form.getElementById('userPhone').value;
  const age = form.getElementById('userAge').value;
  const token = await AppContext.authToken

  const response = await fetch(_config.api.invokeUrl + '/users', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Authorization': token,
    },
    credentials: 'same-origin', 
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      fullName, email, phone, age
    })
  });

  if (response) {
    const result = await response.json();
    console.log(result);
  }

}