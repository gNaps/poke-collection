var p1 = new Pokemon();
var p2 = new Pokemon();
var p3 = new Pokemon();
var p4 = new Pokemon();
var p5 = new Pokemon();
var p6 = new Pokemon();
var latitudine = [0, 0, 0, 0, 0, 0];
var longitudine = [0, 0, 0, 0, 0, 0];
var apparsi = [p1, p2, p3, p4, p5, p6];
var lanci = 0;

if (!localStorage.pokeball) localStorage.pokeball = "50";

if (!localStorage.soldi) localStorage.soldi = "500";

if (!localStorage.esperienza) localStorage.esperienza = "0";

if (!localStorage.caramelle) localStorage.caramelle = "0";

function apparePokemon() {

	$("#pokemonUno").empty();
	$("#pokemonDue").empty();
	$("#pokemonTre").empty();
	$("#pokemonQuattro").empty();
	$("#pokemonCinque").empty();
	$("#pokemonSei").empty();
	$(".fix").css("display", "none");
	$(".cerchio").empty();
	$(".sfera").empty();
	$(".nome").empty();
	$(".legenda").empty();

	for (var i = 0; i < apparsi.length; i++) {
		getInfoGeneric(apparsi[i], i);
	}

	for (var i = 0; i < apparsi[i].length; i++) {
		apparsi[i].setStatsReal();
	}
}

function getInfoGeneric(p, index) {
	var num = 0;
	do {
		flag = false;
		num = Math.round(151*Math.random() + 1); //Si genera casualmente il numero del pokemon 
		flag = checkLegendary(num);
	}
	while(flag);
	var P = new Pokedex.Pokedex({protocol: 'https'});
	P.getPokemonByName(num).then(function(response) { 
	// response è l'oggetto con tutte le nostre informazioni
		p.setNome(response);
		p.setLivello(num);
		p.setStatsBase(response);
		p.setType(response);
		p.setIv();
		p.valutazionePokemon();
		p.setNumeroPoke(num);
		p.setProbCattura(num);
		p.setShiny();
		p.setImg(response, num);
			if(index == 5) {
				for (var j = 0; j < apparsi.length; j++) {
					getInfoNatura(apparsi[j], j);
				}
			}
	})
	.catch(function(err) {
		console.log(err)
	});
}

function getInfoNatura(p, index) {
	var num = Math.round(24*Math.random() + 1);
	var P = new Pokedex.Pokedex({protocol: 'https'});
	P.getNatureByName(num)
	.then(function(response){
		p.natura.nome = response.name;
		p.natura.id = num;
		if(response.decreased_stat != null) {
			p.natura.statAumentata = response.decreased_stat.name;
			p.natura.statDiminuita = response.increased_stat.name;
		}
		else {
			p.natura.statAumentata = "---";
			p.natura.statDiminuita = "---";
		}
		p.setStatsReal();
		if(index == 5) {
			stampaIndex();

			loadMapScenario();

			//initialize();
			//google.maps.event.addDomListener(window, 'load', initialize);
			//document.getElementById('container-map').style.display = "block";
			$('#container-map').css({'display' : 'block'});

			$('.legenda').append('<p><img src="pokeball.png"> :' + localStorage.pokeball + '   <img src="dollar-symbol.png"> :' + localStorage.soldi  + '   <img src="man-user.png"> :' + localStorage.esperienza +'exp' + ' <img src="candy.png"> :' + localStorage.caramelle +'</p>');

			$('#rules').fadeOut(300);
			$('#container-map').fadeIn(1000);
			$('.pokemon').fadeIn(1000);
			$('.legenda').fadeIn(1000);
		}
	})
	.catch(function(err) {
		console.log(err)
	});
}

function stampaIndex() {

	//stampo nella pagina
		$("#pokemonUno").append('<h2>'+ p1.nome.toUpperCase() +'</h2><br>');
		$("#pokemonUno").append("<img src=" + p1.img + "><br>");
		$("#pokemonUno").append("<img src=" + p1.typeImg[0] + "><br>");
			if(p1.type[1] != "Type2") {
				$("#pokemonUno").append("<img src=" + p1.typeImg[1] + "><br>");
			}
		$("#pokemonUno").append("<h5>Lvl:</h5><p>" + p1.livello + "</p>");
		$("#pokemonUno").append("<h5>Natura:</h5><p>" + p1.natura.nome.toUpperCase() + "</p><h5>Valutazione: </h5><p>" + p1.valutazione +"</p>");
		$("#pokemonUno").append('<p><button type="button" class="btn cattura" onclick="stampaCattura(1)">Catturalo! &raquo;</button>');

		$("#pokemonDue").append("<h2>"+ p2.nome.toUpperCase() +"</h2><br>");
		$("#pokemonDue").append("<img src=" + p2.img + "><br>");
		$("#pokemonDue").append("<img src=" + p2.typeImg[0] + "><br>");
			if(p2.type[1] != "Type2") {
				$("#pokemonDue").append("<img src=" + p2.typeImg[1] + "><br>");
			}
		$("#pokemonDue").append("<h5>Lvl:</h5><p>" + p2.livello + "</p>");
		$("#pokemonDue").append("<h5>Natura:</h5><p>" + p2.natura.nome.toUpperCase() + "</p><h5>Valutazione: </h5><p>" + p2.valutazione +"</p>");
		$("#pokemonDue").append('<p><button type="button" class="btn cattura" onclick="stampaCattura(2)">Catturalo! &raquo;</button></p>');

		$("#pokemonTre").append("<h2>"+ p3.nome.toUpperCase() +"</h2><br>");
		$("#pokemonTre").append("<img src=" + p3.img + "><br>");
		$("#pokemonTre").append("<img src=" + p3.typeImg[0] + "><br>");
			if(p3.type[1] != "Type2") {
				$("#pokemonTre").append("<img src=" + p3.typeImg[1] + "><br>");
			}
		$("#pokemonTre").append("<h5>Lvl:</h5><p>" + p3.livello + "</p>");
		$("#pokemonTre").append("<h5>Natura:</h5><p>" + p3.natura.nome.toUpperCase() + "</p><h5>Valutazione: </h5><p>" + p3.valutazione +"</p>");
		$("#pokemonTre").append('<p><button type="button" class="btn cattura" onclick="stampaCattura(3)">Catturalo! &raquo;</button></p>');

		$("#pokemonQuattro").append("<h2>"+ p4.nome.toUpperCase() +"</h2><br>");
		$("#pokemonQuattro").append("<img src=" + p4.img + "><br>");
		$("#pokemonQuattro").append("<img src=" + p4.typeImg[0] + "><br>");
			if(p3.type[1] != "Type2") {
				$("#pokemonQuattro").append("<img src=" + p4.typeImg[1] + "><br>");
			}
		$("#pokemonQuattro").append("<h5>Lvl:</h5><p>" + p4.livello + "</p>");
		$("#pokemonQuattro").append("<h5>Natura:</h5><p>" + p4.natura.nome.toUpperCase() + "</p><h5>Valutazione: </h5><p>" + p4.valutazione +"</p>");
		$("#pokemonQuattro").append('<p><button type="button" class="btn cattura" onclick="stampaCattura(4)">Catturalo! &raquo;</button></p>');

		$("#pokemonCinque").append("<h2>"+ p5.nome.toUpperCase() +"</h2><br>");
		$("#pokemonCinque").append("<img src=" + p5.img + "><br>");
		$("#pokemonCinque").append("<img src=" + p5.typeImg[0] + "><br>");
			if(p3.type[1] != "Type2") {
				$("#pokemonCinque").append("<img src=" + p5.typeImg[1] + "><br>");
			}
		$("#pokemonCinque").append("<h5>Lvl:</h5><p>" + p5.livello + "</p>");
		$("#pokemonCinque").append("<h5>Natura:</h5><p>" + p5.natura.nome.toUpperCase() + "</p><h5>Valutazione: </h5><p>" + p5.valutazione +"</p>");
		$("#pokemonCinque").append('<p><button type="button" class="btn cattura" onclick="stampaCattura(5)">Catturalo! &raquo;</button></p>');

		$("#pokemonSei").append("<h2>"+ p6.nome.toUpperCase() +"</h2><br>");
		$("#pokemonSei").append("<img src=" + p6.img + "><br>");
		$("#pokemonSei").append("<img src=" + p6.typeImg[0] + "><br>");
			if(p3.type[1] != "Type2") {
				$("#pokemonSei").append("<img src=" + p6.typeImg[1] + "><br>");
			}
		$("#pokemonSei").append("<h5>Lvl:</h5><p>" + p6.livello + "</p>");
		$("#pokemonSei").append("<h5>Natura:</h5><p>" + p6.natura.nome.toUpperCase() + "</p><h5>Valutazione: </h5><p>" + p6.valutazione +"</p>");
		$("#pokemonSei").append('<p><button type="button" class="btn cattura" onclick="stampaCattura(6)">Catturalo! &raquo;</button></p>');
}

