class RPSGame{
    //p1 e p2 sono i giocatori, _p1 vuol dire che p1 è privata
    constructor(p1,p2){
        this._players = [p1,p2];
        this._moves = [null,null]; //mossa p1 e mossa p2
        //inizio il gioco
        this._sendToPlayers("Game starts");
        this._players.forEach((pl, index) => {
            pl.on('move', (move)=>{
                this._onMove(index, move);
            });
        });
    }

    _sendToPlayer(plIndex,msg){
        this._players[plIndex].emit('message', msg);
    }
    _sendToPlayers(msg){
        this._players.forEach((pl) => {
            pl.emit('message', msg);
        });
    }

    _onMove(plIndex, move){
        this._moves[plIndex] = move;
        this._sendToPlayer(plIndex, "<p style=\"color:blue\">You've chosen "+move+"</p>");
        this._gameOver();
    }

    _gameOver(){
        if(this._moves[0] && this._moves[1]){
            this._sendToPlayers("Game over: " + this._moves.join(" : "));
            //res determina quale player ha vinto
            const res = (3 + this._moveValue(this._moves[0])-this._moveValue(this._moves[1]))%3;
            if(res){
                this._sendToPlayer(res-1,"<p style=\"color:green\">You win</p>");
                this._sendToPlayer(res%2,"<p style=\"color:red\">You lose</p>");
            }else{
                this._sendToPlayers("<p style=\"color:#ffc40c\">It's a Draw</p>");
            }
            this._moves = [null,null];
            this._sendToPlayers("Play again:");
        }
    }
    
    //usato per facilitare la decisione del vincitore
    _moveValue(move){
        switch(move){
            case 'rock':
                return 0;
            case 'paper':
                return 1;
            case 'scissors':
                return 2;
            default:
                throw new Error("Could not decode move: "+move);
        }
    }
}
module.exports = RPSGame;
