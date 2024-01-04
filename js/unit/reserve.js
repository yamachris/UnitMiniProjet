class Reserve extends Pile{
    constructor(parent){
        super(2)
        this.game=parent
    }
    toString(){
        return 'Reserve'
    }
    newGame(){
        this.clear()
    }
}