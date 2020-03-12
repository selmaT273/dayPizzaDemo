'use strict';

var allPizzas = [];

function Pizza(name, imageUrl, timesClicked){
  this.name = name;
  this.imageUrl = imageUrl;
  if(timesClicked){
    this.timesClicked = timesClicked;
  } else {
    this.timesClicked = 0;
  }
  this.timesShown = 0;
  allPizzas.push(this);
}

var savedPizzaString = localStorage.getItem('savedPizza');

if(savedPizzaString){
  var arrayOfNotPizzaObjects = JSON.parse(savedPizzaString);

  for(var i = 0; i < arrayOfNotPizzaObjects.length; i++){
    new Pizza(arrayOfNotPizzaObjects[i].name, arrayOfNotPizzaObjects[i].imageUrl, arrayOfNotPizzaObjects[i].timesClicked);
  }
} else {
  new Pizza('New York Pizza', 'img/newYorkPizza.jpeg');
  new Pizza('Detroit Pizza', 'img/detroitPizza.jpeg');
  new Pizza('Brick Oven Pizza', 'img/brickOvenPizza.jpeg');
  new Pizza('Calzone', 'img/calzonePizza.jpeg');
  new Pizza('Chicago Deep Dish', 'img/chicagoPizza.jpeg');
  new Pizza('Chicago Pizza and Oven Grinder', 'img/cpoGinderPizza.jpeg');
}

allPizzas[0].timesShown++;
allPizzas[1].timesShown++;
