var myCards = document.querySelector('.game__container');
var resultsArray = [];
var counter = 00;
var seconds = 00;
var mSeconds = 00;
var appendTens = document.getElementById("m-seconds");
var appendSeconds = document.getElementById("seconds");
var buttonStart = document.querySelector('.btn_start');


var Interval ;
var images = [
    '1', '2', '3', '4', '5', '6', '7', '8'
];

var clone = images.slice(0); // duplicate array
var cards = images.concat(clone); // merge to arrays


shuffle(cards);

for (var i = 0; i < cards.length; i++) {
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);

  card.onclick = function () {
    if (this.className != 'flipped' && this.className != 'correct'){
        this.className = 'flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }


    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter ++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }

    }

  };
  


};

// Shuffle function
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
    return o;
  }

var check = function(className) {
  var x = document.getElementsByClassName("flipped");

  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }

  },500);

}


var win = function () {

  if(counter === 8) {
    setTimeout(function() {  

    clearInterval(Interval);
    if(!alert(`Поздравляем, Вы Выиграли! \n Ваше время: ${seconds}.${mSeconds}`)){window.location.reload();}
    // alert(`Поздравляем, Вы Выиграли! \n Ваше время: ${seconds}.${mSeconds}`);
    },1500);
    
  };

}


buttonStart.onclick = function() {
    clearInterval(Interval);
}


function startTimer () {
    mSeconds++;

  if(mSeconds < 9){
    appendTens.innerHTML = "0" + mSeconds;
  }

  if (mSeconds > 9){
    appendTens.innerHTML = mSeconds;

  }

  if (mSeconds > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    mSeconds = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

}
