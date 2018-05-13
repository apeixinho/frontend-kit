let date = id => {
  let time = document.getElementById(id);
  let date = new Date().getFullYear();
  time.innerHTML = date;
}

export default date;
