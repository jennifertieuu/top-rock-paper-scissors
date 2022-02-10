"use strict"

let roundNumber = 0;
let playerWins = 0;
let computerWins = 0;

document.querySelector(".player__score-number").textContent = playerWins;
document.querySelector(".computer__score-number").textContent = computerWins;
document.querySelector(".game__round-number").textContent = roundNumber;

// Add an event listener to the selection buttons
const rockButton = document.querySelector(".rock__button");
const paperButton = document.querySelector(".paper__button");
const scissorsButton = document.querySelector(".scissors__button");

// When user selects button, execute round
rockButton.addEventListener("click", game);
paperButton.addEventListener("click", game);
scissorsButton.addEventListener("click", game);



function game(event) {
    let playerSelection, computerSelection;

    roundNumber++;
    // Game over if five rounds are already played
    if (roundNumber === 6){
        gameOver(playerWins, computerWins);
    }

    document.querySelector(".game__round-number").textContent = roundNumber;
    playerSelection = event.target.value.toUpperCase();
    computerSelection = computerPlay();

    // Display user choice and computer choice on UI
    document.querySelector(".player__choice-selection").textContent = playerSelection;
    document.querySelector(".computer__choice-selection").textContent = computerSelection;

    // Display results
    let roundResult = gameRound(playerSelection, computerSelection);
    if (roundResult === null){
        document.querySelector(".game__result-text").textContent = "Tie";
    }
    else if (roundResult){
        // player wins, update player score
        playerWins++;
        document.querySelector(".game__result-text").textContent = "Player Wins!";
        document.querySelector(".player__score-number").textContent = playerWins;
    } else {
        // computer wins, update computer score
        computerWins++;
        document.querySelector(".game__result-text").textContent = "Computer Wins!";
        document.querySelector(".computer__score-number").textContent = computerWins;
    }

    // Game over if five rounds are already played
    if (roundNumber === 5) {
        setTimeout(gameOver, 0, playerWins, computerWins);
    }

} 

function gameOver(playerWins, computerWins){
    // Endgame when someone wins, prompt user to play again
    let answer;
    if (playerWins > computerWins) {
        answer = confirm("User wins! Would you like to play again?");
    } else if (computerWins > playerWins) {
        answer = confirm("Computer wins! You Lose! Would you like to play again?");
    } else {
        answer = confirm("No one wins! Would you like to play again?");
    }

    if (answer) {
        // reset the game state
        document.location.reload(true);
    }
}

function computerPlay() {
    // generate random number between 0-2 inclusive
    let num = Math.floor(Math.random() * 3);
    return num === 0 ? "ROCK"
         : num === 1 ? "PAPER"
         : "SCISSORS";
}

function gameRound(playerSelection, computerSelection) {
    // return if the user won the round
    if (playerSelection === computerSelection) {
        return null
    } else if (playerSelection.toUpperCase() === "ROCK" && computerSelection === "PAPER") {
        return false
    } else if (playerSelection.toUpperCase() === "ROCK" && computerSelection === "SCISSORS"){
        return true
    } else if (playerSelection.toUpperCase() === "PAPER" && computerSelection === "ROCK") {
        return true
    } else if (playerSelection.toUpperCase() === "PAPER" && computerSelection === "SCISSORS") {
        return false
    } else if (playerSelection.toUpperCase() === "SCISSORS" && computerSelection === "ROCK") {
        return false
    } else if (playerSelection.toUpperCase() === "SCISSORS" && computerSelection === "PAPER") {
        return false
    }
}

