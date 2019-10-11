const fs = require('fs');

function loadJson(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (err) {
    console.error(`Error loading json file from ${path}`, err);
    return false;
  }
}

function saveJson(json, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(json));
    console.log(`Successfully saved json! to ${path}`);
  } catch (err) {
    console.error('Error while saving json', err);
  }
}

function transformClass(classInfo) {
  const {
    dept_name, 
    catalog_number,
    catalog_suffix,
    title,
    full_title
  } = classInfo;

  const department = dept_name;
  const courseNumber = catalog_number + (catalog_suffix? catalog_suffix : "");
  const fullTitle = (full_title || title).replace(/\./, "").trim();
  const classId = (department + courseNumber).replace(/\s/, "").trim();

  return {
    classId,
    department,
    courseNumber,
    title,
    fullTitle
  };
}

function createClassList() {
  const byuClasses = loadJson('../data/byuclasses.json');
  const classes = Object.values(byuClasses).map(transformClass);

  return classes;
}

function main() {
  const classes = createClassList();

  const classesJson = { classes };

  saveJson(classesJson, '../data/classes.json');
}

(() => { main(); })();

