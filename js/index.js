var YOU;
var OPP;
var X = [];
var O = [];
var computer_first;
var limit_h;
var limit_c;
var start;

// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
//   //if(localStorage.getItem("STORE") === "undefined"){
//     var store = JSON.stringify({"score_human": "0", "score_computer": "0"});
//     localStorage.setItem("STORE", store);
//   //}  
// } 

//var next_O;
// var convert = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
var winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const perm = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

$('.reset').on('click', function(){
  var store = JSON.stringify({"score_human": "0", "score_computer": "0"});
  localStorage.setItem("STORE", store);
  $("#h_score").text("0");
  $("#c_score").text("0");
  window.location.replace(window.location.pathname + window.location.search + window.location.hash);
});

function choose_letter(){
  $(".playagain").css("display", "none");
  $("#myModal").css("display", "block");
  $(".choose").on('click', function(){
    YOU = $(this).text();
    if (YOU === "X"){
      OPP = "O";
      $("#Human").append("<b>(X)</b>");
      $("#Computer").append("<b>(O)</b>");
      computer_first = false;
    }
    else {
      OPP = "X";
      $("#Human").append("<b>(O)</b>");
      $("#Computer").append("<b>(X)</b>");
      computer_first = true;
    }
    //console.log(YOU);
    $("#myModal").css("display", "none");
    choose_player();
  });
}

function play_again(status){
  //$(".turn").text("");
  start = false;
  $(".playagain").css("display", "block");
  $(".choose").css("display", "none");

  $("h2").text(status);
  var score = JSON.parse(localStorage.getItem("STORE"));
  var new_score = 0;
  
  
  if(status === "Winner!"){
     //new_score = Math.round((parseInt($("#h_score").text()) + 1));
        limit_c--;
        new_score = limit_h;
        console.log(new_score);
        score["score_human"] = new_score;
        console.log(localStorage.getItem("SCORE"));
        var str_score = JSON.stringify(score);
        localStorage.setItem("STORE", str_score);
        console.log(localStorage.getItem("SCORE"));
        $("#h_score").text(new_score);
  }
  else if(status === "Try Again"){
    //new_score = Math.round((parseInt($("#c_score").text()) + 1));
        limit_h--;
        new_score = limit_c;
        console.log(new_score);
        score["score_computer"] = new_score;
        var str_score = JSON.stringify(score);
        localStorage.setItem("STORE", str_score);
        console.log(localStorage.getItem("SCORE"));
        //localStorage["STORE"] = JSON.stringify(score);
        //$("#c_score").fadeOut(300, function(){
          //$(this).text(new_score);
        $("#c_score").text(new_score);
  }
    $("#myModal").css("display", "block");
    $(".playagain").on('click', function(){
      
      $("#myModal").css("display", "none");
      //window.location.reload();
      window.location.replace(window.location.pathname + window.location.search + window.location.hash);

    });  
}

function choose_player(){
  $("h2").text("You go...");
  var select = Math.random()*10;
  if(select < 5){
    $(".turn").text("Your Turn");
    $(".tell").text("First");
    computer_first = false;
  }
  else {
    $(".turn").text("Opponent's Turn");
    $(".tell").text("Second");
    computer_first = true;
  }
  $("#nextModal").css("display", "block");
  count_down(4);
}

function count_down(time){
  setTimeout(function(){   
    time--;
    $(".count").text(time);
    if(time === 0){
      $("#nextModal").css("display", "none");
      console.log("start");
      return play();
    }
    else {
      start = true;
      return count_down(time);
    }
  }, 1000);
}

