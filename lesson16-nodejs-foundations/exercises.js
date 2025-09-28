// Lesson 16: Node.js Foundations - Exercises 🚀🖥️
// "Building Real-World Node.js Applications"

/*
=================================================================================
🎯 EXERCISE 1: COMMAND LINE CALCULATOR
=================================================================================

Build a professional command-line calculator that processes arguments and handles
multiple operations. This will teach you process.argv and error handling.

🚀 YOUR MISSION:
Create a CLI tool that can perform various mathematical operations with proper
error handling and user-friendly output.
*/

// 🧮 calc.js - Command Line Calculator
console.log('🧮 Building CLI Calculator...');

// Get command line arguments (skip first 2 which are node and script path)
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
🧮 Node.js Calculator

🎯 Usage:
  node calc.js <operation> <num1> <num2>
  node calc.js <operation> <num1> <num2> <num3> ... (for multiple numbers)

⚡ Available operations:
  add        - Addition
  subtract   - Subtraction  
  multiply   - Multiplication
  divide     - Division
  power      - Exponentiation
  sqrt       - Square root (single number)
  average    - Average of all numbers
  max        - Maximum value
  min        - Minimum value

💡 Examples:
  node calc.js add 5 3
  node calc.js multiply 4 7 2
  node calc.js sqrt 16
  node calc.js average 10 20 30 40`);
  process.exit(0);
}

const [operation, ...numberStrings] = args;

// ✅ Validate and convert numbers
function validateNumbers(strings) {
  if (strings.length === 0) {
    throw new Error('No numbers provided');
  }
  
  const numbers = [];
  for (let i = 0; i < strings.length; i++) {
    const num = parseFloat(strings[i]);
    if (isNaN(num)) {
      throw new Error(`"${strings[i]}" is not a valid number`);
    }
    numbers.push(num);
  }
  
  return numbers;
}

// 🧮 Calculator operations
const operations = {
  add: (numbers) => {
    const result = numbers.reduce((sum, num) => sum + num, 0);
    console.log(`➕ ${numbers.join(' + ')} = ${result}`);
    return result;
  },
  
  subtract: (numbers) => {
    if (numbers.length < 2) throw new Error('Subtraction requires at least 2 numbers');
    const result = numbers.reduce((diff, num) => diff - num);
    console.log(`➖ ${numbers.join(' - ')} = ${result}`);
    return result;
  },
  
  multiply: (numbers) => {
    const result = numbers.reduce((product, num) => product * num, 1);
    console.log(`✖️ ${numbers.join(' × ')} = ${result}`);
    return result;
  },
  
  divide: (numbers) => {
    if (numbers.length < 2) throw new Error('Division requires at least 2 numbers');
    if (numbers.slice(1).some(num => num === 0)) {
      throw new Error('Division by zero is not allowed');
    }
    const result = numbers.reduce((quotient, num) => quotient / num);
    console.log(`➗ ${numbers.join(' ÷ ')} = ${result}`);
    return result;
  },
  
  power: (numbers) => {
    if (numbers.length !== 2) throw new Error('Power operation requires exactly 2 numbers (base, exponent)');
    const [base, exponent] = numbers;
    const result = Math.pow(base, exponent);
    console.log(`💪 ${base}^${exponent} = ${result}`);
    return result;
  },
  
  sqrt: (numbers) => {
    if (numbers.length !== 1) throw new Error('Square root requires exactly 1 number');
    const [num] = numbers;
    if (num < 0) throw new Error('Cannot calculate square root of negative number');
    const result = Math.sqrt(num);
    console.log(`√ ${num} = ${result}`);
    return result;
  },
  
  average: (numbers) => {
    const sum = numbers.reduce((total, num) => total + num, 0);
    const result = sum / numbers.length;
    console.log(`📊 Average of [${numbers.join(', ')}] = ${result}`);
    return result;
  },
  
  max: (numbers) => {
    const result = Math.max(...numbers);
    console.log(`📈 Maximum of [${numbers.join(', ')}] = ${result}`);
    return result;
  },
  
  min: (numbers) => {
    const result = Math.min(...numbers);
    console.log(`📉 Minimum of [${numbers.join(', ')}] = ${result}`);
    return result;
  }
};

// 🏃‍♂️ Execute the calculation
try {
  if (!operations[operation]) {
    throw new Error(`Unknown operation: ${operation}. Use one of: ${Object.keys(operations).join(', ')}`);
  }
  
  const numbers = validateNumbers(numberStrings);
  const result = operations[operation](numbers);
  
  console.log(`✅ Calculation completed successfully!`);
  process.exit(0);
  
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  console.log('\n💡 Try "node calc.js" for usage instructions');
  process.exit(1);
}


/*
=================================================================================
🎯 EXERCISE 2: FILE SYSTEM MANAGER
=================================================================================

Build a comprehensive file management tool that demonstrates file system operations,
path handling, and error management.

🚀 YOUR MISSION:
Create a file manager that can list directories, read files, create files,
and analyze file system information.
*/

console.log('\n\n📁 BUILDING FILE SYSTEM MANAGER...');

import { readFile, writeFile, readdir, stat, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🛠️ File Manager Class
class FileManager {
  constructor() {
    this.currentPath = process.cwd();
  }
  
  // 📋 List directory contents with detailed info
  async listDirectory(dirPath = this.currentPath) {
    try {
      console.log(`\n📁 Contents of ${dirPath}:`);
      const items = await readdir(dirPath);
      
      if (items.length === 0) {
        console.log('  🧺 Directory is empty');
        return;
      }
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        try {
          const stats = await stat(fullPath);
          const size = stats.isDirectory() ? '' : ` (${this.formatBytes(stats.size)})`;
          const icon = stats.isDirectory() ? '📁' : this.getFileIcon(item);
          const modified = stats.mtime.toLocaleDateString();
          
          console.log(`  ${icon} ${item}${size} - Modified: ${modified}`);
        } catch (error) {
          console.log(`  ⚠️ ${item} - Error reading stats`);
        }
      }
    } catch (error) {
      console.error(`❌ Error listing directory: ${error.message}`);
    }
  }
  
  // 📄 Read and display file content
  async readFileContent(filePath) {
    try {
      const fullPath = path.resolve(filePath);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        console.log(`❌ ${filePath} is a directory, not a file`);
        return;
      }
      
      const content = await readFile(fullPath, 'utf8');
      const lines = content.split('\n').length;
      
      console.log(`\n📄 File: ${filePath}`);
      console.log(`📏 Size: ${this.formatBytes(stats.size)}`);
      console.log(`📃 Lines: ${lines}`);
      console.log('🔥 Content:');
      console.log('─'.repeat(50));
      console.log(content);
      console.log('─'.repeat(50));
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`❌ File not found: ${filePath}`);
      } else if (error.code === 'EACCES') {
        console.error(`❌ Permission denied: ${filePath}`);
      } else {
        console.error(`❌ Error reading file: ${error.message}`);
      }
    }
  }
  
  // ✍️ Create a new file with content
  async createFile(filePath, content = '') {
    try {
      const fullPath = path.resolve(filePath);
      const dir = path.dirname(fullPath);
      
      // Create directory if it doesn't exist
      await mkdir(dir, { recursive: true });
      
      await writeFile(fullPath, content);
      console.log(`✅ File created: ${filePath}`);
      
      // Show file info
      const stats = await stat(fullPath);
      console.log(`📏 Size: ${this.formatBytes(stats.size)}`);
      
    } catch (error) {
      console.error(`❌ Error creating file: ${error.message}`);
    }
  }
  
  // 🔍 Search for files by extension
  async findFilesByExtension(dirPath, extension) {
    try {
      const items = await readdir(dirPath);
      const matchingFiles = [];
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = await stat(fullPath);
        
        if (stats.isFile() && path.extname(item).toLowerCase() === extension.toLowerCase()) {
          matchingFiles.push({
            name: item,
            path: fullPath,
            size: stats.size,
            modified: stats.mtime
          });
        }
      }
      
      console.log(`\n🔍 Found ${matchingFiles.length} ${extension} files in ${dirPath}:`);
      matchingFiles.forEach(file => {
        console.log(`  📄 ${file.name} (${this.formatBytes(file.size)})`);
      });
      
      return matchingFiles;
    } catch (error) {
      console.error(`❌ Error searching files: ${error.message}`);
      return [];
    }
  }
  
  // 📊 Analyze directory statistics
  async analyzeDirectory(dirPath = this.currentPath) {
    try {
      const items = await readdir(dirPath);
      const stats = {
        totalFiles: 0,
        totalDirs: 0,
        totalSize: 0,
        extensions: new Map(),
        largest: { name: '', size: 0 },
        newest: { name: '', date: new Date(0) }
      };
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        try {
          const fileStat = await stat(fullPath);
          
          if (fileStat.isDirectory()) {
            stats.totalDirs++;
          } else {
            stats.totalFiles++;
            stats.totalSize += fileStat.size;
            
            // Track file extensions
            const ext = path.extname(item).toLowerCase();
            if (ext) {
              stats.extensions.set(ext, (stats.extensions.get(ext) || 0) + 1);
            }
            
            // Track largest file
            if (fileStat.size > stats.largest.size) {
              stats.largest = { name: item, size: fileStat.size };
            }
            
            // Track newest file
            if (fileStat.mtime > stats.newest.date) {
              stats.newest = { name: item, date: fileStat.mtime };
            }
          }
        } catch (itemError) {
          console.warn(`⚠️ Skipping ${item}: ${itemError.message}`);
        }
      }
      
      console.log(`\n📊 Directory Analysis: ${dirPath}`);
      console.log(`📁 Directories: ${stats.totalDirs}`);
      console.log(`📄 Files: ${stats.totalFiles}`);
      console.log(`📏 Total Size: ${this.formatBytes(stats.totalSize)}`);
      
      if (stats.extensions.size > 0) {
        console.log('\n🏷️ File Types:');
        for (const [ext, count] of stats.extensions.entries()) {
          console.log(`  ${ext}: ${count} files`);
        }
      }
      
      if (stats.largest.name) {
        console.log(`\n📈 Largest File: ${stats.largest.name} (${this.formatBytes(stats.largest.size)})`);
      }
      
      if (stats.newest.name) {
        console.log(`🕰️ Newest File: ${stats.newest.name} (${stats.newest.date.toLocaleString()})`);
      }
      
    } catch (error) {
      console.error(`❌ Error analyzing directory: ${error.message}`);
    }
  }
  
  // 🛠️ Helper methods
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  }
  
  getFileIcon(filename) {
    const ext = path.extname(filename).toLowerCase();
    const icons = {
      '.js': '📜', '.ts': '📜', '.jsx': '⚛️', '.tsx': '⚛️',
      '.html': '🌐', '.css': '🎨', '.scss': '🎨',
      '.json': '📄', '.xml': '📄', '.yaml': '📄', '.yml': '📄',
      '.md': '📝', '.txt': '📄',
      '.png': '🖼️', '.jpg': '🖼️', '.jpeg': '🖼️', '.gif': '🖼️', '.svg': '🖼️',
      '.pdf': '📄', '.doc': '📄', '.docx': '📄',
      '.zip': '🗜️', '.tar': '🗜️', '.gz': '🗜️'
    };
    return icons[ext] || '📄';
  }
}

// 🧪 Test the File Manager
async function demonstrateFileManager() {
  const fm = new FileManager();
  
  console.log('🏠 File Manager Demo:');
  
  // List current directory
  await fm.listDirectory();
  
  // Create a test file
  const testContent = `# Test File\n\nThis is a test file created by the File Manager.\nTimestamp: ${new Date().toISOString()}\n\nFeatures demonstrated:\n- File creation\n- Content writing\n- Directory analysis`;
  await fm.createFile('test-output.md', testContent);
  
  // Read the file we just created
  await fm.readFileContent('test-output.md');
  
  // Find JavaScript files
  await fm.findFilesByExtension('.', '.js');
  
  // Analyze current directory
  await fm.analyzeDirectory();
}

