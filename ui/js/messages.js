/* eslint-disable no-use-before-define */
const spinner = document.querySelector('.spinner');
const token = window.localStorage.getItem('x-access-token');
const firstname = window.localStorage.getItem('firstName');
const lastname = window.localStorage.getItem('lastName');
const url = 'http://127.0.0.1:8000/api/v1/messages';
const message = () => {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      const inb = document.querySelector('.em-btn');
      document.querySelector('.usern').innerHTML = `${firstname} ${lastname}`;
      if (result.status === 200) {
        spinner.style.display = 'none';
        let table = '';
        const arrayOfmessages = result.data.inbox;
        inb.innerHTML = `${arrayOfmessages.length}`;

        table += `
          <tr>
          <th><input type="checkbox" name="check" value="check" class="check"></th>
          <th>Id</th>
          <th></th> 
          <th>Message</th> 
          <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> 
          <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> 
    
        </tr>`;
        arrayOfmessages.forEach((msg) => {
          table += `
        <tr class="unread" id="rem" onclick="getSpecific(${msg.messageid})">
          <td><input type="checkbox" name="check" value="select" class="check"></td>
          <td><span id="spe">${msg.messageid}</span></td>
          <td>${msg.sfirstname} ${msg.slastname}</td>
          <td class="ellip">
              <div class="subject">${msg.subject}</div>
              ${msg.message}
          </td>
          <td><i class="fa fa-trash-o del"></i></td>
          <td>${msg.createdon}</td> 
        </tr>
          `;
          document.getElementById('tbl').innerHTML = table;
          singleMsg();
        });
      } else if (result.status === 404) {
        inb.innerHTML = 0;
        document.getElementById('tbl').style.textAlign = 'center';
        document.getElementById('tbl').style.paddingTop = '5%';
        document.getElementById('tbl').innerHTML = 'Your inbox is empty';
      } else if (result.status === 500) {
        inb.innerHTML = 0;
        document.getElementById('tbl').style.textAlign = 'center';
        document.getElementById('tbl').style.paddingTop = '5%';
        document.getElementById('tbl').innerHTML = 'An error occured while getting your inbox.';
      }
    });
};
window.onload = message();
const unread = () => {
  fetch(`${url}/unread`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((rest) => {
      if (rest.status === 200) {
        let table = '';
        const arrayOfmessages = rest.data.unread;
        table += `
          <tr>
          <th><input type="checkbox" name="check" value="check" class="check"></th>
          <th>Id</th>
          <th></th> 
          <th>Message</th> 
          <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> 
          <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> 
    
        </tr>`;
        arrayOfmessages.forEach((msg) => {
          table += `
          <tr class="unread" onclick="getSpecific(${msg.messageid})">
            <td><input type="checkbox" name="check" value="select" class="check"></td>
            <td><span id="delh">${msg.messageid}</span></td>
            <td class='msgId'>${msg.messageid}</td>
            <td>${msg.sfirstname} ${msg.slastname}</td>
            <td class="ellip">
                <div class="subject">${msg.subject}</div>
                ${msg.message}
            </td>
            <td><i class="fa fa-trash-o del"></i></td>
            <td>${msg.createdon}</td> 
          </tr>
            `;
        });
        document.getElementById('tbl').innerHTML = table;
        singleMsg();
      } else if (rest.status === 404) {
        const unReadMsg = document.querySelector('.unr');
        unReadMsg.addEventListener('click', () => {
          document.getElementById('tbl').style.textAlign = 'center';
          document.getElementById('tbl').style.paddingTop = '5%';
          document.getElementById('tbl').innerHTML = 'No unread messages for you';
        });
      } else if (rest.status === 500) {
        const unReadMsg = document.querySelector('.unr');
        unReadMsg.addEventListener('click', () => {
          document.getElementById('tbl').style.textAlign = 'center';
          document.getElementById('tbl').style.paddingTop = '5%';
          document.getElementById('tbl').innerHTML = 'An error occured while getting your unread messages.';
        });
      }
    });
};
const unReadMsg = document.querySelector('.unr');
unReadMsg.addEventListener('click', unread);


const sent = () => {
  fetch(`${url}/sent`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((resp) => {
      const inb = document.querySelector('#mvvp');
      if (resp.status === 200) {
        let table = '';
        const arrayOfmessages = resp.data.sent;
        inb.innerHTML = `${arrayOfmessages.length}`;
        const sentMsg = document.querySelector('.seent');
        sentMsg.addEventListener('click', () => {
          table += `
          <tr>
          <th><input type="checkbox" name="check" value="check" class="check"></th>
          <th>Id</th> 
          <th></th>
          <th>Message</th> 
          <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> 
          <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> 
    
        </tr>`;
          arrayOfmessages.forEach((msg) => {
            table += `
          <tr class="unread" onclick="getSpecificSent(${msg.messageid})">
            <td><input type="checkbox" name="check" value="select" class="check"></td>
            <td>${msg.messageid}</td>
            <td>${msg.rusername} ${msg.ruserlastname}</td>
            <td class="ellip">
                <div class="subject">${msg.subject}</div>
                ${msg.message}
            </td>
            <td><i class="fa fa-trash-o del"></i></td>
            <td>${msg.createdon}</td> 
          </tr>
            `;
          });
          document.getElementById('tbl').innerHTML = table;
          singleMsg();
        });
      }
    });
};
const sentMsg = document.querySelector('.seent');
sentMsg.addEventListener('click', sent);
