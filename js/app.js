'use strict';
console.log('This is the pizza tracker');

function imageWasClicked(){

  console.log('image was clicked');
}


var imageElements = document.getElementsByTagName('img');

for(var i = 0; i < imageElements.length; i++){
  imageElements[i].addEventListener('click', imageWasClicked);
}