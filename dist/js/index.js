'use strict';

var logoutUser = document.querySelector('.logout');
var logout = function logout() {
  localStorage.removeItem('x-auth-token');
  window.location = 'index.html';
};

logoutUser.addEventListener('click', logout);