// Variables
let cardArray = [] // Javascript array
let totalCardSum = 0
let hasBlackJack = false
let isAlive = false
let hasDoubled = false
let message = ""
let dealerNumber = 0
let currentBet = 0

// Elements from the html page.
let introMessage = document.getElementById("intro-message")
let cards = document.getElementById("card-amount")
let sum = document.querySelector("#sum")
let playerInfo = document.getElementById("player-info")
let dealerNumberDisplay = document.getElementById("dealer-number")
let betAmountLabel = document.getElementById("bet-amount")

// Player object
let player = {
    playerName: "",
    playerMoney: 200
}

playerInfo.textContent = "Money: " + player.playerMoney



// Generate a random number for the cards.
function getRandomNumber() {
    let randomCard = Math.floor(Math.random()*13)+1
    if (randomCard > 10) {
        randomCard = 10
    } else if (randomCard == 1) {
        randomCard = 11
    }
    return randomCard
}


// Bet / Money Functions.
// Place a bet.
function placeBet() {
    let betInput = parseInt(document.getElementById("bet-input").value)
    currentBet = betInput

    if (currentBet >= 1 && currentBet <= player.playerMoney) {
        player.playerMoney -= currentBet
        playerInfo.textContent = "Money: " + player.playerMoney
        betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: " + player.playerMoney + "):"

        startGame()
    } else if (currentBet < 1) {
        betAmountLabel.textContent = "Need bet of at least 1."
    } else {
        betAmountLabel.textContent = "Bet exceeds amount of money."
    }
}
// Reset player money.
function resetMoney() {
    betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: 200):"
    player.playerMoney = 200
    playerInfo.textContent = "Money: " + player.playerMoney
}



// Start the game from scratch.
function startGame() {
    dealerNumber = Math.floor(Math.random()*5)+17
    let firstCard = getRandomNumber()
    let secondCard = getRandomNumber()
    cardArray = [firstCard,secondCard]
    totalCardSum = firstCard+secondCard
    isAlive = true
    hasBlackJack = false

    dealerNumberDisplay.textContent = ""

    runGame()
}
// Run / redraw the game info.
function runGame() {
    cards.textContent = "Cards: "
    for (let i = 0; i < cardArray.length; i++) {
        cards.textContent += cardArray[i] + " "
    }

    sum.textContent = "Sum: " + totalCardSum
    
    cardCalculation()
    introMessage.textContent = message
}



// Button functions
// Generate a new card upon button press.
function newCard() {
    if (hasBlackJack == false && isAlive == true) {
        let newCard = getRandomNumber()
        cardArray.push(newCard)
        totalCardSum += newCard
        runGame()
    }
}
// Stay function.
function stay() {
    if (hasBlackJack == false && isAlive == true) {
        dealerCalculation()
        introMessage.textContent = message
    }
}
// Double or nothing function.
function double() {
    if (hasBlackJack == false && isAlive == true) {
        if ((player.playerMoney - currentBet) >= 0) {
        // TOGGLE hasDoubled VARIABLE TO TRUE HERE.
        // CREATE NEW IF STATEMENT FOR CALCULATING PAYOUT IN WIN FUNCTIONS.
        player.playerMoney -= currentBet
        currentBet = currentBet * 2
        hasDoubled = true
        newCard()
        dealerCalculation()
        introMessage.textContent = message
        playerInfo.textContent = "Money: " + player.playerMoney
        } else {
            betAmountLabel.textContent = "Not enough money!"
        }
    } 
}



// Functions for card calculations.
// Calculate if you went over 21 or not.
function cardCalculation() {
    if (totalCardSum < 21) {
        message = "Your card count: " + totalCardSum + "."
    } else if (totalCardSum == 21) {
        if(totalCardSum == dealerNumber) {
            message = "Tie: Amount returned."
            gameTie()
            isAlive = false
        } else {
            dealerNumberDisplay.textContent = "Dealer number: " + dealerNumber
            hasBlackJack = true
            message = "You Win: Blackjack!"
            blackjackWin()
            isAlive = false
        }
    } else {
        dealerNumberDisplay.textContent = "Dealer number: " + dealerNumber
        isAlive = false
        message = "You Lose: You went over 21."
        betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: " + player.playerMoney + "):"
    }
}
// Calculate if the dealer has more cards than you.
function dealerCalculation() {
    if (isAlive ==true) {
        if (dealerNumber > totalCardSum) {
            dealerNumberDisplay.textContent = "Dealer number: " + dealerNumber
            message = "You Lose: Dealer has the higher number!"
            betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: " + player.playerMoney + "):"
            isAlive = false
        } else if (dealerNumber == totalCardSum) {
            dealerNumberDisplay.textContent = "Dealer number: " + dealerNumber
            message = "Tie: Amount returned."
            gameTie()
            isAlive = false
        } else if (dealerNumber < totalCardSum && totalCardSum <= 21) {
            dealerNumberDisplay.textContent = "Dealer number: " + dealerNumber
            message = "You Win: Amount higher than dealer!"
            gameWin()
            isAlive = false
        }
    }
}



// Functions for winning/losing a game.
function gameTie() {
    player.playerMoney += currentBet
    playerInfo.textContent = "Money: " + player.playerMoney
    betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: " + player.playerMoney + "):"
}
function gameWin() {
    player.playerMoney += currentBet*2
    playerInfo.textContent = "Money: " + player.playerMoney
    betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: " + player.playerMoney + "):"
}
function blackjackWin() {
    player.playerMoney += currentBet*2+(currentBet*0.5)
    playerInfo.textContent = "Money: " + player.playerMoney
    betAmountLabel.textContent = "Enter Bet Amount (Min: 1 Max: " + player.playerMoney + "):"
}
