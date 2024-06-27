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
    this.classList.add('flip')
}