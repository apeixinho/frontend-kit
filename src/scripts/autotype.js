// eslint-disable-next-line
function autoType(id, delay, speed) {
  var ori = document.getElementById(id);
  var s = ori.innerHTML;
  ori.innerHTML = '';

  var i = 0;
  setTimeout(function () {
    var interval = setInterval(function () {
      ori.innerHTML += s.charAt(i);
      i++;
      if (i >= s.length)
        clearInterval(interval);
    }, speed);
  }, delay);
}
