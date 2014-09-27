$(document).ready(function() {

	// converts numeric values to card notation
	// leaves numeric card values alone
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	// creates an array called deck
	// creates an arra for the card suites
	// creates 13 incrementing cards of each suite
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	// creates a copy array
	// creates a var n with the original array's length
	// while the variable n is not 0
		// it selects a random number
		// multiplies the random number by the current array length
		// it assigns the previous number to i
		// if i is in the array
			// it pushes the value to the copy array
			// and deletes it from the original array
			// then decrements n
	// when all the cards have been pulled from the original deck
	// in a random order
	// it returns the new, random array
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evenly divide the deck up between the two players



	var deal = function(){	
		var shuffledDeck = shuffle(deck);
		cards_player_1 = shuffledDeck.splice(shuffledDeck[0], shuffledDeck.length/2);
		cards_player_2 = shuffledDeck.splice(shuffledDeck[0], shuffledDeck.length);
	};

	deal();


	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card_1, card_2){
		if (card_1.number > card_2.number) {
			return 1;
		} else if (card_1.number < card_2.number) {
			return 2;
		} else {
			return 0;
		}
	}

	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}

	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var cards = [];

	var play = function(){
		var card1 = cards_player_1.shift();
		var card2 = cards_player_2.shift();
		var winner = war (card1, card2);
		if (winner == 1) {
			cards_player_1.push(card1, card2);
			cards = [];
		} else if (winner == 2) {
			cards_player_2.push(card1, card2);
			cards = [];
		} else {
			war;
		}

		//this function (defined below) will continue to the next turn
		advance();
	}

	
	advance();
	
	$(".btn").click(function() {
		play();
	});
});