// Run the demonstration
demonstrate FileManager().catch(console.error);


/*
=================================================================================
🎯 EXERCISE 3: DATA STREAM PROCESSOR
=================================================================================

Build a stream-based data processor that can handle large CSV files and transform
them efficiently without loading everything into memory.

🚀 YOUR MISSION:
Create a streaming CSV to JSON converter with data validation and transformation.
*/

console.log('\n\n🌊 BUILDING DATA STREAM PROCESSOR...');

import { createReadStream, createWriteStream } from 'node:fs';
import { Transform, pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipelineAsync = promisify(pipeline);

// 🔄 CSV to JSON Transform Stream
class CSVToJSONTransform extends Transform {
  constructor(options = {}) {
    super({ objectMode: true });
    this.headers = null;
    this.lineNumber = 0;
    this.validRecords = 0;
    this.invalidRecords = 0;
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
      
      if (line.trim() === '') continue; // Skip empty lines
      
      try {
        if (!this.headers) {
          // First line is headers
          this.headers = this.parseCSVLine(line);
          console.log(`📃 Headers found: ${this.headers.join(', ')}`);
          continue;
        }
        
        const values = this.parseCSVLine(line);
        
        if (values.length !== this.headers.length) {
          console.warn(`⚠️ Line ${this.lineNumber}: Column count mismatch (expected ${this.headers.length}, got ${values.length})`);
          this.invalidRecords++;
          continue;
        }
        
        // Create JSON object
        const record = {};
        for (let i = 0; i < this.headers.length; i++) {
          record[this.headers[i]] = this.transformValue(values[i]);
        }
        
        // Validate record
        if (this.validateRecord(record)) {
          this.push(JSON.stringify(record) + '\n');
          this.validRecords++;
        } else {
          this.invalidRecords++;
        }
        
      } catch (error) {
        console.warn(`⚠️ Line ${this.lineNumber}: Parse error - ${error.message}`);
        this.invalidRecords++;
      }
    }
    
    callback();
  }
  
  _flush(callback) {
    // Process any remaining data in buffer
    if (this.buffer.trim() && this.headers) {
      try {
        const values = this.parseCSVLine(this.buffer.trim());
        if (values.length === this.headers.length) {
          const record = {};
          for (let i = 0; i < this.headers.length; i++) {
            record[this.headers[i]] = this.transformValue(values[i]);
          }
          
          if (this.validateRecord(record)) {
            this.push(JSON.stringify(record) + '\n');
            this.validRecords++;
          } else {
            this.invalidRecords++;
          }
        }
      } catch (error) {
        console.warn(`⚠️ Final line: Parse error - ${error.message}`);
        this.invalidRecords++;
      }
    }
    
    console.log(`\n✅ Processing completed:`);
    console.log(`📏 Total lines processed: ${this.lineNumber}`);
    console.log(`✅ Valid records: ${this.validRecords}`);
    console.log(`❌ Invalid records: ${this.invalidRecords}`);
    
    callback();
  }
  
  // Parse CSV line handling quoted fields
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    result.push(current.trim());
    return result;
  }
  
  // Transform values to appropriate types
  transformValue(value) {
    if (value === '' || value === 'null' || value === 'NULL') {
      return null;
    }
    
    // Try to parse as number
    const num = parseFloat(value);
    if (!isNaN(num) && isFinite(num) && value.toString() === num.toString()) {
      return num;
    }
    
    // Try to parse as boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    
    // Return as string
    return value;
  }
  
  // Basic record validation
  validateRecord(record) {
    // Check for required fields (example: name and email)
    if (record.name && typeof record.name === 'string' && record.name.trim() !== '') {
      return true;
    }
    
    if (record.email && typeof record.email === 'string' && record.email.includes('@')) {
      return true;
    }
    
    // If no name or email validation, just check if record has any data
    return Object.values(record).some(value => value !== null && value !== undefined && value !== '');
  }
}

