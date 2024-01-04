class Pile{
    constructor(maxCards){
        this.cards=[]
        this.maxCards=maxCards
    }
    toString(){
        return 'Pile'
    }
    clear(){
        this.cards=[]
    }
    add(card){
        if(this.cards.length>=this.maxCards)
            return false
        this.cards.push(card)
        return true
    }
    remove(card){
        const idx=this.cards.indexOf(card)
        if(idx!==-1)
            this.cards.splice(idx,1)
    }
}
