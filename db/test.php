<?php 
ini_set("log_errors", 1);
ini_set("error_log", "errors.log");

?>

<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
</head>

<html>
    <button id = "createTablesButton">Create Tables</button>
    <button id = "getJsonButton">GetJson</button>
    <button id = "loadDatabaseButton">Load Database</button>
    <br><br>

    <button id = "grabCoursesButton">Get All Courses Data</button>
    <button id = "grabCategoriesButton">Get All Categories Data</button>
    <br><br>

</html>

<script type = "text/javascript">
$(document).ready(function()
{
    var json;

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

    $('#getJsonButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'getJsonDataObject'
      },
      dataType: "text",
      success: function(data) {
            json = data;
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#loadDatabaseButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'loadDatabaseFromJsonFile',
        json: json
      },
      dataType: "text",
      success: function(data) {
        alert("database loaded!");
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