// 📊 Data Statistics Transform Stream
class DataStatsTransform extends Transform {
  constructor() {
    super({ objectMode: true });
    this.recordCount = 0;
    this.fieldStats = new Map();
  }
  
  _transform(chunk, encoding, callback) {
    try {
      const record = JSON.parse(chunk.toString());
      this.recordCount++;
      
      // Collect field statistics
      Object.entries(record).forEach(([field, value]) => {
        if (!this.fieldStats.has(field)) {
          this.fieldStats.set(field, {
            count: 0,
            nullCount: 0,
            types: new Map()
          });
        }
        
        const stats = this.fieldStats.get(field);
        stats.count++;
        
        if (value === null || value === undefined) {
          stats.nullCount++;
        } else {
          const type = typeof value;
          stats.types.set(type, (stats.types.get(type) || 0) + 1);
        }
      });
      
      // Pass data through
      this.push(chunk);
      
      // Log progress every 100 records
      if (this.recordCount % 100 === 0) {
        console.log(`📊 Processed ${this.recordCount} records...`);
      }
      
    } catch (error) {
      console.warn(`⚠️ Stats processing error: ${error.message}`);
      this.push(chunk); // Pass through even if stats fail
    }
    
    callback();
  }
  
  _flush(callback) {
    console.log(`\n📊 Data Statistics:`);
    console.log(`📏 Total records: ${this.recordCount}`);
    
    if (this.fieldStats.size > 0) {
      console.log('\n📃 Field Analysis:');
      for (const [field, stats] of this.fieldStats.entries()) {
        console.log(`  ${field}:`);
        console.log(`    ✅ Present: ${stats.count - stats.nullCount}/${this.recordCount}`);
        if (stats.nullCount > 0) {
          console.log(`    ❌ Null/Empty: ${stats.nullCount}`);
        }
        if (stats.types.size > 0) {
          console.log(`    🏷️ Types: ${Array.from(stats.types.entries()).map(([type, count]) => `${type}(${count})`).join(', ')}`);
        }
      }
    }
    
    callback();
  }
}

