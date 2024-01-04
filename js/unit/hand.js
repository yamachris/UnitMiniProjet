class Hand extends Pile{
    constructor(game,$container){
        super(7)
        this.game=game
        this.$container=$container
        this.reserve=new Reserve(this)
    }
    toString(){
        return 'Hand'
    }
    newGame(){
        this.clear()
        this.reserve.newGame()
    }
    refreshCards(){
        this.cards.forEach((card,i)=>{
            this.setPos(card,i)
        })
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
            card.setVisible(true)
            this.setPos(card,zIndex)
            this.refreshCards()
        },10)
        setTimeout(this.onMoveEnded.bind(this,card),1000*Game.Config.Card.AnimationDuration)
    }
    onMoveEnded(card){
        card.setEnabled(true)
    }
    setPos(card,i){
        card.setZIndex(i)
        const angleStart=-(this.cards.length-1)*Hand.Angle*0.5
        const angle=angleStart+i*Hand.Angle
        const x=10*Math.cos(angle*Math.PI/180.0)/this.game.getWidth()
        const y=10*Math.sin(angle*Math.PI/180.0)/this.game.getHeight()
        card.setPos(x,y)
        card.setRotate(angle)
    }
    remove(card){
        super.remove(card)
        this.refreshCards()
    }
}
Hand.Angle=15