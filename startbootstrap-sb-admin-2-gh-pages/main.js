//TODO linking back and front, displaying multiple schedules in tabs
var rowCount = 0
var term = ""
var sub = ""
var course = ""
var courseIndex = ""
var courseFullName = ""
var calendar = null
var groupId = 0
var sourceObject = 1
var CLASS_LIST = {};
var gotSchedules;

function setTerm() {
    t = document.getElementById("term");
    term = t.options[t.selectedIndex].text;

    s = document.getElementById("sub");
    s.disabled = false;
    s.innerHTML = "<option hidden disabled selected value>Select Subject</option>"; //empty (if they change the list)
    document.getElementById("add").disabled = true;
    document.getElementById("course").innerHTML =  "<option hidden disabled selected value>Select Course</option>"; //empty (if they change the list)

    var list = document.getElementById("sub");
    for (var i in subs) {
        list.add(new Option(subs[i], subs[i]));
    }
}

function setSubject() {
    s = document.getElementById("sub");
    sub = s.options[s.selectedIndex].text;
    // update courses of subject
    document.getElementById("add").disabled = true;
    document.getElementById("course").disabled = false;
    document.getElementById("course").innerHTML = "<option hidden disabled selected value>Select Course</option>"; //empty (if they change the list)
    var c = document.getElementById("course");
    
    for(var i in CLASS_LIST["classes"]){ //pull all of these that work
        if(CLASS_LIST["classes"][i]["department"] == sub){
            c.add(new Option(CLASS_LIST["classes"][i]["classId"], CLASS_LIST["classes"][i]["classId"]));
        }
    }
}

function setCourse() {
    document.getElementById("add").disabled = false;
    c = document.getElementById("course");
    course = c.options[c.selectedIndex].text;

    for(var i in CLASS_LIST["classes"]){ //pull all of these that work
        //match to subject
        if(CLASS_LIST["classes"][i]["classId"] == course){
            courseFullName = CLASS_LIST["classes"][i]["fullTitle"];
            break;
        }
    }
}

//if already in there, dont add.
function addClass() {
    // lock term
    document.getElementById("term").disabled = true;
    document.getElementById("getSchedulesButton").disabled = false;

    if (classAlreadyExists()) { return; }

    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    row.setAttribute("id", `class${rowCount}`);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    //need a list of the actual subject names, not just abbreviations
    s = document.getElementById("sub");
    c = document.getElementById("course");
    cell1.innerHTML = s.options[s.selectedIndex].text;
    cell2.innerHTML = c.options[c.selectedIndex].text;
    cell3.innerHTML = courseFullName;
    cell4.innerHTML = '<i class="far fa-trash-alt hover" onclick="dropClass(\'class'+rowCount+'\')"></i>';
    cell4.style.textAlign = "center";
    rowCount++;
}

function classAlreadyExists(){
    var table = document.getElementById("myTable");
    tableLength = table.rows.length;
    for (let i = 1; row = table.rows[i]; i++) {
        //only need second col of each row. skip header
        if(row.cells[2].innerHTML == courseFullName){
            return true;
        }
    }
    return false;
}

//remove from table.
function dropClass(rowId) {
    var row = document.getElementById(rowId);
    row.parentElement.removeChild(row);

    rowCount--;

    // if all gone unlock the term
    if (rowCount == 0) {
        t = document.getElementById("term");
        t.disabled = false;
        document.getElementById("getSchedulesButton").disabled = true;
    }
}

//package things up and send to backend
function getSchedules() {
    const semester = '20195';

    const courseIds = Array.from(document.getElementById("myTable").rows).splice(1).map((row) => {
        return row.cells[1].innerText;
    });

    const blockedTime = getFormattedEvents();

    const classJson = {
        semester: semester,
        courseIds: courseIds,
        blockedTime: blockedTime
    }

    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/scheduler';
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(classJson));
    //Http.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));
    Http.onreadystatechange = function() {
        if (Http.readyState == XMLHttpRequest.DONE) {
            alert(Http.responseText);
            console.log(JSON.parse(Http.responseText));
        }
    }
}

