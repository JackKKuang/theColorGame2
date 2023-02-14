let selectedColor = 10510;
let game = 1;
let difficulty = 0;
let gameMode = 1;
let points = 0;
let correct = true;

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};



window.onload = function(){

	difficulties = document.querySelectorAll(".difficulty");
	gameModeButton = document.getElementById("gamemode");
	console.log(difficulties);
	
	for (let i = difficulties.length - 1; i >= 0; i--){
		difficulties[i].addEventListener('click', function(){
		difficulty = difficulties[i].id;
		
		document.getElementById("Difficulties").remove();
		let colorGrid = document.getElementById("jay");
		
		for (let i = difficulty; i > 0; i--){
			let colorOption = document.createElement("div");
			colorOption.setAttribute('id', "colorOption");
			colorGrid.appendChild(colorOption);
			colorOption.addEventListener("click", function(){
			   changeGame(colorOption);
			});
		}
		
		playGame();
		});
		
	}

	gameModeButton.addEventListener('click', function(){
		
		console.log("connected");
		if(gameMode == 1){
			gameModeButton.innerHTML = "Collect the Color";
			gameMode = 2;
		}else{
			gameModeButton.innerHTML = "Guess the Hex";
			gameMode = 1;
		}
	});
}

function playGame() {
	if (game <= 10){
		cycleGame();
	}else{
		endGame();
	}
}

function endGame(){
	let endscreen = document.getElementById("end");
	let score = document.getElementById("score")
	
	for( i = 0; i < 1; i = i + 0.01){
		endscreen.style.opacity = i;
	}
	
	score.innerHTML = "Congratulations, you have Scored " + points + " Points!"
}

function Animate(newColor) { 

let box = document.getElementById("Animation");
	
	let i = 0;
	let v = 0;
	const interval = setInterval(Timer, 2);
	
	function Timer() {
		box.style.background = "linear-gradient(90deg, " + newColor + " " + (i * 3/2) + "% , rgb(238, 238, 238) " + (i * 2) + "%)";
		if(i == 70){
			clearInterval(interval);
			
			const interval2 = setInterval(Timer2, 1);
			
			function Timer2() {
				box.style.background = "linear-gradient(90deg, rgb(238, 238, 238) " + (v * 3/2) + "% , " + newColor + " " + (v * 2) + "%)";
				if(v == 70){
					clearInterval(interval2);
				}else{
				v++;	
				}
			}
			
		}else{
			i++;
		}
	}
}

function changeGame(colorOption) {
	
	let Animation = document.getElementById("Animation");
	
	if(colorOption.innerHTML == selectedColor){
		Animate("rgb(124,252,0)");
		
		if(correct == true){
			points++;
		}else{
			correct = true;
		}
		
		game++
		playGame();
	}else{
		
		correct = false;
	
		Animate("rgb(220,20,60)");
	}
}

function cycleGame() {
	let questionNum = document.getElementById("questionNum")
	let colorBox = document.getElementById("BOX");
	let boxes = document.querySelectorAll("#colorOption");
	
	let color = random_hex_color_code();
	
	if(gameMode == 1){	
	colorBox.style.backgroundColor = color;
		
	for (let i = boxes.length - 1; i >= 0; i--){
		boxes[i].innerHTML = random_hex_color_code();
	}
		
	let selected = boxes[Math.floor(Math.random() * boxes.length)];
	selected.innerHTML = color;
	selectedColor = color;	
	
	}else{
		for (let i = boxes.length - 1; i >= 0; i--){
			boxes[i].style.background = random_hex_color_code();
			boxes[i].innerHTML = "";
		}
		
		colorBox.innerHTML = color;
		let selected = boxes[Math.floor(Math.random() * boxes.length)];
		selected.style.color = color;
		selected.innerHTML = color;
		selected.style.background = color;
		selectedColor = color;	
	}
	
	
	questionNum.innerHTML = "Question: " + game + "/10"
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}                    
     