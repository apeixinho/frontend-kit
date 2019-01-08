const date = id => {
  let time = document.getElementById(id);
  const date = new Date().getFullYear();
  time.innerHTML = date;
}

const myage = id => {
  let my_age_el = document.getElementById(id);
  const year = new Date().getFullYear();
  my_age_el.insertAdjacentText('afterbegin',(year - 1979) +' years old');
}

export {date, myage}
