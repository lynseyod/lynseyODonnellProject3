//Stretch Goals!
  //beginner, intermediate, expert modes
  //long-click to flag 'maybe'
  //long-click to clear adjacent squares.

const minesweeper = {};

// this function randomly assigns bombs to squares in the grid!
minesweeper.setBombs = function(){
  for (i = 1; i <= 10; ++i){
    //because each column is a seperate ul, we can't just use li:nth-of-type
    // first select the column, then the li within it, to set the bombs!
    let randomCol = Math.floor(Math.random() * 8 + 1);
    let randomSquare = Math.floor(Math.random() * 8 + 1);
    let bombSquare = $(`ul:nth-of-type(${randomCol}) li:nth-of-type(${randomSquare})`);
    //if the square is already a bomb, pick a new number!
    if (bombSquare.hasClass("bomb")) {
      randomSquare = Math.floor(Math.random() * 8 + 1);
      bombSquare = $(`ul:nth-of-type(${randomCol}) li:nth-of-type(${randomSquare})`);
      bombSquare.removeClass("blank").addClass("bomb");
    } else {
      bombSquare.removeClass("blank").addClass("bomb");
    }
  }
}

// function to calculate how many bombs any square is touching.
minesweeper.setNums = function(){
  // for loop to work through the columns
  for (i = 1; i <= 8; ++i) {
    // nested for loop to work through each li in the column
    for (j = 1; j <= 8; ++j) {
      let bombNum = 0;
      const thisSquare = $(`ul:nth-of-type(${i}) li:nth-of-type(${j})`);
      for (x = -1; x <= 1; ++x) {
        for (y = -1; y <= 1; ++y) {
          const checkIt = $(`ul:nth-of-type(${i+x}) li:nth-of-type(${j+y})`);
          if (checkIt !== thisSquare) {
            if (checkIt.hasClass("bomb")) {
              bombNum += 1;
            }
          }
        }
      }
      if (bombNum !== 0 && thisSquare.hasClass("blank")) {
        thisSquare.removeClass("blank").append(`<p class="num">${bombNum}</p>`);
      }
    }
  }
}

// event listener for the clicks!
// without this it's all just a pretty grid.
minesweeper.clickSquare = function() {
  $("ul").on("click", "li", function(){
    if ($(this).hasClass("flag")) {
      $(this).removeClass("flag").addClass("unhidden")
      if ($(this).hasClass("bomb")) {
        $(".results").addClass("gameEnd").append(`<h2>Oh no!</h2>
        <p>You woke up the cats! Better luck next time.</p>`);
        $(".bomb").removeClass("hidden").addClass("unhidden").append(`<p>🙀</p>`)
        $("ul").unbind("click");
      }
    } else if ($(this).hasClass("hidden")) {
      $(this).removeClass("hidden").addClass("flag");
    }
    if ($(".unhidden").length === ($("li").length - $(".bomb").length)) {
      alert("You win!");
      $("ul").unbind("click");
    }
  })
}

minesweeper.refreshPage = function () {
  $("main button").on("click", function(){
    location.reload();
  })
}

minesweeper.init = function() {
  minesweeper.setBombs();
  minesweeper.setNums();
  minesweeper.clickSquare()
  minesweeper.refreshPage();
}

$(function() {
  $("a").smoothScroll();
  minesweeper.init();
})

