# Lesson 16 · Node.js Foundations 🚀🖥️

**"From Browser to Server: JavaScript Everywhere!"**

Welcome to the server side! You've mastered JavaScript in the browser - now let's use those same skills to build servers, command-line tools, and desktop applications. Node.js lets your JavaScript code run anywhere!

## 🎯 What You'll Master Today

**Think of Node.js as your JavaScript superpower upgrade:**
- 🏗️ **Node.js Architecture** - How JavaScript runs outside the browser
- 🖥️ **System Interaction** - Read files, check environment, run commands
- 📁 **File System Operations** - Create, read, update, and delete files
- 🌐 **Network Programming** - Build web servers and APIs
- ⚡ **Stream Processing** - Handle large amounts of data efficiently
- 🛡️ **Error Handling** - Keep your server running reliably
- 🔧 **Command Line Tools** - Build utilities like `npm`, `git`, or `webpack`

## 🤔 Why Node.js Matters

**Before Node.js (2009):**
- Frontend: JavaScript 
- Backend: PHP, Java, C#, Python, Ruby
- Different languages = Different teams
- Context switching between languages

**After Node.js:**
- ✅ One language everywhere (JavaScript)
- ✅ Same developers can work frontend and backend
- ✅ Shared code between client and server
- ✅ Fast development cycles
- ✅ Massive package ecosystem (npm)

**Real companies using Node.js:**
- Netflix (streaming backend)
- Uber (real-time location services)
- PayPal (payment processing)
- LinkedIn (messaging systems)
- NASA (space mission control)
- WhatsApp (messaging for 2+ billion users)

---

## 🏗️ Understanding Node.js Architecture

### The "Restaurant Kitchen" Analogy

Imagine two types of restaurant kitchens:

**🥘 Traditional Kitchen (Other Programming Languages):**
- One chef per order
- Chef #1 makes pasta → waits for water to boil → does nothing else
- Chef #2 makes salad → waits for lettuce to wash → does nothing else
- Need many chefs for busy nights
- Expensive and inefficient

**🚀 Node.js Kitchen (Event-Driven):**
- One super-efficient chef (single thread)
- Chef starts pasta water → moves to prep salad → checks on soup → back to pasta
- Never waits idle - always productive
- Handles many orders simultaneously
- Fast and resource-efficient

### 🧠 How Node.js Works

**Node.js = V8 Engine + libuv + JavaScript Runtime**

```
┌─────────────────────────────────────┐
│           Your JavaScript           │
│        (Event-driven code)          │
├─────────────────────────────────────┤
│            Node.js APIs             │
│     (fs, http, process, etc.)       │
├─────────────────────────────────────┤
│          V8 JavaScript Engine       │
│        (Google Chrome's engine)     │
├─────────────────────────────────────┤
│               libuv                 │
│    (Async I/O, Event Loop, etc.)    │
├─────────────────────────────────────┤
│          Operating System           │
│      (Windows, macOS, Linux)        │
└─────────────────────────────────────┘
```

**🔄 The Event Loop:**
1. Execute JavaScript code
2. Start async operations (file read, network request)
3. While waiting, handle other tasks
4. When async operation completes, run its callback
5. Repeat forever

### 🌟 Perfect Use Cases for Node.js

**✅ Great for:**
- 🌐 Web APIs and microservices
- 📱 Real-time applications (chat, gaming, collaboration)
- 🔧 Command-line tools and utilities
- 📊 Data streaming and processing
- 🏗️ Build tools and development servers
- 🤖 Automation and scripting

**❌ Not ideal for:**
- 💻 CPU-intensive tasks (image processing, mathematical calculations)
- 🎮 High-performance gaming engines
- 🧮 Scientific computing
- 🔢 Heavy mathematical computations

---

## 🖥️ The `process` Object: Your System Interface

### The "Mission Control Panel" Analogy

Think of `process` as your spacecraft's control panel - it gives you access to:
- 📡 **Communication with Earth** (`process.argv` - command line arguments)
- 🌍 **Environmental readings** (`process.env` - environment variables)
- 🗺️ **Current location** (`process.cwd()` - current directory)
- 🚨 **Emergency shutdown** (`process.exit()` - terminate program)

### 🎯 Command Line Arguments (`process.argv`)

**Real-world example: Building a calculator tool**

```javascript
// calc.js
console.log('All arguments:', process.argv);

// When you run: node calc.js add 5 3
// process.argv will be:
// [
//   '/usr/local/bin/node',        // [0] Node.js executable path
//   '/Users/you/projects/calc.js', // [1] Your script path
//   'add',                        // [2] First argument
//   '5',                         // [3] Second argument
//   '3'                          // [4] Third argument
// ]

const [nodePath, scriptPath, operation, num1, num2] = process.argv;

// Better: Skip the first two system arguments
const [operation, num1, num2] = process.argv.slice(2);

switch (operation) {
  case 'add':
    console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
    break;
  case 'multiply':
    console.log(`${num1} × ${num2} = ${Number(num1) * Number(num2)}`);
    break;
  default:
    console.log('Usage: node calc.js <add|multiply> <num1> <num2>');
    process.exit(1); // Exit with error code
}
```

**Testing your calculator:**
```bash
$ node calc.js add 15 25
15 + 25 = 40

$ node calc.js multiply 7 8  
7 × 8 = 56

$ node calc.js
Usage: node calc.js <add|multiply> <num1> <num2>
```

### 🌍 Environment Variables (`process.env`)

**The "Secret Settings" Analogy**

Environment variables are like secret settings that change how your app behaves in different situations:

```javascript
// config.js
const config = {
  // Development vs Production settings
  port: process.env.PORT || 3000,
  database: process.env.NODE_ENV === 'production' 
    ? 'postgres://prod-server/myapp'
    : 'sqlite://./dev.db',
  
  // API keys (never put these in your code!)
  apiKey: process.env.API_KEY,
  
  // Feature flags
  enableLogging: process.env.ENABLE_LOGS === 'true',
  
  // Debug mode
  debug: process.env.NODE_ENV !== 'production'
};

// Usage in your app
if (config.debug) {
  console.log('🐛 Debug mode enabled!');
  console.log('Config:', config);
}

console.log(`🚀 Server starting on port ${config.port}`);
```

