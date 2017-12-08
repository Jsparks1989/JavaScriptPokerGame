//========================================================================
// POKER GAME - ESSENTIAL FUNCTIONS FOR GAME
//========================================================================

//=================================================
// Create Deck - 13 ranks x 4 suits = 52 cards.
//=================================================
// 0 = Spades, 1 = Diamonds, 2 = Hearts, 3 = Clubs
var suits = [0,1,2,3];
// 11 = Jack, 12 = Queen, 13 = King, 14 = Ace
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var deck = new Array();

// returns a full deck of 52 card objects
function getDeck() {
	for(var i = 0; i < ranks.length; i++) {
		for(var x = 0; x < suits.length; x++) {
            var card = {Rank:ranks[i], Suit:suits[x]};
			deck.push(card);
		}
	}
}

//=================================================
// shuffle deck
//=================================================

//Takes getDeck() as input and "shuffles" the deck. Returns the same deck shuffled. 
function shuffleDeck(d){
    var m = d.length, t, i;
    
    // while there remain elements to shuffle...
    while(m){
        // pick a remaining element...
        i = Math.floor(Math.random() * m--);
        
        // and swap it with the current element.
        t = d[m];
        d[m] = d[i];
        d[i] = t;
    }
    
    return d;
}

//=================================================
// deal cards to player
//=================================================
var playerHand = new Array();
var cardsInHand = 5;
function dealHand() {
	for(i = 0; i < cardsInHand; i++) {
		var temp = deck[i];
    playerHand.push(temp);
	}
}

//=================================================
// Sort player's cards
//=================================================

//sort the players hand. Returns the same array sorted.
function sortCards() {
  var swap;
  do {
    swap = false;
    for (var i = 0; i < playerHand.length - 1; i++) {
      if (playerHand[i].Rank > playerHand[i + 1].Rank) {
        var temp = playerHand[i + 1].Rank;
        playerHand[i + 1].Rank = playerHand[i].Rank;
        playerHand[i].Rank = temp;
        swap = true;
      }
    }
  } while (swap);
  
  return playerHand;
};

//========================================================================
// Functions to help check player's cards
//========================================================================

//=================================================
// Check if the player's cards all have the same suit
//=================================================

function checkSameSuit() {
    for(var i = 1; i < playerHand.length; i++){
        if(playerHand[i].Suit !== playerHand[0].Suit)
            return false;
    }
    return true;
}

//===================================================
// Check if the player's cards all have the same rank
//===================================================

// Counts the number of player's cards that have the same rank.
function checkSameRank(num) {
     var count = 0;
    for (var i = 0; i < playerHand.length; i++) {
        if (playerHand[i].Rank === num) {
            count++;
        }
    }
    return count;
}

//=================================================
// Check if the player's cards are in sequence
//=================================================

function checkSequence(){
    for(var i = playerHand.length - 1; i > 0; i--) {
        var oneCard = playerHand[i].Rank;
        var twoCard = playerHand[i - 1].Rank;
        var one = oneCard - twoCard;
        if(one !== 1){
            return false;
        } else {
            return true;
        }
    }
}

//========================================================================
// Functions to check for specific hands
//========================================================================

//=================================================
// Check for Royal Flush
//=================================================

// ranks for a royal flush
var royalFlush = [10, 11, 12, 13, 14];
var count = 0;
// Compare the player's hand ranks with RF hand ranks.
function checkRfRankCount() {
    for(var i = 0; i < playerHand.length; i++) {
        if(royalFlush.includes(playerHand[i].Rank)) {
          count++;  
        }
    }
    return count;
}

// Check if the RankCount and SuitCount both return true
function checkRoyalFlush(){
    // Run RF Rank Count
    checkRfRankCount();
    
    // Run Check Same Suit
    checkSameSuit();
    
    // if the rank count is 5 and suit is true... then you have a royal flush
    if(checkRfRankCount == 5 && checkSameSuit == true) {
        return true; 
    } else {
        return false;
    }
}

// checkRoyalFlush()

//=================================================
// Check for Straight Flush
//=================================================

// Check if the player's hand suit is the same.
function checkStraightFlush() {
    // Check Card Sequence
    checkSequence()
    
    // Check for Same Suit
    checkSameSuit();
    
    // If cards are in sequence and all the same suit..
    if(checkSequence && checkSameSuit == true) {
        return true; 
    } else {
        return false;
    }
}

// checkStraightFlush();

//===================================================
// Check for Four of a Kind
//===================================================


