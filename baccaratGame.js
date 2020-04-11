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
var BankerBet=0;
var playerBet=0;

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
		$(".pCard"+i).attr("src","deckAssets/"+playerFaces[i]+".png");
		playerValues[i]=shuffledValues.pop();
		console.log(playerFaces[i] + " " + playerValues[i]);
		playerTot += playerValues[i];
		bankerFaces[i]=shuffledFaces.pop();
		$(".bCard"+i).attr("src","deckAssets/"+bankerFaces[i]+".png");
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
		$(".pCard2").attr("src","deckAssets/"+playerFaces[2]+".png");
		playerValues[2]=shuffledValues.pop();
		console.log(playerFaces[2] + " " + playerValues[2]);
		playerTot += playerValues[2];
		if (playerTot>9){
			playerTot -= 10;
		}
		if (bankerHitTable[bankerTot][playerValues[2]]){
			bankerFaces[2]=shuffledFaces.pop();
			$(".bCard2").attr("src","deckAssets/"+bankerFaces[2]+".png");
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
		$(".bCard2").attr("src","deckAssets/"+bankerFaces[2]+".png");
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
	
	console.log("Cards left: " + shuffledFaces.length);
	
}

$(".dealButton").click(function() {
	$(".card").removeAttr('src');
	winner=playHand();
	console.log("Result: " + winner);
	console.log("player score: " + playerTot);
	console.log("banker score: " + bankerTot);
	if((playerFaces[0].toString().substring(0, playerFaces[0].toString().length - 1))===(playerFaces[1].toString().substring(0, playerFaces[1].toString().length - 1))){console.log("player pair")}
	if((bankerFaces[0].toString().substring(0, bankerFaces[0].toString().length - 1))===(bankerFaces[1].toString().substring(0, bankerFaces[1].toString().length - 1))){console.log("banker pair")}
	//$(".playerWallet").text("RESULT: " + winner + ". PLAYER SCORE: " + playerTot + ". BANKER SCORE: " + bankerTot);
});

$(".playerPairBetBtn").click(function() {
	(playerPairBet=$(".playerPairBet").val());
	if(playerPairBet>youHold){playerPairBet=youHold}
	if(playerPairBet>0){
		youHold -= playerPairBet;
		$(".playerPairBetBtn").remove();
		$(".playerPairBet").remove();
		$(".playerPairBetChip").attr("src","otherAssets/blackChip.png");
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
		$(".bankerPairBetBtn").remove();
		$(".bankerPairBet").remove();
		$(".bankerPairBetChip").attr("src","otherAssets/blackChip.png");
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
		$(".tieBetBtn").remove();
		$(".tieBet").remove();
		$(".tieBetChip").attr("src","otherAssets/blackChip.png");
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
		$(".bankerBetBtn").remove();
		$(".bankerBet").remove();
		$(".bankerBetChip").attr("src","otherAssets/blackChip.png");
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
		$(".playerBetBtn").remove();
		$(".playerBet").remove();
		$(".playerBetChip").attr("src","otherAssets/blackChip.png");
		$(".playerChipValue").text("$"+playerBet);
		$(".playerWallet").text("YOU HOLD $"+youHold);
		console.log("Player bet: $" + playerBet);
		console.log("You hold: $" + youHold);
	}
});


