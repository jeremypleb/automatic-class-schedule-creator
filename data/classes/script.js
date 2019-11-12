// Here's an example in node of how to load the file and parse it
​
console.log("Script started");
var fs = require('fs');
​
function loadJson(path) {
	return JSON.parse(fs.readFileSync(path, 'utf8'));
}
​
function getSemesterClasses() {
	var path = 'semester-sections-20195.json';
	return loadJson(path);
}

function saveJson(json, path) {
    try {
      fs.writeFileSync(path, JSON.stringify(json));
      console.log(`Successfully saved json! to ${path}`);
    } catch (err) {
      console.error('Error while saving json', err);
    }
  }
​
var semesterClasses = getSemesterClasses();
​
console.log("Preparing to save");

Object.keys(semesterClasses).forEach((key) => {
	var classData = semesterClasses[key];
	
	// if there are no sections just ignore it
	if (!classData.sections[0]) {
		return;
	}
	
    var courseId = classData.sections[0].dept_name + classData.sections[0].catalog_number;
	var path = courseId.concat(".json");
	path = path.replace(/\s+/g, '');
    saveJson(classData, path);
	
	console.log(courseId);
	
	// with the courseId and classData, you can save a json file with the 
	// courseId as its name and classData as its contents 
	// (removing whatever isn't needed of course)
});





