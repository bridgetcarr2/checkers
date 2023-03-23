 //this is an array of arrays to configure the default layout of the checkers board
 board = [
    [null, 'w', null, 'w' , null, 'w', null, 'w'],
    ['w' , null, 'w', null, 'w' , null, 'w', null],
    [null, 'w', null, 'w' , null, 'w', null, 'w'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['b' , null, 'b', null, 'b' , null, 'b', null],
    [null, 'b', null, 'b' , null, 'b', null, 'b'],
    ['b' , null, 'b', null, 'b' , null, 'b', null] 
 ]
 
 function createBoard(){
 //chessboard is a pointer to the HTML div element called chessboard.
 var theBoard = document.createElement('section');
 //set the id of the board to checkers
 theBoard.id = 'checkers';
 //add the board to the body of the html page
 document.body.appendChild(theBoard);
        
 //this is the loop that creates each row. This loop will run 8 times.
 //this means that it will run 64 times in total (8 rows times 8 columns)
 for (var i = 0; i < 8; i++){
     //the chessSquare variable is a new element created each time this loop runs
     //this code will ultimetly create 64 squares.
     for (var j = 0; j < 8; j++){
     var square = document.createElement('div');

     //set the css classnmae for each square so they have the same style
     square.classList.add("square"); 
     square.setAttribute("id", "div" + i + j);
     //if i+j divided by 2 has a remainder of 0 then change the background colors
     //of the square to black, so that the squares alternate black and beige
     if ((i+j) % 2 == 1){
      //this makes the background color of the square black
         square.classList.add("black");
         //add an event listener for mouse click on the square
         //call the movePiece function
         square.addEventListener("click", movePiece);
     }
     //add this new div to the parent chessboard div
   theBoard.appendChild(square);

     //if the value of board [i][j] is not null, create the piece
   if (board[i][j]){
      //create piece: pass in the piece id, the class for whether the piece is
      //black or white, the id of the square so we can add the piece to it
        createPiece("piece" + i + j, "checker-" + board[i][j], square)
   }
      } 
}
}

//this is a pointer to the HTML element that stores the id of the piece that was clicked on
//this is the piece that will be moved to a new square
const selValueElem = document.querySelector("#selectedSquare");

//this is the function that creates the checkers piece
//it will be round, with a shadow and either black or white
 function createPiece(id, pieceClass, theSquare){
   //create new div
    var newPiece = document.createElement('div');
    //set the id so we can access the piece later
    newPiece.setAttribute("id", id);
    //this creates a round piece
    newPiece.classList.add("checker");
    //this determines which color the piece is
    newPiece.classList.add(pieceClass);
    //add event listener for mouse click when the piece is clicked on
    //call the getPlayerPieces function to store the selected piece id
    newPiece.addEventListener("click" , getPlayerPieces);
    //add the piece to the square
    theSquare.appendChild(newPiece);
 }

 //this function gets the id of the piece that was selected and stores it in the
 //selectedSquare hidden span
 function getPlayerPieces(){
   //write the selected piece id to the log to see what was clicked
   console.log("piece selected=", event.target.id);

   //the id of the piece
   var selectedPieceId = event.target.id;
   //remove the word piece
   selectedPieceId = selectedPieceId.replace("piece", "");
   //store the piece id in the span
   selValueElem.dataset.value = selectedPieceId;

 }

 //this function will move the piece to a new square
 function movePiece(){
   //write the selected square id (of the new square) to the log to see what was clicked
   console.log("square selected=", event.target.id);

   //the new square that was clicked
   var newSquareId = event.target.id;
   //remove the div and piece prefix, so we only get the number of the square
   newSquareId = newSquareId.replace("div", "");
   newSquareId = newSquareId.replace("piece", "");

   //get the selected checkers piece id from the hidden span
   var selectedPieceId = selValueElem.dataset.value;

   //if a different square was clicked, then run the code to move the piece
   if (selectedPieceId != newSqaureId){
      //the old square
      var oldSquare = document.getElementById("div" + selectedPieceId);
      //the old piece
      var oldPiece = document.getElementById("piece" + selectedPieceId);
      //this is the class that determinesif this is a white or a black piece
      //we track so the new piece has the same color as the old piece
      var pieceClass = oldPiece.classList[1];
      
      //remove the origional piece from the board
      oldSquare.removeChild(oldPiece);

      //this is a pointer to the square where the piece is going to be moved to
      var newSqaure = document.getElementById("div" + newSquareId);

      //create the piece in the new square with the piece id, same color as the old piece
      //place it in the destination square
      createPiece("piece" + newSquareId, pieceClass, newSqaure);

      //remove the old piece id from the hidden span for good measures
      selValueElem.dataset.value = "";
   }


 }