/*
## Practice Drills
1.  **Temperature Converter:** Create a file `converter.js`. Use the `fs` module to read a file `temperatures.txt` that contains a list of temperatures in Celsius, convert them to Fahrenheit, and write the results to `fahrenheit.txt`.

2.  **NPM Package:** The first drill was a bit tough. Let's try an easier one. Install a fun package by running `npm install chalk`. Then, use it in a new file `colorful.js` to print a message to your console in at least three different colors.
*/

/*
## Project: Command-Line Productivity Toolkit
(This project is a bit advanced for this stage, but give it a try!)

Build a CLI script `workspace-setup.js` that:
- Creates a subfolder named after a command-line argument (e.g., `node workspace-setup.js lesson03` creates a `lesson03` folder).
- Inside the new folder, it creates starter files: `index.js` and `README.md`.
- Logs instructions for the user to `cd` into the new directory.

**Hint:** Use Node's built-in `fs` (file system) and `path` modules. Access command-line arguments via `process.argv`.

// Starter Code Hint:

// To use modules, you might need a package.json. Run `npm init -y` first.

import fs from 'node:fs/promises';
import path from 'node:path';

// Get the folder name from the command line
const folderName = process.argv[2];

if (!folderName) {
  console.error("Please provide a folder name.");
  process.exit(1);
}

// You can use path.join() to create a full path to the new directory.
const newFolderPath = path.join(process.cwd(), folderName);

async function setupWorkspace() {
  try {
    // TODO: Check if the directory already exists
    // TODO: Create the directory
    // TODO: Create the index.js and README.md files inside the new directory
    // TODO: Log the success message and instructions
    console.log(`Successfully created workspace: ${folderName}`);
    console.log(`You can now cd into ${folderName}`);
  } catch (error) {
    console.error("Error setting up workspace:", error);
  }
}

setupWorkspace();

*/
