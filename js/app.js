'use strict';
console.log('This is the pizza tracker');

//These are in an html array use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each images click amount.

// var img1Clicked = 0;
// var img2Clicked = 0;
var pizzaIndex1 = 0;
var pizzaIndex2 = 1;
var totalClicks = 0;
var rounds = 5;
var allPizzas = [];

var imageElements = document.getElementsByTagName('img');

//add a constructor function for our pizzas
function Pizza(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allPizzas.push(this);
}

new Pizza('New York Pizza', 'img/newYorkPizza.jpeg');
new Pizza('Detroit Pizza', 'img/detroitPizza.jpeg');
new Pizza('Brick Oven Pizza', 'img/brickOvenPizza.jpeg');
new Pizza('Calzone', 'img/calzonePizza.jpeg');
new Pizza('Chicago Deep Dish', 'img/chicagoPizza.jpeg');
new Pizza('Chicago Pizza and Oven Grinder', 'img/cpoGinderPizza.jpeg');

allPizzas[0].timesShown = 1;
allPizzas[1].timesShown = 1;

function imageWasClicked(event){
  totalClicks++;

  if(event.srcElement.id === '1'){
    allPizzas[pizzaIndex1].timesClicked++;
  } else if (event.srcElement.id === '2'){
    allPizzas[pizzaIndex2].timesClicked++;
  }

  var nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex1 === pizzaIndex1) || (nextPizzaIndex1 === pizzaIndex2) || (nextPizzaIndex1 === nextPizzaIndex2)){
    nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  }

  var nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex2 === pizzaIndex1) || (nextPizzaIndex2 === pizzaIndex2) || (nextPizzaIndex2 === nextPizzaIndex1)){
    nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  }

  pizzaIndex1 = nextPizzaIndex1;
  pizzaIndex2 = nextPizzaIndex2;

  imageElements[0].src = allPizzas[pizzaIndex1].imageUrl;
  allPizzas[pizzaIndex1].timesShown++;
  imageElements[1].src = allPizzas[pizzaIndex2].imageUrl;
  allPizzas[pizzaIndex2].timesShown++;

  if(totalClicks >= rounds){
    var footerElement = document.getElementsByTagName('footer')[0];
    footerElement.textContent = 'You picked pizza a lot of times.';
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
    for (var k = 0; k < imageElements.length; k++)
      imageElements[k].removeEventListener('click', imageWasClicked);
  }

}

for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  imageElements[i].addEventListener('click', imageWasClicked);
}
