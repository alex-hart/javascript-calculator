$(document).ready(function() {
  $('.calculator-box').draggable();
  var displayAnswer = "";
  var $display = $("#display");

  //----NUMBER BUTTONS----

  $(".number-btn").on("click", function(e) {
    e.preventDefault();
    displayAnswer += $(this).attr("value");
    $display.text(displayAnswer);
  });

  //----OPERATOR BUTTONS----

  $("#plus-button").on("click", function(e) {
    e.preventDefault();
    //These if statements are to avoid stacking multiple plus signs
    if (
      displayAnswer[displayAnswer.length - 1] != "-" &&
      displayAnswer[displayAnswer.length - 1] != "+"
    ) {
      displayAnswer += "+";
    } else if (
      displayAnswer[displayAnswer.length - 2] != "-" &&
      displayAnswer[displayAnswer.length - 2] != "+" &&
      displayAnswer[displayAnswer.length - 1] != "+"
    ) {
      displayAnswer += "+";
    }
    $display.text(displayAnswer);
  });

  $("#minus-button").on("click", function(e) {
    e.preventDefault();
    //These if statements are to avoid stacking mutiple minus signs
    if (
      displayAnswer[displayAnswer.length - 1] != "-" &&
      displayAnswer[displayAnswer.length - 1] != "+"
    ) {
      displayAnswer += "-";
    } else if (
      displayAnswer[displayAnswer.length - 2] != "-" &&
      displayAnswer[displayAnswer.length - 2] != "+"
    ) {
      displayAnswer += "-";
    }
    $display.text(displayAnswer);
  });

  $("#multiply-button").on("click", function(e) {
    e.preventDefault();
    //This if statement is to avoid beginning the calculation with a multiply as
    //It will lead to an error and also to avoid stacking multiple
    //Multiplication signs
    if (
      displayAnswer[displayAnswer.length - 1] != "×" &&
      displayAnswer.length !== 0
    ) {
      displayAnswer += "×";
      $display.text(displayAnswer);
    }
  });

  $("#divide-button").on("click", function(e) {
    e.preventDefault();
    //This if statement is to achieve the same as the if statement for the
    //Multiply button above.
    if (
      displayAnswer[displayAnswer.length - 1] !== "÷" &&
      displayAnswer.length !== 0
    ) {
      displayAnswer += "÷";
      $display.text(displayAnswer);
    }
  });

  //----MISC BUTTONS----

  $("#equals-button").on("click", function(e) {
    e.preventDefault();
    //These replace methods are to reduce minus and additions to a single
    //Mathematical operator
    displayAnswer = displayAnswer.replace(/\-{2}/g, "+");
    displayAnswer = displayAnswer.replace(/\-\+/g, "-");
    displayAnswer = displayAnswer.replace(/\+\-/g, "-");
    displayAnswer = displayAnswer.replace(/\×/g, "*");
    displayAnswer = displayAnswer.replace(/\÷/g, "/");
    displayAnswer = eval(displayAnswer);
    //This if statement is to reduce the number of digits to that the entire
    //Number can be seen on the calculator screen
    if (isNaN(displayAnswer) ||
        !isFinite(displayAnswer)) {
      $('#display').text("Error");
      displayAnswer = "";
    } else {
      if (displayAnswer.toString().length > 9) {
        displayAnswer = displayAnswer.toPrecision(9);
      }
      displayAnswer = displayAnswer.toString();
      $display.text(displayAnswer);
    }
  });

  $("#decimal-button").on("click", function(e) {
    e.preventDefault();
    //This if statement is incase the user wants to begin with a 0.x decimal or
    //Wants to apply a mathematical operator to it without wanting to enter 0
    //And then enter a decimal
    if (
      displayAnswer.length === 0 ||
      displayAnswer[displayAnswer.length - 1] == "+" ||
      displayAnswer[displayAnswer.length - 1] == "-" ||
      displayAnswer[displayAnswer.length - 1] == "÷" ||
      displayAnswer[displayAnswer.length - 1] == "×"
    ) {
      displayAnswer += "0.";
      //This if statement is to avoid stacking multiple decimal points
    } else if (displayAnswer[displayAnswer.length - 1] !== ".") {
      displayAnswer += ".";
    }
    $display.text(displayAnswer);
  });

  $("#clear-button").on("click", function(e) {
    e.preventDefault();
    displayAnswer = "";
    $display.text("0");
  });

  $("#delete-button").on("click", function(e) {
    e.preventDefault();
    if (displayAnswer.length > 0) {
      displayAnswer = displayAnswer.substr(0, displayAnswer.length - 1);
      $display.text(displayAnswer);
    }
    if (displayAnswer.length === 0) {
      $display.text("0");
    }
  });

  $("#plus-minus-button").on("click", function(e) {
    e.preventDefault();
    if (
      displayAnswer.indexOf("+") < 0 &&
      displayAnswer.indexOf("-") < 0 &&
      displayAnswer.indexOf("×") < 0 &&
      displayAnswer.indexOf("÷") < 0 &&
      displayAnswer.length > 0 &&
      displayAnswer[0] !== "-"
    ) {
      displayAnswer = displayAnswer.split("");
      displayAnswer.unshift("-");
      displayAnswer = displayAnswer.join("");
    } else if (displayAnswer[0] == "-") {
      displayAnswer = displayAnswer.split("");
      displayAnswer.shift();
      displayAnswer = displayAnswer.join("");
    }
    $display.text(displayAnswer);
  });

  //---- KEYBOARD INPUT ----

  $("body").keypress(function(e) {
    if (48 <= e.which && e.which <= 57) {
      displayAnswer += String.fromCharCode(e.which);
      $display.text(displayAnswer);
    }
    if (e.which == 65 || e.which == 97) {
      displayAnswer = "";
      $display.text("0");
    }
    if (e.which == 8 || e.which == 67 || e.which == 99) {
      if (displayAnswer.length > 0) {
        displayAnswer = displayAnswer.substr(0, displayAnswer.length - 1);
        $display.text(displayAnswer);
      }
      if (displayAnswer.length === 0) {
        $display.text("0");
      }
    }
    if (e.which == 43) {
      if (
        displayAnswer[displayAnswer.length - 1] !== "-" &&
        displayAnswer[displayAnswer.length - 1] !== "+"
      ) {
        displayAnswer += "+";
      } else if (
        displayAnswer[displayAnswer.length - 2] != "-" &&
        displayAnswer[displayAnswer.length - 2] != "+" &&
        displayAnswer[displayAnswer.length - 1] != "+"
      ) {
        displayAnswer += "+";
      }
      $display.text(displayAnswer);
    }
    if (e.which == 45) {
      if (
        displayAnswer[displayAnswer.length - 1] !== "-" &&
        displayAnswer[displayAnswer.length - 1] !== "+"
      ) {
        displayAnswer += "-";
      } else if (
        displayAnswer[displayAnswer.length - 2] != "-" &&
        displayAnswer[displayAnswer.length - 2] != "+"
      ) {
        displayAnswer += "-";
      }
      $display.text(displayAnswer);
    }
    if (e.which == 42) {
      if (
        displayAnswer[displayAnswer.length - 1] !== "×" &&
        displayAnswer.length !== 0
      ) {
        displayAnswer += "×";
        $display.text(displayAnswer);
      }
    }
    if (e.which == 47) {
      if (
        displayAnswer[displayAnswer.length - 1] !== "÷" &&
        displayAnswer.length !== 0
      ) {
        displayAnswer += "÷";
        $display.text(displayAnswer);
      }
    }
    if (e.which == 13 || e.which == 61) {
      displayAnswer = displayAnswer.replace(/\-{2}/g, "+");
      displayAnswer = displayAnswer.replace(/\-\+/g, "-");
      displayAnswer = displayAnswer.replace(/\+\-/g, "-");
      displayAnswer = displayAnswer.replace(/\×/g, "*");
      displayAnswer = displayAnswer.replace(/\÷/g, "/");
      displayAnswer = eval(displayAnswer);
      if (displayAnswer.toString().length > 9) {
        displayAnswer = displayAnswer.toPrecision(9);
      }
      displayAnswer = displayAnswer.toString();
      $display.text(displayAnswer);
    }
    if (e.which == 46) {
      if (
        displayAnswer.length === 0 ||
        displayAnswer[displayAnswer.length - 1] == "+" ||
        displayAnswer[displayAnswer.length - 1] == "-" ||
        displayAnswer[displayAnswer.length - 1] == "÷" ||
        displayAnswer[displayAnswer.length - 1] == "×"
      ) {
        displayAnswer += "0.";
      } else if (displayAnswer[displayAnswer.length - 1] !== ".") {
        displayAnswer += ".";
      }
      $display.text(displayAnswer);
    }
  });
});