function play(){
  //if(X.length > 2 || O.length > 2) return check_win();
  // console.log("play");
  // console.log(X);
  // console.log(O);
  //var func = -1;
  if(start === true){
  if($(".turn").text() === "Your Turn"){
    start = false;

    $('button').on('click', function(e){
      if($(this).text() === "_"){
        var new_X = parseInt(this.id);

        var words = $('#' + this.id + " span");
        $(".turn").fadeOut(100, function(){
        $(this).text("");
        $(".turn").fadeIn(500, function(){
          //computer_play();  
        
          
          $(words).fadeOut(100, function(){
            $(this).text(YOU);
            //bandaid
            if(X.indexOf(new_X) == -1){
              X.push(new_X);
            }
            
            $(this).fadeIn(300, function(){
              return check_win("Opponent's Turn");
              //func = check_win("Opponent's Turn");
            });
          });
         });
      }); 
      }                   
    });
    //return func;
  }
  
  else if($(".turn").text() === "Opponent's Turn"){
    //prevent computer from playing more than once and person
    start = false;
    setTimeout(function(){
      $(".turn").fadeOut(100, function(){
        $(this).text("");
        $(".turn").fadeIn(500, function(){
          computer_play();  
        });
      });
    }, 500);
    
    // $(".turn").fadeOut(100, function(){
    //   $(this).text("");
    //   computer_play();
    // });
  }
  }
  else{
    return play();
  }
  
}


function computer_play(){
  // console.log("computer_play");
  // console.log(X);
  // console.log(O);
  //random first move
  //console.log(O.length);
  var arr = 10;
  var combo = /^\d$/;
  var next_O = find_win(O);
  var next_X = find_win(X);
  var Ot = combo.test(next_O);
  var Xt = combo.test(next_X);
  
  
  if(O.length <= 1 && X.length <= 1){
    //randomly select even number for first move
    var select = 0;
    while (true){
      select = ((Math.round(Math.random()*4))*2).toString();
      if($('#' + select).text() === "_"){
        arr = select;
        break;
      }
    }
  }
  
  
  else if(O.length > 1 || X.length > 1){
  //else{
    
    // console.log("next_O " + next_O);
    // console.log("next_X " + next_X);

    //check if computer is about to win
    if(Ot === true && Xt === true){
      //return computer_mark(next_O);
      Xt = false;
    } 
    
    if(Ot === true && Xt === false){
      //return computer_mark(next_O);
      arr = next_O;
    } 
    //check only opponent is about to win
    else if(Ot === false && Xt === true){
      //return computer_mark(next_X);
      arr = next_X;
    }
    //select random if neither are about to win
    //else if(next_X === undefined && next_O === undefined) {
    else if(Ot === false && Xt === false){
      var random_select = 0;
      while(true){
        random_select = Math.round(Math.random()*9).toString();
        if($('#' + random_select).text() === "_") {
          //return computer_mark(random_select);
          arr = random_select;
          break;
        }
      }
     }   
   }
  if(arr !== 10){
    return computer_mark(arr);
  }
}

//select is passed in as a string
function computer_mark(select){
  console.log("computer_mark");
  console.log(X);
  console.log(O);
  
  var new_Y = parseInt(select);
  var test = false;
  
  //if(O[O.length - 1] === O[O.length - 2]) O.pop();
  var words = $('#' + select + " span");
  
  
  $(words).fadeOut(100, function(){
    
    //bandaid
    if(computer_first === true){
      test = (O.indexOf(new_Y) == -1) && (X.length === O.length);
    }
    else {
      test = (O.indexOf(new_Y) == -1) && (O.length === X.length - 1);
    }
     
    if(test){
      $(this).text(OPP);
      O.push(new_Y);
    }
    
    $(this).fadeIn(400, function(){ 
       $(".turn").text(""); 
       check_win("Your Turn");
    }); 
  }); 
  return;
}


//returns an int
function find_win(arr){
  //var temp_winners = [];
  // console.log("find_win");
  // console.log(X);
  // console.log(O);
  
  if(arr.length < 2) return -1;
  
  var temp_winners = winners.slice();
  //var answer = undefined;
  var combo = /^\d$/;
  
  for (var i = 0; i < winners.length; i++){
    for (var a = 0; a < arr.length; a++){
      if(winners[i].indexOf(arr[a]) !== -1){
        temp_winners[i].splice(temp_winners[i].indexOf(arr[a]), 1, "");
      

      if(a === arr.length - 1){
        var next = temp_winners[i].join().replace(/,/g, '');
        //console.log("NEXT " + next);
        if(combo.test(next) && $("#" + next).text() === "_") return next;
       }
      }
     }
   } 
  return -1;
  //console.log("ANSWER " + next);
  //return undefined;
}