**Setting environment variables:**
```bash
# Temporary (for this command only)
PORT=8080 NODE_ENV=production node server.js

# Using .env file (with dotenv package)
echo "PORT=8080" > .env
echo "API_KEY=secret123" >> .env
echo "ENABLE_LOGS=true" >> .env
```

### 📍 Current Directory (`process.cwd()`)

```javascript
// file-manager.js
import path from 'node:path';

console.log('📍 Current working directory:', process.cwd());
console.log('📁 This script is located at:', import.meta.url);

// Safe way to reference files relative to your script
const dataFile = path.join(process.cwd(), 'data', 'users.json');
console.log('💾 Data file path:', dataFile);

// Change working directory (rarely needed)
process.chdir('/Users/yourname/Desktop');
console.log('📍 New working directory:', process.cwd());
```

### 🚨 Graceful Shutdown (`process.exit()`)

```javascript
// server.js
function shutdownGracefully(exitCode = 0) {
  console.log('🔄 Cleaning up before shutdown...');
  
  // Close database connections
  // Save important data
  // Stop background tasks
  
  console.log('✅ Cleanup complete. Goodbye!');
  process.exit(exitCode);
}

// Handle different shutdown signals
process.on('SIGINT', () => {  // Ctrl+C
  console.log('\n👋 Received SIGINT (Ctrl+C)');
  shutdownGracefully(0);
});

process.on('SIGTERM', () => { // Deployment shutdown
  console.log('🛑 Received SIGTERM (graceful shutdown)');
  shutdownGracefully(0);
});

// Handle unexpected errors
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  shutdownGracefully(1);
});
```

---

## 📁 File System Operations: Your Digital Filing Cabinet

### The "Digital Secretary" Analogy

Node.js file system operations are like having a super-efficient digital secretary who can:
- 📖 **Read documents** (files)
- ✍️ **Write reports** (create files)
- 📂 **Organize folders** (directories)
- 🗂️ **Archive data** (move, copy, delete)
- 🔍 **Find information** (search, list contents)

### 📖 Reading Files: The Right Way

```javascript
// modern-file-reading.js
import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import path from 'node:path';

// 📖 Reading a text file
async function readTextFile() {
  try {
    const content = await readFile('data/notes.txt', 'utf8');
    console.log('📄 File contents:');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('❌ File not found: data/notes.txt');
    } else {
      console.error('💥 Error reading file:', error.message);
    }
  }
}

// 📊 Reading a JSON file (configuration, data)
async function readJsonFile() {
  try {
    const rawData = await readFile('config/app-config.json', 'utf8');
    const config = JSON.parse(rawData);
    console.log('⚙️ App configuration:', config);
    return config;
  } catch (error) {
    console.error('💥 Error parsing JSON:', error.message);
    // Return default configuration
    return {
      port: 3000,
      debug: true,
      database: 'sqlite://./app.db'
    };
  }
}

// 📷 Reading a binary file (images, etc.)
async function readBinaryFile() {
  try {
    const imageBuffer = await readFile('assets/logo.png');
    console.log('🖼️ Image size:', imageBuffer.length, 'bytes');
    console.log('🔢 First few bytes:', imageBuffer.subarray(0, 10));
  } catch (error) {
    console.error('💥 Error reading image:', error.message);
  }
}

readTextFile();
readJsonFile();
readBinaryFile();
```

### ✍️ Writing Files: Saving Your Work

```javascript
// file-writing-examples.js
import { writeFile, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// ✍️ Writing a simple text file
async function saveNote(note) {
  const timestamp = new Date().toISOString();
  const noteWithTimestamp = `[${timestamp}] ${note}\n`;
  
  try {
    await writeFile('daily-notes.txt', noteWithTimestamp);
    console.log('✅ Note saved successfully!');
  } catch (error) {
    console.error('❌ Failed to save note:', error.message);
  }
}

// 📝 Appending to an existing file (like a log)
async function addToLog(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  try {
    await appendFile('application.log', logEntry);
    console.log('📝 Added to log:', message);
  } catch (error) {
    console.error('❌ Failed to write to log:', error.message);
  }
}

// 💾 Saving complex data as JSON
async function saveUserData(userData) {
  try {
    const jsonString = JSON.stringify(userData, null, 2);
    await writeFile('user-profile.json', jsonString);
    console.log('👤 User data saved!');
  } catch (error) {
    console.error('❌ Failed to save user data:', error.message);
  }
}

// 📂 Creating directories and nested files
async function createProjectStructure() {
  try {
    // Create nested directories
    await mkdir('my-project/src/components', { recursive: true });
    await mkdir('my-project/public/assets', { recursive: true });
    
    // Create some starter files
    await writeFile('my-project/README.md', '# My Awesome Project\n\nThis is a starter project.');
    await writeFile('my-project/src/index.js', 'console.log("Hello, world!");');
    
    console.log('🏗️ Project structure created!');
  } catch (error) {
    console.error('❌ Failed to create project:', error.message);
  }
}

// Test the functions
saveNote('Remember to review Node.js concepts');
addToLog('Application started');
saveUserData({ name: 'Alice', age: 30, city: 'San Francisco' });
createProjectStructure();
```

### 🗺️ Path Manipulation: Cross-Platform File Paths

**The "GPS for File Systems" Analogy**

```javascript
// path-examples.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 🗺️ Get the current file's directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📍 Current file:', __filename);
console.log('📁 Current directory:', __dirname);

// 🛠️ Building cross-platform paths (works on Windows, Mac, Linux)
const configPath = path.join(__dirname, 'config', 'app.json');
const assetsPath = path.join(__dirname, '..', 'public', 'assets');
const dbPath = path.join(process.cwd(), 'data', 'app.db');

console.log('⚙️ Config path:', configPath);
console.log('🖼️ Assets path:', assetsPath);
console.log('💾 Database path:', dbPath);

// 🔍 Path analysis
const filePath = '/Users/alice/projects/myapp/src/index.js';

console.log('\n🔍 Analyzing path:', filePath);
console.log('📁 Directory:', path.dirname(filePath));
console.log('📄 Filename:', path.basename(filePath));
console.log('📄 Name without extension:', path.basename(filePath, '.js'));
console.log('🏷️ Extension:', path.extname(filePath));
console.log('🗂️ Parsed:', path.parse(filePath));

// 🔗 Resolving relative paths to absolute
const relativePath = '../data/users.json';
const absolutePath = path.resolve(relativePath);
console.log('\n🔗 Relative:', relativePath);
console.log('🔗 Absolute:', absolutePath);

// 🧭 Checking if path is absolute
console.log('\n🧭 Is absolute?');
console.log('  /Users/alice/file.txt:', path.isAbsolute('/Users/alice/file.txt'));
console.log('  ./relative/path.txt:', path.isAbsolute('./relative/path.txt'));
console.log('  C:\\Windows\\file.txt:', path.isAbsolute('C:\\Windows\\file.txt'));
```

