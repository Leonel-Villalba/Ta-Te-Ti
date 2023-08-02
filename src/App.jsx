import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

import { Square } from './components/Square';
import { TURNS} from './constant';
import { checkEndGame, checkWinner } from './components/logic';
import { Winner } from './components/Winner';



//TODO: COMPONENTE PRINCIPAL ------------------------------------
function App() {

  //! ESTO NO SE HACE, NO PONER HOOKS EN CONDICIONES
  // if (boardFromStorage){
  //  const [board, setBoard] = useState(Array(9).fill(null))
  //}

  //* FORMA ADECUADA
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage 
    ? JSON.parse(boardFromStorage) 
    : Array(9).fill(null)
  });
    

  const [turn, setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
    })

  // const [board, setBoard] = useState(Array(9).fill(null))
  // const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null);


  const resetGame = () =>{
    // *Resetea todo el juego
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  const updateBoard = (index) =>{
    // no sobreescribir el tablero y si hay ganador
    //no permite que se siga jugando
    if(board[index] || winner) return;

    //actualizar el tablero
    const newBoard = [...board]
    //! NUNCA PASAR UN ESTADO ASI [BOARD], SE PASA ASI [...BOARD]

    newBoard[index] = turn
    setBoard(newBoard)

    //seleccion de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // GUARDAR PARTIDA
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //comprueba si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      //*Revisa si hay empate
      setWinner(false)
    }

  }

  return (
    <main className='board'>
      <h1>Ta Te Ti</h1>
      
      <button onClick={resetGame}>Empezar de nuevo</button>

      {/* tablero */}
      <section className='game'>
        {
          board.map((square, index)=>{
            return(
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      {/* indicador de quien empieza */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
        </Square>
      </section>

      <Winner resetGame={resetGame} winner={winner}/>

    </main>
  );
}

export default App