function Pokemon() {
	this.nome = "Nome";
	this.setNome = function(response) {
		this.nome = response.name;
	}

	this.numeroPoke = 0;
	this.setNumeroPoke = function (num) {
		this.numeroPoke = num;
	}

	this.statsName = ["Velocità", "Difesa Speciale", "Attacco Speciale", "Difesa", "Attacco", "PS",]

	this.statsBase = [0, 0, 0, 0, 0, 0];
	this.setStatsBase = function(response) {
		this.statsBase[0] = response.stats[0].base_stat; //vel
		this.statsBase[1] = response.stats[1].base_stat; //defsp
		this.statsBase[2] = response.stats[2].base_stat; //attsp
		this.statsBase[3] = response.stats[3].base_stat; //def
		this.statsBase[4] = response.stats[4].base_stat; //att
		this.statsBase[5] = response.stats[5].base_stat; //ps
	}
	this.livello = 5;
	this.setLivello = function(num) {
		this.livello = checkLivello(num);
	}
	this.Iv = [0, 0, 0, 0, 0, 0];
	this.setIv = function() {
		var casual = 0;
		var i;
		for (i = 0; i < 6; i++) {
			casual = Math.round(31*Math.random());
			this.Iv[i] = casual;
		}
	}
	this.statsReal = [0, 0, 0, 0, 0, 0];
	this.setStatsReal = function() {
		this.statsReal[5] = (this.Iv[5] + 2*this.statsBase[5]) * (this.livello/100) + 10 + this.livello;

		this.statsReal[1] = (this.Iv[1] + 2*this.statsBase[1]) * (this.livello/100) + 5;



		if(this.natura.statAumentata == "special-defense")
			this.statsReal[1] = this.statsReal[1] + (this.statsReal[1] *0.1);
		if(this.natura.statDiminuita == "special-defense")
			this.statsReal[1] = this.statsReal[1] - (this.statsReal[1] * 0.1);

		this.statsReal[2] = (this.Iv[2] + 2*this.statsBase[2]) * (this.livello/100) + 5;
		if(this.natura.statAumentata == "special-attack")
			this.statsReal[2] = this.statsReal[2] + (this.statsReal[2] * 0.1);
		if(this.natura.statDiminuita == "special-attack")
			this.statsReal[2] = this.statsReal[2] - (this.statsReal[2] * 0.1);

		this.statsReal[3] = (this.Iv[3] + 2*this.statsBase[3]) * (this.livello/100) + 5;
		if(this.natura.statAumentata == "defense")
			this.statsReal[3] = this.setStatsReal[3] + (this.statsReal[3] * 0.1);
		if(this.natura.statDiminuita == "defense")
			this.statsReal[3] = this.statsReal[3] - (this.statsReal[3] * 0.1);

		this.statsReal[4] = (this.Iv[4] + 2*this.statsBase[4]) * (this.livello/100) + 5;
		if(this.natura.statAumentata == "attack")
			this.statsReal[4] = this.statsReal[4] + (this.statsReal[4] * 0.1);
		if(this.natura.statDiminuita == "attack")
			this.statsReal[4] = this.statsReal[4] - (this.statsReal[4] * 0.1);

		this.statsReal[0] = (this.Iv[0] + 2*this.statsBase[0]) * (this.livello/100) + 5;
		if(this.natura.statAumentata == "speed")
			this.statsReal[0] = this.statsReal[0] + (this.statsReal[0] * 0.1);
		if(this.natura.statDiminuita == "speed")
			this.statsReal[0] = this.statsReal[0] - (this.statsReal[0] * 0.1);

		for(let i = 0; i < 6; i++) {
			this.statsReal[i] = Math.round(this.statsReal[i]);
		}



	}
	this.isShiny = false;
	this.setShiny = function() {
		var n = Math.round(1000*Math.random() + 1);
		if(n == 999) {
	 	this.isShiny = true;
	 	alert('È apparso un pokemon cromatico!');
	 	}
	}
	this.img = "";
	this.setImg = function(response, num) {
		//if(num < 722)
				if(!this.isShiny) {
					if(num == 32) this.img = "\"https://play.pokemonshowdown.com/sprites/xyani/nidoranm.gif\"";
					else this.img = "\"https://play.pokemonshowdown.com/sprites/xyani/" + response.name + ".gif\"";
				}
				else this.img = "\"https://play.pokemonshowdown.com/sprites/xy-shiny/" + response.name + ".png\"";
				//genero il link per la gif del pokemon tra 1-6 gen
			//else 
				//this.img = "\"https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/" + response.name + ".gif\"";
				//genero il link per la gif del pokemon 7 gen
	}
	this.type = ["Type1", "Type2"];
	this.typeImg = ["", ""];
	this.setType = function(response) {
		this.type[0] = response.types[0].type.name;
		this.typeImg[0] = "\"https://play.pokemonshowdown.com/sprites/types/" + primaMaiuscola(this.type[0]) + ".png\"";
		if(response.types.length == 2) {
			this.type[1] = response.types[1].type.name;
			this.typeImg[1] = "\"https://play.pokemonshowdown.com/sprites/types/" + primaMaiuscola(this.type[1]) + ".png\"";
		}
		else {
			this.type[1] = "None";
			this.typeImg[1] = "";
		}

	}
	this.natura = new Natura();
	this.valutazionePokemon = function(id) {
		var media = 0;
		for (var i = 0; i < this.Iv.length; i++) {
				media = media + this.Iv[i];
		}
		media = media / 6;

		if(media == 31) this.valutazione = "ECCELLENTE";
		if(media == 30) this.valutazione = "PERFETTO";
		if(media >= 25 && media < 30) this.valutazione = "BUONO";
		if(media >= 18 && media < 25) this.valutazione = "DISCRETO";
		if(media >= 13 && media < 18) this.valutazione = "SUFFICIENTE";
		if(media > 0 && media < 13) this.valutazione = "SCARSO";
		if(media == 0) this.valutazione = "STRAORDINARIAMENTE INUTILE";
	}
	valutazione = "";
	probCattura = 0;
	this.setProbCattura = function (n) {
			//starter prima evoluzione
		//pokemon con una sola evoluzione al primo stadio
	if(n == 19 || n == 21 || n == 23 || n == 25 || n == 27|| n == 35 || n == 37 || n == 39 || n == 41|| n == 46 || n == 48 || n == 50 || n == 52 || n == 54 || n == 56 || n == 58 || n == 72 || n == 77 || n == 79 || n == 81 || n == 84 || n == 86 || n == 88 || n == 90 || n == 96 || n == 98 || n == 100 || n == 102 || n == 104 || n == 109 || n == 111 || n == 116 || n == 118 || n == 120 || n == 129 || n == 133 || n == 138 || n == 140 || n == 142) {
		this.probCattura = 5;
	}

	//pokemon con una sola evoluzione al secondo stadio
	if(n == 19+1 || n == 21+1 || n == 23+1 || n == 25+1 || n == 27+1|| n == 35+1 || n == 37+1 || n == 39+1 || n == 41+1 || n == 46+1 || n == 48+1 || n == 50+1 || n == 52+1 || n == 54+1 || n == 56+1 || n == 58+1 || n == 72+1 || n == 77+1 || n == 79+1 || n == 81+1 || n == 84+1 || n == 86+1 || n == 88+1 || n == 90+1 || n == 96+1 || n == 98+1 || n == 100+1 || n == 102+1 || n == 104+1 || n == 109+1 || n == 111+1 || n == 116+1 || n == 118+1 || n == 120+1 || n == 129+1 || n == 133+1 || n == 138+1 || n == 140+1 || n == 142+1) {
		this.probCattura = 4;
	}

	//pokemon con due evoluzione al primo stadio
	if( n == 10 || n == 13 || n == 16 || n == 29 || n == 32 || n == 43 || n == 60 || n == 63 || n == 66 || n == 69 || n == 74 || n == 93 || n == 147) {
		this.probCattura = 5;
	}

	//pokemon con due evoluzione al secondo stadio
	if( n == 10+1 || n == 13+1 || n == 16+1 || n == 29+1 || n == 32+1 || n == 43+1 || n == 60+1 || n == 63+1 || n == 66+1 || n == 69+1 || n == 74+1 || n == 93+1 || n == 147+1) {
		this.probCattura = 4;
	}

	//pokemon con due evoluzione al terzo stadio
	if(n == 10+2 || n == 13+2 || n == 16+2 || n == 29+2 || n == 32+2 || n == 43+2 || n == 60+2 || n == 63+2 || n == 66+2 || n == 69+2 || n == 74+2 || n == 93+2 || n == 147+2) {
		this.probCattura = 3;
	}

	//pokemon con nessuna evoluzione
	if(n == 83 || n == 95 || n == 106 || n == 107 || n == 108 || n == 113 || n == 114 || n == 115 || n == 122 || n == 123 || n == 124 || n == 125 || n == 126 || n == 127 || n == 128 || n == 131 || n == 132 || n == 137 || n == 142 || n == 143) {
		this.probCattura = 3;
	}

	//starter prima evoluzione

	if(n == 1 || n == 4 || n == 7) {
			this.probCattura = 4;
	}

		//starter seconda evoluzione
		if(n == 2 || n == 5 || n == 8) {
			this.probCattura = 3;
		}

		//starter terza evoluzione
		if(n == 3 || n == 6 || n == 9) {
			this.probCattura = 2;
		}

	
	//leggendario
	if(n == 144 || n == 145 || n == 146 || n == 150 || n == 151) {
		this.probCattura = 1;
	}
	}
}

