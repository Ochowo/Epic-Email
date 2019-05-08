const send = document.getElementById('boxx');
const resetPassword = (event) => {
  event.preventDefault();
  console.log('msg======>');
  const password = document.querySelector('#pswrd').value;
  const confirmPassword = document.querySelector('#hghg').value;
  const token = window.localStorage.getItem('x-access-token');
  const url = `https://epic-mail04.herokuapp.com/api/v1/auth/${token}/reset-password`;
  const ffb = document.querySelector('#feedbackf').value;
  const data = {
    password,
    confirmPassword,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      console.log('msg======>');
      console.log(result);
      if (result.status === 200) {
        console.log(result.data.token);
        const modal = document.querySelector('.wrap');
        const modal2 = document.querySelector('.wrapper2');
        modal.style.display = 'none';
        modal2.style.display = 'block';
        setTimeout(() => {
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
