let date = id => {
  let time = document.getElementById(id);
  let date = new Date().getFullYear();
  time.innerHTML = date;
}

let myage = id => {

  let my_age_el = document.getElementById(id);
  let year = new Date().getFullYear();
  my_age_el.insertAdjacentText('afterbegin',(year - 1979) +' years old');
}

export {date, myage}
