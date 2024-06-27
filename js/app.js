let frontCard = 'card_front'
let backCard = 'card_back'
let CARD = 'card'
let icon = 'icon'

startGame()

function startGame() {
    initializeCards(game.createCardsFromStacks())
}

function initializeCards(cards) {
    let gameBoard = document.querySelector('#gameBoard')
    gameBoard.innerHTML = ''

    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {
    createCardFace(frontCard, card, cardElement)
    createCardFace(backCard, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    
    if(face === frontCard) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(icon)
        iconElement.src = 'assets/' + card.icon + '.svg'
        cardElementFace.appendChild(iconElement)
    }else {
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}

function flipCard() {
    if(game.setCard(this.id)) {
        this.classList.add('flip')
        if(game.secondCard) {
            if(game.checkMatch()) {
                game.clearCards()
                if(game.checkGameOver()) {
                    let gameOverLayer = document.querySelector('#gameOver')
                    gameOverLayer.style.visibility = 'visible'
                    gameOverLayer.style.opacity = '1'
                }
            }else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)
        
                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }
    }
}

function restart() {
    game.clearCards()
    startGame()
    let gameOverLayer = document.querySelector('#gameOver')
    gameOverLayer.style.visibility = 'hidden'
    gameOverLayer.style.opacity = '0'
}