function Natura() {
	this.nome = " ";
	this.id = 0;
	this.statAumentata = "";
	this.statDiminuita ="";
}

function Type() {
	this.nome = "";
	this.setNome = function(nome) {
		this.nome = nome;
	}

	this.weaks = ["", "", "", "", ""]
}

function chooseLocation() {
	var milano = {lat: 45.4642700, lng: 9.1895100, id: 0};
	var roma = {lat: 41.8954656, lng: 12.4823243, id: 1};
	var berlino = {lat: 52.52000659999999, lng: 13.404953999999975, id: 2};
	var londra = {lat: 51.5073509, lng: -0.12775829999998223, id: 3};
	var madrid = {lat: 40.4167754, lng: -3.7037901999999576, id: 4};
	var barcellona = {lat: 41.3850639, lng: 2.1734034999999494, id: 5};
	var bucarest = {lat: 44.4267674, lng: 26.102538399999958, id: 6};
	var praga = {lat: 50.0755381, lng: 14.43780049999998, id: 7};
	var varsavia = {lat: 52.2296756, lng: 21.012228700000037, id: 8};
	var vienna = {lat: 48.2081743, lng: 16.37381890000006, id: 9};
	var atene = {lat: 37.9838096, lng: 23.727538800000048, id: 10};
	var parigi = {lat: 48.856614, lng: 2.3522219000000177, id: 11};
	var monaco = {lat: 48.1351253, lng: 11.581980499999986, id: 12};
	var dublino = {lat: 53.3498053, lng: -6.260309699999993, id: 13};
	var amsterdam = {lat: 52.3679843, lng: 4.903561399999944, id: 14};
	var locScelta= [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];
	var index = 0;
	var i = 0;


	while (i < 14) {
		index = Math.round(14*Math.random());
		if(!locScelta[index]) {
			switch (index) {
				case 0:
					latitudine[i] = milano.lat;
					longitudine[i] = milano.lng;
					locScelta[index] = true;
					i++;
					break;
				case 1:
					latitudine[i] = roma.lat;
					longitudine[i] = roma.lng;
					locScelta[index] = true;
					i++;
					break;
				case 2:
					latitudine[i] = berlino.lat;
					longitudine[i] = berlino.lng;
					locScelta[index] = true;
					i++;
					break;
				case 3:
					latitudine[i] = londra.lat;
					longitudine[i] = londra.lng;
					locScelta[index] = true;
					i++;
					break;
				case 4:
					latitudine[i] = madrid.lat;
					longitudine[i] = madrid.lng;
					locScelta[index] = true;
					i++;
					break;
				case 5:
					latitudine[i] = barcellona.lat;
					longitudine[i] = barcellona.lng;
					locScelta[index] = true;
					i++;
					break;
				case 6:
					latitudine[i] = bucarest.lat;
					longitudine[i] = bucarest.lng;
					locScelta[index] = true;
					i++;
					break;
				case 7:
					latitudine[i] = praga.lat;
					longitudine[i] = praga.lng;
					locScelta[index] = true;
					i++;
					break;
				case 8:
					latitudine[i] = varsavia.lat;
					longitudine[i] = varsavia.lng;
					locScelta[index] = true;
					i++;
					break;
				case 9:
					latitudine[i] = vienna.lat;
					longitudine[i] = vienna.lng;
					locScelta[index] = true;
					i++;
					break;
				case 10:
					latitudine[i] = atene.lat;
					longitudine[i] = atene.lng;
					locScelta[index] = true;
					i++;
					break;
				case 11:
					latitudine[i] = parigi.lat;
					longitudine[i] = parigi.lng;
					locScelta[index] = true;
					i++;
					break;
				case 12:
					latitudine[i] = monaco.lat;
					longitudine[i] = monaco.lng;
					locScelta[index] = true;
					i++;
					break;
				case 13:
					latitudine[i] = dublino.lat;
					longitudine[i] = dublino.lng;
					locScelta[index] = true;
					i++;
					break;
				case 14:
					latitudine[i] = amsterdam.lat;
					longitudine[i] = amsterdam.lng;
					locScelta[index] = true;
					i++;
					break;
			}
		}
	}

	
}

