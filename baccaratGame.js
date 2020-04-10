var unshuffledFaces = ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","JC","JD","JH","JS","QC","QD","QH","QS","KC","KD","KH","KS"];
var unshuffledValues = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max+1));
}

for(let i=unshuffledFaces.length-1; i>=0; i--){
	let temp = getRandomInt(i);
	shuffledFaces.push(unshuffledFaces.splice(temp,1));
	shuffledValues.push(unshuffledValues.splice(temp,1));
}
shuffledValues = shuffledValues.map(Number);

//for(let i=0; i<shuffledFaces.length; i++){
	//console.log(shuffledFaces[i] + " " + shuffledValues[i]);
//}

for (let i=0; i<2; i++) {
	playerFaces[i]=shuffledFaces.pop();
	$(".pCard"+i).attr("src","deckAssets/"+playerFaces[i]+".png");
	playerValues[i]=shuffledValues.pop();
	playerTot += playerValues[i];
	bankerFaces[i]=shuffledFaces.pop();
	$(".bCard"+i).attr("src","deckAssets/"+bankerFaces[i]+".png");
	bankerValues[i]=shuffledValues.pop();
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
	playerTot += playerValues[2];
	if (playerTot>9){
		playerTot -= 10;
	}
	if (bankerHitTable[bankerTot][playerValues[2]]){
		bankerFaces[2]=shuffledFaces.pop();
		$(".bCard2").attr("src","deckAssets/"+bankerFaces[2]+".png");
		bankerValues[2]=shuffledValues.pop();
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
	bankerTot += bankerValues[2];
	if (bankerTot>9){
		bankerTot -= 10;
	}
}

console.log(playerTot);
console.log(bankerTot);
