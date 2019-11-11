import { Utility } from "./utility";

export class Scheduler {

  constructor(courseIds, blockedTime, dirPath) {
    this.courseIds = courseIds;
    this.blockedTime = blockedTime;

    this._loadClasses(dirPath);

    this.days = [
      'mon',
      'tue',
      'wed',
      'thu',
      'fri',
      'sat',
      'sun'
    ];
  }

  _loadClasses(dirPath) {
    const utility = Utility();

    const classes = this.courseIds.map((courseId) => {
      return utility.loadJson(`${dirPath}/${courseId}/.json`);
    });

    if (classes.some(c => !c)) {
      console.error('Unable to fetch one of the classes');

      return false; // to signal that something went wrong
    };

    this.classes = classes;

    return classes; // if we need them
  }

  _noConflictsWithTimeBlock(section) {
    return true;
  }

  _addTimeBlocks(timeBlock1, timeBlock2, times, time) {
    this.days.forEach((day) => {
      if (!!time[day]) {
        times[day].push(timeBlock1);
        times[day].push(timeBlock2);
      }
    });
  }

  _isValidSchedule(sectionCombination) {
    let times = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    };

    sectionCombination.forEach((section, i) => {
      section.times.forEach((time) => {
        const timeBlock1 = {
          courseId: this.courseIds[i],
          time: time.begin_time
        }

        const timeBlock2 = {
          courseId: this.courseIds[i],
          time: time.end_time
        }

        this._addTimeBlocks(timeBlock1, timeBlock2, times, time);
      });
    });

    this.days.forEach((day) => {
      times[day].sort((t1, t2) => {
        return t1.start - t2.start;
      });
    });

    return this.days.some((day) => {
      const dayTimes = times[day];

      if (dayTimes.length < 2) {
        return true;
      }

      for (let i = 0; i < dayTimes.length - 1; i += 2) {
        const t1 = dayTimes[i];
        const t2 = dayTimes[i + 1];
        
        if (t1.courseId !== t2.courseId) {
          return false;
        }
      }
    });
  }

  generateSchedules(MAX_SCHEDULES) {
    let classSections = this.classes.map(c => c.sections);

    // check for conflicts with blocked time
    classSections = classSections.map((sections) => {
      return sections.filter(this._noConflictsWithTimeBlock)
    });

    // this is setup for getting each possible combination of classes
    const divisors = (() => {
      let divisors = [];

      for (let i = classSections.length - 1; i >= 0; i--) {
        divisors[i] = divisors[i + 1] ? divisors[i + 1] * classSections[i + 1].length : 1;
      }

      return divisors;
    })();

    const getCombination = (n) => {
      return classSections.map((sections) => {
        return sections[Math.floor(n / divisors[i]) % sections.length];
      });
    }

    // we will store all possible schedules here, limited to 100 for now
    let validSchedules = [];
    const numCombinations = classSections.reduce((acc, curr) => acc * curr.length, 1);

    // now we loop over every possible remaining combination and see which ones are valid
    for (let i = 0; i < numCombinations; i++) {
      // get a combination, e.g. [0,0,1,2,1]
      const combination = getCombination(i);

      // grab the indicated section for each class
      const sectionCombination = classSections.map((sections, j) => {
        return sections[combination[j]];
      });

      if (this._isValidSchedule(sectionCombination)) {
        validSchedules.push(sectionCombination);

        if (validSchedules.length >= MAX_SCHEDULES) {
          break; // stop searching after we have reached the limit
        }
      }
    }

    // the caller will receive a list of valid schedules;
    return validSchedules;
  }
}