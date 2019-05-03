'use strict';

/* eslint-disable no-use-before-define */
var spinner = document.querySelector('.spinner');
var token = window.localStorage.getItem('x-access-token');
var firstname = window.localStorage.getItem('firstName');
var lastname = window.localStorage.getItem('lastName');
var url = 'https://epic-mail04.herokuapp.com/api/v1/messages';
var message = function message() {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    var inb = document.querySelector('.em-btn');
    document.querySelector('.usern').innerHTML = firstname + ' ' + lastname;
    if (result.status === 200) {
      spinner.style.display = 'none';
      var table = '';
      var arrayOfmessages = result.data.inbox;
      inb.innerHTML = '' + arrayOfmessages.length;

      table += '\n          <tr>\n          <th><input type="checkbox" name="check" value="check" class="check"></th>\n          <th>Id</th>\n          <th></th> \n          <th>Message</th> \n          <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> \n          <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> \n    \n        </tr>';
      arrayOfmessages.forEach(function (msg) {
        table += '\n        <tr class="unread" id="rem" onclick="getSpecific(' + msg.messageid + ')">\n          <td><input type="checkbox" name="check" value="select" class="check"></td>\n          <td><span id="spe">' + msg.messageid + '</span></td>\n          <td>' + msg.sfirstname + ' ' + msg.slastname + '</td>\n          <td class="ellip">\n              <div class="subject">' + msg.subject + '</div>\n              ' + msg.message + '\n          </td>\n          <td><i class="fa fa-trash-o del"></i></td>\n          <td>' + msg.createdon + '</td> \n        </tr>\n          ';
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
var unread = function unread() {
  fetch(url + '/unread', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (rest) {
    if (rest.status === 200) {
      var table = '';
      var arrayOfmessages = rest.data.unread;
      table += '\n          <tr>\n          <th><input type="checkbox" name="check" value="check" class="check"></th>\n          <th>Id</th>\n          <th></th> \n          <th>Message</th> \n          <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> \n          <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> \n    \n        </tr>';
      arrayOfmessages.forEach(function (msg) {
        table += '\n          <tr class="unread" onclick="getSpecific(' + msg.messageid + ')">\n            <td><input type="checkbox" name="check" value="select" class="check"></td>\n            <td><span id="delh">' + msg.messageid + '</span></td>\n            <td class=\'msgId\'>' + msg.messageid + '</td>\n            <td>' + msg.sfirstname + ' ' + msg.slastname + '</td>\n            <td class="ellip">\n                <div class="subject">' + msg.subject + '</div>\n                ' + msg.message + '\n            </td>\n            <td><i class="fa fa-trash-o del"></i></td>\n            <td>' + msg.createdon + '</td> \n          </tr>\n            ';
      });
      document.getElementById('tbl').innerHTML = table;
      singleMsg();
    } else if (rest.status === 404) {
      var _unReadMsg = document.querySelector('.unr');
      _unReadMsg.addEventListener('click', function () {
        document.getElementById('tbl').style.textAlign = 'center';
        document.getElementById('tbl').style.paddingTop = '5%';
        document.getElementById('tbl').innerHTML = 'No unread messages for you';
      });
    } else if (rest.status === 500) {
      var _unReadMsg2 = document.querySelector('.unr');
      _unReadMsg2.addEventListener('click', function () {
        document.getElementById('tbl').style.textAlign = 'center';
        document.getElementById('tbl').style.paddingTop = '5%';
        document.getElementById('tbl').innerHTML = 'An error occured while getting your unread messages.';
      });
    }
  });
};
var unReadMsg = document.querySelector('.unr');
unReadMsg.addEventListener('click', unread);

var sent = function sent() {
  fetch(url + '/sent', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (resp) {
    if (resp.status === 200) {
      var table = '';
      var arrayOfmessages = resp.data.sent;
      var _sentMsg = document.querySelector('.seent');
      _sentMsg.addEventListener('click', function () {
        table += '\n          <tr>\n          <th><input type="checkbox" name="check" value="check" class="check"></th>\n          <th>Id</th> \n          <th></th>\n          <th>Message</th> \n          <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> \n          <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> \n    \n        </tr>';
        arrayOfmessages.forEach(function (msg) {
          table += '\n          <tr class="unread" onclick="getSpecificSent(' + msg.messageid + ')">\n            <td><input type="checkbox" name="check" value="select" class="check"></td>\n            <td>' + msg.messageid + '</td>\n            <td>' + msg.rusername + ' ' + msg.ruserlastname + '</td>\n            <td class="ellip">\n                <div class="subject">' + msg.subject + '</div>\n                ' + msg.message + '\n            </td>\n            <td><i class="fa fa-trash-o del"></i></td>\n            <td>' + msg.createdon + '</td> \n          </tr>\n            ';
        });
        document.getElementById('tbl').innerHTML = table;
        singleMsg();
      });
    }
  });
};
var sentMsg = document.querySelector('.seent');
sentMsg.addEventListener('click', sent);