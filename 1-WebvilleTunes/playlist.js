var btn=document.getElementById('addButton'),
  song=document.getElementById('songTextInput'),
  list=document.getElementById('playlist');

function btnClick() {
  var songName=song.value;
  if(songName) {
    var oLi=document.createElement('li');
    oLi.innerHTML=songName+"<span>Delete<span>";
    list.appendChild(oLi);
  }else{
    alert("No Value Here.");
  }
}

btn.onclick=btnClick;
