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

// function to calculate how many bombs any square is touching.
minesweeper.setNums = function(){
  // for loop to work through the columns
  for (i = 1; i <= 8; ++i) {
    // nested for loop to work through each li in the column
    for (j = 1; j <= 8; ++j) {
      let bombNum = 0;
      const thisSquare = $(`ul:nth-of-type(${i}) li:nth-of-type(${j})`);
      // first for loop to get through previous, current and next column
      for (x = -1; x <= 1; ++x) {
        // second for loop for previous, current, and next row.
        for (y = -1; y <= 1; ++y) {
          const checkIt = $(`ul:nth-of-type(${i+x}) li:nth-of-type(${j+y})`);
          if (checkIt !== thisSquare) { //current square doesn't need to be checked.
            if (checkIt.hasClass("bomb")) {
              bombNum += 1;
            }
          }
        }
      }
      // only displays non-0 values and only for 'blanks' (not bombs)
      if (bombNum !== 0 && thisSquare.hasClass("blank")) {
        thisSquare.removeClass("blank").append(`<p class="num">${bombNum}</p>`);
      }
    }
  }
}

// function to check adjacent bombs when button is clicked.
minesweeper.checkBombs = function(buttonIClicked) {
  console.log(buttonIClicked)
  const parentLi = buttonIClicked.parent();
  const gParentUl = parentLi.parent();
  if (parentLi.hasClass("bomb")) {
    console.log("bomb!")
    $(".results").addClass("gameEnd").append(`<h2>Oh no!</h2>
    <p>You woke up the cats! Better luck next time.</p>`);
    $(".bomb").removeClass("hidden").addClass("unhidden").html(`<p>🙀</p>`)
    $("li button").unbind("click"); //stop the event listener when we lose.
  } else {
    // for loop to work through the columns
    for (i = 1; i <= 8; ++i) {
      // nested for loop to work through each li in the column
      for (j = 1; j <= 8; ++j) {
        let bombNum = 0;
        const thisSquare = $(`ul:nth-of-type(${i}) li:nth-of-type(${j})`);
        // first for loop to get through previous, current and next column
        for (x = -1; x <= 1; ++x) {
          // second for loop for previous, current, and next row.
          for (y = -1; y <= 1; ++y) {
            const checkIt = $(`ul:nth-of-type(${i+x}) li:nth-of-type(${j+y})`);
            if (checkIt !== thisSquare) { //current square doesn't need to be checked.
              if (checkIt.hasClass("bomb")) {
                bombNum += 1;
              }
            }
          }
        }
        // only displays non-0 values and only for 'blanks' (not bombs)
        if (bombNum !== 0 && thisSquare.hasClass("blank")) {
          thisSquare.removeClass("blank").append(`<p class="num">${bombNum}</p>`);
        }
      }
    }
  }
}

// function for button clicking!
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
  })
}

// event listener for the clicks!
// without this it's all just a pretty grid.
minesweeper.clickSquare = function() {
  $("ul").on("click", "li", function(){
    // first check if it's hidden; first click "flags" a cat!
    if ($(this).hasClass("hidden")) {
      $(this).removeClass("hidden").addClass("flag");
    } else if ($(this).hasClass("flag")) { //second click "unpacks" the box
      $(this).removeClass("flag").addClass("unhidden");
      if ($(this).hasClass("bomb")) {
        $(".results").addClass("gameEnd").append(`<h2>Oh no!</h2>
        <p>You woke up the cats! Better luck next time.</p>`);
        $(".bomb").removeClass("hidden").addClass("unhidden").append(`<p>🙀</p>`)
        $("ul").unbind("click"); //stop the event listener when we lose.
      }
    }
    // update the countdown on click, so it removes "flagged" kitties.
    minesweeper.countdown(); 

    // check if we've won!
    if ($(".unhidden").length === ($("li").length - $(".bomb").length)) {
      $(".results").addClass("gameEnd").append(`<h2>You win!</h2>
      <p>You unpacked all of the boxes you could without disturbing your sleeping kitties! Great work!</p>`);
    $("ul").unbind("click"); //stop the event listener when we WIN!
    }
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

