<?php
require_once "MyDB.php";

class Database
{
    /*
    function getJsonDataObject()
    {
        // The file is too big
        $json = file_get_contents('../data/semester-sections-20195.json', true);
        $jsonArray = json_decode($json, true);
        error_log( print_r($jsonArray, TRUE) );
        return $jsonArray;
    }
    */

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
        $jsonArray = json_decode($jsonArray, true);
        //$jsonArray = $this->getJsonDataObject();
        $this->loadCourseTable($jsonArray);
        //$this->loadCategoriesTable($jsonArray);
    }

    function loadCourseTable($jsonArray)
    {
        // So possibly a course would offer its section, start time and end time, room and building location, credit hours, and days scheduled

        $db = new MyDB();
        $sections = $jsonArray['sections'];
        foreach ($sections as $sectionKey => $sectionValue)
        {
            $times = $sectionValue["times"];
            $section = $sectionValue["section_number"];
            $creditHours = $sectionValue["credit_hours"];
            foreach ($times as $timesKey => $timesValue)
            {
                $startTime = $timesValue["begin_time"];
                $endTime = $timesValue["end_time"];
                $roomNumber = $timesValue["room"];
                $building = $timesValue["building"];
                $Monday = $timesValue["mon"];
                $Tuesday = $timesValue["tue"];
                $Wednesday = $timesValue["wed"];
                $Thursday = $timesValue["thu"];
                $Friday = $timesValue["fri"];
                $query = "INSERT INTO Course (section, startTime, endTime, roomNumber, building, creditHours, monday, tuesday, wednesday, thursday, friday)
                VALUES ('$section', '$startTime', '$endTime', '$roomNumber', '$building', '$creditHours', '$Monday', '$Tuesday', '$Wednesday', '$Thursday', '$Friday')";
                $db->exec($query);
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