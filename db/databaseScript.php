<?php
ini_set("log_errors", 1);
ini_set("error_log", "errors.log");

error_log("Opening database");

require_once "database.php";
$db = new Database();

error_log($_POST['method']);

if ($_POST['method'] == "getJsonDataObject")
{
    $db->getJsonDataObject();
}

else if ($_POST['method'] == "createTables")
{
    $db->createTables();
}

else if ($_POST['method'] == "loadDatabaseFromJsonFile")
{
    $jsonArray = json_encode($_POST['json']);
    $db->loadDatabaseFromJsonFile($jsonArray);
}

else if ($_POST['method'] == "grabAllCoursesData")
{
    $db->grabAllCoursesData();
}

else if ($_POST['method'] == "grabAllCategoriesData")
{
    $db->grabAllCategoriesData();
}

else
{
    echo "method not found";
}

?>