### 🗂️ Directory Operations: Managing Your Digital Workspace

```javascript
// directory-operations.js
import { readdir, stat, mkdir, rmdir } from 'node:fs/promises';
import path from 'node:path';

// 📋 List all files and folders
async function listDirectoryContents(dirPath) {
  try {
    const items = await readdir(dirPath);
    
    console.log(`📁 Contents of ${dirPath}:`);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        console.log(`  📁 ${item}/`);
      } else {
        console.log(`  📄 ${item} (${stats.size} bytes)`);
      }
    }
  } catch (error) {
    console.error('❌ Error reading directory:', error.message);
  }
}

// 🔍 Find files with specific extensions
async function findFilesByExtension(dirPath, extension) {
  try {
    const items = await readdir(dirPath);
    const matchingFiles = [];
    
    for (const item of items) {
      if (path.extname(item).toLowerCase() === extension.toLowerCase()) {
        matchingFiles.push(item);
      }
    }
    
    console.log(`🔍 Found ${matchingFiles.length} ${extension} files:`);
    matchingFiles.forEach(file => console.log(`  📄 ${file}`));
    
    return matchingFiles;
  } catch (error) {
    console.error('❌ Error searching files:', error.message);
    return [];
  }
}

// 📊 Get detailed file information
async function getFileInfo(filePath) {
  try {
    const stats = await stat(filePath);
    
    console.log(`📊 File info for ${filePath}:`);
    console.log(`  📏 Size: ${stats.size} bytes`);
    console.log(`  📅 Created: ${stats.birthtime}`);
    console.log(`  ✏️ Modified: ${stats.mtime}`);
    console.log(`  📁 Is directory: ${stats.isDirectory()}`);
    console.log(`  📄 Is file: ${stats.isFile()}`);
    
    return stats;
  } catch (error) {
    console.error('❌ Error getting file info:', error.message);
  }
}

// Test the functions
listDirectoryContents('.');
findFilesByExtension('.', '.js');
getFileInfo('package.json');
```

---

## 🔢 Handling Binary Data: The Buffer System

### The "Digital DNA" Analogy

Think of `Buffer` as a way to work with the "digital DNA" of files - the raw 1s and 0s that computers really understand:

- **JavaScript Strings** = Human language (text, emoji, characters)
- **Buffers** = Machine language (raw bytes, binary data)

### 🧬 Understanding Buffers

```javascript
// buffer-basics.js

// 🔤 Converting text to binary and back
const message = "Hello, Node.js! 👋";
const buffer = Buffer.from(message, 'utf8');

console.log('📝 Original message:', message);
console.log('🔢 As buffer:', buffer);
console.log('📏 Buffer length:', buffer.length, 'bytes');
console.log('🔣 As hex string:', buffer.toString('hex'));
console.log('🔤 Back to text:', buffer.toString('utf8'));

// 🎨 Different encoding formats
const text = "JavaScript";
const utf8Buffer = Buffer.from(text, 'utf8');
const base64Buffer = Buffer.from(text, 'utf8');

console.log('\n🎨 Different encodings for "' + text + '":');
console.log('UTF-8:', utf8Buffer.toString('utf8'));
console.log('Hex:', utf8Buffer.toString('hex'));
console.log('Base64:', utf8Buffer.toString('base64'));
console.log('Binary:', utf8Buffer.toString('binary'));
```

### 🖼️ Real-World Buffer Applications

```javascript
// buffer-applications.js
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// 1. 📷 Working with image files
async function analyzeImage() {
  try {
    const imageBuffer = await readFile('photo.jpg');
    
    console.log('🖼️ Image Analysis:');
    console.log('📏 Size:', (imageBuffer.length / 1024).toFixed(2), 'KB');
    
    // Check if it's a JPEG (starts with FF D8)
    const isJPEG = imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8;
    console.log('📸 Is JPEG:', isJPEG);
    
    // Get first few bytes (file signature)
    console.log('🔍 File signature:', imageBuffer.subarray(0, 4).toString('hex'));
    
  } catch (error) {
    console.log('ℹ️ No image file found, that\'s okay!');
  }
}

// 2. 🔐 Creating file checksums (verify file integrity)
async function createChecksum(filePath) {
  try {
    const fileBuffer = await readFile(filePath);
    const hash = createHash('sha256');
    hash.update(fileBuffer);
    const checksum = hash.digest('hex');
    
    console.log(`🔐 SHA256 checksum for ${filePath}: ${checksum}`);
    return checksum;
  } catch (error) {
    console.error('❌ Error creating checksum:', error.message);
  }
}

// 3. 📊 Buffer manipulation
function bufferManipulation() {
  console.log('\n📊 Buffer Manipulation Examples:');
  
  // Create buffers
  const buf1 = Buffer.from('Hello', 'utf8');
  const buf2 = Buffer.from(' World!', 'utf8');
  
  // Concatenate buffers
  const combined = Buffer.concat([buf1, buf2]);
  console.log('🔗 Combined:', combined.toString());
  
  // Allocate empty buffer
  const emptyBuffer = Buffer.alloc(10, 0); // 10 bytes, filled with zeros
  console.log('⚪ Empty buffer:', emptyBuffer);
  
  // Fill buffer with pattern
  const patternBuffer = Buffer.alloc(8, 'AB');
  console.log('🎨 Pattern buffer:', patternBuffer.toString());
  
  // Copy data between buffers
  const source = Buffer.from('Copy this!');
  const destination = Buffer.alloc(20);
  source.copy(destination, 0); // Copy to position 0
  console.log('📋 Copied:', destination.toString().trim());
}

// 4. 🌐 Network data simulation
function networkDataExample() {
  console.log('\n🌐 Network Data Simulation:');
  
  // Simulate receiving network packet
  const packet = Buffer.alloc(12);
  
  // Write different data types
  packet.writeUInt32BE(123456, 0);    // 4-byte integer at position 0
  packet.writeUInt16BE(8080, 4);      // 2-byte port number at position 4
  packet.write('HELLO', 6, 'utf8');   // String at position 6
  
  console.log('📦 Network packet:', packet);
  
  // Read the data back
  const id = packet.readUInt32BE(0);
  const port = packet.readUInt16BE(4);
  const message = packet.subarray(6, 11).toString('utf8');
  
  console.log('🆔 Packet ID:', id);
  console.log('🔌 Port:', port);
  console.log('💬 Message:', message);
}

// Run examples
analyzeImage();
createChecksum('package.json');
bufferManipulation();
networkDataExample();
```