// 🔧 Create sample CSV data for testing
async function createSampleCSV() {
  const sampleData = `name,age,email,city,salary,active
Alice Johnson,28,alice@example.com,San Francisco,85000,true
Bob Smith,32,bob@example.com,New York,92000,true
"Carol Davis, Jr",25,carol@example.com,Los Angeles,76000,false
David Wilson,29,,Chicago,88000,true
Eve Brown,31,eve@example.com,Boston,,true
"Frank Miller",35,frank@test.com,"Seattle, WA",105000,true
Grace Lee,27,grace@example.com,Austin,79000,false
Henry Clark,33,henry@example.com,Denver,null,true
Ivy Zhang,26,,Portland,82000,true
Jack Taylor,30,jack@example.com,Phoenix,90000,true`;
  
  await writeFile('sample-data.csv', sampleData);
  console.log('📝 Sample CSV file created: sample-data.csv');
}

// 🏃‍♂️ Process CSV file
async function processCSVFile() {
  try {
    // Create sample data
    await createSampleCSV();
    
    console.log('\n🌊 Starting stream processing pipeline...');
    
    await pipelineAsync(
      createReadStream('sample-data.csv'),
      new CSVToJSONTransform(),
      new DataStatsTransform(),
      createWriteStream('output-data.json')
    );
    
    console.log('\n✅ Stream processing completed!');
    console.log('📁 Output saved to: output-data.json');
    
    // Show first few lines of output
    const output = await readFile('output-data.json', 'utf8');
    const lines = output.trim().split('\n');
    console.log('\n👀 First 3 records in output:');
    lines.slice(0, 3).forEach((line, index) => {
      const record = JSON.parse(line);
      console.log(`${index + 1}. ${JSON.stringify(record, null, 2)}`);
    });
    
  } catch (error) {
    console.error(`❌ Processing error: ${error.message}`);
  }
}

