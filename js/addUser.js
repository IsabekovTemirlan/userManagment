const form = document.getElementById('addUserForm');
form.onsubmit = async (e) => {
  e.preventDefault();

  const fullName = form['0'].value;
  const email = form['1'].value;
  const phone = form['2'].value;
  const age = form['3'].value;
  
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