function changeSchedule(num){
    //clear the schedule
    removeClasses();
    var exampleSchedule ={
        "events": [
            {
                "eventName": "test",
                "startTime": "07:00",
                "endTime": "08:00",
                "days": [
                    "M", "T"
                ]
            },
            {
                "eventName": "test2",
                "startTime": "07:00",
                "endTime": "08:00",
                "days": [
                    "Th"
                ]
            }
        ]
    }
    console.log(exampleSchedule);
    var exampleSchedule2 ={
        "events": [
            {
                "eventName": "test2",
                "startTime": "07:00",
                "endTime": "08:00",
                "days": [
                    "T", "F"
                ]
            }
        ]
    }
    var exampleSchedule3 ={
        "events": [
            {
                "eventName": "test3",
                "startTime": "07:00",
                "endTime": "08:00",
                "days": [
                    "M", "T", "W"
                ]
            }
        ]
    }
    var testSchedules=[exampleSchedule, exampleSchedule2, exampleSchedule3];
    scheduleIndex = num - 1;
    // switch to gotSchedules once backend returns an actual schedule
    events = testSchedules[scheduleIndex]["events"];
    for(var event in events){
        addEvents(events[event]["eventName"], events[event]["startTime"], events[event]["endTime"], events[event]["days"], true);
    }
}

//getsStartingList - all classes
function getClassList(){
    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/classes';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (Http.readyState == XMLHttpRequest.DONE) {
            CLASS_LIST = JSON.parse(Http.responseText);
            console.log(CLASS_LIST);
        }
    }
}

var subs =['A HTG', 'ACC', 'AEROS', 'AFRIK', 'AM ST', 'ANES', 'ANTHR', 'ARAB', 'ARMEN', 'ART', 'ARTED', 'ARTHC', 'ASIAN', 'ASL', 'BIO', 'BULGN', 'C S', 'CAMBO', 'CANT', 'CE EN', 'CEBU', 'CFM', 'CH EN', 'CHEM', 'CHIN', 'CL CV', 'CLSCS', 'CMLIT', 'CMPST', 'COMD', 'COMMS', 'CPSE', 'CREOL', 'CSANM', 'DANCE', 'DANSH', 'DES', 'DESAN', 'DESGD', 'DESIL', 'DESPH', 'DIGHT', 'DUTCH', 'EC EN', 'ECE', 'ECON', 'EDLF', 'EIME', 'EL ED', 'ELANG', 'ENG T', 'ENGL', 'ENT', 'ESL', 'ESTON', 'EUROP', 'EXDM', 'EXSC', 'FHSS', 'FIN', 'FINN', 'FLANG', 'FNART', 'FREN', 'GEOG', 'GEOL', 'GERM', 'GREEK', 'GSCM', 'GWS', 'HAWAI', 'HCOLL', 'HEB', 'HINDI', 'HIST', 'HLTH', 'HMONG', 'HONRS', 'HRM', 'HUNG', 'IAS', 'ICLND', 'ICS', 'IHUM', 'INDES', 'INDON', 'IP&T', 'IS', 'IT&C', 'ITAL', 'JAPAN', 'KICHE', 'KIRIB', 'KOREA', 'LATIN', 'LATVI', 'LAW', 'LFSCI', 'LING', 'LINGC', 'LITHU', 'LT AM', 'M COM', 'MALAG', 'MALAY', 'MATH', 'MBA', 'ME EN', 'MESA', 'MFGEN', 'MFHD', 'MFT', 'MIL S', 'MKTG', 'MMBIO', 'MPA', 'MSB', 'MTHED', 'MUSIC', 'NAVAJ', 'NDFS', 'NE LG', 'NEURO', 'NORWE', 'NURS', 'PDBIO', 'PERSI', 'PETE', 'PHIL', 'PHSCS', 'PHY S', 'PLANG', 'POLI', 'POLSH', 'PORT', 'PSYCH', 'PWS', 'QUECH', 'REL A', 'REL C', 'REL E', 'ROM', 'RUSS', 'SAMOA', 'SC ED', 'SCAND', 'SFL', 'SLAT', 'SLOVK', 'SOC', 'SOC W', 'SPAN', 'STAC', 'STAT', 'STDEV', 'STRAT', 'SWAHI', 'SWED', 'SWELL', 'T ED', 'TAGAL', 'TECH', 'TEE', 'TELL', 'TES', 'TEST', 'THAI', 'TMA', 'TONGA', 'TRM', 'TURK', 'UNIV', 'URDU', 'VIET', 'WELSH', 'WRTG']
//testing before pulled something
var myJson = {
    "classes": [
        {
            "classId": "CS142",
            "department": "C S",
            "courseNumber": "142",
            "title": "Intro to Computer Programming",
            "fullTitle": "Introduction to Computer Programming"
        },
        {
            "classId": "CS224",
            "department": "C S",
            "courseNumber": "224",
            "title": "Computer Systems",
            "fullTitle": "Introduction to Computer Systems"
        },
        {
            "classId": "CS235",
            "department": "C S",
            "courseNumber": "235",
            "title": "Data Structures",
            "fullTitle": "Data Structures and Algorithms"
        },
        {
            "classId": "MATH102",
            "department": "MATH",
            "courseNumber": "102",
            "title": "Quantitative Reasoning",
            "fullTitle": "QuantitativeUse Reasoning"
        },
        {
            "classId": "MATH110",
            "department": "MATH",
            "courseNumber": "110",
            "title": "College Algebra",
            "fullTitle": "College Algebra"
        },
        {
            "classId": "MATH111",
            "department": "MATH",
            "courseNumber": "111",
            "title": "Trigonometry",
            "fullTitle": "Trigonometry"
        },
        {
            "classId": "SWELL105",
            "department": "SWELL",
            "courseNumber": "105",
            "title": "Pickleball",
            "fullTitle": "Pickleball"
        }
    ],
    "10178-002": {
        "year_term": "20195",
        "curriculum_id": "10178",
        "title_code": "002",
        "dept_name": "C S",
        "catalog_number": "224",
        "catalog_suffix": null,
        "title": "Computer Systems",
        "full_title": "Introduction to Computer Systems.",
        "sections": [
            {
                "section_number": "001",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            },
            {
                "section_number": "002",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            }
        ]
    }
}