// Run the CSV processor
processCSVFile().catch(console.error);


/*
=================================================================================
🎯 MAIN PROJECT: PRODUCTION-READY HEALTH CHECK SERVER
=================================================================================

Build a comprehensive HTTP server with monitoring, logging, configuration,
and all the production-ready features you'd expect in a real application.

🚀 YOUR MISSION:
Create a server that can handle real-world traffic with proper error handling,
logging, configuration, and monitoring endpoints.
*/

console.log('\n\n🌐 BUILDING PRODUCTION-READY SERVER...');

import http from 'node:http';
import { Transform as TransformStream } from 'node:stream';
import { readFile as readFileAsync } from 'node:fs/promises';

// 🔧 Configuration Manager
class ConfigManager {
  constructor() {
    this.config = {
      port: process.env.PORT || 3000,
      host: process.env.HOST || '0.0.0.0',
      appName: process.env.APP_NAME || 'Health Check Server',
      appVersion: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      logLevel: process.env.LOG_LEVEL || 'info',
      requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000,
      enableCors: process.env.ENABLE_CORS !== 'false',
      enableRateLimit: process.env.ENABLE_RATE_LIMIT !== 'false',
      rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000, // 1 minute
        max: parseInt(process.env.RATE_LIMIT_MAX) || 100 // 100 requests per window
      }
    };
  }
  
  get(key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], this.config);
  }
  
  isDevelopment() {
    return this.config.environment === 'development';
  }
  
  isProduction() {
    return this.config.environment === 'production';
  }
}

