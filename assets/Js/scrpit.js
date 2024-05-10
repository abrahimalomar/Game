const successful = new Audio("assets/audios/success.mp3");
const Failed = new Audio("assets/audios/failure.mp3");

var circles = [];
let currentLevel = 0;
var countCircle = 2;
var currentCircleIndex = 0;
var wrongAnswers = 0;
var correctAnswers = 0;
var lengthOfTime = 0;
var maxCircles=0;

const fixedX = [154, 15, 54, 488, 166, 533, 521];
const fixedY = [34, 378, 7, 26, 202, 560, 340];

function startGame() {



  document.getElementById("form").style.display = "none";
  document.getElementById("container").style.display = "block";

  
  const level = document.getElementById("level").value;
  let duration = document.getElementById("duration").value;

 
 
  currentLevel=parseInt( level)
  console.log('current Level ',currentLevel);
  // duration = calculateTimeLevel(currentLevel);

  prepareGameInterface(countCircle);
  document.getElementById("statistics").style.display = "none";


  let timerInterval = setInterval(function () {
    duration--;
    if (duration <= 0) {
      document.getElementById("container").style.display = "none"
      document.getElementById("statistics").style.display = "block";
      displayStatistics()
    } else {
      document.getElementById("timer").textContent = "Remaining time: " + duration + " seconds";
    }
  }, 1000);

}




function prepareGameInterface(countCircle) {

  var gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  for (let i = 0; i < countCircle; i++) {
  

    console.log('currentLevel ', currentLevel);
    const radius = calculateRadiusByLevel(currentLevel)

    const x = fixedX[i]
    const y = fixedY[i]

    const randomNumber = random()

    gameArea.style.width = random()
    gameArea.style.height = random()



    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.backgroundColor = `rgb(${fixedX[i]},${fixedY[i]},${i * 25})`;
    circle.style.color = "white";


    circle.style.width = radius * 2 + "px";
    circle.style.height = radius * 2 + "px";
    circle.style.borderRadius = radius + "px";


    circle.textContent = randomNumber;
    circle.style.position = "absolute";
    circle.style.left = x + "px";
    circle.style.top = y + "px";

    gameArea.appendChild(circle);
    maxCircles++


    lengthOfTime = calculateTimeLevel(currentLevel);
    setTimeout(() => {
      circle.textContent = "?";
    }, lengthOfTime * 1000);
    console.log('length Of Time', lengthOfTime);


    circles.push(randomNumber)
    circle.onclick = function () {
      compareClickedNumber(randomNumber);

    }

  }
}




function random() {
  var randomNumber = 0;
  do {
    randomNumber = Math.floor(Math.random() * 10) + 1;
  } while (circles.includes(randomNumber));
  return randomNumber

}


function compareClickedNumber(clickedNumber) {

  circles.sort(function (a, b) {
    return a - b;
  });

  if (clickedNumber === circles[currentCircleIndex]) {
    successful.currentTime = 0;
    successful.play();
    correctAnswers++;
    countCircle++;
    
    circles.splice(0, circles.length);


    if (currentLevel < 3) {
      currentLevel++;
      
   

    }
    prepareGameInterface(countCircle)

  } else {
    Failed.play();
    wrongAnswers++;
    countCircle--;
    circles.splice(0, circles.length);

    if (currentLevel > 0) {
      currentLevel--;
  
   
    }
    prepareGameInterface(countCircle)
  }
}


function calculateRadiusByLevel(currentLevel) {
  let radius;
  switch (currentLevel) {
    case 1:
      radius = 30;
      break;
    case 2:
      radius = 20;
      break;
    case 3:
      radius = 15;
      break;
    default:
      radius = 30;
  }
  return radius;
}
function calculateTimeLevel(level) {
  let lengthTime;
  switch (level) {
    case 1:

      return 2;
    case 2:
      return 1.5;
    case 3:
      return 1;
    default:
      return 0;
  }
}


function displayStatistics() {

  document.getElementById("statistics").style.display = "block";
  document.getElementById("container").style.display = "none";
  const name=document.getElementById("name").value;
  const time=document.getElementById("duration").value
  document.getElementById("fullName").textContent=name;
  document.getElementById("trueAnswers").textContent = correctAnswers;
  document.getElementById("falseAnswers").textContent = wrongAnswers;
  document.getElementById("maxCircles").textContent=maxCircles;
  document.getElementById("durationDisplay").textContent = time + " seconds";
}
