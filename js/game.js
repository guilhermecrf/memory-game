let game = {
    stacks : [
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
    ],

    cards : null,

    createCardsFromStacks : function() {
        this.cards = []
    
        this.stacks.forEach((stack) => {
            this.cards.push(this.createPairFromStack(stack))
        })
    
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    },
    
    createPairFromStack : function(stack) {
        return [{
            id: this.createIdWithStack(stack),
            icon: stack,
            flipped: false
        },{
            id: this.createIdWithStack(stack),
            icon: stack,
            flipped: false
        }]
    },
    
    createIdWithStack : function(stack) {
        return stack + parseInt(Math.random() * 1000)
    },

    shuffleCards : function(cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },
}