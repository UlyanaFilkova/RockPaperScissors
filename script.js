function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 2;
    }

    switch (playerSelection) {
        case 1: {
            if (computerSelection == 2) {
                return 1;
            }
            if (computerSelection == 3) {
                return 0;
            }
            break;
        }
        case 2: {
            if (computerSelection == 1) {
                return 0;
            }
            if (computerSelection == 3) {
                return 1;
            }
            break;
        }
        case 3: {
            if (computerSelection == 1) {
                return 1;
            }
            if (computerSelection == 2) {
                return 0;
            }
            break;
        }
        default:
            return "Неверный";
    }
}
//   камень 1
//   ножницы 2
//   бумага 3

//   игрок победил 1
//   компьютер победил 0
// ничья (одинаково) 2
const playerSelection = 1;
const computerSelection = getComputerChoice();
console.log(computerSelection);

console.log(playRound(playerSelection, computerSelection));