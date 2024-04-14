function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function paintChosenButton(button, color) {
    button.style.backgroundColor = color;
}

//   игрок победил 1
//   компьютер победил 0
//   ничья (одинаково) 2
function whoWins(playerSelection, computerSelection) {
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
            return 2;
    }
}

function getName(number) {
    switch (number) {
        case 1: {
            return 'Камень';
        }
        case 2: {
            return 'Ножницы';
        }
        case 3: {
            return 'Бумага';
        }
    }
}

function createResultText(winner, loser) {
    winner = Number(winner);
    loser = Number(loser);

    if (winner === loser) {
        return "Ничья!";
    }

    let text = getName(winner);

    if (winner === 2) {
        text = text.concat(' бьют ');
    } else {
        text = text.concat(' бьёт ');
    }

    text = text.concat(getName(loser));
    if (loser === 3) {
        text = text.substring(0, text.length - 1) + 'у';
    }

    return text;
}

document.querySelectorAll('#options>button').
    forEach((button) => {
        button.addEventListener('click', function (event) {
            const userButton = event.target;
            const userChoice = userButton.value;
            paintChosenButton(event.target, 'grey');

            const pcChoice = getComputerChoice();
            const pcButton = document.querySelector(`#pcOptions button[value="${pcChoice}"]`);
            setTimeout(function () {
                paintChosenButton(pcButton, 'grey')
            }, 500);
            const userWins = whoWins(userChoice, pcChoice);
            let resultText = '';
            switch (userWins) {
                case 1: {
                    paintChosenButton(userButton, 'green');
                    paintChosenButton(pcButton, 'red');
                    resultText = createResultText(userChoice, pcChoice);
                }
                case 0: {
                    paintChosenButton(userButton, 'red');
                    paintChosenButton(pcButton, 'green');
                    resultText = createResultText(pcChoice, userChoice);
                }
                case 2: {
                    resultText = createResultText(userChoice, pcChoice);
                }
            }

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = resultText;
        });
    });

