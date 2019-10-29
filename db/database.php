<?php
require_once "MyDB.php";

class Database
{
    function getJsonDataObject()
    {
        $json = file_get_contents('data/semester-sections-20195.json', true);
        $jsonArray = json_encode($json, true);
        echo $jsonArray;
    }

    function createTables()
    {
        $this->createCourseTable();
        $this->createCategoryTable();
    }

    function createCourseTable()
    {
        $db = new MyDB();
        $db->exec("CREATE TABLE IF NOT EXISTS Course(
            section Varchar,
            startTime Varchar,
            endTime Varchar,
            roomNumber Varchar,
            building Varchar,
            creditHours Int,
            monday Varchar,
            tuesday Varchar,
            wednesday Varchar,
            thursday Varchar,
            friday Varchar
            );");
        $db = null;
    }

    function createCategoryTable()
    {
        $db = new MyDB();
        $db->exec("CREATE TABLE IF NOT EXISTS Category(
            section Varchar,
            department Varchar,
            courseNumber Varchar,
            courseName Varchar,
            creditHours INT
            );");
        $db = null;
    }

    function loadDatabaseFromJsonFile($jsonArray)
    {
        $this->loadCourseTable($jsonArray);
        $this->loadCategoryTable($jsonArray);
    }

    function loadCourseTable($jsonArray)
    {
        // So possibly a course would offer its section, start time and end time, room and building location, credit hours, and days scheduled

        $db = new MyDB();
        for ($i = 0; $i < count($jsonArray); $i++)
        {
            $sections = $jsonArray[$i]["sections"];
            for ($j = 0; $j < count($sections); $j++)
            {
                $times = $sections[$j]["times"];
                $section = $sections[$j]["section_number"];
                $creditHours = $sections[$j]["credit_hours"];
                for ($k = 0; $k < count($times); $k++)
                {
                    $startTime = $times[$k]["begin_time"];
                    $endTime = $times[$k]["end_time"];
                    $roomNumber = $times[$k]["room"];
                    $building = $times[$k]["building"];
                    $Monday = $times[$k]["mon"];
                    $Tuesday = $times[$k]["tue"];
                    $Wednesday = $times[$k]["wed"];
                    $Thursday = $times[$k]["thu"];
                    $Friday = $times[$k]["fri"];
                    $db->exec("INSERT INTO Course (section, startTime, endTime, roomNumber, building, creditHours, monday, tuesday, wednesday, thursday, friday)
                    VALUES ($section, $startTime, $endTime, $roomNumber, $building, $creditHours, $Monday, $Tuesday, $Wednesday, $Thursday, $Friday)");
                }
            }
            
        }
        $db = null;
    }

    function loadCategoriesTable($jsonArray)
    {
        $db = new MyDB();
        for ($i = 0; $i < count($jsonArray); $i++)
        {
            $sections = $jsonArray[$i]["sections"];
            $courseName = $jsonArray[$i]["catalog"]["title"];
            $description = $jsonArray[$i]["catalog"]["description"];
            for ($j = 0; $j < count($sections); $j++)
            {
                $creditHours = $sections[$j]["credit_hours"];
                $section = $sections[$j]["section_number"];
                $department = $times["dept_name"];
                $courseNumber = $times["dept_name"];
                
                $db->exec("INSERT INTO Category (section, department, courseNumber, courseName, creditHours)
                VALUES ($section, $department, $courseNumber, $courseName, $creditHours)");
                
            }
            
        }
        $db = null;
    }

    function grabAllCoursesData()
    {
        $result = $db->query('SELECT * FROM Course');
        echo json_encode($result->fetchArray());
    }

    function grabAllCategoriesData()
    {
        $result = $db->query('SELECT * FROM Category');
        echo json_encode($result->fetchArray());
    }
    
}