const game = () => {
    let pScore = 0;
    let cScore = 0;

    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        playBtn.addEventListener("click", () => {
            introScreen.classList.remove("fadeIn");
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");
        const introScreen = document.querySelector(".intro");
        const middleText = document.querySelector(".intro h1");
        const middleButton = document.querySelector(".intro button");
        const match = document.querySelector(".match");
        const playerScore = document.querySelector(".player-score p");
        const compScore = document.querySelector(".computer-score p");

        hands.forEach((hand) => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            });
        });

        const computerOptions = ["rock", "paper", "scissors"];
        options.forEach((option) => {
            option.addEventListener("click", function () {
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                setTimeout(() => {
                    // Call compare hands
                    compareHands(this.textContent, computerChoice);
                    if (pScore === 3) {
                        console.log("Player has won");
                        middleText.textContent = "Player has won!";
                        match.classList.remove("fadeIn");
                        setTimeout(() => {
                            introScreen.classList.add("fadeIn");
                        }, 500);
                        middleButton.textContent = "Play Again";
                        middleButton.addEventListener("click", () => {
                            pScore = 0;
                            cScore = 0;
                            playerScore.textContent = 0;
                            compScore.textContent = 0;
                        });
                    } else if (cScore === 3) {
                        console.log("Computer has won");
                        middleText.textContent = "Computer has won...";
                        match.classList.remove("fadeIn");
                        setTimeout(() => {
                            introScreen.classList.add("fadeIn");
                        }, 500);
                        middleButton.textContent = "Try Again";
                        middleButton.addEventListener("click", () => {
                            pScore = 0;
                            cScore = 0;
                            playerScore.textContent = 0;
                            compScore.textContent = 0;
                        });
                    }
                    // Update Images
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 2000);

                // Animation runs instantly
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const compScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        compScore.textContent = cScore;
    };

    const compareHands = (playerChoice, compChoice) => {
        // Update Text
        const winner = document.querySelector(".winner");
        if (playerChoice === compChoice) {
            winner.textContent = "It is a tie";
            return;
        }
        if (playerChoice === "rock") {
            if (compChoice === "scissors") {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        if (playerChoice === "paper") {
            if (compChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        if (playerChoice === "scissors") {
            if (compChoice === "rock") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
    };

    startGame();
    playMatch();
};

game();
