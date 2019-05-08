'use strict';

var send = document.getElementById('boxx');
var resetPassword = function resetPassword(event) {
  event.preventDefault();
  console.log('msg======>');
  var password = document.querySelector('#pswrd').value;
  var confirmPassword = document.querySelector('#hghg').value;
  var token = window.localStorage.getItem('x-access-token');
  var url = 'https://epic-mail04.herokuapp.com/api/v1/auth/' + token + '/reset-password';
  var ffb = document.querySelector('#feedbackf').value;
  var data = {
    password: password,
    confirmPassword: confirmPassword
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    console.log('msg======>');
    console.log(result);
    if (result.status === 200) {
      console.log(result.data.token);
      var modal = document.querySelector('.wrap');
      var modal2 = document.querySelector('.wrapper2');
      modal.style.display = 'none';
      modal2.style.display = 'block';
      setTimeout(function () {
        window.location.href = './index.html';
      }, 2000);
    } else if (result.status === 404) {
      ffb.style.display = 'block';
      ffb.innerHTML = result.error;
      document.querySelector('spinnta').style.display = 'none';
    } else if (result.status === 400) {
      ffb.style.display = 'block';
      ffb.innerHTML = result.error.email;
      document.querySelector('spinnta').style.display = 'none';
    } else if (result.status === 500) {
      ffb.style.display = 'block';
      ffb.innerHTML = result.error;
      document.querySelector('spinnta').style.display = 'none';
    } else {
      // Show spinner and Loading
      document.querySelector('.spinnta').style.display = 'block';
      document.querySelector('.reText').innerHTML = 'Loading';
    }
  });
};
send.addEventListener('submit', resetPassword);