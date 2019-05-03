'use strict';

var signinForm = document.getElementById('bxx');
function login(event) {
  event.preventDefault();
  console.log('pppp======>');
  var feedback11 = document.querySelector('#feedback11');
  var feedback12 = document.querySelector('#feedback12');
  var feedback13 = document.querySelector('#feedback13');
  var password = document.querySelector('.pass3').value;
  var email = document.querySelector('.email3').value;
  var data = {
    email: email,
    password: password
  };
  var url = 'https://epic-mail04.herokuapp.com/api/v1/auth/login';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (response) {
    if (response.status === 200) {
      console.log(response.data[0].token);
      localStorage.setItem('x-access-token', response.data[0].token);
      window.location.href = './user.html';
      message();
    } else if (response.error === 'Authentication failed. User not found') {
      feedback11.style.display = 'block';
      feedback11.innerHTML = 'Authentication failed. User not found';
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.signinText').innerHTML = 'Login';
    } else if (response.error === 'Authentication failed. Wrong password') {
      // Password incorrect
      feedback12.style.display = 'block';
      feedback12.innerHTML = 'Authentication failed. Wrong password';
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.signinText').innerHTML = 'Login';
    } else if (response.status === 500) {
      // Internal server error
      feedback13.style.display = 'block';
      feedback13.innerHTML = 'An error occured while trying to sign you in, please try again.';
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.signinText').innerHTML = 'Login';
    } else {
      // Show spinner and Loading
      document.querySelector('.spinner').style.display = 'block';
      document.querySelector('.signinText').innerHTML = 'Loading';
    }
  }).catch(function (error) {
    return console.log(error);
  });
}
signinForm.addEventListener('submit', login);
var validate = function validate() {
  console.log('pye');
  var feedback11 = document.querySelector('#feedback11');
  var feedback12 = document.querySelector('#feedback12');
  var userPassword = document.querySelector('.pass3').value;
  var userEmail = document.querySelector('.email3').value;
  if (userEmail === '') {
    // User fields empty
    feedback11.innerHTML = 'Email field is empty';
    feedback11.style.display = 'block';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
    feedback11.innerHTML = 'Not a valid email address';
    feedback11.style.display = 'block';
  }if (userPassword === '') {
    // User fields empty
    feedback12.innerHTML = 'Password field is empty';
    feedback12.style.display = 'block';
  } else if (userPassword.length <= 5) {
    // User fields empty
    feedback12.innerHTML = 'Password must contain a min of 5 characters';
    feedback12.style.display = 'block';
  } else {
    // Show spinner and Loading
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.signinText').innerHTML = 'Loading';
  }
};
function clearFeedback(val) {
  document.querySelector(val).style.display = 'none';
}
