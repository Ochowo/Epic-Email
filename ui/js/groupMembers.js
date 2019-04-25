const grppMembers = () => {
  const token = window.localStorage.getItem('x-access-token');
  const groupEdit = document.querySelector('.grpp');
  console.log(groupEdit);
  const id = groupEdit.getAttribute('groupid');
  let output = '';
  fetch(`http://127.0.0.1:8000/api/v1/groups/${id}/users`, {
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
        console.log(result);
        output += `
          <tr>
                    <th>Users</th>
                    <th><Delete User/th>
                  </tr>
                  <tr>
                      <td>${result.data[0].email}</td> 
                      <td><i class="fa fa-trash-o del rep"><span class="tooltiptext">remove</span></i></td>
                  </tr> 
          `;
      }
      document.querySelector('#members').innerHTML = output;
    });
};