// 📊 Advanced Logger
class Logger {
  constructor(config) {
    this.config = config;
    this.logFile = 'server.log';
  }
  
  async log(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      environment: this.config.get('environment'),
      ...meta
    };
    
    // Console output with colors
    const colors = {
      DEBUG: '\x1b[36m',   // Cyan
      INFO: '\x1b[32m',    // Green
      WARN: '\x1b[33m',    // Yellow
      ERROR: '\x1b[31m',   // Red
      RESET: '\x1b[0m'     // Reset
    };
    
    // Only log if level is appropriate
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    const configLevel = this.config.get('logLevel').toLowerCase();
    const currentLevel = level.toLowerCase();
    
    if (levels[currentLevel] >= levels[configLevel]) {
      console.log(`${colors[level.toUpperCase()]}[${level.toUpperCase()}]${colors.RESET} ${timestamp} - ${message}`);
      if (Object.keys(meta).length > 0 && this.config.isDevelopment()) {
        console.log('  Meta:', JSON.stringify(meta, null, 2));
      }
    }
    
    // In production, also write to file
    if (this.config.isProduction()) {
      try {
        await writeFile(this.logFile, JSON.stringify(logEntry) + '\n', { flag: 'a' });
      } catch (error) {
        console.error('Failed to write to log file:', error.message);
      }
    }
  }
  
  debug(message, meta) { return this.log('DEBUG', message, meta); }
  info(message, meta) { return this.log('INFO', message, meta); }
  warn(message, meta) { return this.log('WARN', message, meta); }
  error(message, meta) { return this.log('ERROR', message, meta); }
}

// 🛡️ Rate Limiter
class RateLimiter {
  constructor(config) {
    this.config = config.get('rateLimit');
    this.requests = new Map();
    this.enabled = config.get('enableRateLimit');
    
    // Cleanup old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }
  
  isAllowed(ip) {
    if (!this.enabled) return true;
    
    const now = Date.now();
    const userRequests = this.requests.get(ip) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < this.config.windowMs);
    
    if (validRequests.length >= this.config.max) {
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
      const validRequests = requests.filter(time => now - time < this.config.windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, validRequests);
      }
    }
  }
  
  getStats() {
    return {
      totalIPs: this.requests.size,
      enabled: this.enabled,
      config: this.config
    };
  }
}

// 📊 Application Metrics
class MetricsCollector {
  constructor() {
    this.startTime = Date.now();
    this.requests = {
      total: 0,
      byMethod: new Map(),
      byStatus: new Map(),
      byPath: new Map()
    };
    this.responseTimeHistogram = [];
    this.errors = [];
  }
  
  recordRequest(method, path, statusCode, responseTime) {
    this.requests.total++;
    
    // Track by method
    this.requests.byMethod.set(method, (this.requests.byMethod.get(method) || 0) + 1);
    
    // Track by status code
    const statusGroup = `${Math.floor(statusCode / 100)}xx`;
    this.requests.byStatus.set(statusGroup, (this.requests.byStatus.get(statusGroup) || 0) + 1);
    
    // Track by path
    this.requests.byPath.set(path, (this.requests.byPath.get(path) || 0) + 1);
    
    // Record response time
    this.responseTimeHistogram.push(responseTime);
    
    // Keep only last 1000 response times
    if (this.responseTimeHistogram.length > 1000) {
      this.responseTimeHistogram.shift();
    }
  }
  
  recordError(error, context = {}) {
    this.errors.push({
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      ...context
    });
    
    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors.shift();
    }
  }
  
  getMetrics() {
    const uptime = Date.now() - this.startTime;
    const responseTimes = this.responseTimeHistogram.sort((a, b) => a - b);
    
    return {
      uptime: {
        ms: uptime,
        human: this.formatDuration(uptime)
      },
      requests: {
        total: this.requests.total,
        byMethod: Object.fromEntries(this.requests.byMethod),
        byStatus: Object.fromEntries(this.requests.byStatus),
        byPath: Object.fromEntries(this.requests.byPath)
      },
      responseTime: responseTimes.length > 0 ? {
        min: Math.min(...responseTimes),
        max: Math.max(...responseTimes),
        avg: Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length),
        p50: responseTimes[Math.floor(responseTimes.length * 0.5)] || 0,
        p95: responseTimes[Math.floor(responseTimes.length * 0.95)] || 0,
        p99: responseTimes[Math.floor(responseTimes.length * 0.99)] || 0
      } : null,
      errors: {
        total: this.errors.length,
        recent: this.errors.slice(-5)
      },
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    };
  }
  
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}

