var OpenCloseNavbar = 0;
var Mobile_view = 0;

$(document).ready(function () {
  $(".navopen").click(function () {
    if (OpenCloseNavbar == 0 && Mobile_view == 0) {
      $(".sidenav").css({ width: "250px" });
      $(".overlay").css({ display: "block" });
      OpenCloseNavbar = 1;
    } else if (OpenCloseNavbar == 1 && Mobile_view == 0) {
      $(".sidenav").css({ width: "60px" });
      // $(".overlay").css({"display":"none"});
      OpenCloseNavbar = 0;
    } else if (OpenCloseNavbar == 0 && Mobile_view == 1) {
      $(".sidenav").css({ width: "60px" });
      $(".overlay").css({ display: "none" });
      OpenCloseNavbar = 0;
    } else if (Mobile_view == 1 && OpenCloseNavbar == 1) {
      $(".sidenav").css({ width: "0px" });
      $(".overlay").css({ display: "none" });
      OpenCloseNavbar = 0;
      Mobile_view = 0;
    }
  });
  $(".overlay").click(function () {
    $(".sidenav").css({ width: "0px" });
    $(".overlay").css({ display: "none" });
    OpenCloseNavbar = 0;
    Mobile_view = 0;
  });

  $(".btn2").click(function () {
    $(".sidenav").css({ width: "250px" });
    $(".overlay").css({ display: "block" });
    Mobile_view = 1;
    OpenCloseNavbar = 1;
  });
});

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

    if ("p" in localStorage) {
      var retrievedData1 = localStorage.getItem("p");
      var retrievedData2 = localStorage.getItem("t");
      var winner = JSON.parse(retrievedData1);
      var time = JSON.parse(retrievedData2);
      winner.push("player " + set[x]);
      var dt = new Date();
      var ti = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      time.push("" + ti);
      localStorage.setItem("p", JSON.stringify(winner));
      localStorage.setItem("t", JSON.stringify(time));
    } else {
      p = [];
      t = [];
      p.push("player " + set[x]);
      var dt = new Date();
      var ti = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      t.push("" + ti);
      localStorage.setItem("p", JSON.stringify(p));
      localStorage.setItem("t", JSON.stringify(t));
    }
  }
}

function result_table() {
  if ("p" in localStorage) {
    var retrievedData1 = localStorage.getItem("p");
    var retrievedData2 = localStorage.getItem("t");
    var winner = JSON.parse(retrievedData1);
    var time = JSON.parse(retrievedData2);
    let lastFiveRecords = winner.length < 5 ? 0 : winner.length - 5;
    for (var i = winner.length - 1; i >= lastFiveRecords; i--) {
      if (winner[i] == "player O")
        document.write(
          "<tr><td class='player_x'>" +
            (winner.length - i) +
            "</td><td class='player_x'>" +
            winner[i] +
            "</td><td class='player_x'>" +
            time[i] +
            "</td></tr>"
        );
      else
        document.write(
          "<tr onclick='newOrder();'><td>" +
            (winner.length - i) +
            "</td><td>" +
            winner[i] +
            "</td><td>" +
            time[i] +
            "</td></tr>"
        );
    }
  } else {
    document.write("<tr><td colspan='3'>NO DATA</td></tr>");
  }
}

function clear_history() {
  localStorage.removeItem("p");
  localStorage.removeItem("t");
  document.location.reload(true);
}

function newOrder() {
  xorder = 1;
}
