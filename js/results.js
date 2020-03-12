'use strict';
console.log('this is the chart js file');

// var allPizzas;

function getPizzaArray(nameOfThePropertyIWant){
  var answer = [];
  for(var i = 0; i < allPizzas.length; i++){
    answer[i] = allPizzas[i][nameOfThePropertyIWant];
  }
  console.log(answer);
  return answer;
}

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
