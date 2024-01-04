class Deck extends Pile{
    constructor(game,$container){
        super(54)
        this.game=game
        this.$container=$container
    }    
    toString(){
        return 'Deck'
    }
    newGame(){
        this.clear();

        let count=0
        for(let r=0;r<13;r++){
            for(let c=0;c<4;c++){
                this.#createCard(new Card(c,r))
                //if(++count>=10) break;
            }
            //if(count>=10) break;
        }
        this.#createCard(new Card(Card.JokerColorBlack,Card.JokerRank))
        this.#createCard(new Card(Card.JokerColorRed,Card.JokerRank))
        this.shuffle()
        this.distribute()
    }
    #createCard(card){
        this.$container.append(card.create())
        this.game.cards.add(card)
        this.add(card)
        card.parent=this
        card.$card=$('#card_'+card.id)
        card.setEnabled(false)
        this.setPos(card,this.cards.length)
        //this.deck.moveTo(card)
        //card.setVisible(true)
    }

    distribute(){
        for(let i=0;i<7;i++){
            setTimeout(()=>{
                const card=this.cards[this.cards.length-1]
                this.game.hand.moveTo(card)
            },i*1000*Game.Config.Card.AnimationDuration*0.25)
        }
    }
    shuffle(){
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        this.refreshCards()
        this.enableOnlyTop()
    }
    refreshCards(){
        this.cards.forEach((card,i)=>{
            this.setPos(card,i)
        })
    }
    remove(card){
        super.remove(card)
        this.enableOnlyTop()
        if(this.cards.length<=0){
            setTimeout(()=>{
                this.reload()
            },1000*Game.Config.Card.AnimationDuration)        
        }
        else
            this.refreshCards()
    }
    reload(){
        console.log('RELOAD !!')
        for(let i=this.game.graveyard.cards.length-1;i>=0;i--){
            const card=this.game.graveyard.cards[i]
            //card.setVisible(false)
            this.moveTo(card)
        }
        setTimeout(()=>{
            this.shuffle()
        },1000*Game.Config.Card.AnimationDuration*1.5)
    }

    moveTo(card){
        // rules
        if(this.cards.length>=this.maxCards)
            return false
        this.game.moveTo(card,this)
        return true
    }
    onMoveStart(card){
        card.setVisible(false)
        card.setEnabled(false)
        const zIndex=this.cards.length
        setTimeout(()=>{
            card.setRotate(0)
            this.setPos(card,zIndex)
        },10)
        setTimeout(this.onMoveEnded.bind(this,card),1000*Game.Config.Card.AnimationDuration)
    }
    onMoveEnded(card){
        this.enableOnlyTop()
    }
    enableOnlyTop(){
        this.cards.forEach((card,i)=>{
            card.setEnabled(i==this.cards.length-1)
        })
    }
    setPos(card,i){
        card.setZIndex(i)
        card.setPos(i*0.0005,i*0.0003)
    }
}