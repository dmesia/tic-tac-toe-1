/*----- constants -----*/
// Model
//Winning COMBO
const COMBOS = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Players

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': ''
    //'null'(use quotes to avoid error) perfect for absence of value  with an empty string
};


/*----- app's state (variables) -----*/
//Model
//Will change and affect our game. State variable.

let turn, winner, gameboard;

/*----- cached element references -----*/

//View

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message');

/*----- event listeners -----*/
//Controller

$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);


/*----- functions -----*/

//start the game once the browser loads
handleInit();

function handleInit(){
   // This function will do two things
   //1.Start the game
        //A.create an empty gamboard
        gameboard = new Array(9).fill().map(() => null);
        //B.assign the turn - player 1 goes first - x goes
        turn = 1;
        //C.set the winner to false
        winner = false;
        //D. Visualize the state of the game to the DOM--render()(Show user what the game looks like, transferign the state of the game)
        render();
   //2.Last thing reset the game
}

function checkWinner(){
    //compare the positions of the players pieces(1 or -1) in the COMBOS array
    //Use Math.abs 
    for(let i = 0; i < COMBOS.length; i++){
        if(Math.abs(gameboard[COMBOS[i][0]] + gameboard[COMBOS[i][1]] + gameboard[COMBOS[i][2]]) === 3){
            return gameboard[COMBOS[i][0]]
        }
    } if(gameboard.includes(null)) return false;
    return 'T'

}

function handleMove(event){
    const position = event.target.dataset.index;
    //
    if(winner || gameboard[position]) return;
    //taking the gameboard at the position of whatver that value is between 0 and 8 then fo to that position and assign it to whoevers turn that is.
    gameboard[position] = turn;
    //show uswr change of data with render
    //check for winner
    winner = checkWinner();
    
    //toggle turn
    turn *= -1;

    render();
};
//Just for updating the DOM
function render(){
    //render is going to look at the gameboard array 
    gameboard.forEach(function(value, index) {
        $($squareEls[index]).text(LOOKUP[value])
    });
    //render will also update our message based on the turn or if we won
    if(!winner){
        $messageEl.text(`It's Player ${LOOKUP[turn]}'s Turn`)
    } else if (winner === 'T'){
        $messageEl.text(`It's a Tie`)
    } else {
        $messageEl.text(`Congratulations ${LOOKUP[winner]} Wins`)
    }
}

