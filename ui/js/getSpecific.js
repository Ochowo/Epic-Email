/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const singleMsg = () => {
  const tbl = document.getElementById('tbl');
  const modal = document.getElementById('mmo');
  const span = document.getElementsByClassName('close')[0];
  if (tbl != null) {
    for (let i = 0; i < tbl.rows.length; i++) {
      for (let j = 0; j < tbl.rows[i].cells.length; j++) {
        tbl.rows[i].cells[j].onclick = () => {
          getval(this);
        };
      }
    }
  }

  function getval() {
    modal.style.display = 'block';
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = 'none';
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

const getSpecific = (val) => {
  const token = window.localStorage.getItem('x-access-token');
  fetch(`http://127.0.0.1:8000/api/v1/messages/${val}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        const name = result.data[0].message[0].sfirstname;
        const lastname = result.data[0].message[0].slastname;
        const newId = result.data[0].message[0].messageid;
        let table = '';
        table += `
        <tr>
          <td>
            <i class="fa fa-warning cau rep"><span class="tooltiptext">spam</span></i>
            <i class="fa fa-trash-o del rep delsb" onclick="deleteSpecific(${newId})"><span class="tooltiptext">delete</span></i>
            <i class="fa fa-mail-reply cau rep"><span class="tooltiptext">reply</span></i><br>
            <h2 class="sender">${name} ${lastname}</h2>
            <div class="msgb">${result.data[0].message[0].message}</div>
          </td>
        </tr>
        `;
        document.getElementById('tbll').innerHTML = table;
      } else if (result.status === 500) {
        document.getElementById('tbll').style.textAlign = 'center';
        document.getElementById('tbll').style.paddingTop = '5%';
        document.getElementById('tbll').innerHTML = 'An error occured while getting the message.';
      }
    });
};
const deleteSpecific = (id) => {
  const modal = document.getElementById('mmo');
  const token = window.localStorage.getItem('x-access-token');
  fetch(`http://127.0.0.1:8000/api/v1/messages/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        document.getElementById('tbll').style.margin = 'auto';
        document.getElementById('tbll').style.paddingTop = '5%';
        document.getElementById('tbll').innerHTML = 'Message deleted succesfully';
        setTimeout(() => {
          modal.style.display = 'none';
          message();
        }, 2000);
      } else if (result.status === 500) {
        document.getElementById('tbll').style.margin = 'auto';
        document.getElementById('tbll').style.paddingTop = '5%';
        document.getElementById('tbll').innerHTML = 'An error occured while getting the message.';
        setTimeout(() => {
          modal.style.display = 'none';
          message();
        }, 2000);
      }
    });
};
const getSpecificSent = (val) => {
  const token = window.localStorage.getItem('x-access-token');
  fetch(`http://127.0.0.1:8000/api/v1/messages/sent/${val}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        const name = result.data[0].message[0].rusername;
        const lastname = result.data[0].message[0].ruserlastname;
        const newId = result.data[0].message[0].messageid;
        let table = '';
        table += `
        <tr>
          <td>
            <i class="fa fa-warning cau rep"><span class="tooltiptext">spam</span></i>
            <i class="fa fa-trash-o del rep delsb" onclick="deleteSpecificSent(${newId})"><span class="tooltiptext">delete</span></i>
            <i class="fa fa-mail-reply cau rep"><span class="tooltiptext">reply</span></i><br>
            <h2 class="sender">${name} ${lastname}</h2>
            <div class="msgb">${result.data[0].message[0].message}</div>
          </td>
        </tr>
        `;
        document.getElementById('tbll').innerHTML = table;
      } else if (result.status === 500) {
        document.getElementById('tbll').style.textAlign = 'center';
        document.getElementById('tbl;').style.paddingTop = '5%';
        document.getElementById('tbll').innerHTML = 'An error occured while getting the message.';
      }
    });
};
const deleteSpecificSent = (id) => {
  const modal = document.getElementById('mmo');
  const token = window.localStorage.getItem('x-access-token');
  fetch(`http://127.0.0.1:8000/api/v1/messages/sent/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        document.getElementById('tbll').style.margin = 'auto';
        document.getElementById('tbll').style.paddingTop = '5%';
        document.getElementById('tbll').innerHTML = 'Message deleted succesfully';
        setTimeout(() => {
          modal.style.display = 'none';
          sent();
        }, 2000);
      } else if (result.status === 500) {
        document.getElementById('tbll').style.margin = 'auto';
        document.getElementById('tbll').style.paddingTop = '5%';
        document.getElementById('tbll').innerHTML = 'An error occured while deleting the message.';
        setTimeout(() => {
          modal.style.display = 'none';
          sent();
        }, 2000);
      }
    });
};
