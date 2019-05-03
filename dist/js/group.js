'use strict';

var group = function group() {
  var spinner = document.querySelector('.spinner');
  var token = window.localStorage.getItem('x-access-token');
  var url = 'https://epic-mail04.herokuapp.com/api/v1/groups';
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    // console.log(result);
    if (result.status === 200) {
      spinner.style.display = 'none';
      var tabl = '';
      var arrayOfgroups = result.data.details;
      // console.log(arrayOfgroups);

      arrayOfgroups.forEach(function (grp) {
        // console.log(grp);
        tabl += '\n          <li class="fgh"><div class="po fog" onclick="groupInform(' + grp.id + ')">' + grp.name + '</div><i class="fa fa-envelope-o top-env bg "onclick="addMsg(' + grp.id + ')"></i></li>\n          ';

        document.getElementById('table').innerHTML = tabl;
      });
    } else if (result.status === 404) {
      document.getElementById('table').style.fontSize = '12px';
      document.getElementById('table').innerHTML = result.error;
    } else if (result.status === 500) {
      document.getElementById('tbl').style.textAlign = 'center';
      document.getElementById('tbl').style.paddingTop = '5%';
      document.getElementById('table').innerHTML = result.error;
    }
  });
};
window.onload = group();
var groupInform = function groupInform(val) {
  var newId = val;
  var newMod = document.getElementById('mmop');
  var clo = document.getElementsByClassName('closev')[0];
  newMod.style.display = 'block';
  var output = '';
  output += '\n    <i class="fa fa-trash-o del dele" onclick="deleteGroup()"></i>\n    <span class="successdel">group deleted succesfully</span>\n    <h2 class="po" id="cl">Update Group</h2>\n    <input class="grpp" id = "grpp" type="text" placeholder="New Group Name" name="grpp" required><br>\n    <div id="feedbackn" class="ygg"></div>\n    <button class="create cree2 yh gp" id="newgrpp"><span class="grpTextt">Edit</span><span class="spinner"></span></button><br>\n    <button onClick="grpMembers()"class="create cree2" id="newGrps"><span class="memText">Group Members</span><span class="spinner"></span></button>';
  document.querySelector('.newoutput').innerHTML = output;
  var groupEdit = document.querySelector('.grpp');
  groupEdit.setAttribute('groupid', val);
  clo.onclick = function () {
    newMod.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == newMod) {
      newMod.style.display = 'none';
    }
  };
};

