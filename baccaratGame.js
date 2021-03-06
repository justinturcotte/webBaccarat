var unshuffledFaces = [];
var unshuffledValues = [];
var shuffledFaces = [];
var shuffledValues = [];
var playerFaces = [];
var playerValues = [];
var bankerFaces = [];
var bankerValues = [];
var bankerHitTable = [
	[true,true,true,true,true,true,true,true,true,true],
	[true,true,true,true,true,true,true,true,true,true],
	[true,true,true,true,true,true,true,true,true,true],
	[true,true,true,true,true,true,true,true,false,true],
	[false,false,true,true,true,true,true,true,false,false],
	[false,false,false,false,true,true,true,true,false,false],
	[false,false,false,false,false,false,true,true,false,false],
	[false,false,false,false,false,false,false,false,false,false]];
var playerTot = 0;
var bankerTot = 0;
var winner;
var youHold = 1000;
var playerPairBet=0;
var tieBet=0;
var bankerPairBet=0;
var bankerBet=0;
var playerBet=0;
var playerPair;
var bankerPair;

function shuffleCards(){

	unshuffledFaces = ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","JC","JD","JH","JS","QC","QD","QH","QS","KC","KD","KH","KS"];
	unshuffledValues = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	shuffledFaces = [];
	shuffledValues = [];

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max+1));
	}

	for(let i=unshuffledFaces.length-1; i>=0; i--){
		let temp = getRandomInt(i);
		shuffledFaces.push(unshuffledFaces.splice(temp,1));
		shuffledValues.push(unshuffledValues.splice(temp,1));
	}

	shuffledValues = shuffledValues.map(Number);

	for(let i=0; i<shuffledFaces.length; i++){
		console.log(shuffledFaces[i] + " " + shuffledValues[i]);
	}
	console.log("--------------------------");
}

function playHand(){
	playerFaces = [];
	playerValues = [];
	bankerFaces = [];
	bankerValues = [];
	playerTot=0;
	bankerTot=0;

	if (shuffledFaces.length<6){
		shuffleCards();
		}

	for (let i=0; i<2; i++) {
		playerFaces[i]=shuffledFaces.pop();
		$(".pCard"+i).attr("src","deckAssets/"+playerFaces[i]+".png").show();
		playerValues[i]=shuffledValues.pop();
		console.log(playerFaces[i] + " " + playerValues[i]);
		playerTot += playerValues[i];
		bankerFaces[i]=shuffledFaces.pop();
		$(".bCard"+i).attr("src","deckAssets/"+bankerFaces[i]+".png").show();
		bankerValues[i]=shuffledValues.pop();
		console.log(bankerFaces[i] + " " + bankerValues[i]);
		bankerTot += bankerValues[i];
	}

	if (playerTot>9){
		playerTot -= 10;
	}

	if (bankerTot>9){
		bankerTot -= 10;
	}

	if (playerTot===8 || playerTot===9 || bankerTot===8 || bankerTot===9){
		console.log("Natural!")
	}

	else if (playerTot<6){
		playerFaces[2]=shuffledFaces.pop();
		$(".pCard2").attr("src","deckAssets/"+playerFaces[2]+".png").show();
		playerValues[2]=shuffledValues.pop();
		console.log(playerFaces[2] + " " + playerValues[2]);
		playerTot += playerValues[2];
		if (playerTot>9){
			playerTot -= 10;
		}
		if (bankerHitTable[bankerTot][playerValues[2]]){
			bankerFaces[2]=shuffledFaces.pop();
			$(".bCard2").attr("src","deckAssets/"+bankerFaces[2]+".png").show();
			bankerValues[2]=shuffledValues.pop();
			console.log(bankerFaces[2] + " " + bankerValues[2]);
			bankerTot += bankerValues[2];
			if (bankerTot>9){
				bankerTot -= 10;
			}
		}
	}

	else if (bankerTot<6){
		bankerFaces[2]=shuffledFaces.pop();
		$(".bCard2").attr("src","deckAssets/"+bankerFaces[2]+".png").show();
		bankerValues[2]=shuffledValues.pop();
		console.log(bankerFaces[2] + " " + bankerValues[2]);
		bankerTot += bankerValues[2];
		if (bankerTot>9){
			bankerTot -= 10;
		}
	}

	if (playerTot>bankerTot){
		return("PLAYER WINS");
	}
	else if (bankerTot>playerTot){
		return("BANKER WINS");
	}
	else{
		return("TIE");
	}
}

