# Lesson 02 · Developer Environment

Today I’ll take you through building a professional-grade JavaScript workspace. By the end of this lesson you’ll be running code from the terminal, exploring VS Code like a seasoned engineer, and using Git to snapshot your progress.

## Lesson Objectives
- Understand how Node.js executes JavaScript outside the browser.
- Get comfortable with the terminal and essential CLI commands.
- Understand the role of npm and `package.json`.
- Configure VS Code with settings and extensions for productivity.
- Set up a one-click debugger for your Node.js scripts.
- Initialize and use Git to track code changes.

## Why This Matters
Tools don’t make a developer great, but great developers master their tools. We’re investing time upfront so that the environment never slows you down. As projects get complex, automation and workflow speed determine whether you ship features calmly or drown in chaos.

## Lesson Narrative

### 1. Meet the Terminal: Your Command Center
Your terminal (like PowerShell or Git Bash on Windows) is your most direct way to interact with your computer. Learn these commands by heart—they’re the verbs of your developer vocabulary:

| Command | Description | Example |
| :--- | :--- | :--- |
| `pwd` | **P**rint **W**orking **D**irectory (where am I?) | `pwd` |
| `ls` | **L**i**s**t files and folders | `ls -a` (shows hidden) |
| `cd` | **C**hange **D**irectory | `cd my-project` |
| `mkdir` | **M**a**k**e **Dir**ectory | `mkdir lesson02` |
| `echo` | Prints text. Can be used to create a file. | `echo "console.log('hi')" > app.js` |
| `rm` | **R**e**m**ove a file or directory (use with care!) | `rm temp.txt` |

**Key Concepts:**
- `.` refers to your **current** directory. `cd .` does nothing.
- `..` refers to the **parent** directory. `cd ..` moves you up one level.

Practice chaining commands: `mkdir lesson02 && cd lesson02`

### 2. Running JavaScript with Node.js
Node.js is a runtime that lets you execute JavaScript code outside of a web browser. It's built on Chrome's V8 engine, the same one that runs JS in the browser.

1.  Create a file named `hello.js` in your `lesson02` directory.
2.  Add the following code:
    ```javascript
    // hello.js
    const message = "Hello from a Node.js script!";
    console.log(message);
    ```
3.  Run it from your terminal:
    ```bash
    node hello.js
    ```
    You should see the message printed. This simple loop—edit file, run command—is fundamental to all development.

### 3. Managing Packages with NPM
Every Node.js project should have a `package.json` file. This file lists project metadata and, most importantly, tracks the third-party code (**packages**) your project depends on.

1.  In your `lesson02` terminal, run this command:
    ```bash
    npm init -y
    ```
    - `npm` is the **N**ode **P**ackage **M**anager.
    - `init` initializes a new project.
    - The `-y` flag accepts all the default prompts.

2.  This creates a `package.json` file. Open it and look. It’s just a JSON object describing your project.

### 4. VS Code: Make It Work for You

#### Essential Extensions
In Lesson 01, we recommended installing Prettier and ESLint. They are crucial for maintaining code quality. Ensure they are installed.

#### Automate Formatting
Create a folder named `.vscode` inside your `lesson02` directory and add a `settings.json` file within it. This is how you set project-specific editor settings.

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true, // Auto-formats your file every time you save
  "editor.defaultFormatter": "esbenp.prettier-vscode", // Specifies Prettier as the formatter
  "editor.tabSize": 2,
  "files.autoSave": "onFocusChange" // A good balance for auto-saving
}
```

#### One-Click Debugging
Debugging with `console.log` is fine, but a real debugger is a superpower. Let's set one up.

1.  In the `.vscode` folder, create a `launch.json` file.
2.  Add the following configuration:
    ```json
    // .vscode/launch.json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Run Current File",
          "program": "${file}" // This tells VS Code to run the currently open file
        }
      ]
    }
    ```
3.  Now, open `hello.js`, click on the line number next to `console.log` to set a **breakpoint** (a red dot), and press **F5**. The code execution will pause there, and you can inspect the `message` variable!

### 5. Git: Your Time Machine
Git tracks changes to your files. Think of it in three steps:
1.  **Working Directory:** The files you are currently editing.
2.  **Staging Area:** The waiting room for changes you want to save. You add files here with `git add`.
3.  **Repository (.git folder):** The permanent, saved history of your project. You save the staged changes here with `git commit`.

Inside your `lesson02` folder, run these commands one by one:

```bash
# Check the status of your repository
git status

# Add all new files and changes to the staging area
git add .

# Commit the staged changes to your repository with a clear message
git commit -m "feat: Set up Node.js environment and VS Code debugger"

# Check the status again to see a clean working tree
git status
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Mastering VS Code in 20 Minutes (Fireship)](https://www.youtube.com/watch?v=fnPhJHN0jTE)
- [Intro to Git for JavaScript Developers (GitHub Training)](https://www.youtube.com/watch?v=RGOj5yH7evk)

## References
- Node.js Docs: [File System `fs`](https://nodejs.org/docs/latest/api/fs.html)
- VS Code Docs: [Node.js Debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- Git Book: [Chapter 2 – Git Basics](https://git-scm.com/book/en/v2)

## Reflection Prompt
Answer in your journal:
- Which tool felt most natural? Least natural?
- How long did it take to set up the debugger and pause on a breakpoint?
- What’s one automation you’d like to build later this course?

You’re now equipped to write, execute, and version control JavaScript. In Lesson 03, I’ll introduce the language fundamentals that we’ll use in every line of code going forward.
