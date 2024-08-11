function w3_close() {
  document.querySelector('.container-sidebar').style.display = 'none';
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.getElementById("button-close").style.display = "none";
}
