'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var singleMsg = function singleMsg() {
  var tbl = document.getElementById('tbl');
  var modal = document.getElementById('mmo');
  var span = document.getElementsByClassName('close')[0];
  if (tbl != null) {
    for (var i = 0; i < tbl.rows.length; i++) {
      for (var j = 0; j < tbl.rows[i].cells.length; j++) {
        tbl.rows[i].cells[j].onclick = function () {
          getval(undefined);
        };
      }
    }
  }

  function getval() {
    modal.style.display = 'block';
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

var getSpecific = function getSpecific(val) {
  var token = window.localStorage.getItem('x-access-token');
  fetch('https://epic-mail04.herokuapp.com/api/v1/messages/' + val, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.status === 200) {
      var name = result.data[0].message[0].sfirstname;
      var lastname = result.data[0].message[0].slastname;
      var newId = result.data[0].message[0].messageid;
      var table = '';
      table += '\n        <tr>\n          <td>\n            <i class="fa fa-warning cau rep"><span class="tooltiptext">spam</span></i>\n            <i class="fa fa-trash-o del rep delsb" onclick="deleteSpecific(' + newId + ')"><span class="tooltiptext">delete</span></i>\n            <i class="fa fa-mail-reply cau rep"><span class="tooltiptext">reply</span></i><br>\n            <h2 class="sender">' + name + ' ' + lastname + '</h2>\n            <div class="msgb">' + result.data[0].message[0].message + '</div>\n          </td>\n        </tr>\n        ';
      document.getElementById('tbll').innerHTML = table;
    } else if (result.status === 500) {
      document.getElementById('tbll').style.textAlign = 'center';
      document.getElementById('tbll').style.paddingTop = '5%';
      document.getElementById('tbll').innerHTML = 'An error occured while getting the message.';
    }
  });
};
var deleteSpecific = function deleteSpecific(id) {
  var modal = document.getElementById('mmo');
  var token = window.localStorage.getItem('x-access-token');
  fetch('https://epic-mail04.herokuapp.com/api/v1/messages/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.status === 200) {
      document.getElementById('tbll').style.margin = 'auto';
      document.getElementById('tbll').style.paddingTop = '5%';
      document.getElementById('tbll').innerHTML = 'Message deleted succesfully';
      setTimeout(function () {
        modal.style.display = 'none';
        message();
      }, 2000);
    } else if (result.status === 500) {
      document.getElementById('tbll').style.margin = 'auto';
      document.getElementById('tbll').style.paddingTop = '5%';
      document.getElementById('tbll').innerHTML = 'An error occured while getting the message.';
      setTimeout(function () {
        modal.style.display = 'none';
        message();
      }, 2000);
    }
  });
};
var getSpecificSent = function getSpecificSent(val) {
  var token = window.localStorage.getItem('x-access-token');
  fetch('https://epic-mail04.herokuapp.com/api/v1/messages/sent/' + val, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.status === 200) {
      var name = result.data[0].message[0].rusername;
      var lastname = result.data[0].message[0].ruserlastname;
      var newId = result.data[0].message[0].messageid;
      var table = '';
      table += '\n        <tr>\n          <td>\n            <i class="fa fa-warning cau rep"><span class="tooltiptext">spam</span></i>\n            <i class="fa fa-trash-o del rep delsb" onclick="deleteSpecificSent(' + newId + ')"><span class="tooltiptext">delete</span></i>\n            <i class="fa fa-mail-reply cau rep"><span class="tooltiptext">reply</span></i><br>\n            <h2 class="sender">' + name + ' ' + lastname + '</h2>\n            <div class="msgb">' + result.data[0].message[0].message + '</div>\n          </td>\n        </tr>\n        ';
      document.getElementById('tbll').innerHTML = table;
    } else if (result.status === 500) {
      document.getElementById('tbll').style.textAlign = 'center';
      document.getElementById('tbl;').style.paddingTop = '5%';
      document.getElementById('tbll').innerHTML = 'An error occured while getting the message.';
    }
  });
};
var deleteSpecificSent = function deleteSpecificSent(id) {
  var modal = document.getElementById('mmo');
  var token = window.localStorage.getItem('x-access-token');
  fetch('https://epic-mail04.herokuapp.com/api/v1/messages/sent/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.status === 200) {
      document.getElementById('tbll').style.margin = 'auto';
      document.getElementById('tbll').style.paddingTop = '5%';
      document.getElementById('tbll').innerHTML = 'Message deleted succesfully';
      setTimeout(function () {
        modal.style.display = 'none';
        sent();
      }, 2000);
    } else if (result.status === 500) {
      document.getElementById('tbll').style.margin = 'auto';
      document.getElementById('tbll').style.paddingTop = '5%';
      document.getElementById('tbll').innerHTML = 'An error occured while deleting the message.';
      setTimeout(function () {
        modal.style.display = 'none';
        sent();
      }, 2000);
    }
  });
};