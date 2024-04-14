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
        case 1:
            if (computerSelection == 2) {
                return 1;
            }
            if (computerSelection == 3) {
                return 0;
            }
            break;

        case 2:
            if (computerSelection == 1) {
                return 0;
            }
            if (computerSelection == 3) {
                return 1;
            }
            break;

        case 3:
            if (computerSelection == 1) {
                return 1;
            }
            if (computerSelection == 2) {
                return 0;
            }
            break;


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



function checkMaxScore() {
    let maxScore = Number(document.getElementById('maxScore').value);
    let userScore = Number(document.getElementById('userScore').textContent);
    let pcScore = Number(document.getElementById('pcScore').textContent);

    if (userScore >= maxScore) {
        return 1;
    }
    else if (pcScore >= maxScore) {
        return 0;
    }
    return -1;
}

function showWinner(winnerNum) {
    let finalResult = document.createElement('h2');


    let resultMessage = '';
    if (winnerNum === 1) {
        resultMessage = 'Вы выиграли!';
        finalResult.style.color = 'green';
    } else if (winnerNum === 0) {
        resultMessage = 'Вы проиграли!';
        finalResult.style.color = 'red';
    }
    finalResult.textContent = resultMessage;
    document.getElementById('result').after(finalResult);
}

function suggestNewGame() {
    document.getElementById('userScore').textContent = 0;
    document.getElementById('pcScore').textContent = 0;
}

document.querySelectorAll('#options>button').
    forEach((button) => {
        button.addEventListener('click', function (event) {
            const userButton = event.target;
            const userChoice = Number(userButton.value);

            const pcChoice = getComputerChoice();
            const pcButton = document.querySelector(`#pcOptions button[value="${pcChoice}"]`);

            const userWins = whoWins(userChoice, pcChoice);
            let resultText = '';
            switch (Number(userWins)) {
                case 1:
                    paintChosenButton(userButton, 'green');
                    paintChosenButton(pcButton, 'red');
                    resultText = createResultText(userChoice, pcChoice);
                    let userScore = document.getElementById('userScore');
                    let scoreNum = Number(userScore.textContent) + 1;
                    userScore.textContent = scoreNum;
                    break;

                case 0:
                    paintChosenButton(userButton, 'red');
                    paintChosenButton(pcButton, 'green');
                    resultText = createResultText(pcChoice, userChoice);
                    let pcScore = document.getElementById('pcScore');
                    pcScore.textContent = Number(pcScore.textContent) + 1;
                    break;

                case 2:
                    resultText = createResultText(userChoice, pcChoice);
                    break;

            }

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = resultText;

            let resultOfRound = checkMaxScore();
            if (resultOfRound !== -1) {
                showWinner(resultOfRound);
                suggestNewGame();
            }

        });
    });