var upd = document.getElementById('box29');
var updateGrp = function updateGrp(e) {
  e.preventDefault();
  console.log('l');
  var token = window.localStorage.getItem('x-access-token');
  var groupEdit = document.querySelector('.grpp');
  var name = groupEdit.value;
  var id = groupEdit.getAttribute('groupid');
  var url = 'https://epic-mail04.herokuapp.com/api/v1/groups/' + id + '/name';
  var data = {
    name: name
  };
  console.log(name);
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.status === 200) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('#newgrpp').style.backgroundColor = 'green';
      document.querySelector('#newgrpp').style.borderColor = 'green';
      document.querySelector('.grpTextt').innerHTML = 'Group name updated';
      upd.reset();
      setTimeout(function () {
        document.getElementById('mmop').style.display = 'none';
        group();
      }, 2000);
    } else if (result.status === 409) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('#feedbackn').innerHTML = result.error;
    } else if (result.status === 404) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('#feedbackn').innerHTML = result.error;
    } else if (result.status === 500) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('#feedbackn').innerHTML = result.error;
    } else {
      // Show spinner and Loading
      document.querySelector('.spinner').style.display = 'block';
      document.querySelector('.signinText').innerHTML = 'Loading';
    }
  });
};
upd.addEventListener('submit', updateGrp);
var deleteGroup = function deleteGroup() {
  var token = window.localStorage.getItem('x-access-token');
  var groupEdit = document.querySelector('.grpp');
  var id = groupEdit.getAttribute('groupid');
  fetch('https://epic-mail04.herokuapp.com/api/v1/groups/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.status === 200) {
      document.querySelector('.successdel').style.display = 'block';
      document.querySelector('.successdel').innerHTML = 'Group deleted successfully.';
      upd.reset();
      setTimeout(function () {
        document.getElementById('mmop').style.display = 'none';
        group();
      }, 2000);
    } else if (result.status === 404) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('#feedbackn').innerHTML = result.error;
    } else if (result.status === 500) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('#feedbackn').innerHTML = result.error;
    }
  });
};
var grpMembers = function grpMembers() {
  document.querySelector('.spinner').style.display = 'block';
  document.querySelector('.memText').innerHTML = 'Loading';
  var token = window.localStorage.getItem('x-access-token');
  var groupEdit = document.querySelector('.grpp');
  var id = groupEdit.getAttribute('groupid');
  var output = '';
  fetch('https://epic-mail04.herokuapp.com/api/v1/groups/' + id + '/users', {
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
      var arrayOfmembers = result.data;
      output += '\n            <tr>\n              <th>Members</th>\n              <th>Delete User</th>\n              <th>Role</th>\n            </tr>\n            ';
      arrayOfmembers.forEach(function (member) {
        output += '\n                  <tr class="lop">\n                      <td class="align">' + member.email + '</td> \n                      <td class="align" onclick="deleteUser(' + member.userid + ')"><i class="fa fa-trash-o del rep"></i></td>\n                      <td class="align">' + member.role + '</td> \n                      </tr> \n          ';
      });
    } else if (result.status === 500) {
      output += '\n        ' + result.error + '\n        ';
    }
    document.querySelector('#members').innerHTML = output;
  });
};
var grpu = document.getElementById('box10');
var newGrpUser = function newGrpUser(e) {
  e.preventDefault();
  document.querySelector('.spinn').style.display = 'block';
  document.querySelector('.membTextt').innerHTML = 'Loading';
  var token = window.localStorage.getItem('x-access-token');
  var groupEdit = document.querySelector('.grpp');
  var id = groupEdit.getAttribute('groupid');
  var email = document.querySelector('#usergrpp').value;
  var data = {
    email: email
  };
  fetch('https://epic-mail04.herokuapp.com/api/v1/groups/' + id + '/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    console.log(result);
    if (result.status === 200) {
      document.querySelector('.spinner').style.display = 'none';
      document.querySelector('.membTextt').innerHTML = 'User added successfully';
      document.querySelector('#newgrpuser').style.backgroundColor = 'green';
      document.querySelector('#newgrpuser').style.borderColor = 'green';
      grpu.reset();
      setTimeout(function () {
        document.querySelector('#newgrpuser').style.backgroundColor = '#0067FC';
        document.querySelector('#newgrpuser').style.borderColor = '#0067FC';
        document.querySelector('.membTextt').innerHTML = 'Add';
      }, 2000);
      setTimeout(function () {
        grpMembers();
        document.querySelector('.hidden').style.display = 'none';
        document.querySelector('#box28').style.display = 'block';
        // window.location.href = './user.html';
      }, 2000);
    } else if (result.status === 400) {
      document.querySelector('.spinn').style.display = 'none';
      document.querySelector('#feedbacknn').style.display = 'block';
      document.querySelector('#feedbacknn').innerHTML = result.error;
      document.querySelector('.membTextt').innerHTML = 'Add';
    } else if (result.status === 404) {
      document.querySelector('.spinn').style.display = 'none';
      document.querySelector('#feedbacknn').style.display = 'block';
      document.querySelector('#feedbacknn').innerHTML = result.error;
      document.querySelector('.membTextt').innerHTML = 'Add';
    } else if (result.status === 500) {
      document.querySelector('.spinn').style.display = 'none';
      document.querySelector('#feedbacknn').style.display = 'block';
      document.querySelector('#feedbacknn').innerHTML = result.error;
      document.querySelector('.membTextt').innerHTML = 'Add';
    }
  });
};
grpu.addEventListener('submit', newGrpUser);
var deleteUser = function deleteUser(userId) {
  var token = window.localStorage.getItem('x-access-token');
  var groupEdit = document.querySelector('.grpp');
  console.log(groupEdit);
  var id = groupEdit.getAttribute('groupid');
  var t = confirm('Are you sure you want to delete this user?');
  if (t === true) {
    fetch('https://epic-mail04.herokuapp.com/api/v1/groups/' + id + '/users/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(function (res) {
      return res.json();
    }).then(function (result) {
      if (result.status === 200) {
        document.querySelector('.del').display = 'none';
        console.log(result);
        grpMembers();
      } else if (result.status === 400) {
        document.querySelector('#feedbacknn').innerHTML = result.error;
      } else if (result.status === 500) {
        document.querySelector('#feedbacknn').innerHTML = result.error;
      }
    });
  } else {
    grpMembers();
  }
};
var boxMsg = document.getElementById('box90');
var addMsg = function addMsg(id) {
  var mainMsg = document.getElementById('booooo');
  console.log(mainMsg);
  var clo = document.getElementsByClassName('closevb')[0];
  mainMsg.style.display = 'block';
  var groupEdit = document.getElementById('messageb');
  groupEdit.setAttribute('groupid', id);
  clo.onclick = function () {
    mainMsg.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == mainMsg) {
      mainMsg.style.display = 'none';
    }
  };
  allMsg();
};
var grpMsgs = function grpMsgs(e) {
  e.preventDefault();
  document.querySelector('.spinnt').style.display = 'block';
  document.querySelector('.grpmsgText').innerHTML = 'Loading';
  var groupEdit = document.getElementById('messageb');
  var id = groupEdit.getAttribute('groupid');
  var token = window.localStorage.getItem('x-access-token');
  var subject = document.querySelector('#subjectt').value;
  var message = document.querySelector('#messageb').value;
  var data = {
    subject: subject,
    message: message
  };

  fetch('https://epic-mail04.herokuapp.com/api/v1/groups/' + id + '/messages', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    console.log(result);
    if (result.status === 201) {
      document.querySelector('.spinnt').style.display = 'none';
      document.querySelector('.grpmsgText').innerHTML = 'Message Sent';
      document.querySelector('#newGrpdMessage').style.backgroundColor = 'green';
      document.querySelector('#newGrpdMessage').style.borderColor = 'green';
      // boxMsg.reset();
      // setTimeout(() => {
      //   document.querySelector('.spinnt').style.display = 'none';
      //   document.querySelector('#newGrpdMessage').style.backgroundColor = '#0067FC';
      //   document.querySelector('#newGrpdMessage').style.borderColor = '#0067FC';
      //   document.querySelector('.grpmsgText').innerHTML = 'Send';
      //   window.location.reload();
      // }, 2000);
    } else if (result.status === 500) {
      document.querySelector('.spinnt').style.display = 'none';
      document.getElementById('feedback3b').style.display = 'block';
      document.getElementById('feedback3b').innerHTML = result.error;
      document.querySelector('.msgText').innerHTML = 'Send';
    }
  });
};
boxMsg.addEventListener('submit', grpMsgs);
var allMsg = function allMsg() {
  var groupEdit = document.getElementById('messageb');
  var id = groupEdit.getAttribute('groupid');
  var token = window.localStorage.getItem('x-access-token');
  var spinner = document.querySelector('.spinner');
  var url = 'https://epic-mail04.herokuapp.com/api/v1/groups/' + id + '/messages';
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    console.log(result.data);
    if (result.status === 200) {
      spinner.style.display = 'none';
      var tabl = '';
      var arrayOfgroups = result.data;
      console.log(arrayOfgroups);

      arrayOfgroups.forEach(function (msg) {
        console.log(msg);
        tabl += ' <tr> \n          <td class="recieve"> \n          <h2 class="subject">Subject: ' + msg.subject + '</h2>\n          <h5class="fghb">Date: ' + msg.createdon + '</h5>\n          <h2 class="reciever">' + msg.firstname + ' ' + msg.lastname + '</h2>\n            ' + msg.message + '\n          </td>\n          </tr> ';
        document.getElementById('nmsg').innerHTML = tabl;
      });
    } else if (result.status === 404) {
      document.getElementById('nmsg').innerHTML = result.error;
    } else if (result.status === 500) {
      document.getElementById('nmsg').innerHTML = result.error;
    }
  });
};