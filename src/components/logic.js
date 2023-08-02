import { WINNER_COMBOS } from "../constant";

export const checkWinner = (boardToCheck) => {
    //revisa si hay un ganador
    for(const combo of WINNER_COMBOS){
        const [a, b, c] = combo
        if(
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ){
            return boardToCheck[a]
        }
    }
    //si no hay ganador devuelve empate
    return null
};


export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
}