### 🎯 When to Use Buffers

**✅ Use Buffers for:**
- 🖼️ Image/video processing
- 📁 File uploads/downloads
- 🌐 Network protocols
- 🔐 Cryptographic operations
- 📊 Binary data formats
- 🗜️ Data compression

**❌ Use Strings for:**
- 📝 Text processing
- 🏷️ User input
- 📄 HTML/JSON content
- 📊 Configuration files
- 🔤 Simple data exchange

---

## ⚡ Events and Streams: The Flow of Data

### The "Water Pipeline" Analogy

Imagine data flowing through your application like water through pipes:

- **📡 Events** = Sensors that detect when something happens
- **🚰 Streams** = Pipes that carry data from one place to another
- **🔧 Transform** = Filters that modify data as it flows
- **💧 Chunks** = Small portions of data flowing through

### 📡 Event-Driven Programming

```javascript
// event-basics.js
import { EventEmitter } from 'node:events';

// 🎭 Creating a custom event emitter
class CoffeeShop extends EventEmitter {
  constructor() {
    super();
    this.orders = [];
    this.revenue = 0;
  }
  
  // ☕ Place an order
  placeOrder(customer, drink, price) {
    const order = {
      id: Date.now(),
      customer,
      drink,
      price,
      timestamp: new Date()
    };
    
    this.orders.push(order);
    this.revenue += price;
    
    // 📡 Emit events for different listeners
    this.emit('order-placed', order);
    this.emit('revenue-updated', this.revenue);
    
    // 🎉 Special event for big orders
    if (price > 10) {
      this.emit('big-order', order);
    }
    
    return order;
  }
  
  // ✅ Complete an order
  completeOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.completed = true;
      this.emit('order-completed', order);
    }
  }
}

// 🏪 Create coffee shop and set up event listeners
const coffeeShop = new CoffeeShop();

// 📊 Analytics listener
coffeeShop.on('order-placed', (order) => {
  console.log(`☕ New order: ${order.customer} ordered ${order.drink} ($${order.price})`);
});

// 💰 Revenue tracking
coffeeShop.on('revenue-updated', (totalRevenue) => {
  console.log(`💰 Total revenue: $${totalRevenue}`);
});

// 🎉 Special promotions
coffeeShop.on('big-order', (order) => {
  console.log(`🎉 Big spender alert! ${order.customer} spent $${order.price}!`);
});

// ✅ Order completion
coffeeShop.on('order-completed', (order) => {
  console.log(`✅ Order complete: ${order.drink} for ${order.customer}`);
});

// 🧪 Test the coffee shop
console.log('🏪 Coffee shop opening...');
coffeeShop.placeOrder('Alice', 'Latte', 4.50);
coffeeShop.placeOrder('Bob', 'Mocha Deluxe', 12.00);
coffeeShop.placeOrder('Carol', 'Espresso', 2.50);

// Complete some orders after a delay
setTimeout(() => {
  coffeeShop.completeOrder(coffeeShop.orders[0].id);
}, 2000);
```

### 🌊 Understanding Streams

**Stream Types:**
- **📖 Readable** - You can read data from it (file reading, HTTP requests)
- **✍️ Writable** - You can write data to it (file writing, HTTP responses)
- **🔄 Duplex** - Both readable and writable (TCP sockets)
- **🔧 Transform** - Changes data as it passes through (compression, encryption)

```javascript
// stream-basics.js
import { Readable, Writable, Transform, pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipelineAsync = promisify(pipeline);

// 📖 Creating a readable stream (data source)
class NumberStream extends Readable {
  constructor(options = {}) {
    super(options);
    this.currentNumber = 1;
    this.maxNumber = options.max || 5;
  }
  
  _read() {
    if (this.currentNumber <= this.maxNumber) {
      // Push data to the stream
      this.push(`Number: ${this.currentNumber}\n`);
      this.currentNumber++;
    } else {
      // Signal end of stream
      this.push(null);
    }
  }
}

// 🔧 Creating a transform stream (data processor)
class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // Convert chunk to uppercase
    const upperChunk = chunk.toString().toUpperCase();
    this.push(upperChunk);
    callback();
  }
}

// ✍️ Creating a writable stream (data destination)
class CollectorStream extends Writable {
  constructor(options = {}) {
    super(options);
    this.collectedData = '';
  }
  
  _write(chunk, encoding, callback) {
    this.collectedData += chunk.toString();
    console.log('📝 Collected:', chunk.toString().trim());
    callback();
  }
  
  getCollectedData() {
    return this.collectedData;
  }
}

// 🔗 Connecting streams with pipeline
async function demonstrateStreams() {
  console.log('🌊 Stream Pipeline Demo:');
  
  const numberStream = new NumberStream({ max: 3 });
  const uppercaseTransform = new UppercaseTransform();
  const collector = new CollectorStream();
  
  try {
    await pipelineAsync(
      numberStream,
      uppercaseTransform,
      collector
    );
    
    console.log('✅ Pipeline completed!');
    console.log('📊 Final collected data:');
    console.log(collector.getCollectedData());
  } catch (error) {
    console.error('❌ Pipeline error:', error.message);
  }
}

demonstrate Streams();
```

### 🔧 Practical Stream Applications

