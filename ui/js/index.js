
const logoutUser = document.querySelector('.logout');
const logout = () => {
  localStorage.removeItem('x-auth-token');
  window.location = 'index.html';
};

logoutUser.addEventListener('click', logout);
