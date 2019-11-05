<?php 
ini_set("log_errors", 1);
ini_set("error_log", "errors.log");

?>

<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
</head>

<html>
    <button id = "createTablesButton">Create Tables</button>
    <button onclick = "read_in_file();">Load Database</button>
    <br><br>

    <button id = "grabCoursesButton">Get All Courses Data</button>
    <button id = "grabCategoriesButton">Get All Categories Data</button>
    <br><br>

</html>

<script type = "text/javascript">
function read_in_file()
{
  alert("reading in file");
  $.getJSON( "../data/semester-sections-20195.json", function( data ) {
    //data = JSON.parse(data);
    //data.forEach(loadDatabase);
    alert("data grabbed");
    Object.values(data).forEach(loadDatabase);
  
  });
}

function loadDatabase(value)
{
  value = JSON.stringify(value);
  let value2 = "shorter";
  var data = { "method": "loadDatabaseFromJsonFile", "jsonValue":  value  };
  $.ajax({
    type: "post",
    url: "databaseScript.php",
    data: data,
    dataType: "text",
    success: function(data) {
      alert(data);
    },
    error: function(data) {
      alert("error");
      alert(JSON.stringify(data));
    }
  });

}

$(document).ready(function()
{

    $('#createTablesButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'createTables'
      },
      dataType: "text",
      success: function(data) {
        alert("tables created!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#grabCategoriesButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'grabAllCategoriesData'
      },
      dataType: "text",
      success: function(data) {
            var jsonData = JSON.parse(data);
            alert(jsonData[0]);
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#grabCoursesButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'grabAllCoursesData'
      },
      dataType: "text",
      success: function(data) {
            var jsonData = JSON.parse(data);
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

});

</script>