// Calendar Functions. See addEvents() to add event to calendar. See getFormattedEvents() to get events from calendar.


document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'bootstrap', 'interaction', 'timeGrid'],
    themeSystem: 'bootstrap',
    selectable: true,
    editable: true,
    selectOverlap: false,
    eventOverlap: false,
    hiddenDays: [0],
    minTime: "07:00:00",
    maxTime: "21:00:00",
    titleFormat: { month: 'short' },
    defaultView: 'timeGridWeek',
    height: 'auto',
    allDaySlot: false,
    header: false,
    views: {
      week: {
        columnHeaderFormat: { weekday: 'long' }
      }
    },
    eventRender: function(info) {
      info.el.querySelector('.fc-title').innerHTML += "<br><i class='far fa-trash-alt pull-right' id='Delete'></i>";
      if(info.event.source.id == 2)
      {
        info.el.querySelector('.fc-title').innerHTML += "<i class='fa fa-pencil pull-right' id='Edit'></i>";
      }
    },
    select: function(info) {
        editEvent(info);
    },
    eventClick: function(info) {
      if (info.jsEvent.target.id === 'Delete') {
          removeGroup(info.event.groupId);
      }
      if (info.jsEvent.target.id === 'Edit') {
          editEvent(info.event);
      }

    }
  });

  calendar.render();
  getClassList();
});



Date.prototype.getDaysOfCurrentWeek = function(start)
   {
       // Array of all days of week
       var days = [ "Sunday", "M", "T", "W", "Th", "F", "S"];

   // Calculates date of first day of current week
   start = start || 0;
   var today = new Date(this.setHours(0, 0, 0, 0));
   var day = today.getDay() - start;
   var date = today.getDate() - day;
   today.setDate(date);
   // Then we are calculating all dates of current week and then reformat them into ISOO
   var daysOfWeek = new Object();
   for(i = 0; i < 8; i++) {
       tmp = new Date();
       tmp.setDate(today.getDate() + i);
//       daysOfWeek[days[i]] = tmp.getFullYear()+'-'+(tmp.getMonth()+1)+'-'+tmp.getDate();
       daysOfWeek[days[i]] = tmp.toISOString().substr(0,10);
   }

   return daysOfWeek;
}

function getWeekday(index)
{
    var days = [ "Sunday", "M", "T", "W", "Th", "F", "S"];
    return days[index];
}

var daysToDate = new Date().getDaysOfCurrentWeek(); // gets array like ('nameOfDay' => 0000-00-00)

