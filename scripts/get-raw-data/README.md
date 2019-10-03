# Get Raw Data

This script will take the `byu_classes.json` file and for each course, get all related information, including sections, times, instructors, and descriptions. The resulting file is stored under data as `semester-sections-<yearterm>.json`.

### Usage

Run `npm install` to add dependencies and then run `node get_raw_data.js` to run the script. Make sure to update the yearterm to target the specfic semester/term that you want (also note that the json file with class codes needs to correspond to the correct term/semester).