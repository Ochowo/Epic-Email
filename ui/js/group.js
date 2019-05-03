
const group = () => {
  const spinner = document.querySelector('.spinner');
  const token = window.localStorage.getItem('x-access-token');
  const url = 'https://epic-mail04.herokuapp.com/api/v1/groups';
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      // console.log(result);
      if (result.status === 200) {
        spinner.style.display = 'none';
        let tabl = '';
        const arrayOfgroups = result.data.details;
        // console.log(arrayOfgroups);

        arrayOfgroups.forEach((grp) => {
          // console.log(grp);
          tabl += `
          <li class="fgh"><div class="po fog" onclick="groupInform(${grp.id})">${grp.name}</div><i class="fa fa-envelope-o top-env bg "onclick="addMsg(${grp.id})"></i></li>
          `;

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
const groupInform = (val) => {
  const newId = val;
  const newMod = document.getElementById('mmop');
  const clo = document.getElementsByClassName('closev')[0];
  newMod.style.display = 'block';
  let output = '';
  output += `
    <i class="fa fa-trash-o del dele" onclick="deleteGroup()"></i>
    <span class="successdel">group deleted succesfully</span>
    <h2 class="po" id="cl">Update Group</h2>
    <input class="grpp" id = "grpp" type="text" placeholder="New Group Name" name="grpp" required><br>
    <div id="feedbackn" class="ygg"></div>
    <button class="create cree2 yh gp" id="newgrpp"><span class="grpTextt">Edit</span><span class="spinner"></span></button><br>
    <button onClick="grpMembers()"class="create cree2" id="newGrps"><span class="memText">Group Members</span><span class="spinner"></span></button>`;
  document.querySelector('.newoutput').innerHTML = output;
  const groupEdit = document.querySelector('.grpp');
  groupEdit.setAttribute('groupid', val);
  clo.onclick = () => {
    newMod.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target == newMod) {
      newMod.style.display = 'none';
    }
  };
};


const upd = document.getElementById('box29');
const updateGrp = (e) => {
  e.preventDefault();
  console.log('l');
  const token = window.localStorage.getItem('x-access-token');
  const groupEdit = document.querySelector('.grpp');
  const name = groupEdit.value;
  const id = groupEdit.getAttribute('groupid');
  const url = `https://epic-mail04.herokuapp.com/api/v1/groups/${id}/name`;
  const data = {
    name,
  };
  console.log(name);
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('#newgrpp').style.backgroundColor = 'green';
        document.querySelector('#newgrpp').style.borderColor = 'green';
        document.querySelector('.grpTextt').innerHTML = 'Group name updated';
        upd.reset();
        setTimeout(() => {
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
const deleteGroup = () => {
  const token = window.localStorage.getItem('x-access-token');
  const groupEdit = document.querySelector('.grpp');
  const id = groupEdit.getAttribute('groupid');
  fetch(`https://epic-mail04.herokuapp.com/api/v1/groups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        document.querySelector('.successdel').style.display = 'block';
        document.querySelector('.successdel').innerHTML = 'Group deleted successfully.';
        upd.reset();
        setTimeout(() => {
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
const grpMembers = () => {
  document.querySelector('.spinner').style.display = 'block';
  document.querySelector('.memText').innerHTML = 'Loading';
  const token = window.localStorage.getItem('x-access-token');
  const groupEdit = document.querySelector('.grpp');
  const id = groupEdit.getAttribute('groupid');
  let output = '';
  fetch(`https://epic-mail04.herokuapp.com/api/v1/groups/${id}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      document.querySelector('#box29').style.display = 'none';
      document.querySelector('#box28').style.display = 'block';
      if (result.status === 200) {
        const arrayOfmembers = result.data;
        output += `
            <tr>
              <th>Members</th>
              <th>Delete User</th>
              <th>Role</th>
            </tr>
            `;
        arrayOfmembers.forEach((member) => {
          output += `
                  <tr class="lop">
                      <td class="align">${member.email}</td> 
                      <td class="align" onclick="deleteUser(${member.userid})"><i class="fa fa-trash-o del rep"></i></td>
                      <td class="align">${member.role}</td> 
                      </tr> 
          `;
        });
      } else if (result.status === 500) {
        output += `
        ${result.error}
        `;
      }
      document.querySelector('#members').innerHTML = output;
    });
};
const grpu = document.getElementById('box10');
const newGrpUser = (e) => {
  e.preventDefault();
  document.querySelector('.spinn').style.display = 'block';
  document.querySelector('.membTextt').innerHTML = 'Loading';
  const token = window.localStorage.getItem('x-access-token');
  const groupEdit = document.querySelector('.grpp');
  const id = groupEdit.getAttribute('groupid');
  const email = document.querySelector('#usergrpp').value;
  const data = {
    email,
  };
  fetch(`https://epic-mail04.herokuapp.com/api/v1/groups/${id}/users`, {
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
      if (result.status === 200) {
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.membTextt').innerHTML = 'User added successfully';
        document.querySelector('#newgrpuser').style.backgroundColor = 'green';
        document.querySelector('#newgrpuser').style.borderColor = 'green';
        grpu.reset();
        setTimeout(() => {
          document.querySelector('#newgrpuser').style.backgroundColor = '#0067FC';
          document.querySelector('#newgrpuser').style.borderColor = '#0067FC';
          document.querySelector('.membTextt').innerHTML = 'Add';
        }, 2000);
        setTimeout(() => {
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
const deleteUser = (userId) => {
  const token = window.localStorage.getItem('x-access-token');
  const groupEdit = document.querySelector('.grpp');
  console.log(groupEdit);
  const id = groupEdit.getAttribute('groupid');
  const t = confirm('Are you sure you want to delete this user?');
  if (t === true) {
    fetch(`https://epic-mail04.herokuapp.com/api/v1/groups/${id}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then(res => res.json())
      .then((result) => {
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
const boxMsg = document.getElementById('box90');
const addMsg = (id) => {
  const mainMsg = document.getElementById('booooo');
  console.log(mainMsg);
  const clo = document.getElementsByClassName('closevb')[0];
  mainMsg.style.display = 'block';
  const groupEdit = document.getElementById('messageb');
  groupEdit.setAttribute('groupid', id);
  clo.onclick = () => {
    mainMsg.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target == mainMsg) {
      mainMsg.style.display = 'none';
    }
  };
  allMsg();
};
const grpMsgs = (e) => {
  e.preventDefault();
  document.querySelector('.spinnt').style.display = 'block';
  document.querySelector('.grpmsgText').innerHTML = 'Loading';
  const groupEdit = document.getElementById('messageb');
  const id = groupEdit.getAttribute('groupid');
  const token = window.localStorage.getItem('x-access-token');
  const subject = document.querySelector('#subjectt').value;
  const message = document.querySelector('#messageb').value;
  const data = {
    subject,
    message,
  };

  fetch(`https://epic-mail04.herokuapp.com/api/v1/groups/${id}/messages`, {
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
const allMsg = () => {
  const groupEdit = document.getElementById('messageb');
  const id = groupEdit.getAttribute('groupid');
  const token = window.localStorage.getItem('x-access-token');
  const spinner = document.querySelector('.spinner');
  const url = `https://epic-mail04.herokuapp.com/api/v1/groups/${id}/messages`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result.data);
      if (result.status === 200) {
        spinner.style.display = 'none';
        let tabl = '';
        const arrayOfgroups = result.data;
        console.log(arrayOfgroups);

        arrayOfgroups.forEach((msg) => {
          console.log(msg);
          tabl += ` <tr> 
          <td class="recieve"> 
          <h2 class="subject">Subject: ${msg.subject}</h2>
          <h5class="fghb">Date: ${msg.createdon}</h5>
          <h2 class="reciever">${msg.firstname} ${msg.lastname}</h2>
            ${msg.message}
          </td>
          </tr> `;
          document.getElementById('nmsg').innerHTML = tabl;
        });
      } else if (result.status === 404) {
        document.getElementById('nmsg').innerHTML = result.error;
      } else if (result.status === 500) {
        document.getElementById('nmsg').innerHTML = result.error;
      }
    });
};