function checkPlayerPair(){
	if((playerFaces[0].toString().substring(0, playerFaces[0].toString().length - 1))===(playerFaces[1].toString().substring(0, playerFaces[1].toString().length - 1))){
		playerPair=true;
		$("#playerPair").text("PLAYER PAIR");
		}
	else{playerPair=false;}
}

function checkBankerPair(){
	if((bankerFaces[0].toString().substring(0, bankerFaces[0].toString().length - 1))===(bankerFaces[1].toString().substring(0, bankerFaces[1].toString().length - 1))){
		bankerPair=true;
		$("#bankerPair").text("BANKER PAIR");
		}
	else{bankerPair=false;}
}

function checkPlayerPairBet(){
	if(playerPairBet!=0 && playerPair===true){
		$("#playerPair").text("PLAYER PAIR BET RESULT: +$" + playerPairBet*12);
		youHold += (playerPairBet*13);
	}
	if(playerPairBet!=0 && playerPair===false){
		$("#playerPair").text("PLAYER PAIR BET RESULT: -$" + playerPairBet);
	}
}

function checkBankerPairBet(){
	if(bankerPairBet!=0 && bankerPair===true){
		$("#bankerPair").text("BANKER PAIR BET RESULT: +$" + bankerPairBet*12);
		youHold += (playerPairBet*13);
	}
	if(bankerPairBet!=0 && bankerPair===false){
		$("#bankerPair").text("BANKER PAIR BET RESULT: -$" + bankerPairBet);
	}
}

function checkTieBet(){
	if(tieBet!=0 && winner==="TIE"){
		$("#tieBetResults").text("TIE BET RESULT: +$" + tieBet*9);
		youHold += (tieBet*10);
	}
	if(tieBet!=0 && winner!="TIE"){
		$("#tieBetResults").text("TIE BET RESULT: -$" + tieBet);
	}
}

function checkBankerBet(){
	if(bankerBet!=0 && winner==="BANKER WINS"){
		$("#bankerBetResults").text("BANKER BET RESULT: +$" + bankerBet);
		youHold += (bankerBet*2);
	}
	if(bankerBet!=0 && winner!="BANKER WINS"){
		$("#bankerBetResults").text("BANKER BET RESULT: -$" + bankerBet);
	}
}

function checkPlayerBet(){
	if(playerBet!=0 && winner==="PLAYER WINS"){
		$("#playerBetResults").text("PLAYER BET RESULT: +$" + playerBet);
		youHold += (playerBet*2);
	}
	if(playerBet!=0 && winner!="PLAYER WINS"){
		$("#playerBetResults").text("PLAYER BET RESULT: -$" + playerBet);
	}
}

$(".dealButton").click(function() {

	if($(".dealButton").text().indexOf("DEAL THE CARDS") !== -1) {
		$(".playerWallet").text("YOU HOLD $"+youHold);
		winner=playHand();
		console.log("Result: " + winner);
		console.log("player score: " + playerTot);
		console.log("banker score: " + bankerTot);
		$("#lastGame").text("GAME RESULTS:")
		$("#winner").text(winner);
		$("#playerScore").text("PLAYER SCORE: " + playerTot);
		$("#bankerScore").text("BANKER SCORE: " + bankerTot);
		checkPlayerPair();
		checkBankerPair();
		checkPlayerPairBet();
		checkBankerPairBet();
		checkTieBet();
		checkBankerBet();
		checkPlayerBet();
		$(".betBtn").hide();
		$(".bet").hide();
		$(".playerWallet").text("YOU HOLD $"+youHold);
		$(".dealButton").text("NEXT HAND");
	}

	else if($(".dealButton").text().indexOf("NEXT HAND") !== -1) {
		playerPairBet=0;
		tieBet=0;
		bankerPairBet=0;
		bankerBet=0;
		playerBet=0;
		$(".allBets").text(" ");
		$(".card").removeAttr('src').hide();
		$(".chip").removeAttr('src').hide();
		$(".chipValue").text(" ");
		$(".betBtn").show();
		$(".bet").show().val(null);
		$(".dealButton").text("DEAL THE CARDS");
	}
});

