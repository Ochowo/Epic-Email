const send = document.getElementById('box25');
const newMessage = (event) => {
  event.preventDefault();
  console.log('msg======>');
  const receiverEmail = document.querySelector('#receiver').value;
  const subject = document.querySelector('#subject').value;
  const message = document.querySelector('#message').value;
  const token = window.localStorage.getItem('x-access-token');
  const feedback1 = document.querySelector('#feedback1');
  const feedback3 = document.querySelector('#feedback3');
  const url = 'http://127.0.0.1:8000/api/v1/messages';
  const data = {
    receiverEmail,
    subject,
    message,
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
      console.log(result);
      if (result.status === 201) {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.msgText').innerHTML = 'Message Sent';
        document.querySelector('.cree2').style.backgroundColor = 'green';
        document.querySelector('.cree2').style.borderColor = 'green';
        send.reset();
        setTimeout(() => {
          document.querySelector('.cree2').style.backgroundColor = '#0067FC';
          document.querySelector('.cree2').style.borderColor = '#0067FC';
          document.querySelector('.msgText').innerHTML = 'Send';
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

const validator = () => {
  console.log('new======>');
  const feedback = document.querySelector('#feedback');
  const feedback1 = document.querySelector('#feedback1');
  const feedback2 = document.querySelector('#feedback2');
  const newEmail = document.querySelector('#receiver').value;
  const sub = document.querySelector('#subject').value;
  const messa = document.querySelector('#message').value;
  if (newEmail === '') {
    // User fields empty
    feedback.innerHTML = 'receiver email field is empty';
    feedback.style.display = 'block';
  } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmail))) {
    feedback.innerHTML = 'You have entered an invalid email';
    feedback.style.display = 'block';
  } if (sub === '') {
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
