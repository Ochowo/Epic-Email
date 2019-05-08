const signinForm = document.getElementById('bxx');
function login(event) {
  event.preventDefault();
  console.log('pppp======>');
  const feedback11 = document.querySelector('#feedback11');
  const feedback12 = document.querySelector('#feedback12');
  const feedback13 = document.querySelector('#feedback13');
  const password = document.querySelector('.pass3').value;
  const email = document.querySelector('.email3').value;
  const data = {
    email,
    password,
  };
  const url = 'https://epic-mail04.herokuapp.com/api/v1/auth/login';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
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
    })
    .catch(error => console.log(error));
}
signinForm.addEventListener('submit', login);
const validate = () => {
  console.log('pye');
  const feedback11 = document.querySelector('#feedback11');
  const feedback12 = document.querySelector('#feedback12');
  const userPassword = document.querySelector('.pass3').value;
  const userEmail = document.querySelector('.email3').value;
  if (userEmail === '') {
    // User fields empty
    feedback11.innerHTML = 'Email field is empty';
    feedback11.style.display = 'block';
  } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail))) {
    feedback11.innerHTML = 'Not a valid email address';
    feedback11.style.display = 'block';
  } if (userPassword === '') {
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
// eslint-disable-next-line no-unused-vars
function clearFeedback(val) {
  document.querySelector(val).style.display = 'none';
}

const send = document.getElementById('pass-form');
const resetPassword = (event) => {
  event.preventDefault();
  console.log('msg======>l');
  const email = document.querySelector('#emai').value;
  const feedbacke = document.querySelector('#feedbacke');
  const feedbackspe = document.querySelector('#feedbackspe');

  const emai = document.querySelector('#emai');
  const data = {
    email,
  };
  const url = 'http://127.0.0.1:8000/api/v1/auth/reset';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        document.querySelector('#pion').style.display = 'none';
        localStorage.setItem('x-access-token', resp.data.token);
        emai.style.display = 'none';
        feedbackspe.innerHTML = 'Check your email for the reset password link';
        feedbackspe.style.lineHeight = '4px';
        feedbackspe.style.fontSize = '16px';
        document.querySelector('.boxx-tex').style.backgroundColor = 'green';
        document.querySelector('.resetText').innerHTML = 'Message Sent';
        send.reset();
      } else if (resp.status === 400) {
        feedbacke.style.display = 'block';
        feedbacke.innerHTML = resp.error.email;
        document.querySelector('#pion').style.display = 'none';
      } else if (resp.status === 404) {
        feedbacke.style.display = 'block';
        feedbacke.innerHTML = resp.error;
        document.querySelector('#pion').style.display = 'none';
      } else if (resp.status === 500) {
        feedbacke.style.display = 'block';
        feedbacke.innerHTML = resp.error;
        document.querySelector('#pion').style.display = 'none';
      }
    });
};
send.addEventListener('submit', resetPassword);
