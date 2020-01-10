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
    // Math.random often repeats itself.
    if (bombSquare.hasClass("bomb")) {
      randomSquare = Math.floor(Math.random() * 8 + 1);
      bombSquare = $(`ul:nth-of-type(${randomCol}) li:nth-of-type(${randomSquare})`);
      bombSquare.removeClass("blank").addClass("bomb");
    } else {
      bombSquare.removeClass("blank").addClass("bomb");
    }
  }
  // initializing the countdown feature
  minesweeper.countdown();
}

//function to update our countdown!
minesweeper.countdown = function () {
  const countdown = $(".bomb").length - $(".flag").length;
  $(".countdown").html(`${countdown}`);
}

// function to find the number of the UL I've clicked on
minesweeper.findUL = function(ulToFind) {
  for (i = 1; i <= 8; ++i) {
    const checkThisUl = $(`ul:nth-of-type(${i})`);
    if (ulToFind[0] == checkThisUl[0]) {
      return i;
    }
  }
}

// function to figure which row we've clicked on
// I will figure out a way to merge this with the previous function IF IT KILLS ME.
minesweeper.findLi = function (liToFind, ulNum) {
  for (i = 1; i <= 8; ++i) {
    const checkThisLi = $(`ul:nth-of-type(${ulNum}) li:nth-of-type(${i})`)
    if (liToFind[0] == checkThisLi[0]) {
      return i;
    }
  }
}

// function to check adjacent bombs when button is clicked.
minesweeper.checkBombs = function(buttonIClicked) {
  const parentLi = buttonIClicked.parent();
  const gParentUl = parentLi.parent();
  if (parentLi.hasClass("bomb")) {
    $(".results").addClass("gameEnd").append(`<h2>Oh no!</h2>
    <p>You woke up the cats! Better luck next time.</p>`);
    $(".bomb").removeClass("hidden").addClass("unhidden").html(`<p>🙀</p>`)
    $("li button").unbind("click"); //stop the event listener when we lose.
  } else {
    const colNum = minesweeper.findUL(gParentUl);
    const rowNum = minesweeper.findLi(parentLi, colNum)
    let bombNum = 0;
    // start a for loop for our columns
    for (i = colNum - 1; i <= colNum + 1; ++i) {
      // second for loop for the rows!
      for (j = rowNum - 1; j <= rowNum +1; ++j) {
        const isThisABomb = $(`ul:nth-of-type(${i}) li:nth-of-type(${j})`)
        if (isThisABomb.hasClass("bomb")) {
          bombNum += 1;
        }
      }
    }
    parentLi.html("")
    if (bombNum != 0) {
      parentLi.append(`<p>${bombNum}</p>`);
    }
  }
}

// function for button clicking!
// without this it's all just a pretty grid.
minesweeper.clickButton = function() {
  $("li button").on("click", function(event) {
    event.preventDefault();
    const parentLi = $(this).parent();
    if (parentLi.hasClass("hidden")) {
      parentLi.removeClass("hidden").addClass("flag");
      $(this).html("C")
    } else if (parentLi.hasClass("flag")) {
      parentLi.removeClass("flag").addClass("unhidden");
      minesweeper.checkBombs($(this));
    }
    minesweeper.countdown(); // reset our counter!
  })
}

// literally just refreshes the page when you click the "refresh" button below game.
minesweeper.refreshPage = function () {
  $("#reload").on("click", function(){
    location.reload();
  })
}

// closes the results div
// only exists so you can see where the kitties were hiding if you lose.
minesweeper.closeResults = function() {
  $(".results").on("click", function(){
    $(this).hide();
  })
}

// many init. such function. wow.
// in all seriousness, it's our init function!
// our two setup functions and our event listeners!
minesweeper.init = function() {
  minesweeper.setBombs();
  minesweeper.clickButton();
  minesweeper.closeResults();
  minesweeper.refreshPage();
}

$(function() {
  //document ready!
  //a little smooth scroll.
  $("a").smoothScroll();
  minesweeper.init();
})

