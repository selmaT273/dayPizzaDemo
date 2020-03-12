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

//add a prototype
Pizza.prototype.toString = function(){
  return `${this.name} pizza is from our ${this.name} for the specified array index, clicked ${this.timesClicked} times.`;
};



function getPizzaArray(nameOfThePropertyIWant){
  var answer = [];
  for(var i = 0; i < allPizzas.length; i++){
    answer[i] = allPizzas[i][nameOfThePropertyIWant];
  }
  console.log(answer);
  return answer;
}

//is there local storage? go see and get if true
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
    localStorage.setItem('savedPizza', JSON.stringify(allPizzas));
    var asideUl = document.getElementById('vote-results');
    for(var j = 0; j < allPizzas.length; j++){
      var voteResultListItem = document.createElement('li');
      voteResultListItem.textContent = allPizzas[j].name + ' was shown ' + allPizzas[j].timesShown + ' times, and received ' + allPizzas[j].timesClicked + ' votes, which represents ' + ((allPizzas[j].timesClicked/totalClicks)* 100) + '% of total votes.';
      asideUl.appendChild(voteResultListItem);

    }

    for (var k = 0; k < imageElements.length; k++){
      imageElements[k].removeEventListener('click', imageWasClicked);
    }
    renderMyChart();
  }

}

for(var l = 0; l < imageElements.length; l++){
  console.log('this is the event listener for the click on pizza event');
  imageElements[l].addEventListener('click', imageWasClicked);
}


function renderMyChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getPizzaArray('name'),
      datasets: [{
        label: '# of Votes',
        data: getPizzaArray('timesClicked'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            min: 0,
            max: 10,
          }
        }]
      }
    }
  });
}

var nameForm = document.getElementById('nameForm');
nameForm.addEventListener('submit', function(event){
  event.preventDefault();
  console.log('name form is listening');

  //grab what the user typed in
  var nameUserProvided = document.getElementById('name').value;
  console.log(nameUserProvided);

  //save to local storage
  localStorage.setItem('userName', nameUserProvided);

  //show that info on the page

  //get rid of the form
  nameForm.textContent = 'Welcome to our site ' + nameUserProvided;


});

//add the form back after we clear from local storage and refresh the page

var savedName = localStorage.getItem('userName');

if(savedName){
  nameForm.textContent = savedName;
}
