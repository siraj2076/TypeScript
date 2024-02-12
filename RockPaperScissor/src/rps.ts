const input = require("prompt-sync")();

enum Options {
  "ROCK",
  "PAPER",
  "SCISSOR",
}

enum CustomError {
  "InvalidOption" = "invalid_option",
  "InvalidInput" = "invalid_input",
}

interface GameSummary {
  playerScore: number;
  computerScore: number;
  winner: string;
  round: number;
}

function getOptions(option: number): Options | CustomError {
  if (option === 0) return Options.ROCK;
  else if (option === 1) return Options.PAPER;
  else if (option === 2) return Options.SCISSOR;
  else return CustomError.InvalidOption;
}

function getComputerChoice(): Options | CustomError {
  var computerChoice = Math.floor(Math.random() * 2);
  return getOptions(computerChoice);
}

function getPlayerChoice(): Options | CustomError {
  console.log("Choose an Option");
  var playerChoice: string = input("1. Rock 2.Paper 3.scissor 9.to Exit: ");
  if(playerChoice === null || playerChoice==='9') process.exit();
  var choice: number;
  choice = parseInt(playerChoice);
  if (choice) {
    return getOptions(choice - 1);
  } else {
    return CustomError.InvalidInput;
  }
}

function getWinner(player: Options, computer: Options): number {
  if (player === computer) return 0;
  else if (
    (player === Options.ROCK && computer === Options.SCISSOR) ||
    (player === Options.PAPER && computer === Options.ROCK) ||
    (player === Options.SCISSOR && computer === Options.PAPER)
  )
    return 1;
  else return 2;
}

function showSummary(
  summary: GameSummary,
  playerChoice?: Options,
  computerChoice?: Options
) {
  console.log(
    "_______________________________________________________________________________"
  );
  console.log(`Round - ${summary.round} Summary`);
  if (playerChoice && computerChoice) {
    console.log(
      `Player Choice: ${Options[playerChoice]} \t Computer Choice: ${Options[computerChoice]}`
    );
  }
  console.log(`Winner: ${summary.winner}`);
  console.log(
    `Player Score: ${summary.playerScore} \t Computer Score ${summary.computerScore}`
  );
  console.log(
    "_______________________________________________________________________________"
  );
}

const numRounds = 3;

function game() {
  var currRound = 0;
  const summary: GameSummary = {
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
    if (
      typeof playerChoice === "number" &&
      typeof computerChoice === "number"
    ) {
      const winner: Options = getWinner(
        playerChoice as Options,
        computerChoice as Options
      );
      if (winner === 1) {
        summary.playerScore++;
        summary.winner = "Player";
      } else if (winner === 2) {
        summary.computerScore++;
        summary.winner = "Computer";
      } else {
        summary.winner = "Draw";
      }
      currRound++;
      summary.round = currRound;
      showSummary(summary, playerChoice as Options, computerChoice as Options);
    } else {
      console.error(
        typeof computerChoice !== "number"
          ? `Error-computer: ${computerChoice}`
          : `Error-player: ${playerChoice}`
      );
    }
  }
}

game();