//Used when submit button from DOM is clicked. This gets the data from the form and passes it to addEvents()

function putEvents() {
  var eventName = document.getElementById("eventName").value;
  var start = document.getElementById("start_time").value;
  var end = document.getElementById("end_time").value;
  var days = [];
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(element) {
    days.push(element.value);
} );
  addEvents(eventName, start, end, days, false);
}

function checkBox() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);

  document.getElementById('eventSubmit').disabled = true;
  if (checkedOne && document.getElementById("eventName").value != "" && document.getElementById("start_time").value != "" && document.getElementById("end_time").value != "") {
    document.getElementById('eventSubmit').disabled = false;
  }
  if (document.getElementById("start_time").value >= document.getElementById("end_time").value) {
      alert("The end time must be after the start time");
  }
}

//Removes just the classes. This is important for multiple schedules, but keeping the user's events on the calendar.

function removeClasses() {
    console.log(calendar.getEventSources());
    calendar.getEventSources().forEach( function(element) {
        if(element.id == 1){
            element.remove();
        }
    });
}

function removeGroup(groupId) {
    calendar.getEvents().forEach( function(element) {
    if(element.groupId == groupId)
    {
        element.remove();
    }
    });
}

function editEvent(changeEvent) {
    startTime = ('0'+changeEvent.start.getHours()).slice(-2) + ':' + ('0'+changeEvent.start.getMinutes()).slice(-2);
    endTime = ('0'+changeEvent.end.getHours()).slice(-2) + ':' + ('0'+changeEvent.end.getMinutes()).slice(-2);
    if (changeEvent.title){
        document.getElementById("eventName").value = changeEvent.title;
    }
    document.getElementById("start_time").value = startTime;
    document.getElementById("end_time").value = endTime;
    if(changeEvent.groupId){
        removeGroup(changeEvent.groupId);
    }
    document.getElementById("addButton").click();
}

function resetModal() {
    document.getElementById("eventName").value = "";
    document.getElementById("start_time").value = "";
    document.getElementById("end_time").value = "";
    var checks = document.querySelectorAll('#weekDays input[type="checkbox"]');
    for(var i =0; i< checks.length;i++){
        var check = checks[i];
        if(!check.disabled){
            check.checked = false;
        }
    }
}

//Functions to access calendar functionality. If there is something you need to do other than this please tell me.
//Anything else could break how the calendar is working.


//Function to add Events to the calendar.
//eventName = string for title of Event.
//start = start time, formatted as XX:XX based on 24 hour clock
//end = end time, formatted as XX:XX based on 24 clock
//days = array of days of event, formatted as ["Sunday", "M", "T", "W", "Th", "F", "S"]
//classes = boolean, whether or not this is class or a different event. Defualts to true. All other calls will set this to false.

function addEvents(eventName, start, end, days, classes=true) {
  console.log(eventName);
  console.log(start);
  console.log(end);
  console.log(days);
  groupId += 1;

  source = [];
  i = 0;

  days.forEach(function(element) {
    var newEvent = new Object();
    newEvent.title = eventName;
    newEvent.start = daysToDate[element]+'T'+ start + ':00';
    newEvent.end = daysToDate[element]+'T'+ end + ':00';
    newEvent.groupId = groupId;
    source[i] = newEvent;
    i++;

    });

    source.overlap = false;

    if(classes) {
        source.id = 1;
        source.editable = false;
    }
    else {
        source.id = 2;
    }

    calendar.addEventSource(source);
    resetModal();
//  console.log(getFormattedEvents());
//  document.getElementById("myForm").reset();
}

function formatTime(date) {
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return hours + minutes;
}

//Function to get the Events from the calendar added by User.
//Will return a JSON object that is organized by day.
//Each day has an array of objects that have start and end times

function getFormattedEvents() {
    const conversion = {
        "M": "mon",
        "T": "tue",
        "W": "wed",
        "Th": "thu",
        "F": "fri",
        "S": "sat",
        "Sunday": "sun"
    };

    let events = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    };

    calendar.getEvents().forEach((event) => {
        let formattedTimeBlock = {
            start: formatTime(event.start),
            end: formatTime(event.end)
        }

        events[conversion[getWeekday(event.start.getDay())]].push(formattedTimeBlock);
    });

    return events;
}
