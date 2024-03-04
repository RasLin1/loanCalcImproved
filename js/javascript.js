//sätter all viktig information in i variabler så att värdena sparas och kan användas senare lätt
let laneBel = document.getElementById("lanebelopp");
let ranta = document.getElementById("ranta");
let avbetTid = document.getElementById("avbetalningstid");
let fastManAvg = document.getElementById("fast-manadsavgift");
let oppAvg = document.getElementById("oppningsavgift");
let calcForm = document.getElementById("calc-form")
//sätter värdet på hurudant lånat är, 1 = rakavbetalning och 2 = anuitet
let laneTyp = 0;
//sparar hur mycket amortering och ränta har betalas på lånet
let totRantaBet = 0;



//bestämmer om lånet är rak avbetalning eller annuitet
function laneTypSet(laneTypen){
	laneTyp = laneTypen;
}

function validateForm() {
	let valForm = calcForm.value;
	if (valForm == "") {
	  alert("Name must be filled out");
	  return false;
	}
	else{
  




//funktionen som räknar ut lånena
function calculate(loan) {
	//document.getElementById("long-answer-page").innerHTML = "";
	//gör så att korta svar sidan syns
	document.getElementById("quick-answer-page").style.display = "block";	
	
	//räknar månads ränta
	let manRanta = (ranta.value/100)/12;
	
	//räknar effektiva räntan för lånet
	let effRanta = (((parseFloat(ranta.value) / 100) + (((parseInt(fastManAvg.value) * 12) + (parseInt(oppAvg.value) / (avbetTid.value / 12))) / laneBel.value)) * 100).toFixed(2);
	
	//räknar effektiva räntan på lånet
	document.getElementById("effektiv-ranta").innerHTML = `<span class="short-answer-item">Effektiv ränta = ${effRanta}%</span><br><br>`;
	
	//räknar lån med rak avbetalning
	if(laneTyp == 1){
		//en lop som räknar alla delarna på nyt så många gånger som det finns månader för lånet
		for (x=0; x < avbetTid.value; x++){
			//ändrar på "long-answer-page" visibility för "display: block;" bråkade med sidan
			document.getElementById("long-answer-page").style.visibility = "visible";	
			//alla räkne delarna för rak avbetalning
			//räknar ut hur mycket månatliga amorteringen är
			let manAmortMangd = (laneBel.value / avbetTid.value).toFixed(2);
			//räknar ut hur mycket det är kvar på lånet
			let kvarLaneMangd = laneBel.value - (manAmortMangd * (x + 1)).toFixed(0);
			//räknar ut den månatliga ränte mängden
			let manRantaMangd = ((kvarLaneMangd + (laneBel.value / avbetTid.value)) * manRanta).toFixed(2);
			//räknar hur många månader du ennu måste betala på lånet
			let laneTid = avbetTid.value - (x);
			//räknar ut totala betalningen för månaden inklusive avgifterna
			let manBetalning = ((laneBel.value / avbetTid.value) + ((kvarLaneMangd + (laneBel.value / avbetTid.value)) * manRanta) + parseInt(fastManAvg.value)).toFixed(2);
			
				//räknar ut totala betalningen på räntan utan att lägga avgifter till
				totRantaBet += ((kvarLaneMangd + (laneBel.value / avbetTid.value)) * manRanta);
			
			//sätter all information relaterat till rak avbetalning in i HTML dokumentet
			document.getElementById("manad").innerHTML += `<span class="long-answer-item w20">${laneTid}</span><br>`;
			document.getElementById("manads-amortering").innerHTML += `<span class="long-answer-item w20">${manAmortMangd}€</span><br>`;
			document.getElementById("manads-ranta").innerHTML += `<span class="long-answer-item w20">${manRantaMangd}€</span><br>`;
			document.getElementById("manads-betalning").innerHTML += `<span class="long-answer-item w20">${manBetalning}€</span><br>`;
			document.getElementById("kvar-lan").innerHTML += `<span class="long-answer-item w20">${kvarLaneMangd}€</span><br>`;}
			
			//tar bort amortering betalningarna samt lägger till alla avgifter för att få totala avgifter och ränta på lånet
			let totLanBet = (totRantaBet + (parseInt(fastManAvg.value)*avbetTid.value) + parseInt(oppAvg.value)).toFixed(2);
			
			document.getElementById("totala-avgifter-och-ranta").innerHTML = `<span class="short-answer-item">Totala avgifter och ränta = ${totLanBet}€</span><br>`;
			}
		
	//räknar annuitet lån	
	else if(laneTyp == 2){
		
		//formeln för annuitets lån konverterat så att de borde fungera i kod

		//uträkningen för annuitetslån, formeln är konverterad till kod så att miskinen kan förstå
		let manRatBet = (laneBel.value * ((manRanta*(1 + manRanta)**avbetTid.value)/((1 + manRanta)**avbetTid.value - 1))).toFixed(2);
		//räknar ut totala avgifterna och räntan under lånet genom att ta månadsbetalningen och multiplisera den med avbetalningstiden, sedan så subtraheras lånebeloppet från värdet. Efter det är uträknat så läggs fasta månadsavgiften som är multiplicerad med avbetalningtiden till samt öppningsavgiften.
		let totLanBet = (((manRatBet * avbetTid.value)-laneBel.value) + (parseInt(fastManAvg.value)*avbetTid.value) + parseInt(oppAvg.value)).toFixed(2);

		document.getElementById("manadsrat").innerHTML = `<span class="short-answer-item">Månadsrat = ${manRatBet}€</span><br><br>`;
		document.getElementById("totala-avgifter-och-ranta").innerHTML = `<span class="short-answer-item">Totala avgifter och ränta = ${totLanBet}€</span><br><br>`;
		console.log(manRatBet);
		}
		
		
		
		}
	}
	} 