function primaMaiuscola(stringa) {
	var stringaNuova = stringa.charAt(0).toUpperCase() + stringa.substr(1);
	return stringaNuova;
}


var data = {
  	set: function(key, value) {
    	if (!key || !value) {return;}

    	if (typeof value === "object") {
      		value = JSON.stringify(value);
    	}
    	localStorage.setItem(key, value);
	},
	get: function(key) {
    	var value = localStorage.getItem(key);

    	if (!value) {return;}

    	if (value == null) { return false };

    	// assume it is an object that has been stringified
    	if (value[0] === "{") {
      		value = JSON.parse(value);
    	}

    	return value;
  	}
}

var catturati = [];
if(data.get("pokemonCatturati") != "undefinied") {
	var datiSalvatiCatturati = JSON.parse(data.get("pokemonCatturati"));
	catturati = datiSalvatiCatturati;
}


function stampaCattura(id) {

	$(".fix").css("display", "none");
	$(".cerchio").empty();
	$(".sfera").empty();
	$(".nome").empty();

	if (localStorage.pokeball > 0) {
		$(".fix").css("display", "block");
		$(".cerchio").css("display", "block");
		$(".nome").append('<h2 style="color: #fff;" id="nomePokemonDaCatturare">Cattura ' + apparsi[id-1].nome.toUpperCase() + '!</h2><br><br>');
		$(".cerchio").append('<img src=' + apparsi[id-1].img + ' <br><br>');
		$(".sfera").append('<img src="pokeball.png" onclick="cattura(' + id + ')"></img>'); 
	}
	else alert("Non hai più pokeball!")

}

function cattura(id) {
	var coloreS = $(".cerchio").css("border-color");
	var colore = coloreS.slice(4);
	var rosso = "";
	var verde = "";
	var blu = "";
	var i = 0;
	var tentativi = getRandomIntInclusive(8, 15);
	var probCatturaLancio = 0;

	do{
		rosso = rosso + colore.charAt(i);
		i++;
	}
	while(colore.charAt(i) != ',');

	i++;

	do{
		verde = verde + colore.charAt(i);
		i++;
	}
	while(colore.charAt(i) != ',');

	i++;

	do{
		blu = blu + colore.charAt(i);
		i++;
	}
	while(colore.charAt(i) != ')');

	if(rosso > 200 && verde < 110) probCatturaLancio = 0;
	if(rosso > 200 && verde > 100) probCatturaLancio = 1;
	if(verde > parseInt(rosso) && verde > parseInt(blu)) probCatturaLancio = 2;
	if(blu > parseInt(rosso) && verde < parseInt(blu)) probCatturaLancio = 3;

	if(lanci >  tentativi) {
		alert('Il pokemon è fuggito!');
		apparePokemon();
	}

	if(id == 1) {
		probTotale = p1.probCattura + probCatturaLancio;
		var p = getRandomIntInclusive(1, 17);
		if(p <= probTotale) {
			var pCaught = jQuery.extend(true, {}, p1);
		    catturati.push(pCaught);
		    data.set("pokemonCatturati", catturati);
		    alert('Il pokemon è stato catturato');
		    localStorage.caramelle = Number(localStorage.caramelle) +3;
		    localStorage.esperienza = Number(localStorage.esperienza) +10;
		    localStorage.soldi = Number(localStorage.soldi) +10;
		    lanci = 0;
		    apparePokemon();

		}
		else alert('Maledizione, è uscito dalla pokeball!');
		localStorage.pokeball = Number(localStorage.pokeball) -1;
		lanci++;
	}

	if(id == 2) {
		probTotale = p2.probCattura + probCatturaLancio;
		var p = getRandomIntInclusive(1, 17);
		if(p <= probTotale) {
			var pCaught = jQuery.extend(true, {}, p2);
		    catturati.push(pCaught);
		    data.set("pokemonCatturati", catturati);
		    alert('Il pokemon è stato catturato');
		    localStorage.caramelle = Number(localStorage.caramelle) +3;
		    localStorage.esperienza = Number(localStorage.esperienza) +10;
		    localStorage.soldi = Number(localStorage.soldi) +10;
		    lanci = 0;
		    apparePokemon();
		}
		else alert('Maledizione, è uscito dalla pokeball!');
		localStorage.pokeball = Number(localStorage.pokeball) -1;
		lanci++;
	}

	if(id == 3) {
		probTotale = p3.probCattura + probCatturaLancio;
		var p = getRandomIntInclusive(1, 17);
		if(p <= probTotale) {
			var pCaught = jQuery.extend(true, {}, p3);
		    catturati.push(pCaught);
		    data.set("pokemonCatturati", catturati);
		    alert('Il pokemon è stato catturato');
		    localStorage.caramelle = Number(localStorage.caramelle) +3;
		    localStorage.esperienza = Number(localStorage.esperienza) +10;
		    localStorage.soldi = Number(localStorage.soldi) +10;
		    lanci = 0;
		    apparePokemon();
		}
		else alert('Maledizione, è uscito dalla pokeball!');
		localStorage.pokeball = Number(localStorage.pokeball) -1;
		lanci++;
	}

	if(id == 4) {
		probTotale = p4.probCattura + probCatturaLancio;
		var p = getRandomIntInclusive(1, 17);
		if(p <= probTotale) {
			var pCaught = jQuery.extend(true, {}, p4);
		    catturati.push(pCaught);
		    data.set("pokemonCatturati", catturati);
		    alert('Il pokemon è stato catturato');
		    localStorage.caramelle = Number(localStorage.caramelle) +3;
		    localStorage.esperienza = Number(localStorage.esperienza) +10;
		    localStorage.soldi = Number(localStorage.soldi) +10;
		    lanci = 0;
		    apparePokemon();
		}
		else alert('Maledizione, è uscito dalla pokeball!');
		localStorage.pokeball = Number(localStorage.pokeball) -1;
		lanci++;
	}

	if(id == 5) {
		probTotale = p5.probCattura + probCatturaLancio;
		var p = getRandomIntInclusive(1, 17);
		if(p <= probTotale) {
			var pCaught = jQuery.extend(true, {}, p5);
		    catturati.push(pCaught);
		    data.set("pokemonCatturati", catturati);
		    alert('Il pokemon è stato catturato');
		    localStorage.caramelle = Number(localStorage.caramelle) +3;
		    localStorage.esperienza = Number(localStorage.esperienza) +10;
		    localStorage.soldi = Number(localStorage.soldi) +10;
		    lanci = 0;
		    apparePokemon();
		}
		else alert('Maledizione, è uscito dalla pokeball!');
		localStorage.pokeball = Number(localStorage.pokeball) -1;
		lanci++;
	}

	if(id == 6) {
		probTotale = p6.probCattura + probCatturaLancio;
		var p = getRandomIntInclusive(1, 17);
		if(p <= probTotale) {
			var pCaught = jQuery.extend(true, {}, p6);
		    catturati.push(pCaught);
		    data.set("pokemonCatturati", catturati);
		    alert('Il pokemon è stato catturato');
		    localStorage.caramelle = Number(localStorage.caramelle) +3;
		    localStorage.esperienza = Number(localStorage.esperienza) +10;
		    localStorage.soldi = Number(localStorage.soldi) +10;
		    lanci = 0;
		    apparePokemon();
		}
		else alert('Maledizione, è uscito dalla pokeball!');
		localStorage.pokeball = Number(localStorage.pokeball) -1;
		lanci++;
	}
}


	

