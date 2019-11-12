// Need to know formats of different things is next step. everything else looks good!
var rowCount = 0
var term = ""
var sub = ""
var course = ""
var courseIndex = ""
var courseFullName = ""
var calendar = null
var groupId = 0
var sourceObject = 1

function setTerm() {
    t = document.getElementById("term");
    term = t.options[t.selectedIndex].text;
    //maybe use this for something?

    s = document.getElementById("sub");
    s.disabled = false;
    s.innerHTML = "<option>--Select Course--</option>"; //empty (if they change the list)

    var list = document.getElementById("sub");
    for (var i in subs) {
        list.add(new Option(subs[i], subs[i]));
    }
}

function setSubject() {
    s = document.getElementById("sub");
    sub = s.options[s.selectedIndex].text;
    // update courses of subject
    document.getElementById("course").disabled = false;
    document.getElementById("course").innerHTML = "<option>--Select Course--</option>"; //empty (if they change the list)
    var c = document.getElementById("course");
    for(var i in myJson["classes"]){ //pull all of these that work
        //match to subject
        if(myJson["classes"][i]["department"] == sub){
            c.add(new Option(myJson["classes"][i]["classId"], myJson["classes"][i]["classId"]));
        }
    }
}

function setCourse() {
    c = document.getElementById("course");
    course = c.options[c.selectedIndex].text;
    //get the full name of course.

    for(var i in myJson["classes"]){ //pull all of these that work
        //match to subject
        if(myJson["classes"][i]["classId"] == course){
            courseFullName = myJson["classes"][i]["fullTitle"];
            break;
        }
    }
}

//if already in there, dont add.
function addClass() {
    var table = document.getElementById("myTable");
    if(classAlreadyExists()){return;}
    var row = table.insertRow(-1);
    row.setAttribute("id", rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);Use
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    //need a list of the actual subject names, not just abbreviations
    s = document.getElementById("sub");
    c = document.getElementById("course");
    cell1.innerHTML = s.options[s.selectedIndex].text;
    cell2.innerHTML = c.options[c.selectedIndex].text;
    cell3.innerHTML = courseFullName;
    cell4.innerHTML = '<i class="far fa-trash-alt" onclick="dropClass('+rowCount+');"></i>';
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
}

//package things up and send to backend
function submitList() {
    var classJson = "{'classesToAdd': [";
    var table = document.getElementById("myTable");
    tableLength = table.rows.length;
    console.log(tableLength);
    for (let i = 1; row = table.rows[i]; i++) {
        //only need second col of each row. skip header
        classJson += "{'classId':'"+row.cells[1].innerHTML+"'},";
    }Use
    classJson = classJson.slice(0, classJson.length-1); //chop the last comma
    classJson += "}";
    console.log("json: " + classJson);

    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/postSchedule';
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/json");
    //Http.send(JSON.stringify(classJson));
    Http.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));
    Http.onreadystatechange = function() {
        if (Http.readyState == XMLHttpRequest.DONE) {
            alert(Http.responseText);
        }
    }
    return classJson;
}

function getClassList(){
    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/getClass';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (Http.readyState == XMLHttpRequest.DONE) {
            console.log(Http.responseText)
        }
    }

    console.log("getting list")
}

var subs =['A HTG', 'ACC', 'AEROS', 'AFRIK', 'AM ST', 'ANES', 'ANTHR', 'ARAB', 'ARMEN', 'ART', 'ARTED', 'ARTHC', 'ASIAN', 'ASL', 'BIO', 'BULGN', 'C S', 'CAMBO', 'CANT', 'CE EN', 'CEBU', 'CFM', 'CH EN', 'CHEM', 'CHIN', 'CL CV', 'CLSCS', 'CMLIT', 'CMPST', 'COMD', 'COMMS', 'CPSE', 'CREOL', 'CSANM', 'DANCE', 'DANSH', 'DES', 'DESAN', 'DESGD', 'DESIL', 'DESPH', 'DIGHT', 'DUTCH', 'EC EN', 'ECE', 'ECON', 'EDLF', 'EIME', 'EL ED', 'ELANG', 'ENG T', 'ENGL', 'ENT', 'ESL', 'ESTON', 'EUROP', 'EXDM', 'EXSC', 'FHSS', 'FIN', 'FINN', 'FLANG', 'FNART', 'FREN', 'GEOG', 'GEOL', 'GERM', 'GREEK', 'GSCM', 'GWS', 'HAWAI', 'HCOLL', 'HEB', 'HINDI', 'HIST', 'HLTH', 'HMONG', 'HONRS', 'HRM', 'HUNG', 'IAS', 'ICLND', 'ICS', 'IHUM', 'INDES', 'INDON', 'IP&T', 'IS', 'IT&C', 'ITAL', 'JAPAN', 'KICHE', 'KIRIB', 'KOREA', 'LATIN', 'LATVI', 'LAW', 'LFSCI', 'LING', 'LINGC', 'LITHU', 'LT AM', 'M COM', 'MALAG', 'MALAY', 'MATH', 'MBA', 'ME EN', 'MESA', 'MFGEN', 'MFHD', 'MFT', 'MIL S', 'MKTG', 'MMBIO', 'MPA', 'MSB', 'MTHED', 'MUSIC', 'NAVAJ', 'NDFS', 'NE LG', 'NEURO', 'NORWE', 'NURS', 'PDBIO', 'PERSI', 'PETE', 'PHIL', 'PHSCS', 'PHY S', 'PLANG', 'POLI', 'POLSH', 'PORT', 'PSYCH', 'PWS', 'QUECH', 'REL A', 'REL C', 'REL E', 'ROM', 'RUSS', 'SAMOA', 'SC ED', 'SCAND', 'SFL', 'SLAT', 'SLOVK', 'SOC', 'SOC W', 'SPAN', 'STAC', 'STAT', 'STDEV', 'STRAT', 'SWAHI', 'SWED', 'SWELL', 'T ED', 'TAGAL', 'TECH', 'TEE', 'TELL', 'TES', 'TEST', 'THAI', 'TMA', 'TONGA', 'TRM', 'TURK', 'UNIV', 'URDU', 'VIET', 'WELSH', 'WRTG']
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

function changeSchedule(schedule) {
    removeClasses();
    alert("Changing the schedule to " + schedule);
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

//Function to get the Events from the calendar added by User.
//Will return a JSON object that is organized by day.
//Each day has an array of objects that have start and end times

function getFormattedEvents() {
    events = {
        "M":[],
        "T":[],
        "W":[],
        "Th":[],
        "F":[],
        "S":[]
    };
    calendar.getEvents().forEach( function(element) {
        var tmp = { "start":(element.start.getHours() + ":" + element.start.getMinutes()), "end":(element.end.getHours() + ":" + element.end.getMinutes())};
        events[getWeekday(element.start.getDay())].push(tmp);
    });
    console.log(events);
    return events;
}