```javascript
// practical-streams.js
import { createReadStream, createWriteStream } from 'node:fs';
import { Transform, pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { promisify } from 'node:util';

const pipelineAsync = promisify(pipeline);

// 🔍 CSV Processing Transform Stream
class CSVProcessor extends Transform {
  constructor(options = {}) {
    super(options);
    this.lineNumber = 0;
    this.buffer = '';
  }
  
  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\n');
    
    // Keep the last incomplete line in buffer
    this.buffer = lines.pop() || '';
    
    // Process complete lines
    for (const line of lines) {
      this.lineNumber++;
      
      if (this.lineNumber === 1) {
        // Skip header row
        continue;
      }
      
      // Parse CSV line (simplified)
      const [name, age, city] = line.split(',');
      
      if (name && age && city) {
        const person = {
          name: name.trim(),
          age: parseInt(age.trim()),
          city: city.trim()
        };
        
        // Transform to JSON and push
        this.push(JSON.stringify(person) + '\n');
      }
    }
    
    callback();
  }
  
  _flush(callback) {
    // Process any remaining data in buffer
    if (this.buffer.trim()) {
      const [name, age, city] = this.buffer.split(',');
      if (name && age && city) {
        const person = {
          name: name.trim(),
          age: parseInt(age.trim()),
          city: city.trim()
        };
        this.push(JSON.stringify(person) + '\n');
      }
    }
    callback();
  }
}

// 📊 Log Transform Stream
class LogTransform extends Transform {
  constructor(options = {}) {
    super(options);
    this.itemCount = 0;
  }
  
  _transform(chunk, encoding, callback) {
    this.itemCount++;
    console.log(`📝 Processing item ${this.itemCount}: ${chunk.toString().trim()}`);
    this.push(chunk);
    callback();
  }
}

// 📁 File processing example
async function processLargeFile() {
  console.log('\n📁 Processing large file with streams...');
  
  try {
    // Create sample CSV data if it doesn't exist
    await createSampleCSV();
    
    await pipelineAsync(
      createReadStream('sample-data.csv'),
      new CSVProcessor(),
      new LogTransform(),
      createGzip(), // Compress the output
      createWriteStream('processed-data.json.gz')
    );
    
    console.log('✅ File processing completed!');
    console.log('📁 Output saved as processed-data.json.gz');
  } catch (error) {
    console.error('❌ Processing error:', error.message);
  }
}

// 🔧 Helper function to create sample data
async function createSampleCSV() {
  const sampleData = `name,age,city
Alice Johnson,28,San Francisco
Bob Smith,32,New York
Carol Davis,25,Los Angeles
David Wilson,29,Chicago
Eve Brown,31,Boston`;
  
  const { writeFile } = await import('node:fs/promises');
  await writeFile('sample-data.csv', sampleData);
  console.log('📝 Sample CSV file created');
}

processLargeFile();
```

### 🎯 Stream Benefits

**✅ Memory Efficient:**
- Process huge files without loading them entirely into memory
- Handle files larger than available RAM

**⚡ Performance:**
- Start processing data as soon as the first chunk arrives
- Pipeline multiple operations for optimal throughput

**🔧 Composability:**
- Chain multiple transforms together
- Reuse stream components in different contexts

**🎪 Real-World Use Cases:**
- 📁 File processing (CSV, logs, images)
- 🌐 HTTP request/response handling
- 📊 Data transformation pipelines
- 🗜️ Compression/decompression
- 🔐 Encryption/decryption
- 📺 Video/audio streaming

---

## 🌐 Building Your First HTTP Server

### The "Restaurant Service" Analogy

Think of an HTTP server like a restaurant:
- **🚪 Server** = The restaurant building
- **👥 Requests** = Customers coming in
- **📋 Routes** = Menu items
- **👨‍🍳 Handler Functions** = Kitchen staff preparing orders
- **🍽️ Responses** = Dishes served to customers

### 🏗️ Basic HTTP Server Structure

```javascript
// basic-server.js
import http from 'node:http';
import url from 'node:url';

// 🎯 Create the server
const server = http.createServer((request, response) => {
  // 📊 Log incoming requests
  console.log(`${new Date().toISOString()} - ${request.method} ${request.url}`);
  
  // 🗺️ Parse the URL
  const parsedUrl = url.parse(request.url, true);
  const path = parsedUrl.pathname;
  const method = request.method;
  
  // 🧭 Route handling
  if (path === '/' && method === 'GET') {
    // 🏠 Home page
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`
      <html>
        <body>
          <h1>🏠 Welcome to My Node.js Server!</h1>
          <p>Server is running at ${new Date()}</p>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/health">Health Check</a></li>
            <li><a href="/api/time">Current Time API</a></li>
          </ul>
        </body>
      </html>
    `);
    
  } else if (path === '/about' && method === 'GET') {
    // ℹ️ About page
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      name: 'My Node.js Server',
      version: '1.0.0',
      author: 'Your Name',
      description: 'Learning Node.js HTTP servers!'
    }));
    
  } else if (path === '/health' && method === 'GET') {
    // 🏥 Health check endpoint
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime() + ' seconds'
    }));
    
  } else if (path === '/api/time' && method === 'GET') {
    // ⏰ Time API
    const now = new Date();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      timestamp: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      formatted: now.toLocaleString()
    }));
    
  } else {
    // 🚫 404 Not Found
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      error: 'Not Found',
      message: `The path ${path} was not found on this server`,
      availablePaths: ['/', '/about', '/health', '/api/time']
    }));
  }
});

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

// 🛑 Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});
```

### 🔧 Advanced HTTP Server Features

```javascript
// advanced-server.js
import http from 'node:http';
import url from 'node:url';
import querystring from 'node:querystring';

// 📊 Simple request logger middleware
function logRequest(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  console.log(`📥 ${timestamp} - ${req.method} ${req.url}`);
  
  // Log response when it's finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`📤 ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

// 🍪 Simple cookie parser
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
  }
  return cookies;
}

// 📝 Handle POST data
function parsePostData(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        // Try to parse as JSON
        if (req.headers['content-type'] === 'application/json') {
          resolve(JSON.parse(body));
        } else {
          // Parse as form data
          resolve(querystring.parse(body));
        }
      } catch (error) {
        reject(error);
      }
    });
    
    req.on('error', reject);
  });
}

