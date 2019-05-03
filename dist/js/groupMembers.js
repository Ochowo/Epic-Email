'use strict';

var grppMembers = function grppMembers() {
  var token = window.localStorage.getItem('x-access-token');
  var groupEdit = document.querySelector('.grpp');
  console.log(groupEdit);
  var id = groupEdit.getAttribute('groupid');
  var output = '';
  fetch('https://epic-mail04.herokuapp.com/v1/groups/' + id + '/users', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    document.querySelector('#box29').style.display = 'none';
    document.querySelector('#box28').style.display = 'block';
    if (result.status === 200) {
      console.log(result);
      output += '\n          <tr>\n                    <th>Users</th>\n                    <th><Delete User/th>\n                  </tr>\n                  <tr>\n                      <td>' + result.data[0].email + '</td> \n                      <td><i class="fa fa-trash-o del rep"><span class="tooltiptext">remove</span></i></td>\n                  </tr> \n          ';
    }
    document.querySelector('#members').innerHTML = output;
  });
};