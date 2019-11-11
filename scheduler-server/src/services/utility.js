export class Utility {
  
  constructor() {}

  loadJson(path) {
    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (err) {
      console.error(`Error loading json file from ${path}`, err);
      return false;
    }
  }

}