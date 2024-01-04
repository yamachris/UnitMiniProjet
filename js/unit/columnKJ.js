class ColumnKJ extends Pile{
    constructor(parent,$container,color){
        super(2)
        this.game=parent
        this.$container=$container
        this.color=color
    }
    toString(){
        return 'ColumnKJ '+color
    }
    newGame(){
        this.clear()
    }
    moveTo(card){
        if(this.cards.length>=this.maxCards)
            return false
        if(card.isJoker())
        {
            // TODO
            return false
        }
        else{
            if(this.color!=card.color)
                return false
            if(!card.isJack() && !card.isKing())
                return false
        }
        this.game.moveTo(card,this)
        return true
    }
    onMoveStart(card){
        //card.setZIndex(10)
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
        const z=card.isJack() ? 0 : 1
        card.setZIndex(z)
        card.setPos(0,z*0.022)
    }
    remove(card){
        super.remove(card)
    }
}
