class Game{
    constructor($container){
        this.$container=$container
        document.documentElement.style.setProperty('--card-animation-duration', Game.Config.Card.AnimationDuration+'s');
        this.cards=new Pile(54)
        this.deck=new Deck(this,this.$container.find(".pile.deck"))
        this.graveyard=new Graveyard(this,this.$container.find(".pile.graveyard"))
        this.reserve=new Reserve(this)
        this.hand=new Hand(this,this.$container.find(".pile.hand"))
        this.columnsColor=[
            new ColumnColor(this,$container.find(".pile.columnColorH"),Card.Heart),
            new ColumnColor(this,$container.find(".pile.columnColorD"),Card.Diamond),
            new ColumnColor(this,$container.find(".pile.columnColorC"),Card.Club),
            new ColumnColor(this,$container.find(".pile.columnColorS"),Card.Spade),
        ]
        this.columnsKJ=[
            new ColumnKJ(this,$container.find(".pile.ColumnKJH"),Card.Heart),
            new ColumnKJ(this,$container.find(".pile.ColumnKJD"),Card.Diamond),
            new ColumnKJ(this,$container.find(".pile.ColumnKJC"),Card.Club),
            new ColumnKJ(this,$container.find(".pile.ColumnKJS"),Card.Spade),
        ]
        this.setPV(0)
    }
    toString(){
        return 'Game'
    }
    setPV(hp){
        this.hp=hp
        //
    }
    newGame(){
        this.setPV(10)
        this.cards.clear();
        this.deck.newGame()
        this.graveyard.newGame()
        this.reserve.newGame()
        this.hand.newGame()
        this.columnsColor.forEach((column)=>{
            column.newGame()
        })
        this.columnsKJ.forEach((column)=>{
            column.newGame()
        })
        $(document).on("click",'.card',this.onCardClick.bind(this))
    }
    getWidth(){
        return this.$container.width()
    }
    getHeight(){
        return this.$container.height()
    }
    getMoveOffset(card,$toContainer,noScale){
        const offsetTo=$toContainer.offset()
        const offsetCard=card.$card.offset()
        return noScale ?
            new Position((offsetCard.left-offsetTo.left),(offsetCard.top-offsetTo.top)) :
            new Position((offsetCard.left-offsetTo.left)/this.getWidth(),(offsetCard.top-offsetTo.top)/this.getHeight())
    }
    moveTo(card,boxTo){
        let delta=null
        if(card.parent){
            delta=this.getMoveOffset(card,boxTo.$container)
            if(!(card.parent instanceof Game))
                card.parent.remove(card)
            if(card.parent instanceof Deck)
                card.setZIndex(10000)
        }
        boxTo.cards.push(card)
        card.parent=boxTo
        card.moveToContainer(boxTo.$container)
        if(delta)
            card.setPos(delta.x,delta.y)
        boxTo.onMoveStart(card)
    }
    debug(){
        this.cards.forEach((card,i)=>{
            console.log(card.toString(),i)
        })
    }
    onCardClick(e){        
        const id=/(\d+)$/.exec(e.currentTarget.id)[0]
        const card=this.cards.cards[id]
        console.log(card.toString(),card)
    
        const idColumn=card.rank==Card.JokerRank ? Math.floor(Math.random()*4) : card.color
        if(!this.columnsKJ[idColumn].moveTo(card)){
            if(card.parent==this.hand || !this.hand.moveTo(card)){
                if(card.parent==this.columnsColor[idColumn] || !this.columnsColor[idColumn].moveTo(card)){
                    if(card.parent!=this.graveyard)
                        this.graveyard.moveTo(card)
                }
            }
        }
        //this.hand.moveTo(card)
        //this.graveyard.moveTo(card)
        //this.columnsColor[0].moveTo(card)
    }
    onPlayCard(card){

    }
}
Game.getRotationDegrees=function(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}
Game.Config={
    Card:{
        AnimationDuration:0.5
    }
}
