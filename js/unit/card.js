class Card{
    constructor(color,rank){
        this.parent=null
        this.color=color
        this.rank=rank
        this.isVisible=false
        this.id=null
        this.$card=null
    }
    create(){
        this.id=Card.count
        Card.count++
        return Card.Html(this.id)
    }
    moveToContainer($container){
        $container.append(this.$card.detach())
    }
    flip(){
        setVisible(this.isVisible)
    }
    setVisible(is){
        if(is){
            this.$card.find('.front').css('background-image',"url('./svg/"+Card.Ranks[this.rank]+Card.Colors[this.color]+".svg')")
            this.$card.addClass('visible')
        }
        else{
            this.$card.find('.front').css('background-image',"none")
            this.$card.removeClass('visible')
        }
    }
    setZIndex(zIndex){
        this.$card.css('z-index',zIndex)
    }
    setPos(x,y){
        this.$card.css({'left':'calc('+x+' * var(--game-width))','top':'calc('+y+' * var(--game-height))'})
    }
    getRotate(){
        return Game.getRotationDegrees(this.$card)
    }
    setRotate(angle){
        this.$card.css('transform','rotateZ('+angle+'deg)')
    }
    toString(){
        const nameParent=this.parent ? this.parent.toString()+': ' : ''
        return nameParent+(this.rank==Card.JokerRank ? 'Joker-'+Card.Colors[this.color] : Card.Ranks[this.rank]+Card.Symbols[this.color])
    }
    setEnabled(is){
        //console.log('setEnabled: '+this.toString(),is)
        if(is)
            this.$card.removeClass('disabled')
        else if(!this.$card.hasClass('disabled'))
            this.$card.addClass('disabled')
    }
    isRank(rank){return this.rank==rank}
    is10(){return this.rank==Card.Rank10}
    isJack(){return this.rank==Card.RankJ}
    isQueen(){return this.rank==Card.RankQ}
    isKing(){return this.rank==Card.RankK}
    isJoker(){return this.rank==Card.JokerRank}
}
Card.count=0
Card.Html=(id) => `
<div class="card" id="card_${id}">
    <div class="flip">
        <div class="front"></div>
        <div class="back"></div>
    </div>
</div>
`;
Card.RankAs=0
Card.Rank2=1
Card.Rank3=2
Card.Rank4=3
Card.Rank5=4
Card.Rank6=5
Card.Rank7=6
Card.Rank8=7
Card.Rank9=8
Card.Rank10=9
Card.RankJ=10
Card.RankQ=11
Card.RankK=12
Card.JokerRank=13
Card.JokerColorBlack=4
Card.JokerColorRed=5
Card.Heart=0
Card.Diamond=1
Card.Club=2
Card.Spade=3
Card.Colors=['H','D','C','S','Black','Red']
Card.Ranks=['A','2','3','4','5','6','7','8','9','10','J','Q','K','Joker']
Card.Symbols=['♥','♦','♣','♠']
