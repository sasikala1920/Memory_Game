const cardsArray = [
    { name: 'A', img: 'https://th.bing.com/th/id/OIP.D9H_OQXojeeCYap1SW66pQAAAA?w=474&h=315&rs=1&pid=ImgDetMain' },
    { name: 'B', img: 'https://i.pinimg.com/736x/06/54/7a/06547a402611c9e9157175f37f329823.jpg' },
    { name: 'C', img: 'https://th.bing.com/th/id/OIP.NfpEv8o70646Du3c0jRMWQHaE8?pid=ImgDet&w=184&h=122&c=7&dpr=1.3' },
    { name: 'D', img: 'https://th.bing.com/th/id/OIP.KIF9OxJ7rVzrG3UcyhmiMwHaEK?w=5120&h=2880&rs=1&pid=ImgDetMain' },
    { name: 'E', img: 'https://th.bing.com/th/id/OIP.D3RZx83Zk6i9bXkO5Zl-MgHaEo?rs=1&pid=ImgDetMain' },
    { name: 'F', img: 'https://th.bing.com/th/id/OIP.PmC5roB79eDe9jaM33j-eAHaHa?rs=1&pid=ImgDetMain' },
    { name: 'G', img: 'https://th.bing.com/th/id/OIP.I5uFz5kI7zmZkGStjRn8RwHaHa?rs=1&pid=ImgDetMain' },
    { name: 'H', img: 'https://th.bing.com/th/id/OIP.ICg0R3rrAyKI-SGiDIwAfAHaE8?rs=1&pid=ImgDetMain' }
];

let grid = document.getElementById('game-grid');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Duplicate cardsArray to create pairs and shuffle the deck
function shuffleDeck() {
    let deck = [...cardsArray, ...cardsArray];
    deck.sort(() => 0.5 - Math.random());
    return deck;
}

// Create card elements
function createCards() {
    let shuffledDeck = shuffleDeck();
    shuffledDeck.forEach((cardData) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = cardData.name;

        let cardImage = document.createElement('img');
        cardImage.src = cardData.img;
        card.appendChild(cardImage);

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
        cards.push(card);
    });
}

// Flip card
function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    let [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.name === secondCard.dataset.name) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardsArray.length) {
            setTimeout(() => {
                alert('You won!');
                triggerWinEffect();
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Trigger the flashing background effect
function triggerWinEffect() {
    document.body.classList.add('flash-background');
}

// Remove the flashing background effect
function removeWinEffect() {
    document.body.classList.remove('flash-background');
}

// Restart game
function restartGame() {
    grid.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    removeWinEffect(); // Remove flashing when restarting
    createCards();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);

// Initialize game
createCards();
