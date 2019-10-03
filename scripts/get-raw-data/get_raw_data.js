

const fetch = require('node-fetch');
const fs = require('fs')

const API = {
  getSections: 'http://saasta.byu.edu/noauth/classSchedule/ajax/getSections.php'
}

let count = 0;

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

async function post(url, body) {
  let data;

  try {
    const response = await fetch(url, {
      method: 'post',
      body: body
    });

    if (response.status > 201) {
      console.error(`Invalid response status ${response.status}.`);
      throw response;
    }
    
    data = await response.json();

    return data;
  } catch (err) {
    console.error('An error ocurred while fetching data', err, data);
    return err;
  }
}

function getByuClasses() {
  const data = loadJson('../../data/byuclasses.json');

  return data;
}

async function getClassSections(courseId, yearterm, sessionId) {
  const url = API.getSections;

  const body = new URLSearchParams({
    courseId,
    sessionId,
    yearterm,
    no_outcomes: true
  });

  const result = await post(url, body);

  count++;
  if (count % 100 == 0) {
    console.log(`${count} classes completed`);
  }

  return result;
}

async function getSemesterSections(courses, yearterm, sessionId) {
  const sectionPromises = Object.keys(courses).map((courseId) => {
    return getClassSections(courseId, yearterm, sessionId);
  });

  try {
    const semesterSections = await Promise.all(sectionPromises);

    return semesterSections;
  } catch (err) {
    console.error('Error while fetching sections data', err);
    return null;
  }
}

(async () => {
  const yearterm = '20195';
  const courses = getByuClasses();
  const sessionId = 'GJI1YIR2V2YS98NZEM8H'; /* TODO I'm not sure if this is even necessary */

  const semesterSections = await getSemesterSections(courses, yearterm, sessionId);

  if (!!semesterSections) {
    const semesterSectionsJson = semesterSections.reduce((acc, sections) => {
      const courseId = `${sections.catalog.curriculum_id}-${sections.catalog.title_code}`;
      acc[courseId] = sections;

      return acc; //very important to not forget this!
    }, {});

    saveJson(semesterSectionsJson, `../../data/semester-sections-${yearterm}.json`);
  } else {
    console.error('Script failed, please diagnose problem and run again.');
  }
})();