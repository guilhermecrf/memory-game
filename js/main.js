let frontCard = 'card_front'
let backCard = 'card_back'
let CARD = 'card'
let icon = 'icon'

let stacks = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'js',
    'mongo',
    'node',
    'react',
    'vue'
]

let cards = null

startGame()

function startGame() {
    cards = createCardsFromStacks(stacks)
    shuffleCards(cards)

    initializeCards(cards)
}

function initializeCards(cards) {
    let gameBoard = document.querySelector('#gameBoard')

    cards.forEach(card => {
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

function shuffleCards(cards) {
    let currentIndex = cards.length
    let randomIndex = 0

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function createCardsFromStacks(stacks) {
    let cards = []

    stacks.forEach((stack) => {
        cards.push(createPairFromStack(stack))
    })

    return cards.flatMap(pair => pair)
}

function createPairFromStack(stack) {
    return [{
        id: createIdWithStack(stack),
        icon: stack,
        flipped: false
    },{
        id: createIdWithStack(stack),
        icon: stack,
        flipped: false
    }]
}

function createIdWithStack(stack) {
    return stack + parseInt(Math.random() * 1000)
}

function flipCard() {
    this.classList.add('flip')
}