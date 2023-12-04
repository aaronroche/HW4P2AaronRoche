
// Dom elements
const inputs = document.querySelector('.inputs');
const startMultiplierText = document.getElementById("startMultiplierText");
const endMultiplierText = document.getElementById("endMultiplierText");
const startMultiplicandText = document.getElementById("startMultiplicandText");
const endMultiplicandText = document.getElementById("endMultiplicandText");
const table = document.getElementById("table");

// Important variables
var startMultiplier, endMultiplier, startMultiplicand, endMultiplicand;
var selectedTabs = [];
var currTab = "";
var numTabs = 1;

/**
 * Function to create the multiplication table HTML
 g*/
function generate(startMultiplier, endMultiplier, startMultiplicand, endMultiplicand) {
    var values = "";
    values += "<center><table>";
    //values += "<th>";
    values +="<tr><th id = \"space\"><center>x</center></th>"
    for (var a = startMultiplier; a <= endMultiplier; a++) {
        values +="<th id=\"row\"><center>" + a + "</center></th>";
    }
    values += "</tr>";
    for (var i = startMultiplicand; i <= endMultiplicand; i++) {
        values += "<tr>";
        values += "<th id=\"row\"><center>" + i + "</center></th>"
        for (var j = startMultiplier; j <= endMultiplier; j++) {
          values += "<td><center>" + i * j + "</center></td>";
        }
        values += "</tr>";
    }

    values += "</table></center>";
    return values;
}

/**
 * Updates the table based on user input values and displays the result.
 */

function updateTable() {
    if ($("#inputs").valid() == true) {
      startMultiplier = Math.round(document.getElementById("startMultiplier").value);
      endMultiplier = Math.round(document.getElementById("endMultiplier").value);
      startMultiplicand = Math.round(document.getElementById("startMultiplicand").value);
      endMultiplicand = Math.round(document.getElementById("endMultiplicand").value);
      infotext.innerHTML = "<p>Decimal numbers are rounded to whole numbers.</p>";
      table.innerHTML = generate(startMultiplier, endMultiplier, startMultiplicand, endMultiplicand);
    }
}

/**
 * Handles the selection of a tab, changing its color to green or black.
 */

function chooseTab() {
    currTab = $("#tableTabs .ui-tabs-panel:visible").attr("id");
    if (currTab != null) {
      if (!selectedTabs.includes(currTab)) {
          selectedTabs.push(currTab);
          // make green
          document.getElementById(currTab).style.color = "green";
      } else {
          selectedTabs.splice(selectedTabs.indexOf(currTab), 1);
          // make black again
          document.getElementById(currTab).style.color = "black";
      }
  }
}

/**
 * Removes the selected tabs from the UI.
 */

function removeTabs() {
    while (selectedTabs.length > 0) {
        $("li[aria-controls='" + selectedTabs[selectedTabs.length-1] +"']").remove();
        $("#" + selectedTabs[selectedTabs.length-1]).remove();
        selectedTabs.pop();
    }
}

$(function() {
    $("#tableTabs").tabs();
    jQuery.validator.addMethod("compare", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return n1 <= n2;
          } else {
              return n1 >= n2;
          }
    }, "<p>Start {1} value must be less than or equal to End {1} value!</p>");

    jQuery.validator.addMethod("checkRange", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return Math.abs(n2 - n1) <= 200;
          } else {
              return Math.abs(n1 - n2) <= 200;
          }
    },"<p>{1} The value cannot be greater than 200</p><p>must be between start and end values!</p>");
    $("#startMultiplierSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#startMultiplier").val(ui.value);
            updateTable();
        }
    });
    $("#startMultiplier").on("keyup", function() {
        $("#startMultiplierSlider").slider("value", this.value);
        updateTable();
    });
    $("#endMultiplierSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#endMultiplier").val(ui.value);
            updateTable();
        }
    });
    $("#endMultiplier").on("keyup", function() {
        $("#endMultiplierSlider").slider("value", this.value);
        updateTable();
    });
    $("#startMultiplicandSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#startMultiplicand").val(ui.value);
            $(".inputs").validate();
            updateTable();
        }
    });
    $("#startMultiplicand").on("keyup", function() {
        $("#startMultiplicandSlider").slider("value", this.value);
        updateTable();
    });
    $("#endMultiplicandSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#endMultiplicand").val(ui.value);
            updateTable();
        }
    });
    $("#endMultiplicand").on("keyup", function() {
        $("#endMultiplicandSlider").slider("value", this.value);
        updateTable();
    });
    $("#inputs").validate({
        rules: {
            startMultiplier : {
                required: true,
                number: true,
                compare: ['endMultiplier', 'Column', true],
                checkRange: ['endMultiplier', 'Column', true]
            },
            endMultiplier : {
                required: true,
                number: true,
                compare: ['startMultiplier', 'Column', false],
                checkRange: ['startMultiplier', 'Column', false]
            },
            startMultiplicand : {
                required: true,
                number: true,
                compare: ['endMultiplicand', 'Row', true],
                checkRange: ['endMultiplicand', 'Row', true]
            },
            endMultiplicand : {
                required: true,
                number: true,
                compare: ['startMultiplicand', 'Row', false],
                checkRange: ['startMultiplicand', 'Row', false]
            }
        },
        messages: {
            startMultiplier: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            },
            endMultiplier: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            },
            startMultiplicand: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            },
            endMultiplicand: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "startMultiplier") {
                error.appendTo($("#startMultiplierText"));
            } else if (element.attr("name") == "endMultiplier") {
                error.appendTo($("#endMultiplierText"));
            } else if (element.attr("name") == "startMultiplicand") {
                error.appendTo($("#startMultiplicandText"));
            } else if (element.attr("name") == "endMultiplicand") {
                error.appendTo($("#endMultiplicandText"));
            }
        },
        submitHandler: function(form, e) {
            e.preventDefault();
            startMultiplier = Math.round(document.getElementById("startMultiplier").value);
            endMultiplier = Math.round(document.getElementById("endMultiplier").value);
            startMultiplicand = Math.round(document.getElementById("startMultiplicand").value);
            endMultiplicand = Math.round(document.getElementById("endMultiplicand").value);
            infotext.innerHTML = "<p>Decimal numbers are rounded to whole numbers.</p>";
            table.innerHTML = generate(startMultiplier, endMultiplier, startMultiplicand, endMultiplicand);
            var title = "(" + startMultiplier + "," + endMultiplier + ") x (" + startMultiplicand + "," + endMultiplicand + ")";
            $("#tableTabs").tabs("destroy");
            $("#tabList").html($("#tabList").html() +"<li><a href='#divTab" + numTabs +"'>" + title
                                + "</a><span class='ui-icon ui-icon-close' role='presentation'></span></li>");
            $("#tableTabs").html($("#tableTabs").html() + "<div id='divTab" + numTabs + "'>" +"<div id='table'>"
                                + $("#table").html() + "</div>" + "</div>");
            numTabs++;
            $("#tableTabs").tabs({ active: (numTabs - 2)});
            $('#buttons').html("<button id='chooseTab' onclick='chooseTab()'>Select Tab</button>" +
                              "<button id='removeTab' onclick='removeTabs()'>Remove Selected Tabs</button>");
            $("#tableTabs").delegate( "span.ui-icon-close", "click", function() {
                var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
                $( "#" + panelID ).remove();
                $("#tableTabs").tabs("refresh");
                numTabs--;
                if (selectedTabs.includes(panelID)) {
                    var index = selectedTabs.indexOf(panelID);
                    selectedTabs.splice(index, 1);
                }
            });
        }

    });
});