// function check(arr){
//   console.log("check");
//   console.log(X);
//   console.log(O);
//   console.log(winners);
  
//   //var true_count = 0;
  
// }


function check_win(callback){
  console.log("check_win");
  console.log(X);
  console.log(O);
  //var status;
  // var win_X = false;
  // var win_O = false;
  var func = -1;
  //var temp = winners.slice();
  var done = false;
  var length = (O.length > X.length) ? O.length : X.length;
  var x_count = 0;
  var o_count = 0;
  var func = check_cats(callback);
  //var true_count = 0;
  
  if(X.length >= 2 || O.length >= 2){
    for (var i = 0; i < perm.length; i++){
 
      for (var x = 0; x < length; x++){
        //if(winners[i].indexOf(X[x]) !== -1) {
        if(perm[i].includes(X[x]) && x < X.length){
          x_count = x_count + 1;
        }
        if(perm[i].includes(O[x]) && x < O.length){
          o_count = o_count + 1;
        }
      }
      console.log(perm[i]);
      console.log(X);
      console.log(O);
      console.log(x_count);
      console.log(o_count);
      
      
      if(x_count >= 3){
        
        // var new_score = score["score_human"] + 1;
        
        // $("#h_score").fadeOut(300, function(){
        //   $(this).text(new_score);
        //   $(this).fadeIn(50, function(){
        func =  play_again("Winner!");
        break;
        //return play_again("Winner!");
        //   });
        // });
      }  
      else if(o_count >= 3){
        //var score = JSON.parse(localStorage.getItem("STORE"));
        // var new_score = score["score_computer"] + 1;
        
          //$(this).fadeIn(50, function(){
        func = play_again("Try Again");
        break;
          //});
        //});
        //return play_again("Try Again");
        //return play_again("Try Again");
        //break;
      }
      else {
        x_count = 0;
        o_count = 0;
      }
      
    }
//     return check_cats(callback);
    
//   }
    
    //if(func !== -1){
      return func;
    //}
   
   
}
  
  
//   if(done === true){
//     return func;
//   } 
  
//}  


//$.when(check_win.done())

function check_cats(callback){
  // console.log("check_cats");
  // console.log(X);
  // console.log(O);

  if(X.length + O.length === 9){
    //$(".turn").text(callback);
    return play_again("Cats");
  } 
  else {
  //return setTimeout({
    $(".turn").fadeOut(400, function(){
        $(this).text(callback);
        $(this).fadeIn(500, function(){
          start = true;
          return play();
        });
    });
  }
}
}


      

//$(document).ready(function(){
$( window ).on( "load", function() {
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
  if(localStorage["STORE"] === "undefined"){
    var store = JSON.stringify({"score_human": "0", "score_computer": "0"});
    localStorage.setItem("STORE", store);
    //$("#h_score").text("0");
    //$("#c_score").text("0");
   }  
} 
  // console.log("original " + localStorage.getItem("STORE"));
  // var score = JSON.parse(localStorage.getItem("STORE"));
  //       // var new_score = score["score_computer"] + 1;
  //       var new_score = parseInt($("#c_score").text()) + 1;
  //       console.log("new " + new_score);
  //       score["score_computer"] = new_score.toString();
  //       var str_score = JSON.stringify(score);
  //       localStorage.setItem("STORE", str_score);
  //       console.log("after set " + localStorage["STORE"]);
  
  $("#h_score").text(JSON.parse(localStorage.getItem("STORE"))["score_human"]);
  $("#c_score").text(JSON.parse(localStorage.getItem("STORE"))["score_computer"]);
  $("span").text("_");
  console.log(parseInt($("#h_score").text()));
  limit_h = (parseInt($("#h_score").text()) + 1).toString();
  limit_c = (parseInt($("#h_score").text()) + 1).toString();
  //console.log((localStorage.getItem("STORE")));
  //console.log(JSON.parse(localStorage.getItem("STORE"))["score_human"]);
  choose_letter();
});