$(".playerPairBetBtn").click(function() {
	(playerPairBet=$(".playerPairBet").val());
	if(playerPairBet>youHold){playerPairBet=youHold}
	if(playerPairBet>0){
		youHold -= playerPairBet;
		$(".playerPairBetBtn").hide();
		$(".playerPairBet").hide();
		$(".playerPairBetChip").attr("src","otherAssets/blackChip.png").show();
		$(".playerPairChipValue").text("$"+playerPairBet);
		$(".playerWallet").text("YOU HOLD $"+youHold);
		console.log("Player pair bet: $" + playerPairBet);
		console.log("You hold: $" + youHold);
	}
});

$(".bankerPairBetBtn").click(function() {
	(bankerPairBet=$(".bankerPairBet").val());
	if(bankerPairBet>youHold){bankerPairBet=youHold}
	if(bankerPairBet>0){
		youHold -= bankerPairBet;
		$(".bankerPairBetBtn").hide();
		$(".bankerPairBet").hide();
		$(".bankerPairBetChip").attr("src","otherAssets/blackChip.png").show();
		$(".bankerPairChipValue").text("$"+bankerPairBet);
		$(".playerWallet").text("YOU HOLD $"+youHold);
		console.log("Banker pair bet: $" + bankerPairBet);
		console.log("You hold: $" + youHold);
	}
});

$(".tieBetBtn").click(function() {
	(tieBet=$(".tieBet").val());
	if(tieBet>youHold){tieBet=youHold}
	if(tieBet>0){
		youHold -= tieBet;
		$(".tieBetBtn").hide();
		$(".tieBet").hide();
		$(".tieBetChip").attr("src","otherAssets/blackChip.png").show();
		$(".tieChipValue").text("$"+tieBet);
		$(".playerWallet").text("YOU HOLD $"+youHold);
		console.log("Tie bet: $" + tieBet);
		console.log("You hold: $" + youHold);
	}
});

$(".bankerBetBtn").click(function() {
	(bankerBet=$(".bankerBet").val());
	if(bankerBet>youHold){bankerBet=youHold}
	if(bankerBet>0){
		youHold -= bankerBet;
		$(".bankerBetBtn").hide();
		$(".bankerBet").hide();
		$(".bankerBetChip").attr("src","otherAssets/blackChip.png").show();
		$(".bankerChipValue").text("$"+bankerBet);
		$(".playerWallet").text("YOU HOLD $"+youHold);
		console.log("Banker bet: $" + bankerBet);
		console.log("You hold: $" + youHold);
	}
});

$(".playerBetBtn").click(function() {
	(playerBet=$(".playerBet").val());
	if(playerBet>youHold){playerBet=youHold}
	if(playerBet>0){
		youHold -= playerBet;
		$(".playerBetBtn").hide();
		$(".playerBet").hide();
		$(".playerBetChip").attr("src","otherAssets/blackChip.png").show();
		$(".playerChipValue").text("$"+playerBet);
		$(".playerWallet").text("YOU HOLD $"+youHold);
		console.log("Player bet: $" + playerBet);
		console.log("You hold: $" + youHold);
	}
});

$(".closeWindow").click(function() {
	$(".rulesOverlay").empty().hide();
});
