const grp = document.getElementById('box12');
const newGroup = (event) => {
  document.querySelector('.spinner').style.display = 'block';
  document.querySelector('.grpText').innerHTML = 'Loading';
  const modalll = document.querySelector('.boooo');
  event.preventDefault();
  console.log('msg======>');
  const name = document.querySelector('.name').value;
  const feedback = document.querySelector('#feedback');
  const token = window.localStorage.getItem('x-access-token');
  const url = 'http://127.0.0.1:8000/api/v1/groups';
  const data = {
    name,
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
      if (result.status === 201) {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.cree2').style.backgroundColor = 'green';
        document.querySelector('.cree2').style.borderColor = 'green';
        document.querySelector('.grpText').innerHTML = 'Group Creaated';
        grp.reset();
        setTimeout(() => {
          document.querySelector('.cree2').style.backgroundColor = '#0067FC';
          document.querySelector('.cree2').style.borderColor = '#0067FC';
          document.querySelector('.grpText').innerHTML = 'Create';
        }, 2000);
        setTimeout(() => {
          modalll.style.display = 'none';
          window.location.href = './user.html';
        }, 2000);
      } else if (result.error === 409) {
        feedback.style.display = 'block';
        feedback.innerHTML = `Sorry, you have an existing group named ${result.data[0].details.name}`;
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.grpText').innerHTML = 'Create';
      } else if (result.status === 500) {
        feedback.style.display = 'block';
        feedback.innerHTML = 'Internal server error.';
      }
    });
};
grp.addEventListener('submit', newGroup);

const validating = () => {
  console.log('new======>');
  const feedback = document.querySelector('#feedback');
  const fname = document.querySelector('.name').value;
  if (fname === '') {
    // User fields empty
    feedback.innerHTML = 'name field is empty';
    feedback.style.display = 'block';
  }
};