// 🌐 Production Health Check Server
class HealthCheckServer {
  constructor() {
    this.config = new ConfigManager();
    this.logger = new Logger(this.config);
    this.rateLimiter = new RateLimiter(this.config);
    this.metrics = new MetricsCollector();
    this.server = null;
  }
  
  async start() {
    this.server = http.createServer(async (req, res) => {
      const startTime = Date.now();
      const requestId = Math.random().toString(36).substr(2, 9);
      
      // Add request tracking headers
      res.setHeader('X-Request-ID', requestId);
      res.setHeader('X-Powered-By', this.config.get('appName'));
      
      if (this.config.get('enableCors')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      }
      
      try {
        // Rate limiting check
        const clientIP = req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
        if (!this.rateLimiter.isAllowed(clientIP)) {
          res.writeHead(429, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            requestId
          }));
          return;
        }
        
        await this.logger.debug('Incoming request', {
          requestId,
          method: req.method,
          url: req.url,
          ip: clientIP,
          userAgent: req.headers['user-agent']
        });
        
        // Route the request
        await this.handleRequest(req, res, requestId);
        
      } catch (error) {
        await this.handleError(error, req, res, requestId);
      } finally {
        const responseTime = Date.now() - startTime;
        this.metrics.recordRequest(req.method, req.url, res.statusCode, responseTime);
        
        await this.logger.info('Request completed', {
          requestId,
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          responseTime: `${responseTime}ms`
        });
      }
    });
    
    const port = this.config.get('port');
    const host = this.config.get('host');
    
    this.server.listen(port, host, async () => {
      await this.logger.info(`Server started`, {
        host,
        port,
        environment: this.config.get('environment'),
        appName: this.config.get('appName'),
        version: this.config.get('appVersion')
      });
      
      console.log(`
🌐 ${this.config.get('appName')} v${this.config.get('appVersion')}`);
      console.log(`🚀 Server running at http://${host}:${port}`);
      console.log(`🌍 Environment: ${this.config.get('environment')}`);
      console.log('\n🧪 Available endpoints:');
      console.log('  GET  /health           - Health check');
      console.log('  GET  /health/detailed  - Detailed health info');
      console.log('  GET  /version          - Application version');
      console.log('  GET  /metrics          - Application metrics');
      console.log('  GET  /config           - Configuration info');
      console.log('  GET  /time             - Current server time');
      console.log('  GET  /ping             - Simple ping/pong');
      console.log('  POST /echo             - Echo request body');
      console.log('  GET  /*                - 404 for other paths');
      console.log('\n🎆 Press Ctrl+C to gracefully shutdown');
    });
    
    // Setup graceful shutdown
    this.setupGracefulShutdown();
  }
  
  async handleRequest(req, res, requestId) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const method = req.method;
    
    // Handle preflight requests
    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    
    // Route handlers
    const routes = {
      'GET /health': () => this.handleHealth(res),
      'GET /health/detailed': () => this.handleDetailedHealth(res),
      'GET /version': () => this.handleVersion(res),
      'GET /metrics': () => this.handleMetrics(res),
      'GET /config': () => this.handleConfig(res),
      'GET /time': () => this.handleTime(res),
      'GET /ping': () => this.handlePing(res),
      'POST /echo': () => this.handleEcho(req, res)
    };
    
    const handler = routes[`${method} ${path}`];
    
    if (handler) {
      await handler();
    } else {
      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Not Found',
        message: `The path ${path} was not found on this server`,
        method,
        path,
        availableEndpoints: Object.keys(routes),
        requestId
      }));
    }
  }
  
  async handleHealth(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: this.config.get('environment')
    }));
  }
  
  async handleDetailedHealth(res) {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: process.uptime(),
        human: this.metrics.formatDuration(process.uptime() * 1000)
      },
      system: {
        memory: {
          used: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
          total: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
          external: Math.round(memoryUsage.external / 1024 / 1024) + 'MB',
          rss: Math.round(memoryUsage.rss / 1024 / 1024) + 'MB'
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system
        },
        nodeVersion: process.version,
        platform: process.platform,
        pid: process.pid
      },
      environment: this.config.get('environment'),
      rateLimiting: this.rateLimiter.getStats()
    }));
  }
  
  async handleVersion(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: this.config.get('appName'),
      version: this.config.get('appVersion'),
      environment: this.config.get('environment'),
      nodeVersion: process.version,
      buildTime: new Date().toISOString() // In real app, this would be set at build time
    }));
  }
  
  async handleMetrics(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(this.metrics.getMetrics()));
  }
  
  async handleConfig(res) {
    // Only show non-sensitive config in non-production
    const safeConfig = {
      appName: this.config.get('appName'),
      appVersion: this.config.get('appVersion'),
      environment: this.config.get('environment'),
      port: this.config.get('port'),
      enableCors: this.config.get('enableCors'),
      enableRateLimit: this.config.get('enableRateLimit')
    };
    
    if (this.config.isDevelopment()) {
      safeConfig.logLevel = this.config.get('logLevel');
      safeConfig.rateLimit = this.config.get('rateLimit');
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(safeConfig));
  }
  
  async handleTime(res) {
    const now = new Date();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      timestamp: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      utc: now.toUTCString(),
      local: now.toLocaleString(),
      unix: Math.floor(now.getTime() / 1000)
    }));
  }
  
  async handlePing(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'pong',
      timestamp: new Date().toISOString()
    }));
  }
  
  async handleEcho(req, res) {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
      // Prevent large payloads
      if (body.length > 1024 * 1024) { // 1MB limit
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large' }));
        return;
      }
    });
    
    req.on('end', () => {
      try {
        const data = body ? JSON.parse(body) : {};
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: 'Echo response',
          receivedData: data,
          headers: req.headers,
          method: req.method,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Invalid JSON',
          message: error.message
        }));
      }
    });
  }
  
  async handleError(error, req, res, requestId) {
    this.metrics.recordError(error, {
      requestId,
      method: req.method,
      url: req.url
    });
    
    await this.logger.error('Request error', {
      requestId,
      error: error.message,
      stack: error.stack,
      method: req.method,
      url: req.url
    });
    
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Internal Server Error',
        message: this.config.isProduction() ? 'An error occurred' : error.message,
        requestId
      }));
    }
  }
  
  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      await this.logger.info(`${signal} received - shutting down gracefully`);
      
      if (this.server) {
        this.server.close(async () => {
          await this.logger.info('HTTP server closed');
          process.exit(0);
        });
        
        // Force shutdown after 30 seconds
        setTimeout(() => {
          console.error('🚨 Forced shutdown due to timeout');
          process.exit(1);
        }, 30000);
      } else {
        process.exit(0);
      }
    };
    
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
    // Handle uncaught exceptions
    process.on('uncaughtException', async (error) => {
      await this.logger.error('Uncaught Exception', {
        error: error.message,
        stack: error.stack
      });
      process.exit(1);
    });
    
    process.on('unhandledRejection', async (reason, promise) => {
      await this.logger.error('Unhandled Promise Rejection', {
        reason: reason?.toString() || 'Unknown reason',
        promise: promise.toString()
      });
      process.exit(1);
    });
  }
}

// 🚀 Start the server
const server = new HealthCheckServer();
server.start().catch(console.error);

/*
🎉 CONGRATULATIONS!

You've successfully built four comprehensive Node.js applications:

1. 🧮 CLI Calculator - Command line argument processing and error handling
2. 📁 File System Manager - File operations, path handling, and directory analysis  
3. 🌊 Data Stream Processor - Stream-based CSV to JSON conversion with validation
4. 🌐 Production-Ready Health Check Server - Full-featured HTTP server with monitoring

💪 Skills Demonstrated:
✅ Process and environment management
✅ File system operations and path handling
✅ Stream processing for large data
✅ HTTP server development
✅ Error handling and logging
✅ Configuration management
✅ Rate limiting and security
✅ Metrics collection and monitoring
✅ Graceful shutdown handling
✅ Production-ready patterns

🚀 You're now ready to build real-world Node.js applications!

📈 Next: Take these skills to Lesson 17 where you'll learn Express.js
and build professional REST APIs with even more advanced features!
*/