function checkFourKind() {
    for(var i = 0; i <playerHand.length; i++){
        if(checkSameRank(playerHand[i].Rank) == 4) {
            return true;
            break;
        } else {
            return false;
            continue;
        }
    }
}

// checkFourKind();

//=================================================
// Check for Straight
//=================================================

function checkStraight() {
    checkSequence();
    
    if(checkSequence() == true){
        return true;
    } else {
        return false;
    }
}

//checkStraight();

//=================================================
// Check for Three of Kind
//=================================================

function checkThreeOfKind() {
    for(var i = 0; i <playerHand.length; i++){
        if(checkSameRank(playerHand[i].Rank) == 3) {
            return true;
            break;
        } else {
            return false;
            continue;
        }
    }
    
}

//checkThreeOfKind();

//=================================================
// Check for Two Pair
//=================================================

function checkTwoPair() {
    for(var i = 0; i <playerHand.length; i++){
        if(checkSameRank(playerHand[i].Rank) == 2) {
            break;
        } 
    }
    for(var j = 3; j <playerHand.length; j++){
        if(checkSameRank(playerHand[j].Rank) == 2) {
            return true;
            break;
        } else {
            return false;
        }
    }
    
}

//checkTwoPair();

//=================================================
// Check for Pair
//=================================================

function checkPair() {
    for(var i = 0; i <playerHand.length; i++){
        if(checkSameRank(playerHand[i].Rank) == 2) {
            return true;
            break;
        } else {
            return false;
            continue;
        }
    }
    
}

//checkPair();

//=================================================
// Call to run high card
//=================================================

function highCard() {
    
    var highRank = playerHand[4].Rank;
    var highSuit = playerHand[4].Suit;
    
    // If the high card rank equals...
    if(highRank == 11){
        highRank = "Ace";
    } else if(highRank == 12) {
        highRank = "Queen";
    } else if(highRank = 13) {
        highRank = "King";
    } else if(highRank == 14) {
        highRank = "Ace";
    }

    // If the high card suit equals...
    if(highSuit == 0){
        highSuit = "Spades";
    } else if(highSuit == 1) {
        highSuit = "Diamonds";
    } else if(highSuit = 2) {
        highSuit = "Hearts";
    } else if(highSuit == 3) {
        highSuit = "Clubs";
    }
    
    return "High card is" + highRank + " of " + highSuit;
        
}

//========================================================================
// Calls to run the game
//========================================================================

// Create the deck
getDeck();
    
// Shuffle the deck
shuffleDeck(deck);
    
// Deal cards to the player
dealHand();

// Ask player if they want to change cards.
    
// Sort player's hand
sortCards();

// Show player's cards
console.log(playerHand);

//=================================================
// Switch to run card hand check
//=================================================


switch (true) {
    case checkRoyalFlush():
        console.log("You have a Royal Flush!");
        break;
    case checkStraightFlush():
        console.log("You have a Straight Flush!");
        break;
    case checkFourKind():
        console.log("You have a Four of a Kind!");
        break;
    case checkStraight():
        console.log("You have a Straight!");
        break;
    case checkThreeOfKind():
        console.log("You have a Three of a Kind!");
        break;
    case checkTwoPair():
        console.log("You have a Two Pair!");
        break;
    case checkPair():
        console.log("You have a Pair!");
        break;
    default:
        console.log(highCard());
}


//========================================================================
// Working on new functionality 
//========================================================================


//=================================================
// deal cards to player
//=================================================
var playerHand = new Array();
var cardsInHand = 5;
function dealHand() {
	for(i = 0; i < cardsInHand; i++) {
		var temp = deck[i];
    playerHand.push(temp);
	}
}

//=================================================
// Give player two new cards
//=================================================
var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");
var card3 = document.getElementById("card3");
var card4 = document.getElementById("card4");
var card5 = document.getElementById("card5");
var fiveCards = [card1, card2, card3, card4, card5];
var suitNames = ["Spades", "Diamonds", "Hearts", "Clubs"];

// Display cards to player
function displayCards() {
	for(var i = 0; i < playerHand.length; i++) {
		fiveCards[i].innerHTML = playerHand[i].Rank + " of " + playerHand[i].Suit;
	}
}

// Ask if player wants to change cards
function wantToTradeCards() {
	var cont = true;
	var tradeCards = prompt("Would you like any new cards?","yes or no");
	
	Loop1: 
	while(cont === true) {
		if (tradeCards === "" || tradeCards != "yes" || tradeCards != "no") {
			alert("Answer yes or no.");
			tradeCards = prompt("Would you like any new cards?","yes or no");
			continue Loop1;
		}
		if (tradeCards === "yes" || tradeCards === "no" ) {

