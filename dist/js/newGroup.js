'use strict';

var grp = document.getElementById('box12');
var newGroup = function newGroup(event) {
  document.querySelector('.spinner').style.display = 'block';
  document.querySelector('.grpText').innerHTML = 'Loading';
  var modalll = document.querySelector('.boooo');
  event.preventDefault();
  console.log('msg======>');
  var name = document.querySelector('.name').value;
  var feedback = document.querySelector('#feedback');
  var token = window.localStorage.getItem('x-access-token');
  var url = 'https://epic-mail04.herokuapp.com/api/v1/groups';
  var data = {
    name: name
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
      document.querySelector('.cree2').style.backgroundColor = 'green';
      document.querySelector('.cree2').style.borderColor = 'green';
      document.querySelector('.grpText').innerHTML = 'Group Creaated';
      grp.reset();
      setTimeout(function () {
        document.querySelector('.cree2').style.backgroundColor = '#0067FC';
        document.querySelector('.cree2').style.borderColor = '#0067FC';
        document.querySelector('.grpText').innerHTML = 'Create';
      }, 2000);
      setTimeout(function () {
        modalll.style.display = 'none';
        window.location.href = './user.html';
      }, 2000);
    } else if (result.error === 409) {
      feedback.style.display = 'block';
      feedback.innerHTML = 'Sorry, you have an existing group named ' + result.data[0].details.name;
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.grpText').innerHTML = 'Create';
    } else if (result.status === 500) {
      feedback.style.display = 'block';
      feedback.innerHTML = 'Internal server error.';
    }
  });
};
grp.addEventListener('submit', newGroup);

var validating = function validating() {
  console.log('new======>');
  var feedback = document.querySelector('#feedback');
  var fname = document.querySelector('.name').value;
  if (fname === '') {
    // User fields empty
    feedback.innerHTML = 'name field is empty';
    feedback.style.display = 'block';
  }
};