require('./styles/index.scss');
var cute = require('./images/cute.jpg');

var rootEl = document.getElementById('root');
var imageEl = document.createElement('img');
imageEl.src = cute;
rootEl.appendChild(imageEl);
