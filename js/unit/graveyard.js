class Graveyard extends Pile{
    constructor(game,$container){
        super(54)
        this.game=game
        this.$container=$container
    }
    toString(){
        return 'Graveyard'
    }
    newGame(){
        this.clear()
    }
    moveTo(card){
        // rules
        if(this.cards.length>=this.maxCards)
            return false
        this.game.moveTo(card,this)
        return true
    }
    onMoveStart(card){
        card.setEnabled(false)
        const zIndex=this.cards.length
        setTimeout(()=>{
            card.setRotate(0)
            card.setVisible(true)
            this.setPos(card,zIndex)
        },10)
        setTimeout(this.onMoveEnded.bind(this,card),1000*Game.Config.Card.AnimationDuration)
    }
    onMoveEnded(card){
        //card.setEnabled(true)
    }
    setPos(card,i){
        card.setZIndex(i)
        card.setPos(i*0.0005,i*0.0003)
    }
    remove(card){
        super.remove(card)
    }
}