function stampaCatturati() {
	for(var i = 0; i < catturati.length; i++) {
		$(".listCaught").append('<div class="col-md-3 pokemon"><h2>' + catturati[i].nome.toUpperCase() + '</h2><img src=' + catturati[i].img + '><br><h5>Natura: </h5><p>' + catturati[i].natura.nome.toUpperCase() + '</p><h5>IVs: </h5><p>' + catturati[i].valutazione + '</p><p><button type="button" class="btn cattura" onclick="mostraDettagli('+ i +')">Dettagli &raquo;</button></p></div>');
	}
}

function mostraDettagli(index) {
	$(".details").empty();
	$(".details").append('<h2>' + catturati[index].nome.toUpperCase() + ' #' + catturati[index].numeroPoke + '</h2><br><h5>Lvl: </h5><p>' + catturati[index].livello + '</h2><br><h5>Natura: </h5><p>' + catturati[index].natura.nome.toUpperCase() + ', statistiche modificate: ' + catturati[index].natura.statAumentata + '++ e ' + catturati[index].natura.statDiminuita + '-- <br></p><h5>IVs: </h5><p>Velocità: ' + catturati[index].Iv[0] + ', DefSpe: ' + catturati[index].Iv[1] + ', AttSpe: ' + catturati[index].Iv[2] + ', Difesa: ' + catturati[index].Iv[3] + ', Attacco: ' + catturati[index].Iv[4] + ', PS: ' + catturati[index].Iv[5] + '</p><h5>Statistiche: </h5><p>Velocità: ' + catturati[index].statsReal[0] + ', DefSpe: ' + catturati[index].statsReal[1] + ', AttSpe: ' + catturati[index].statsReal[2] + ', Difesa: ' + catturati[index].statsReal[3] + ', Attacco: ' + catturati[index].statsReal[4] + ', PS: ' + catturati[index].statsReal[5] + '</p>');
	$(".details").append("<img src=" + catturati[index].typeImg[0] + "> ");
			if(catturati[index].type[1] != "Type2") {
				$(".details").append("<img src=" + catturati[index].typeImg[1] + ">");
			}
	$(".details").append('<p><button type="button" class="btn cattura" onclick="evoluzione(' + index + ')">Evolvi &raquo;</button></p>');
}

function cancellaDati() {
	localStorage.removeItem("pokemonCatturati");
	localStorage.removeItem("pokeball");
	localStorage.removeItem("caramelle");
	localStorage.removeItem("soldi");
	localStorage.removeItem("esperienza");
}

