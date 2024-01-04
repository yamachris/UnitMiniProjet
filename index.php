<?
$Version=time();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>    
    <title>314 WAVES</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="P3P" content='CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link type="text/css" href="./css/styles.css?v=<?=$Version?>" media="screen" rel="stylesheet" />
    
    <script type="text/javascript" src="./js/jquery-3.7.1/jquery-3.7.1.min.js"></script>
    <script type="text/javascript" src="./js/unit/position.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/card.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/pile.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/deck.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/graveyard.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/hand.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/reserve.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/columnColor.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/columnKJ.js?v=<?=$Version?>"></script>
    <script type="text/javascript" src="./js/unit/game.js?v=<?=$Version?>"></script>
    <script type="text/javascript">
        let game=null
        $(document).ready(function(e){
            game=new Game($('#gameJ1'))
            game.newGame()
            /*
            $('.card').click(function(){
                const x=-1000*Math.random()
                const y=400*Math.random()
                $(this).css({left: x,top: y})
            });*/
        });
    </script>
</head>
<body>
    <div id="gameJ1" class="game">
        <div class="pile graveyard"></div>
        <div class="pile deck"></div>
        <div class="pile hand"></div>
        
        <div class="pile columnColorH"></div>
        <div class="pile columnColorD"></div>
        <div class="pile columnColorC"></div>
        <div class="pile columnColorS"></div>
        
        <div class="pile ColumnKJH"></div>
        <div class="pile ColumnKJD"></div>
        <div class="pile ColumnKJC"></div>
        <div class="pile ColumnKJS"></div>
        
    </div>
<!--
    <div class="game">
        <div class="pile graveyard"></div>
        <div class="pile deck"></div>
    </div>
//-->
</body>
</html>
