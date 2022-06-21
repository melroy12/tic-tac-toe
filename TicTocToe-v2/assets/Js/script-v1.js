counter = 0;
var w;
function openNav() {
  if (counter == 0) {
    document.getElementById("mySidenav").style.width = "300px";
    counter = 1;
  } else {
    w = window.innerWidth;
    if (w <= 457) {
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("content").style.marginLeft = "0px";
    } else {
      document.getElementById("mySidenav").style.width = "60px";
    }
    counter = 0;
  }
}

window.addEventListener("mouseup", function (event) {
  var n = document.getElementById("z");
  if (event.target != n) {
    mySidenav.style.width = "60px";
    content.style.marginLeft = "0px";
  }
});

// function closeNav() {
//   // document.getElementById("main").style.marginLeft= "60px";
//    document.getElementById("mySidenav").style.width = "60px";
//   // document.body.style.backgroundColor = "#638";
//   counter=0;
// }

let flag = 0;
let won = 0;
let set = ["Q", "W", "E", "R", "T", "Y", "U", "I"];
let order = ["Q", "W", "E", "R", "T", "Y", "U", "I"];

function myFunction(tx, stand) {
  if (flag % 2 == 0 && set[stand] != "X" && set[stand] != "O") {
    tx.innerHTML = "X";
    set[stand] = "X";
    order[flag] = stand;
    flag++;
  } else if (set[stand] != "X" && set[stand] != "O") {
    tx.innerHTML = "O";
    set[stand] = "O";
    order[flag] = stand;
    flag++;
  }
  if (flag >= 5) finding(stand);
  if (won == 0 && flag > 8)
    setTimeout(function () {
      alert('Match draw Press "OK" for one more try');
      Reset();
    }, 200);
}

function winer(wh) {
  setTimeout(function () {
    alert("Player " + wh + ' Won the game Press "OK" for one more try');
    Reset();
  }, 200);
}

function Reset() {
  document.location.reload(true);
}

function Undo() {
  if (flag > 0) {
    flag--;
    var x = order[flag];
    set[x] = order[flag] + "a";
    document.getElementById("td_" + x).innerHTML = "";
  }
}

function finding(s) {
  switch (s) {
    case 0:
      check_for_win(0, 4, 8); //first dia
      check_for_win(0, 1, 2); //first row
      check_for_win(0, 3, 6); //first col
      break;

    case 1:
      check_for_win(1, 4, 7); //second col
      check_for_win(0, 1, 2); //first row
      break;

    case 2:
      check_for_win(2, 5, 8); //third col
      check_for_win(0, 1, 2); //first row
      check_for_win(2, 4, 6); //second dia
      break;

    case 3:
      check_for_win(0, 3, 6); //first col
      check_for_win(3, 4, 5); //second col
      break;

    case 4:
      check_for_win(1, 4, 7); //second col
      check_for_win(0, 4, 8); //first dia
      check_for_win(2, 4, 6); //second dia
      check_for_win(3, 4, 5); //second row
      break;

    case 5:
      check_for_win(2, 5, 8); //third col
      check_for_win(3, 4, 5); //second row
      break;

    case 6:
      check_for_win(6, 7, 8); //third row
      check_for_win(2, 4, 6); //second dia
      check_for_win(0, 3, 6); //first col
      break;

    case 7:
      check_for_win(6, 7, 8); //third row
      check_for_win(1, 4, 7); //second col
      break;

    case 8:
      check_for_win(6, 7, 8); //third row
      check_for_win(2, 5, 8); //third col
      check_for_win(0, 4, 8); //first dia
      break;
  }
}

function check_for_win(x, y, z) {
  if (set[x] == set[y] && set[x] == set[z]) {
    document.getElementById("Line_" + x + "" + y + "" + z).style.display =
      "block";
    winer(set[x]);
    won = 1;
  }
}
