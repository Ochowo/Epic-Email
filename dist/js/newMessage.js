'use strict';

var send = document.getElementById('box25');
var newMessage = function newMessage(event) {
  event.preventDefault();
  console.log('msg======>');
  var receiverEmail = document.querySelector('#receiver').value;
  var subject = document.querySelector('#subject').value;
  var message = document.querySelector('#message').value;
  var token = window.localStorage.getItem('x-access-token');
  var feedback1 = document.querySelector('#feedback1');
  var feedback3 = document.querySelector('#feedback3');
  var url = 'https://epic-mail04.herokuapp.com/api/v1/messages';
  var data = {
    receiverEmail: receiverEmail,
    subject: subject,
    message: message
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
    if (result.status === 201) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.msgText').innerHTML = 'Message Sent';
      document.querySelector('.cree2').style.backgroundColor = 'green';
      document.querySelector('.cree2').style.borderColor = 'green';
      send.reset();
      setTimeout(function () {
        document.querySelector('.cree2').style.backgroundColor = '#0067FC';
        document.querySelector('.cree2').style.borderColor = '#0067FC';
        document.querySelector('.msgText').innerHTML = 'Send';
      }, 2000);
      setTimeout(function () {
        send.style.display = 'none';
        document.location.reload(true);
      }, 2000);
    } else if (result.error === 'Sorry, the receiver email does not exist in the database') {
      feedback1.style.display = 'block';
      feedback1.innerHTML = 'Sorry, the receiver email does not exist in the database';
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.msgText').innerHTML = 'Send';
    } else if (result.status === 500) {
      feedback3.style.display = 'block';
      feedback3.innerHTML = 'Internal server error.';
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.msgText').innerHTML = 'Send';
    }
  });
};
send.addEventListener('submit', newMessage);

var validator = function validator() {
  console.log('new======>');
  var feedback = document.querySelector('#feedback');
  var feedback1 = document.querySelector('#feedback1');
  var feedback2 = document.querySelector('#feedback2');
  var newEmail = document.querySelector('#receiver').value;
  var sub = document.querySelector('#subject').value;
  var messa = document.querySelector('#message').value;
  if (newEmail === '') {
    // User fields empty
    feedback.innerHTML = 'receiver email field is empty';
    feedback.style.display = 'block';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmail)) {
    feedback.innerHTML = 'You have entered an invalid email';
    feedback.style.display = 'block';
  }if (sub === '') {
    // User fields empty
    feedback1.innerHTML = 'subject field is empty';
    feedback1.style.display = 'block';
  }
  if (messa === '') {
    // User fields empty
    feedback2.innerHTML = 'message field is empty';
    feedback2.style.display = 'block';
  } else {
    // Show spinner and Loading
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.msgText').innerHTML = 'Loading';
  }
};
function clearFeedback(val) {
  document.querySelector(val).style.display = 'none';
}