'use strict';
console.log('This is the pizza tracker');

//These are in an html array use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each images click amount.

// var img1Clicked = 0;
// var img2Clicked = 0;
var pizzaIndex1 = 0;
var pizzaIndex2 = 1;
var totalClicks = 0;
var allPizzas = [];

var imageElements = document.getElementsByTagName('img');

//add a constructor function for our pizzas
function Pizza(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  allPizzas.push(this);
}


//create the pizza objects with the new operator
new Pizza('Brick Oven Pizza', 'img/brickOvenPizza.jpeg');
new Pizza('Calzone', 'img/calzonePizza.jpeg');
new Pizza('Chicago Deep Dish', 'img/chicagoPizza.jpeg');
new Pizza('Chicago Pizza and Oven Grinder', 'img/cpoGinderPizza.jpeg');


function imageWasClicked(event){
  //track total clicks
  totalClicks++;

  if(event.srcElement.id === '1'){
    allPizzas[pizzaIndex1].timesClicked++;
  } else if (event.srcElement.id === '2'){
    allPizzas[pizzaIndex2].timesClicked++;
  }

  //pick a random pic to display

  var nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex1 === pizzaIndex1) || (nextPizzaIndex2 === nextPizzaIndex1)){
    nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  }

  var nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex2 === pizzaIndex2) || (nextPizzaIndex2 === nextPizzaIndex1)){
    nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  }

  //pick a random pic to display
  pizzaIndex1 = nextPizzaIndex1;
  pizzaIndex2 = nextPizzaIndex2;

  imageElements[0].src = allPizzas[pizzaIndex1].imageUrl;
  imageElements[1].src = allPizzas[pizzaIndex2].imageUrl;

  //add logic so that we don't see the same images from click to click


  //set up a ref to pizzaIndex1

  //display the pizzas

  if(totalClicks >= 5){
    var footerElement = document.getElementsByTagName('footer')[0];
    footerElement.textContent = `You picked pizza1 ${pizzaIndex1} times and pizza2 ${pizzaIndex2} times.`;
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
  }

}



for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  imageElements[i].addEventListener('click', imageWasClicked);
}
