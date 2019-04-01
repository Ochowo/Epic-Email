const url = 'https://epic-mail04.herokuapp.com/api/v1/auth/signup';
const signupForm = document.getElementById('signn-form');

const signupUser = (e) => {
  console.log('hyyy');
  const feedback4 = document.getElementById('#feedback4');
  const feedback2 = document.getElementById('#feedback4');
  const signupEmail = document.querySelector('.email2').value;
  e.preventDefault();
  const data = {
    name: signupForm.name.value,
    lname: signupForm.lname.value,
    email: signupForm.email.value,
    password: signupForm.password.value,
    cpassword: signupForm.cpassword.value,

  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 201) {
        const {
          message,
          token,
        } = result.data;
        const {
          id,
          firstname,
          lastname,
          email,
          password,
          confirmpassword,
        } = result.data.userDetails;
        window.localStorage.setItem('message', message);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('id', id);
        window.localStorage.setItem('name', firstname);
        window.localStorage.setItem('name', lastname);
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('password', password);
        window.localStorage.setItem('password', confirmpassword);
        window.location.href = './user.html';
      } else if (result.data.message === 'An error occured while trying to sign you up, please try again.') {
        // Internal server error
        feedback4.style.display = 'block';
        feedback4.innerHTML = 'An error occured while trying to sign you up, please try again.';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signupText').innerHTML = 'Sign Up';
      } else if (result.data.message === `email => ${signupEmail} already in use, please choose another.`) {
        feedback2.style.display = 'block';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signupText').innerHTML = 'Sign Up';
      }
    });
};
const redirect = () => {
  const feedback4 = document.querySelector('#feedback4');
  const feedback2 = document.querySelector('#feedback2');
  const feedback5 = document.querySelector('#feedback5');
  const feedback1 = document.querySelector('#feedback1');
  const feedback3 = document.querySelector('#feedback3');
  const userPassword = document.querySelector('.pass2').value;
  const usercPassword = document.querySelector('.cpass2').value;
  const userEmail = document.querySelector('.email2').value;
  const userName = document.querySelector('.name').value;
  const userlName = document.querySelector('.lname').value;
  const reg = /^[a-zA-Z]+$/;
  // userEmail not an email address
  if (userName === '') {
    // User fields empty
    feedback3.innerHTML = 'First name field is empty';
    feedback3.style.display = 'block';
  } else if (userName.length < 2) {
    // User fields empty
    feedback3.innerHTML = 'First name must contain a minimum of 2 characters';
    feedback3.style.display = 'block';
  } else if (!reg.test(userName)) {
    // User fields empty
    feedback3.innerHTML = 'Invalid input for firstname';
    feedback3.style.display = 'block';
  } else if (userlName === '') {
    // User fields empty
    feedback1.innerHTML = 'Last name field is empty';
    feedback1.style.display = 'block';
  } else if (userlName.length < 2) {
    // User fields empty
    feedback1.innerHTML = 'Last name must contain a minimum of 2 characters';
    feedback1.style.display = 'block';
  } else if (!reg.test(userlName)) {
    // User fields empty
    feedback1.innerHTML = 'Invalid input for last name';
    feedback1.style.display = 'block';
  } else if (userEmail === '') {
    // User fields empty
    feedback2.innerHTML = 'Email field is empty';
    feedback2.style.display = 'block';
  } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail))) {
    feedback2.innerHTML = 'Not a valid email address';
    feedback2.style.display = 'block';
  } else if (userPassword === '') {
    // User fields empty
    feedback4.innerHTML = 'Password field is empty';
    feedback4.style.display = 'block';
  } else if (userPassword.length <= 5) {
    // User fields empty
    feedback4.innerHTML = 'Password must contain a min of 5 characters';
    feedback4.style.display = 'block';
  } else if (usercPassword === '') {
    // User fields empty
    feedback5.innerHTML = 'Please confirm password';
    feedback5.style.display = 'block';
  } else if (userPassword !== usercPassword) {
    // User fields empty
    feedback5.innerHTML = 'passwords do not match';
    feedback5.style.display = 'block';
  } else {
    // Call login function
    signupUser();
    // Show spinner and Loading
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.signupText').innerHTML = 'Loading';
  }
};
signupForm.addEventListener('click', signupUser);
// Clear feedback given to the user
function clearFeedback(val) {
  console.log('heyyyy')
}