function loadMapScenario() {
                var map = new Microsoft.Maps.Map(document.getElementById('map-canvas'), {
                	center: new Microsoft.Maps.Location(49.79130439999999, 9.953354799999943),
                	zoom: 4,
                });

                chooseLocation();

                var loc1 = new Microsoft.Maps.Location(latitudine[0], longitudine[0]);
                var pushpin1 = new Microsoft.Maps.Pushpin(loc1, { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + p1.nome + '.png',});

                var loc2 = new Microsoft.Maps.Location(latitudine[1], longitudine[1]);
                var pushpin2 = new Microsoft.Maps.Pushpin(loc2, { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + p2.nome + '.png',});

                var loc3 = new Microsoft.Maps.Location(latitudine[2], longitudine[2]);
                var pushpin3 = new Microsoft.Maps.Pushpin(loc3, { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + p3.nome + '.png',});

                var loc4 = new Microsoft.Maps.Location(latitudine[3], longitudine[3]);
                var pushpin4 = new Microsoft.Maps.Pushpin(loc4, { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + p4.nome + '.png',});

                var loc5 = new Microsoft.Maps.Location(latitudine[4], longitudine[4]);
                var pushpin5 = new Microsoft.Maps.Pushpin(loc5, { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + p5.nome + '.png',});

                var loc6 = new Microsoft.Maps.Location(latitudine[5], longitudine[5]);
                var pushpin6 = new Microsoft.Maps.Pushpin(loc6, { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + p6.nome + '.png',});

                //Poke Market
                var loc7 = new Microsoft.Maps.Location(59.32932349999999, 18.068580800000063);
                var pushpin7 = new Microsoft.Maps.Pushpin(loc7, { icon: 'mystic.png',});

                //Poke Gym
                var loc8 = new Microsoft.Maps.Location(59.9138688, 10.752245399999993);
                var pushpin8 = new Microsoft.Maps.Pushpin(loc8, { icon: 'valor.png',});

                var infobox1 = new Microsoft.Maps.Infobox(loc1, 
                	{ title: p1.nome.toUpperCase() + ", lv: "+ p1.livello,
                	  description: '<a href="#" onclick="stampaCattura(1)"> Catturalo!</a>',
     				  visible: false, 
                    });
				infobox1.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin1, 'click', function () {
     				infobox1.setOptions({ visible: true });
				 });

				var infobox2 = new Microsoft.Maps.Infobox(loc2, 
                	{ title: p2.nome.toUpperCase() + ", lv: "+ p2.livello,
                	  description: '<a href="#" onclick="stampaCattura(2)"> Catturalo!</a>',
     				  visible: false, 
                    });
				infobox2.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
     				infobox2.setOptions({ visible: true });
				 });

				var infobox3 = new Microsoft.Maps.Infobox(loc3, 
                	{ title: p3.nome.toUpperCase() + ", lv: "+ p3.livello,
                	  description: '<a href="#" onclick="stampaCattura(3)"> Catturalo!</a>',
     				  visible: false, 
                    });
				infobox3.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin3, 'click', function () {
     				infobox3.setOptions({ visible: true });
				 });

				var infobox4 = new Microsoft.Maps.Infobox(loc4, 
                	{ title: p4.nome.toUpperCase() + ", lv: "+ p4.livello,
                	  description: '<a href="#" onclick="stampaCattura(4)"> Catturalo!</a>',
     				  visible: false, 
                    });
				infobox4.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin4, 'click', function () {
     				infobox4.setOptions({ visible: true });
				 });

				var infobox5 = new Microsoft.Maps.Infobox(loc5, 
                	{ title: p5.nome.toUpperCase() + ", lv: "+ p5.livello,
                	  description: '<a href="#" onclick="stampaCattura(5)"> Catturalo!</a>',
     				  visible: false, 
                    });
				infobox5.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin5, 'click', function () {
     				infobox5.setOptions({ visible: true });
				 });

				var infobox6 = new Microsoft.Maps.Infobox(loc6, 
                	{ title: p6.nome.toUpperCase() + ", lv: "+ p6.livello,
                	  description: '<a href="#" onclick="stampaCattura(6)"> Catturalo!</a>',
     				  visible: false, 
                    });
				infobox6.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin6, 'click', function () {
     				infobox6.setOptions({ visible: true });
				 });

				var infobox7 = new Microsoft.Maps.Infobox(loc7, 
                	{ title: "Pokemon Market",
                	  description: '<a href="#" onclick="compraPokeball()"> Compra pokeball</a>',
     				  visible: false, 
                    });
				infobox7.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin7, 'click', function () {
     				infobox7.setOptions({ visible: true });
				 });

				var infobox8 = new Microsoft.Maps.Infobox(loc8, 
                	{ title: "Gym",
                	  description: 'Prossimamente disponibile!',
     				  visible: false, 
                    });
				infobox8.setMap(map);
				Microsoft.Maps.Events.addHandler(pushpin8, 'click', function () {
     				infobox8.setOptions({ visible: true });
				 });
				map.entities.push(pushpin1);
				map.entities.push(pushpin2);
				map.entities.push(pushpin3);
				map.entities.push(pushpin4);
				map.entities.push(pushpin5);
				map.entities.push(pushpin6);
				map.entities.push(pushpin7);
				map.entities.push(pushpin8);
                

     //            var loc = [];
     //            var pushpin = [];
     //            var infobox = [];

     //            for (var i = 0; i < apparsi.length; i++) {
     //            	var x = new Microsoft.Maps.Location(latitudine[i], longitudine[i]);
     //            	loc[i] = x;
     //            	var y = new Microsoft.Maps.Pushpin(loc[i], { icon: 'https://play.pokemonshowdown.com/sprites/dpp/' + apparsi[i].nome + '.png',});
     //            	pushpin[i] = y;
     //            	var z = new Microsoft.Maps.Infobox(loc[i], { 
     //            				title: apparsi[i].nome.toUpperCase(),
     // 				  			visible: false, 
     // 				  			actions: [ { 
     // 				  							label: 'Catturalo!', 
     // 				  	        				eventHandler: function () {
     //                            					cattura(i+1);
     //                              				}
     //                          				}
     //                           			]
     //                });
     //                infobox[i] = z;
					// infobox[i].setMap(map);
				 //    map.entities.push(pushpin[i]);
     //            }

     //            	Microsoft.Maps.Events.addHandler(pushpin[0], 'click', function () {
     // 				infobox[0].setOptions({ visible: true });
			  // 		});   
			  // 		Microsoft.Maps.Events.addHandler(pushpin[1], 'click', function () {
     // 				infobox[1].setOptions({ visible: true });
			  // 		});  
			  // 		Microsoft.Maps.Events.addHandler(pushpin[2], 'click', function () {
     // 				infobox[2].setOptions({ visible: true });
			  // 		});  
			  // 		Microsoft.Maps.Events.addHandler(pushpin[3], 'click', function () {
     // 				infobox[3].setOptions({ visible: true });
			  // 		});  
			  // 		Microsoft.Maps.Events.addHandler(pushpin[4], 'click', function () {
     // 				infobox[4].setOptions({ visible: true });
			  // 		});  
			  // 		Microsoft.Maps.Events.addHandler(pushpin[5], 'click', function () {
     // 				infobox[5].setOptions({ visible: true });
			  // 		});           
}



                
function checkLegendary(n) {
	var possibilitySpawn = 0;
	//starter prima evoluzione
	if(n == 1 || n == 4 || n == 7) {
		//genero un numero casuale per la possibilità che questo pokemon spawni
		possibilitySpawn = Math.round(2*Math.random());
		if(possibilitySpawn == 0) return false;
		else return true;
	}

	//starter seconda evoluzione
	if(n == 2 || n == 5 || n == 8) {
		//genero un numero casuale per la possibilità che questo pokemon spawni
		possibilitySpawn = Math.round(3*Math.random());
		if(possibilitySpawn == 0) return false;
		else return true;
	}

	//starter terza evoluzione
	if(n == 3 || n == 6 || n == 9) {
		//genero un numero casuale per la possibilità che questo pokemon spawni
		possibilitySpawn = Math.round(4*Math.random());
		if(possibilitySpawn == 0) return false;
		else return true;
	}

	//seconda evoluzione 
	if(n == 11 || n == 14 || n == 17 || n == 20 || n == 22 || n == 24 || n == 26 || n == 28 || n == 30 || n == 33 || n == 36 || n == 38 || n == 40 || n == 42 || n == 44 || n == 47 || n == 49 || n == 51 || n == 53 || n == 55 || n == 57 || n == 59 || n == 61 || n == 64 || n == 67|| n == 70 || n == 73 || n == 75|| n == 78 || n == 80 || n == 82|| n == 85 || n == 87 || n == 89|| n == 91 || n == 93 || n == 97|| n == 99 || n == 101 || n == 103|| n == 105 || n == 110 || n == 112|| n == 117 || n == 119 || n == 121 || n == 130 || n == 134 || n == 135 || n == 136 || n == 139 || n == 141) {
		//genero un numero casuale per la possibilità che questo pokemon spawni
		possibilitySpawn = Math.round(1*Math.random());
		if(possibilitySpawn == 0) return false;
		else return true;
	}

	//terza evoluzione
	if(n == 12 || n == 15 || n == 18 || n == 31 || n == 34 || n == 45 || n == 62 || n == 65 || n == 68 || n == 71 || n == 76 || n == 94) {
		//genero un numero casuale per la possibilità che questo pokemon spawni
		possibilitySpawn = Math.round(2*Math.random());
		if(possibilitySpawn == 0) return false;
		else return true;
	}

	//leggendario
	if(n == 144 || n == 145 || n == 146 || n == 147 || n == 148 || n == 149 || n == 150 || n == 151) {
		//genero un numero casuale per la possibilità che questo pokemon spawni
		possibilitySpawn = Math.round(7*Math.random());
		if(possibilitySpawn == 0) {
			return false;
			alert('Pokemon leggendario in vista!')
		}
		else return true;
	}
	return false;
}

