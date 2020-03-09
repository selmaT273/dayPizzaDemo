'use strict';
console.log('This is the pizza tracker');
var img1Clicked = 0;
var img2Clicked = 0;

function imageWasClicked(){
  console.log('image was clicked');

  if(event.srcElement.id === '1'){
    img1Clicked++;
  } else if (event.srcElement.id === '2'){
    img2Clicked++;
  }

  if(img1Clicked + img2Clicked >= 5){
    var footerElement = document.getElementsByTagName('footer')[0];
    footerElement.textContent = `You picked pizza 1 ${img1Clicked} times and pizza 2 ${img2Clicked} times.`;
}

}


var imageElements = document.getElementsByTagName('img');

for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  imageElements[i].addEventListener('click', imageWasClicked);
}
