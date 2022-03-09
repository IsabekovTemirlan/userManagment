const form = document.getElementById('addUserForm');
const fullName = document.getElementById('userName');
const email = document.getElementById('userEmail');
const phone = document.getElementById('userPhone');
const age = document.getElementById('userAge');
const submitBtn = document.getElementById('submitBtn');

const currUser = localStorage.getItem('selectedUser');

if (currUser) {
  const user = JSON.parse(currUser);
  fullName.value = user.fullName;
  email.value = user.email;
  phone.value = user.phone;
  age.value = user.age;
  submitBtn.textContent = 'Update';
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const token = await AppContext.authToken;

  const user = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    age: age.value
  };

  if (currUser) {
    const parsedData = JSON.parse(currUser);
    user.UserId = parsedData.UserId;
  }

  const response = await fetch(_config.api.invokeUrl + (currUser ? '/updateUser' : '/users'), {
    method: 'POST',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(user)
  });

  if (response) {
    const result = await response.json();
    const data = JSON.parse(result.body);
    if (data && data.text) alert(data.text);
    window.location.href = 'users.html';
  }

}