function checkLivello(n) {
	var possibilityLvl = 0;
	//pokemon con una sola evoluzione al primo stadio
	if(n == 19 || n == 21 || n == 23 || n == 25 || n == 27|| n == 35 || n == 37 || n == 39 || n == 41|| n == 46 || n == 48 || n == 50 || n == 52 || n == 54 || n == 56 || n == 58 || n == 72 || n == 77 || n == 79 || n == 81 || n == 84 || n == 86 || n == 88 || n == 90 || n == 96 || n == 98 || n == 100 || n == 102 || n == 104 || n == 109 || n == 111 || n == 116 || n == 118 || n == 120 || n == 129 || n == 133 || n == 138 || n == 140 || n == 142) {
		possibilityLvl = getRandomIntInclusive(1, 10)
		if(possibilityLvl <= 7) return getRandomIntInclusive(5, 25);
		else if(possibilityLvl <= 9) return getRandomIntInclusive(26, 40);
		else return getRandomIntInclusive(41, 50);
	}

	//pokemon con una sola evoluzione al secondo stadio
	if(n == 19+1 || n == 21+1 || n == 23+1 || n == 25+1 || n == 27+1|| n == 35+1 || n == 37+1 || n == 39+1 || n == 41+1 || n == 46+1 || n == 48+1 || n == 50+1 || n == 52+1 || n == 54+1 || n == 56+1 || n == 58+1 || n == 72+1 || n == 77+1 || n == 79+1 || n == 81+1 || n == 84+1 || n == 86+1 || n == 88+1 || n == 90+1 || n == 96+1 || n == 98+1 || n == 100+1 || n == 102+1 || n == 104+1 || n == 109+1 || n == 111+1 || n == 116+1 || n == 118+1 || n == 120+1 || n == 129+1 || n == 133+1 || n == 133+2 || n == 133+3 || n == 138+1 || n == 140+1 || n == 142+1) {
		possibilityLvl = getRandomIntInclusive(1, 100)
		if(possibilityLvl <= 70) return getRandomIntInclusive(30, 50);
		else if(possibilityLvl <= 90) return getRandomIntInclusive(51, 60);
		else if(possibilityLvl <= 97) return getRandomIntInclusive(61, 70);
		else return getRandomIntInclusive(71, 75);
	}

	//pokemon con due evoluzione al primo stadio
	if(n == 1 || n == 4 || n == 7 || n == 10 || n == 13 || n == 16 || n == 29 || n == 32 || n == 43 || n == 60 || n == 63 || n == 66 || n == 69 || n == 74 || n == 92 || n == 147) {
		possibilityLvl = getRandomIntInclusive(1, 100)
		if(possibilityLvl <= 70) return getRandomIntInclusive(5, 15);
		else if(possibilityLvl <= 90) return getRandomIntInclusive(16, 20);
		else return getRandomIntInclusive(21, 25);
	}

	//pokemon con due evoluzione al secondo stadio
	if(n == 1+1 || n == 4+1 || n == 7+1 || n == 10+1 || n == 13+1 || n == 16+1 || n == 29+1 || n == 32+1 || n == 43+1 || n == 60+1 || n == 63+1 || n == 66+1 || n == 69+1 || n == 74+1 || n == 92+1 || n == 147+1) {
		possibilityLvl = getRandomIntInclusive(1, 100)
		if(possibilityLvl <= 70) return getRandomIntInclusive(25, 40);
		else if(possibilityLvl <= 90) return getRandomIntInclusive(41, 50);
		else return getRandomIntInclusive(51, 55);
	}

	//pokemon con due evoluzione al terzo stadio
	if(n == 1+2 || n == 4+2 || n == 7+2 || n == 10+2 || n == 13+2 || n == 16+2 || n == 29+2 || n == 32+2 || n == 43+2 || n == 60+2 || n == 63+2 || n == 66+2 || n == 69+2 || n == 74+2 || n == 92+2 || n == 147+2) {
		possibilityLvl = getRandomIntInclusive(1, 100)
		if(possibilityLvl <= 25) return getRandomIntInclusive(30, 50);
		else if(possibilityLvl <= 95) return getRandomIntInclusive(51, 65);
		else return getRandomIntInclusive(66, 75);
	}

	//pokemon con nessuna evoluzione
	if(n == 83 || n == 95 || n == 106 || n == 107 || n == 108 || n == 113 || n == 114 || n == 115 || n == 122 || n == 123 || n == 124 || n == 125 || n == 126 || n == 127 || n == 128 || n == 131 || n == 132 || n == 137 || n == 142 || n == 143) {
		possibilityLvl = getRandomIntInclusive(1, 100)
		if(possibilityLvl <= 20) return getRandomIntInclusive(5, 30);
		else if(possibilityLvl <= 80) return getRandomIntInclusive(31, 60);
		else return getRandomIntInclusive(60, 75);
	}

	
	//leggendario
	if(n == 144 || n == 145 || n == 146 || n == 150 || n == 151) {
		possibilityLvl = getRandomIntInclusive(80, 100)
		return possibilityLvl;
	}

	return 0;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso 
}

function compraPokeball() {
	var req = prompt("Quante pokeball vuoi comprare?", 0);
	var spesa = req*15;
	if(spesa > localStorage.soldi) alert("Non hai soldi a sufficienza.");
	else {
		var conf = prompt(req + " pokeball costano " + spesa + ", vuoi procedere?", "Si/No.");
		if(conf == "Si") {
			localStorage.pokeball = localStorage.pokeball = Number(localStorage.pokeball) + req;
			localStorage.soldi = Number(localStorage.soldi) - spesa;
		}
	}
}

//n è l'indice dell'array catturati che mi indica la posizione del pokemon che voglio livellare
function aumentaLivello(n) {
	//pokemon con una sola evoluzione al primo stadio
	if(n == 19 || n == 21 || n == 23 || n == 25 || n == 27|| n == 35 || n == 37 || n == 39 || n == 41|| n == 46 || n == 48 || n == 50 || n == 52 || n == 54 || n == 56 || n == 58 || n == 72 || n == 77 || n == 79 || n == 81 || n == 84 || n == 86 || n == 88 || n == 90 || n == 96 || n == 98 || n == 100 || n == 102 || n == 104 || n == 109 || n == 111 || n == 116 || n == 118 || n == 120 || n == 129 || n == 133 || n == 138 || n == 140 || n == 142) {
		if(localStorage.caramelle == 0) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 100)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -1;
			localStorage.esperienza = Number(localStorage.esperienza) -100;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}

	}

	//pokemon con una sola evoluzione al secondo stadio
	if(n == 19+1 || n == 21+1 || n == 23+1 || n == 25+1 || n == 27+1|| n == 35+1 || n == 37+1 || n == 39+1 || n == 41+1 || n == 46+1 || n == 48+1 || n == 50+1 || n == 52+1 || n == 54+1 || n == 56+1 || n == 58+1 || n == 72+1 || n == 77+1 || n == 79+1 || n == 81+1 || n == 84+1 || n == 86+1 || n == 88+1 || n == 90+1 || n == 96+1 || n == 98+1 || n == 100+1 || n == 102+1 || n == 104+1 || n == 109+1 || n == 111+1 || n == 116+1 || n == 118+1 || n == 120+1 || n == 129+1 || n == 133+1 || n == 133+2 || n == 133+3 || n == 138+1 || n == 140+1 || n == 142+1) {
		if(localStorage.caramelle < 2) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 250)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -2;
			localStorage.esperienza = Number(localStorage.esperienza) -250;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}
	}

	//pokemon con due evoluzione al primo stadio
	if(n == 1 || n == 4 || n == 7 || n == 10 || n == 13 || n == 16 || n == 29 || n == 32 || n == 43 || n == 60 || n == 63 || n == 66 || n == 69 || n == 74 || n == 92 || n == 147) {
		if(localStorage.caramelle == 0) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 100)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -1;
			localStorage.esperienza = Number(localStorage.esperienza) -100;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}
	}

	//pokemon con due evoluzione al secondo stadio
	if(n == 1+1 || n == 4+1 || n == 7+1 || n == 10+1 || n == 13+1 || n == 16+1 || n == 29+1 || n == 32+1 || n == 43+1 || n == 60+1 || n == 63+1 || n == 66+1 || n == 69+1 || n == 74+1 || n == 92+1 || n == 147+1) {
		if(localStorage.caramelle < 2) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 250)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -2;
			localStorage.esperienza = Number(localStorage.esperienza) -250;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}
	}

	//pokemon con due evoluzione al terzo stadio
	if(n == 1+2 || n == 4+2 || n == 7+2 || n == 10+2 || n == 13+2 || n == 16+2 || n == 29+2 || n == 32+2 || n == 43+2 || n == 60+2 || n == 63+2 || n == 66+2 || n == 69+2 || n == 74+2 || n == 92+2 || n == 147+2) {
		if(localStorage.caramelle < 3) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 500)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -3;
			localStorage.esperienza = Number(localStorage.esperienza) -500;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}
	}

	//pokemon con nessuna evoluzione
	if(n == 83 || n == 95 || n == 106 || n == 107 || n == 108 || n == 113 || n == 114 || n == 115 || n == 122 || n == 123 || n == 124 || n == 125 || n == 126 || n == 127 || n == 128 || n == 131 || n == 132 || n == 137 || n == 142 || n == 143) {
		if(localStorage.caramelle == 0) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 250)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -1;
			localStorage.esperienza = Number(localStorage.esperienza) -250;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}
	}

	
	//leggendario
	if(n == 144 || n == 145 || n == 146 || n == 150 || n == 151) {
		if(localStorage.caramelle < 10) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 1000)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -10;
			localStorage.esperienza = Number(localStorage.esperienza) -1000;
			catturati[n].livello++;
			catturati[n].setStatsReal();
		}
	}
}

