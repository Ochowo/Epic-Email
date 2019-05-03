'use strict';

var groupInform = function groupInform(val) {
  var newId = val;
  var newMod = document.getElementById('mmop');
  var clo = document.getElementsByClassName('closev')[0];
  newMod.style.display = 'block';
  var output = '';
  output += '\n    <i class="fa fa-trash-o del dele" onclick="deleteGroup()"></i>\n    <span class="successdel">group deleted succesfully</span>\n    <h2 class="po" id="cl">Update Group</h2>\n    <input class="grpp" id = "grpp" type="text" placeholder="New Group Name" name="grpp" required><br>\n    <div id="feedbackn" class="ygg"></div>\n    <button class="create cree2 yh gp" id="newgrpp"><span class="grpTextt">Edit</span><span class="spinner"></span></button><br>\n    <button onClick="grpMembers()"class="create cree2" id="newGrps"><span class="memText">Group Members</span><span class="spinner"></span></button>\n  document.querySelector(\'.newoutput\').innerHTML = output';
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