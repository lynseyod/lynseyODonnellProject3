// set up the game
// for loop for each bomb (10 for base game)
// for (i = 1; i <= 10; ++i)

  // generate random number between 1 and total grid items; store as randomSquare variable
  // const randomSquare = Math.floor(Math.Random() * gridItems)

  // use nth-of-type(randomSquare) to assign class of 'bomb' to grid item
  // check if class of 'bomb' is already on the element
    // if true, generate a new number and start again
    // if false, .addClass("bomb")
// end of for loop



// for loop for all items in the grid
  // check for adjacent bombs
    // -1 column, -1 row   // THINK OF A WAY TO CLEAN THIS UP
    // -1 column, +0 row   // OH IT'S NESTED FOR LOOPS DUH!
    // -1 column, +1 row
    // +0 column, -1 row
    // +0 column, +1 row
    // +1 column, -1 row
    // +1 column, +0 row
    // +1 column, +1 row
  // for each adjacent bomb, bombNum += 1
  // when all adjacent spaces are checked
    // if no adjacent bombs, addClass("blank")
    // else addClass("num") and html(`<p>${bombNum}</p>`)
// end of for loop

// basic rules are click once to add a flag, click a flag to clear the square.

// on click:
  // if square is already unhidden: do nothing
  // if square is hidden: addClass('flag'),
  // if square has class 'flag', removeClass('flag hidden')
    // check if square has class 'bomb'
      //if yes: end game, display lose message
      //if no: display contents
        // if hasClass("blank")
          //clear adjacent squares.
          //for (column = -1; column <= 1; ++column)
            //for (row = -1; row <= 1; ++row)
              //removeClass("hidden") to display contents (wow seems like this could be its own method huh? nice.)

//Stretch Goals!
  //beginner, intermediate, expert modes
  //long-click to flag 'maybe'
  //long-click to clear adjacent squares.

const minesweeper = {};

minesweeper.adjacencies = [-9, -8, -7, -1, +1, +7, +8, +9];

minesweeper.setBombs = function(){
  for (i = 1; i <= 10; ++i){
    let randomSquare = Math.floor(Math.random() * 64 + 1);
    let bombSquare = $(`li:nth-of-type(${randomSquare})`);
    if (bombSquare.hasClass("bomb")) {
      randomSquare = Math.floor(Math.random() * 64 + 1);
      bombSquare = $(`li:nth-of-type(${randomSquare})`);
      bombSquare.removeClass("blank").addClass("bomb");
    } else {
      bombSquare.removeClass("blank").addClass("bomb");
    }
  }
}

minesweeper.clickSquare = function() {
  $("ul").on("click", "li", function(){
    if ($(this).hasClass("flag")) {
      $(this).removeClass("hidden").removeClass("flag").addClass("unhidden")
      $(this).empty();
      if ($(this).hasClass("bomb")) {
        alert("You lose!");
        $("ul").unbind("click");  
      }
    } else if ($(this).hasClass("hidden")) {
      $(this).addClass("flag");
      $(this).html(`<i class="fas fa-flag"></i>`);
    }

    const unhiddenShit = $(".unhidden");
    if ($(".unhidden").length === ($("li").length - $(".bomb").length)) {
      alert("You win!");
      $("ul").unbind("click");
    }
  })
}

// corners must be handled on their own.
// edges must be handled separately.
// all middle squares can run through one function? or line by line ugh.
minesweeper.setNums(currentSquare, adjSquares) = function {
  let numBombs;
  adjSquares.forEach((square) => {
    if (){

    }
  })
}

minesweeper.init = function() {
  minesweeper.setBombs();
  minesweeper.bombs = $(".bomb");
  minesweeper.clickSquare()
  // minesweeper.checkBombs();
}

$(function() {
  console.log(minesweeper.gameboard.length)
  // minesweeper.init();
  // for (i = 1; i <= 64; ++i) {
  //   const thisSquare = $(`li:nth-of-type(${i})`);
  //   minesweeper.adjacencies.forEach(function(adjacency) {
  //     const $otherSquare = $(`li:nth-of-type(${i + adjacency})`);
  //     console.log($otherSquare);
  //     //ok not quite but it's a start!
  //     //border squares need helping...
  //     //starting to think it may be worth my while to make the array...
    // })
  // }
  // const allSquares = $("li");
  // // console.log(allSquares);
  // for (let square in allSquares) {
  //   const $thisSquare = $(`li:nth-of-type(${square})`);
  //   if ($thisSquare.hasClass("blank")) {
  //     let numBombs;
  //     minesweeper.adjacencies.forEach (function(adjacency) {
  //       const $otherSquare = $(`li:nth-of-type(${square + adjacency})`);
  //       console.log(square, adjacency);
  //     })
  //   }
  // }
})

