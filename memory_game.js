document.addEventListener("DOMContentLoaded", function() {
    var difficulty = null; // Stores the selected difficulty level (3, 5, or 8)
    var timerInterval; // Stores the ID of the timer interval
    var gameStarted = false; // Keeps track of whether the game has started
  
    document.getElementById("startButton").addEventListener("click", startGame);
  
    function createGameBoard(cardCount) {
      var gameBoard = document.getElementById("gameBoard");
      gameBoard.innerHTML = ""; // Clear the game board
  
      var images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg"];
      images = images.slice(0, cardCount / 2); // Use only a subset of the images based on card count
  
      var allCards = [];
      for (var i = 0; i < cardCount; i++) {
        var card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", cardClick);
  
        var cardInner = document.createElement("div");
        cardInner.className = "card-inner";
  
        var cardFront = document.createElement("div");
        cardFront.className = "card-front";
  
        var cardBack = document.createElement("div");
        cardBack.className = "card-back";
        var randomImage = images[Math.floor(Math.random() * images.length)];
        cardBack.style.backgroundImage = "url('" + randomImage + "')";
  
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);
  
        allCards.push(card);
      }
  
      // Shuffle the cards
      for (var i = allCards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = allCards[i];
        allCards[i] = allCards[j];
        allCards[j] = temp;
      }
  
      var firstCard = null;
      var secondCard = null;
  
      function cardClick() {
        if (!gameStarted) {
          return; // Don't allow card clicks before the game starts
        }
  
        if (secondCard) {
          return; // Don't allow more than two cards to be flipped at once
        }
  
        var cardInner = this.getElementsByClassName("card-inner")[0];
        cardInner.style.transform = "rotateY(180deg)";
  
        if (!firstCard) {
          firstCard = cardInner;
        } else {
          secondCard = cardInner;
  
          if (firstCard.style.backgroundImage === secondCard.style.backgroundImage) {
            firstCard = null;
            secondCard = null;
  
            if (document.querySelectorAll(".card-inner[style*='rotateY(180deg)']").length === cardCount) {
              clearInterval(timerInterval);
              document.getElementById("message").innerHTML = "Congratulations! You solved the puzzle.";
            }
          } else {
            setTimeout(function() {
              firstCard.style.transform = "";
              secondCard.style.transform = "";
              firstCard = null;
              secondCard = null;
            }, 1000);
          }
        }
      }
    }
  
    function startGame() {
      // Clear the game board
      document.getElementById("gameBoard").innerHTML = "";
      document.getElementById("message").innerHTML = "";
      gameStarted = true;
  
      // Select the appropriate difficulty level
      if (difficulty === "easy") {
        createGameBoard(8);
        startTimer(120);
      } else if (difficulty === "medium") {
        createGameBoard(10);
        startTimer(150);
      } else if (difficulty === "hard") {
        createGameBoard(12);
        startTimer(180);
      } else {
        return; // Don't start the game if difficulty is not selected
      }
    }
  
    function startTimer(seconds) {
      var timerDisplay = document.getElementById("message");
      timerDisplay.innerHTML = "Game in progress...";
      var timerSeconds = seconds;
  
      function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
  
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
  
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
  
        return minutes + ":" + seconds;
      }
  
      timerInterval = setInterval(function() {
        timerDisplay.innerHTML = "Time left: " + formatTime(timerSeconds);
        timerSeconds--;
  
        if (timerSeconds < 0) {
          clearInterval(timerInterval);
          document.getElementById("message").innerHTML = "Time's up! Game over.";
          gameStarted = false;
        }
      }, 1000);
    }
  });