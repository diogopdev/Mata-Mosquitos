
var height = 0;
var width = 0;
var vidas = 1;
var tempo = 15;

var MosquitoTime = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	MosquitoTime = 1000
} else if (nivel == 'dificil') {
	MosquitoTime = 500
} else if (nivel == 'lendario') {
	MosquitoTime = 250
}


function adjustGameBox() {
	height = window.innerHeight;
	width = window.innerWidth;
	console.log(height, width);
}

adjustGameBox();

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(createMosquito)
		window.location.href = 'victory.html'
	} else {
	document.getElementById('cronometro').innerHTML = tempo
	}

}, 1000)

function randomPosition() {

	//remover o mosquito anterior, caso exista
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		if(vidas > 3) {
			window.location.href = 'game_over.html'
		} else {
			document.getElementById('v' + vidas).src = 'img/coracao_vazio.png'
			vidas++;
		}
	}

	var posY = Math.floor(Math.random() * height) - 90;
	var posX = Math.floor(Math.random() * width) - 90;

	//Para evitar valores negativos, se for negativo passa a 0, se não, mantém
	posX = posX < 0 ? 0 : posX;
	posY = posY < 0 ? 0 : posY;

	console.log(posX, posY);

	//Criar um elemento img
	var mosquito = document.createElement('img');
	mosquito.src = 'img/mosca.png';
	mosquito.className = randomSize() + ' ' + randomSide(); //function aleatória para escolher entre css class 1, 2 ou 3 e class de inverter img
	mosquito.style.left = posX + 'px';
	mosquito.style.top = posY + 'px';
	mosquito.style.position = 'absolute';
	mosquito.id = 'mosquito';
	mosquito.onclick = function () {
		this.remove();
	}

	document.body.appendChild(mosquito)

}

function randomSize() {

	var mosquito_class = Math.floor(Math.random() * 3)

	switch(mosquito_class) {
	case 0:
		return 'mosquito1';

	case 1:
		return 'mosquito2';

	case 2:
		return 'mosquito3';
	}

}

function randomSide() {
	var mosquito_class = Math.floor(Math.random() * 2)

	switch(mosquito_class) {
	case 0:
		return 'sideA'

	case 1:
		return 'sideB'
	}

}