"use strict";
const input = require("prompt-sync")();
var Options;
(function (Options) {
    Options[Options["ROCK"] = 0] = "ROCK";
    Options[Options["PAPER"] = 1] = "PAPER";
    Options[Options["SCISSOR"] = 2] = "SCISSOR";
})(Options || (Options = {}));
var CustomError;
(function (CustomError) {
    CustomError["InvalidOption"] = "invalid_option";
    CustomError["InvalidInput"] = "invalid_input";
})(CustomError || (CustomError = {}));
function getOptions(option) {
    if (option === 0)
        return Options.ROCK;
    else if (option === 1)
        return Options.PAPER;
    else if (option === 2)
        return Options.SCISSOR;
    else
        return CustomError.InvalidOption;
}
function getComputerChoice() {
    var computerChoice = Math.floor(Math.random() * 2);
    return getOptions(computerChoice);
}
function getPlayerChoice() {
    console.log("Choose an Option");
    var playerChoice = input("1. Rock 2.Paper 3.scissor 9.to Exit: ");
    if (playerChoice === null || playerChoice === '9')
        process.exit();
    var choice;
    choice = parseInt(playerChoice);
    if (choice) {
        return getOptions(choice - 1);
    }
    else {
        return CustomError.InvalidInput;
    }
}
function getWinner(player, computer) {
    if (player === computer)
        return 0;
    else if ((player === Options.ROCK && computer === Options.SCISSOR) ||
        (player === Options.PAPER && computer === Options.ROCK) ||
        (player === Options.SCISSOR && computer === Options.PAPER))
        return 1;
    else
        return 2;
}
function showSummary(summary, playerChoice, computerChoice) {
    console.log("_______________________________________________________________________________");
    console.log(`Round - ${summary.round} Summary`);
    if (playerChoice && computerChoice) {
        console.log(`Player Choice: ${Options[playerChoice]} \t Computer Choice: ${Options[computerChoice]}`);
    }
    console.log(`Winner: ${summary.winner}`);
    console.log(`Player Score: ${summary.playerScore} \t Computer Score ${summary.computerScore}`);
    console.log("_______________________________________________________________________________");
}
const numRounds = 3;
function game() {
    var currRound = 0;
    const summary = {
        playerScore: 0,
        computerScore: 0,
        winner: "draw",
        round: currRound,
    };
    while (currRound < numRounds) {
        console.log("\n\n");
        const playerChoice = getPlayerChoice();
        const computerChoice = getComputerChoice();
        // console.log(`${playerChoice} ${computerChoice}`)
        if (typeof playerChoice === "number" &&
            typeof computerChoice === "number") {
            const winner = getWinner(playerChoice, computerChoice);
            if (winner === 1) {
                summary.playerScore++;
                summary.winner = "Player";
            }
            else if (winner === 2) {
                summary.computerScore++;
                summary.winner = "Computer";
            }
            else {
                summary.winner = "Draw";
            }
            currRound++;
            summary.round = currRound;
            showSummary(summary, playerChoice, computerChoice);
        }
        else {
            console.error(typeof computerChoice !== "number"
                ? `Error-computer: ${computerChoice}`
                : `Error-player: ${playerChoice}`);
        }
    }
}
game();