// 🎯 Enhanced server with features
const server = http.createServer(async (req, res) => {
  // 📊 Log the request
  logRequest(req, res, () => {});
  
  // 🗺️ Parse URL and cookies
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;
  const cookies = parseCookies(req.headers.cookie);
  
  // 🛡️ Add security headers
  res.setHeader('X-Powered-By', 'Node.js');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    if (path === '/api/echo' && req.method === 'POST') {
      // 📡 Echo API - returns what you send
      const postData = await parsePostData(req);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Echo response',
        yourData: postData,
        timestamp: new Date().toISOString()
      }));
      
    } else if (path === '/api/greet' && req.method === 'GET') {
      // 👋 Greeting API with query parameters
      const name = query.name || 'Anonymous';
      const language = query.lang || 'en';
      
      const greetings = {
        en: `Hello, ${name}!`,
        es: `¡Hola, ${name}!`,
        fr: `Bonjour, ${name}!`,
        de: `Hallo, ${name}!`
      };
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        greeting: greetings[language] || greetings.en,
        language: language,
        name: name
      }));
      
    } else if (path === '/api/cookies' && req.method === 'GET') {
      // 🍪 Cookie demonstration
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': [
          'session=abc123; Path=/; HttpOnly',
          'theme=dark; Path=/; Max-Age=3600'
        ]
      });
      res.end(JSON.stringify({
        message: 'Cookies set!',
        receivedCookies: cookies,
        newCookies: ['session', 'theme']
      }));
      
    } else if (path === '/api/upload' && req.method === 'POST') {
      // 📁 File upload simulation
      const data = await parsePostData(req);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Upload received',
        size: JSON.stringify(data).length + ' characters',
        timestamp: new Date().toISOString()
      }));
      
    } else {
      // 🚫 404 Not Found
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Not Found',
        path: path,
        method: req.method,
        availableEndpoints: {
          'GET /api/greet?name=John&lang=es': 'Personalized greeting',
          'GET /api/cookies': 'Cookie demonstration',
          'POST /api/echo': 'Echo your JSON data',
          'POST /api/upload': 'File upload simulation'
        }
      }));
    }
  } catch (error) {
    // 💥 Handle errors
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal Server Error',
      message: error.message
    }));
  }
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 Advanced server running on http://localhost:${PORT}`);
  console.log('\n🧪 Test these endpoints:');
  console.log('  GET  http://localhost:3000/api/greet?name=Alice&lang=fr');
  console.log('  GET  http://localhost:3000/api/cookies');
  console.log('  POST http://localhost:3000/api/echo (with JSON body)');
  console.log('  POST http://localhost:3000/api/upload (with form data)');
});
```

### 🧪 Testing Your Server

```javascript
// test-client.js - Simple HTTP client to test your server
import http from 'node:http';

// 🧪 Test GET request
function testGetRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

// 🧪 Test POST request
function testPostRequest(path, postData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(postData);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData
        });
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 🏃‍♂️ Run tests
async function runTests() {
  console.log('🧪 Testing HTTP server...');
  
  try {
    // Test health endpoint
    console.log('\n1. Testing /health endpoint...');
    const healthResponse = await testGetRequest('/health');
    console.log('✅ Status:', healthResponse.statusCode);
    console.log('📄 Response:', healthResponse.body);
    
    // Test greeting with parameters
    console.log('\n2. Testing /api/greet endpoint...');
    const greetResponse = await testGetRequest('/api/greet?name=Alice&lang=fr');
    console.log('✅ Status:', greetResponse.statusCode);
    console.log('📄 Response:', greetResponse.body);
    
    // Test echo endpoint
    console.log('\n3. Testing /api/echo endpoint...');
    const echoResponse = await testPostRequest('/api/echo', {
      message: 'Hello from test client!',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Status:', echoResponse.statusCode);
    console.log('📄 Response:', echoResponse.body);
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Run tests after a small delay (let server start first)
setTimeout(runTests, 1000);
```

---

## 🛡️ Robust Error Handling: Keeping Your Server Alive

### The "Hospital Emergency Room" Analogy

Think of error handling like a hospital emergency system:

- **🏥 Expected Issues** (Operational Errors) - Broken bones, flu, cuts
  - Have standard procedures to handle them
  - Patient recovers and goes home

- **🚨 Critical Emergencies** (Programmer Errors) - Heart attacks, major trauma
  - Need immediate attention
  - May require dramatic intervention
  - Sometimes cannot be recovered from

### 🎯 Types of Errors in Node.js

**1. 🔧 Operational Errors (Expected):**
- Invalid user input
- Network timeouts
- File not found
- Database connection issues
- Rate limiting exceeded

**2. 💥 Programmer Errors (Unexpected):**
- Typos in code
- Missing null checks
- Incorrect assumptions
- Logic errors
- Memory leaks

### 🛡️ Comprehensive Error Handling Strategy

```javascript
// robust-server.js
import http from 'node:http';
import fs from 'node:fs/promises';

// 📊 Custom logger with different levels
class Logger {
  constructor() {
    this.logFile = 'server.log';
  }
  
  async log(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta
    };
    
    // Console output with colors
    const colors = {
      INFO: '\x1b[32m',  // Green
      WARN: '\x1b[33m',  // Yellow
      ERROR: '\x1b[31m', // Red
      RESET: '\x1b[0m'   // Reset
    };
    
    console.log(`${colors[level]}[${level}]${colors.RESET} ${timestamp} - ${message}`);
    if (Object.keys(meta).length > 0) {
      console.log('  Meta:', JSON.stringify(meta, null, 2));
    }
    
    // Write to log file
    try {
      await fs.appendFile(this.logFile, JSON.stringify(logEntry) + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }
  
  info(message, meta) { return this.log('INFO', message, meta); }
  warn(message, meta) { return this.log('WARN', message, meta); }
  error(message, meta) { return this.log('ERROR', message, meta); }
}

const logger = new Logger();

// 🔧 Operational error handlers
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// 🎯 Specific operational errors
class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400);
    this.field = field;
    this.name = 'ValidationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

class RateLimitError extends AppError {
  constructor() {
    super('Too many requests, please try again later', 429);
    this.name = 'RateLimitError';
  }
}

// 📊 Request rate limiter
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
    
    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }
  
  isAllowed(ip) {
    const now = Date.now();
    const userRequests = this.requests.get(ip) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(ip, validRequests);
    
    return true;
  }
  
  cleanup() {
    const now = Date.now();
    for (const [ip, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < this.windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, validRequests);
      }
    }
  }
}

const rateLimiter = new RateLimiter(50, 60000); // 50 requests per minute

// 🌐 HTTP server with comprehensive error handling
const server = http.createServer(async (req, res) => {
  const startTime = Date.now();
  let requestId = Math.random().toString(36).substr(2, 9);
  
  // Add request ID to response headers for tracing
  res.setHeader('X-Request-ID', requestId);
  
  try {
    // 🛡️ Rate limiting check
    const clientIP = req.connection.remoteAddress || 'unknown';
    if (!rateLimiter.isAllowed(clientIP)) {
      throw new RateLimitError();
    }
    
    // 📊 Log incoming request
    await logger.info('Incoming request', {
      requestId,
      method: req.method,
      url: req.url,
      ip: clientIP,
      userAgent: req.headers['user-agent']
    });
    
    // 🗺️ Route handling with validation
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    
    if (path === '/api/user' && req.method === 'POST') {
      // 📝 User creation with validation
      const userData = await parseRequestBody(req);
      
      // Validate required fields
      if (!userData.name || userData.name.trim().length < 2) {
        throw new ValidationError('Name must be at least 2 characters long', 'name');
      }
      
      if (!userData.email || !isValidEmail(userData.email)) {
        throw new ValidationError('Valid email is required', 'email');
      }
      
      // Simulate processing
      const user = {
        id: Date.now(),
        name: userData.name.trim(),
        email: userData.email.toLowerCase(),
        createdAt: new Date().toISOString()
      };
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user }));
      
    } else if (path === '/api/file' && req.method === 'GET') {
      // 📁 File reading with error handling
      const filename = url.searchParams.get('name');
      
      if (!filename) {
        throw new ValidationError('Filename parameter is required', 'name');
      }
      
      // Prevent directory traversal attacks
      if (filename.includes('..') || filename.includes('/')) {
        throw new ValidationError('Invalid filename', 'name');
      }
      
      try {
        const content = await fs.readFile(filename, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(content);
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new NotFoundError(`File '${filename}'`);
        }
        throw error; // Re-throw unexpected errors
      }
      
    } else if (path === '/api/error' && req.method === 'GET') {
      // 💥 Intentional error for testing
      const errorType = url.searchParams.get('type');
      
      switch (errorType) {
        case 'validation':
          throw new ValidationError('Test validation error', 'test');
        case 'notfound':
          throw new NotFoundError('Test resource');
        case 'ratelimit':
          throw new RateLimitError();
        case 'programmer':
          // This will be caught as a programmer error
          const obj = null;
          obj.someProperty; // TypeError
          break;
        default:
          throw new AppError('Test operational error', 500);
      }
      
    } else {
      throw new NotFoundError(`Path '${path}'`);
    }
    
    // 📊 Log successful request
    const duration = Date.now() - startTime;
    await logger.info('Request completed', {
      requestId,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
    
  } catch (error) {
    await handleError(error, req, res, requestId, startTime);
  }
});

