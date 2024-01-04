class ColumnColor extends Pile{
    constructor(parent,$container,color){
        super(10)
        this.game=parent
        this.$container=$container
        this.color=color
    }   
    toString(){
        return 'ColumnColor'
    }
    newGame(){
        this.clear()
    }
    moveTo(card){
        // rules
        if(this.cards.length>=this.maxCards)
            return false
        if(card.rank==Card.JokerRank){
            if(this.cards.length==Card.RankAs || this.cards.length==Card.Rank7 || this.cards.length==Card.Rank10)
                return false
        }else{
            if(this.cards.length!=card.rank)
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
        card.setZIndex(50-i)
        card.setPos(0,-(i-1)*0.022)
    }
    remove(card){
        super.remove(card)
    }
}