function evoluzione(index) {
	var n = catturati[index].numeroPoke;
	//pokemon con una sola evoluzione al primo stadio
	if(n == 19 || n == 21 || n == 23 || n == 25 || n == 27|| n == 35 || n == 37 || n == 39 || n == 41|| n == 46 || n == 48 || n == 50 || n == 52 || n == 54 || n == 56 || n == 58 || n == 72 || n == 77 || n == 79 || n == 81 || n == 84 || n == 86 || n == 88 || n == 90 || n == 96 || n == 98 || n == 100 || n == 102 || n == 104 || n == 109 || n == 111 || n == 116 || n == 118 || n == 120 || n == 129 || n == 133 || n == 138 || n == 140 || n == 142) {
		if(localStorage.caramelle <50 ) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 1000)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -50;
			localStorage.esperienza = Number(localStorage.esperienza) -1000;
			var pEv = new Pokemon()
			var P = new Pokedex.Pokedex({protocol: 'https'});
			P.getPokemonByName(n + 1).then(function(response) { 
				// response è l'oggetto con tutte le nostre informazioni
				pEv.setNome(response);
				pEv.setImg(response, n + 1);
				pEv.setType(response);	
				pEv.livello = catturati[index].livello * 2;
				for (var i = 0; i < pEv.statsBase.length; i++) {
					pEv.statsBase[i] = catturati[index].statsBase[i] * 0.3;
				}
				for (var i = 0; i < pEv.statsBase.length; i++) {
					pEv.Iv[i] = catturati[index].Iv[i];
				}
				pEv.valutazionePokemon();
				pEv.setNumeroPoke(n + 1);
				if(catturati[index].isShiny) pEv.isShiny = true;
				pEv.setStatsReal();
				pEv.natura = catturati[index].natura;
				var pClone = jQuery.extend(true, {}, pEv);
				catturati[index] = pClone;
		    	data.set("pokemonCatturati", catturati);
		    	alert("Il pokemon si è evoluto!");
				})
				.catch(function(err) {
					console.log(err)
				});
			}
	}

	//pokemon con una sola evoluzione al secondo stadio
	if(n == 19+1 || n == 21+1 || n == 23+1 || n == 25+1 || n == 27+1|| n == 35+1 || n == 37+1 || n == 39+1 || n == 41+1 || n == 46+1 || n == 48+1 || n == 50+1 || n == 52+1 || n == 54+1 || n == 56+1 || n == 58+1 || n == 72+1 || n == 77+1 || n == 79+1 || n == 81+1 || n == 84+1 || n == 86+1 || n == 88+1 || n == 90+1 || n == 96+1 || n == 98+1 || n == 100+1 || n == 102+1 || n == 104+1 || n == 109+1 || n == 111+1 || n == 116+1 || n == 118+1 || n == 120+1 || n == 129+1 || n == 133+1 || n == 133+2 || n == 133+3 || n == 138+1 || n == 140+1 || n == 142+1) {
		alert('Il pokemon non si può evolvere ulteriormente.');
	}

	//pokemon con due evoluzione al primo stadio
	if(n == 1 || n == 4 || n == 7 || n == 10 || n == 13 || n == 16 || n == 29 || n == 32 || n == 43 || n == 60 || n == 63 || n == 66 || n == 69 || n == 74 || n == 92 || n == 147) {
		if(localStorage.caramelle < 25) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 500)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -25;
			localStorage.esperienza = Number(localStorage.esperienza) -500;
			var pEv = new Pokemon()
			var P = new Pokedex.Pokedex({protocol: 'https'});
			P.getPokemonByName(n + 1).then(function(response) { 
				// response è l'oggetto con tutte le nostre informazioni
				pEv.setNome(response);
				pEv.setImg(response, n + 1);
				pEv.setType(response);	
				pEv.livello = catturati[index].livello * 2;
				for (var i = 0; i < pEv.statsBase.length; i++) {
					pEv.statsBase[i] = catturati[index].statsBase[i] * 0.3;
				}
				for (var i = 0; i < pEv.statsBase.length; i++) {
					pEv.Iv[i] = catturati[index].Iv[i];
				}
				pEv.valutazionePokemon();
				pEv.setNumeroPoke(n + 1);
				if(catturati[index].isShiny) pEv.isShiny = true;
				pEv.setStatsReal();
				pEv.natura = catturati[index].natura;
				var pClone = jQuery.extend(true, {}, pEv);
				catturati[index] = pClone;
		    	data.set("pokemonCatturati", catturati);
		    	alert("Il pokemon si è evoluto!");
				})
				.catch(function(err) {
					console.log(err)
				});
		}
	}

	//pokemon con due evoluzione al secondo stadio
	if(n == 1+1 || n == 4+1 || n == 7+1 || n == 10+1 || n == 13+1 || n == 16+1 || n == 29+1 || n == 32+1 || n == 43+1 || n == 60+1 || n == 63+1 || n == 66+1 || n == 69+1 || n == 74+1 || n == 92+1 || n == 147+1) {
		if(localStorage.caramelle < 100) 
			alert('Non hai abbastanza caramelle');
		else if(localStorage.esperienza < 2000)
			alert('Non hai abbastanza esperienza');
		else {
			localStorage.caramelle = Number(localStorage.caramelle) -100;
			localStorage.esperienza = Number(localStorage.esperienza) -2000;
			var pEv = new Pokemon()
			var P = new Pokedex.Pokedex({protocol: 'https'});
			P.getPokemonByName(n + 1).then(function(response) { 
				// response è l'oggetto con tutte le nostre informazioni
				pEv.setNome(response);
				pEv.setImg(response, n + 1);
				pEv.setType(response);	
				pEv.livello = catturati[index].livello * 2;
				for (var i = 0; i < pEv.statsBase.length; i++) {
					pEv.statsBase[i] = catturati[index].statsBase[i] * 0.3;
				}
				for (var i = 0; i < pEv.statsBase.length; i++) {
					pEv.Iv[i] = catturati[index].Iv[i];
				}
				pEv.valutazionePokemon();
				pEv.setNumeroPoke(n + 1);
				if(catturati[index].isShiny) pEv.isShiny = true;
				pEv.setStatsReal();
				pEv.natura = catturati[index].natura;
				var pClone = jQuery.extend(true, {}, pEv);
				catturati[index] = pClone;
		    	data.set("pokemonCatturati", catturati);
		    	alert("Il pokemon si è evoluto!");
				})
				.catch(function(err) {
					console.log(err)
				});
		}
	}

	//pokemon con due evoluzione al terzo stadio
	if(n == 1+2 || n == 4+2 || n == 7+2 || n == 10+2 || n == 13+2 || n == 16+2 || n == 29+2 || n == 32+2 || n == 43+2 || n == 60+2 || n == 63+2 || n == 66+2 || n == 69+2 || n == 74+2 || n == 92+2 || n == 147+2) {
		alert('Il pokemon non si può evolvere ulteriormente.');
	}

	//pokemon con nessuna evoluzione
	if(n == 83 || n == 95 || n == 106 || n == 107 || n == 108 || n == 113 || n == 114 || n == 115 || n == 122 || n == 123 || n == 124 || n == 125 || n == 126 || n == 127 || n == 128 || n == 131 || n == 132 || n == 137 || n == 142 || n == 143) {
		alert('Il pokemon non ha evoluzioni.');
	}

	
	//leggendario
	if(n == 144 || n == 145 || n == 146 || n == 150 || n == 151) {
		alert('Un pokemon leggendario non ha evoluzioni.');
	}
}