// 🚨 Centralized error handler
async function handleError(error, req, res, requestId, startTime) {
  const duration = Date.now() - startTime;
  
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details = {};
  
  if (error instanceof AppError && error.isOperational) {
    // 🔧 Operational errors - safe to expose to client
    statusCode = error.statusCode;
    message = error.message;
    
    if (error instanceof ValidationError) {
      details.field = error.field;
    }
    
    await logger.warn('Operational error', {
      requestId,
      error: error.message,
      statusCode,
      duration: `${duration}ms`,
      url: req.url,
      method: req.method
    });
    
  } else {
    // 💥 Programmer errors - log detailed info but don't expose to client
    await logger.error('Programmer error', {
      requestId,
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`,
      url: req.url,
      method: req.method
    });
  }
  
  // Send error response
  if (!res.headersSent) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: true,
      message,
      requestId,
      timestamp: new Date().toISOString(),
      ...details
    }));
  }
}

// 🔧 Helper functions
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
      // Prevent large payloads
      if (body.length > 1024 * 1024) { // 1MB limit
        reject(new AppError('Payload too large', 413));
      }
    });
    
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new ValidationError('Invalid JSON in request body'));
      }
    });
    
    req.on('error', reject);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 🚨 Process-level error handlers (last resort)
process.on('uncaughtException', async (error, origin) => {
  await logger.error('Uncaught Exception - Server will shut down', {
    error: error.message,
    stack: error.stack,
    origin
  });
  
  // Give some time for logging before exit
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', async (reason, promise) => {
  await logger.error('Unhandled Promise Rejection - Server will shut down', {
    reason: reason?.toString() || 'Unknown reason',
    promise: promise.toString()
  });
  
  // Give some time for logging before exit
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// 🛑 Graceful shutdown
process.on('SIGTERM', async () => {
  await logger.info('SIGTERM received - shutting down gracefully');
  
  server.close(async () => {
    await logger.info('Server closed - goodbye!');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  await logger.info('SIGINT received - shutting down gracefully');
  
  server.close(async () => {
    await logger.info('Server closed - goodbye!');
    process.exit(0);
  });
});

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await logger.info(`Robust server started on port ${PORT}`);
  console.log('\n🧪 Test error handling:');
  console.log('  GET  /api/error?type=validation');
  console.log('  GET  /api/error?type=notfound');
  console.log('  GET  /api/error?type=programmer');
  console.log('  POST /api/user (with JSON: {"name":"Alice","email":"alice@example.com"})');
});
```

### 🧪 Testing Error Handling

```bash
# Test different error types
curl "http://localhost:3000/api/error?type=validation"
curl "http://localhost:3000/api/error?type=notfound"
curl "http://localhost:3000/api/file?name=nonexistent.txt"

# Test rate limiting (run this multiple times quickly)
for i in {1..60}; do curl "http://localhost:3000/health"; done

# Test user creation
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Test validation errors
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"invalid-email"}'
```

### 🎯 Error Handling Best Practices

**✅ Do:**
- Use specific error types for different scenarios
- Log errors with context (request ID, user info, etc.)
- Validate input early and thoroughly
- Implement rate limiting and request size limits
- Handle file system and network errors gracefully
- Provide helpful error messages to users
- Monitor and alert on error patterns

**❌ Don't:**
- Expose sensitive information in error messages
- Ignore errors or fail silently
- Let the process crash on operational errors
- Trust user input without validation
- Log sensitive data (passwords, tokens)
- Return the same generic error for everything

---

## 🏡 What You've Learned: Node.js Power-Up Complete!

**🎉 Congratulations!** You've successfully upgraded your JavaScript superpowers to work outside the browser!

### 💪 Skills You've Mastered

1. **🏗️ Node.js Architecture**
   - Understanding the event loop and non-blocking I/O
   - Recognizing when Node.js is the right choice
   - Leveraging the single-threaded efficiency model

2. **🖥️ System Interaction**
   - Command line argument processing
   - Environment variable management
   - Process control and graceful shutdown

3. **📁 File System Mastery**
   - Reading and writing files asynchronously
   - Cross-platform path handling
   - Directory operations and file metadata

4. **🔢 Binary Data Handling**
   - Buffer creation and manipulation
   - Different encoding formats
   - Real-world binary data applications

5. **⚡ Event-Driven Programming**
   - Custom EventEmitter classes
   - Stream processing for large data
   - Transform streams and data pipelines

6. **🌐 HTTP Server Development**
   - Building servers from scratch
   - Request routing and response handling
   - Advanced features like cookies and middleware

7. **🛡️ Production-Ready Error Handling**
   - Operational vs programmer errors
   - Rate limiting and security measures
   - Comprehensive logging and monitoring

### 🚀 What's Next?

You now have the foundation to build:
- **Web APIs and microservices**
- **Command-line tools and utilities**
- **Real-time applications**
- **Data processing pipelines**
- **Build tools and automation scripts**

**In Lesson 17**, we'll build on these foundations to create professional REST APIs using Express.js!

---

## 🎥 Watch These Videos

### 📚 Essential Node.js Resources:
- **[Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)** - Traversy Media (1 hour comprehensive overview)
- **[Node.js Tutorial for Beginners](https://www.youtube.com/watch?v=TlB_eWDSMt4)** - Programming with Mosh (1 hour)
- **[The Node.js Event Loop](https://www.youtube.com/watch?v=PNa9OMajw9w)** - Understanding the magic behind Node.js (20 min)
- **[Node.js Streams Explained](https://www.youtube.com/watch?v=GlybFFMXXmQ)** - Learn streams practically (25 min)

### 📹 Hands-On Tutorials:
- **[Build a Node.js HTTP Server](https://www.youtube.com/watch?v=VShtPwEkDD0)** - Step-by-step server creation
- **[File System Operations in Node.js](https://www.youtube.com/watch?v=U57kU311-nE)** - Working with files and directories
- **[Error Handling Best Practices](https://www.youtube.com/watch?v=DyqVqaf1KnA)** - Building robust applications

---

## 📚 References

### 📄 Official Documentation:
- **[Node.js Official Docs](https://nodejs.org/docs)** - The definitive resource
- **[Node.js API Documentation](https://nodejs.org/api/)** - Complete API reference
- **[Node.js Guides](https://nodejs.org/en/docs/guides/)** - In-depth guides and tutorials

### 📚 Recommended Books:
- **"Node.js Design Patterns"** by Mario Casciaro & Luciano Mammino
- **"Node.js in Action"** by Alex Young, Bradley Meck, and Mike Cantelon
- **"Learning Node.js"** by Marc Wandschneider

### 🌐 Online Resources:
- **[Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)** - Comprehensive guide
- **[Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)** - Curated list of packages
- **[NodeSchool](https://nodeschool.io/)** - Interactive Node.js tutorials

---

## 🤔 Reflection Questions

**Take a moment to think about these questions - they'll deepen your understanding:**

1. **🔄 Architecture Understanding**
   - How is Node.js's single-threaded event loop different from traditional multi-threaded servers?
   - When would you choose Node.js over other backend technologies?

2. **📊 Practical Applications**
   - What's the difference between `process.argv` and `process.env`, and when would you use each?
   - Why is it better to stream a large file instead of reading it entirely into memory with `readFile`?

3. **⚡ Performance Concepts**
   - How does `libuv` help Node.js handle many connections simultaneously despite being single-threaded?
   - What are the advantages of using streams for data processing?

4. **🛡️ Error Handling**
   - What's the difference between operational errors and programmer errors?
   - Why should you never ignore errors in a Node.js application?

5. **🌐 Server Development**
   - What are the key components every HTTP server should have?
   - How would you make your server production-ready?

6. **📁 File System**
   - Why should you use `path.join()` instead of string concatenation for file paths?
   - What security considerations should you keep in mind when handling file operations?

### 📝 Your Learning Journal

**Write down your thoughts:**
- Which Node.js concept was most surprising to you?
- What kind of application would you like to build with Node.js?
- How does understanding Node.js change your perspective on JavaScript?

---

## 🎨 Exercises

**All practice drills and projects for this lesson can be found in the `exercises.js` file in this directory.**

**Quick Preview of What You'll Build:**
- 🧮 **CLI Calculator** - Command-line tool with argument processing
- 📁 **File Manager** - Directory operations and file manipulation
- 🌊 **Data Processor** - Stream-based CSV to JSON converter
- 🌐 **Health Check Server** - Production-ready HTTP server with monitoring

**Ready to code?** Open `exercises.js` and start building!

---

**🚀 Next up: Lesson 17 - REST APIs with Express.js**

*You've mastered the fundamentals - now let's build professional web APIs!*

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Introduction to Node.js (Rich Trott)](https://www.youtube.com/watch?v=TlB_eWDSMt4)
- [Node.js Event Loop Explained](https://www.youtube.com/watch?v=PNa9OMajw9w)

## References
- Node.js Docs: [About Node.js](https://nodejs.org/en/about)
- Node.js Docs: [HTTP Module](https://nodejs.org/api/http.html)
- Node.js Docs: [Stream API](https://nodejs.org/api/stream.html)
- "Node.js Design Patterns" by Mario Casciaro & Luciano Mammino

## Reflection
- What is the difference between `process.argv` and `process.env`?
- Why is it better to `.pipe()` a file stream instead of reading the whole file into memory with `readFile`?
- How does `libuv` help Node.js handle many connections at once despite being single-threaded?

Lesson 17 layers on Express to build RESTful APIs efficiently.
