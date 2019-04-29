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
    <button onClick="grpMembers()"class="create cree2" id="newGrps"><span class="memText">Group Members</span><span class="spinner"></span></button>
  document.querySelector('.newoutput').innerHTML = output`;
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