/*
====================================
LESSON 07: PRACTICE DRILLS
====================================

Time: 45-60 minutes
Goal: Master objects, prototypes, and classes

------------------------------------
DRILL 1: Timer Class with Privacy
------------------------------------
Challenge: Build a timer with truly private data
Why This Matters: Understanding encapsulation and getters
*/

class Timer {
    // Private fields - can't be accessed from outside!
    #startTime = null;
    #stopTime = null;
    #isRunning = false;
    #laps = [];
    
    constructor(name = 'Timer') {
        this.name = name;
        console.log(`⏱️ ${this.name} created`);
    }
    
    // Start the timer
    start() {
        if (this.#isRunning) {
            console.log(`⚠️ ${this.name} is already running!`);
            return this;
        }
        
        this.#startTime = Date.now();
        this.#stopTime = null;
        this.#isRunning = true;
        console.log(`▶️ ${this.name} started`);
        return this; // Enable method chaining
    }
    
    // Stop the timer
    stop() {
        if (!this.#isRunning) {
            console.log(`⚠️ ${this.name} is not running!`);
            return this;
        }
        
        this.#stopTime = Date.now();
        this.#isRunning = false;
        console.log(`⏹️ ${this.name} stopped. Duration: ${this.duration}`);
        return this;
    }
    
    // Record a lap time
    lap() {
        if (!this.#isRunning) {
            console.log(`⚠️ Start the timer first!`);
            return this;
        }
        
        const lapTime = Date.now() - this.#startTime;
        this.#laps.push(lapTime);
        console.log(`🏁 Lap ${this.#laps.length}: ${this.formatTime(lapTime)}`);
        return this;
    }
    
    // Reset everything
    reset() {
        this.#startTime = null;
        this.#stopTime = null;
        this.#isRunning = false;
        this.#laps = [];
        console.log(`🔄 ${this.name} reset`);
        return this;
    }
    
    // Getter for duration (computed property)
    get duration() {
        if (!this.#startTime) return '0ms';
        
        const endTime = this.#stopTime || Date.now();
        const elapsed = endTime - this.#startTime;
        return this.formatTime(elapsed);
    }
    
    // Getter for raw milliseconds
    get milliseconds() {
        if (!this.#startTime) return 0;
        const endTime = this.#stopTime || Date.now();
        return endTime - this.#startTime;
    }
    
    // Getter for status
    get status() {
        if (this.#isRunning) return 'Running 🏃';
        if (this.#stopTime) return 'Stopped ⏹️';
        return 'Ready ⏰';
    }
    
    // Helper method to format time
    formatTime(ms) {
        if (ms < 1000) return `${ms}ms`;
        if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
        
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(2);
        return `${minutes}m ${seconds}s`;
    }
    
    // Get summary
    getSummary() {
        return {
            name: this.name,
            status: this.status,
            duration: this.duration,
            laps: this.#laps.map((time, i) => ({
                lap: i + 1,
                time: this.formatTime(time)
            }))
        };
    }
}

// Test the Timer
console.log('=== TIMER CLASS DEMO ===\n');

const timer = new Timer('Workout Timer');

// Demonstrate chaining
timer.start().lap();

// Simulate some work
setTimeout(() => {
    timer.lap();
    setTimeout(() => {
        timer.lap().stop();
        console.log('\nTimer Summary:', timer.getSummary());
        
        // Try to access private field (will fail)
        // console.log(timer.#startTime); // SyntaxError!
    }, 500);
}, 1000);

/*
------------------------------------
DRILL 2: User and Admin Inheritance
------------------------------------
Challenge: Create a user system with role-based permissions
Why This Matters: Understanding inheritance and super()
*/

class User {
    #passwordHash;
    
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.#passwordHash = this.#hashPassword(password);
        this.createdAt = new Date();
        this.lastLogin = null;
        this.isActive = true;
    }
    
    // Private method
    #hashPassword(password) {
        // Simple hash (NOT secure - just for demo!)
        return password.split('').reduce((hash, char) => {
            return ((hash << 5) - hash) + char.charCodeAt(0);
        }, 0).toString(36);
    }
    
    // Public methods
    login(password) {
        const attemptHash = this.#hashPassword(password);
        if (attemptHash === this.#passwordHash) {
            this.lastLogin = new Date();
            console.log(`✅ ${this.username} logged in successfully`);
            return true;
        }
        console.log(`❌ Invalid password for ${this.username}`);
        return false;
    }
    
    logout() {
        console.log(`👋 ${this.username} logged out`);
    }
    
    updateEmail(newEmail) {
        const oldEmail = this.email;
        this.email = newEmail;
        console.log(`📧 Email updated from ${oldEmail} to ${newEmail}`);
    }
    
    deactivate() {
        this.isActive = false;
        console.log(`🚫 ${this.username}'s account deactivated`);
    }
    
    getInfo() {
        return {
            username: this.username,
            email: this.email,
            createdAt: this.createdAt.toLocaleDateString(),
            lastLogin: this.lastLogin?.toLocaleString() || 'Never',
            isActive: this.isActive
        };
    }
}

// Admin extends User
class Admin extends User {
    #adminLevel;
    #actionsLog = [];
    
    constructor(username, email, password, adminLevel = 1) {
        // MUST call super() first!
        super(username, email, password);
        
        // Admin-specific properties
        this.#adminLevel = adminLevel;
        this.role = 'admin';
        this.permissions = this.#setPermissions(adminLevel);
    }
    
    #setPermissions(level) {
        const permissions = ['read', 'write'];
        if (level >= 2) permissions.push('delete', 'modify');
        if (level >= 3) permissions.push('grant_admin', 'system_config');
        return permissions;
    }
    
    #logAction(action, target) {
        this.#actionsLog.push({
            action,
            target,
            timestamp: new Date(),
            admin: this.username
        });
    }
    
    // Admin-specific methods
    deleteUser(user) {
        if (!(user instanceof User)) {
            console.log(`❌ Invalid user object`);
            return false;
        }
        
        if (user instanceof Admin && this.#adminLevel < 3) {
            console.log(`❌ Insufficient permissions to delete admin`);
            return false;
        }
        
        user.deactivate();
        this.#logAction('DELETE_USER', user.username);
        console.log(`🗑️ Admin ${this.username} deleted user ${user.username}`);
        return true;
    }
    
    promoteToAdmin(user, level = 1) {
        if (this.#adminLevel < 3) {
            console.log(`❌ Only level 3 admins can promote users`);
            return null;
        }
        
        this.#logAction('PROMOTE_USER', user.username);
        console.log(`👑 ${user.username} promoted to admin level ${level}`);
        
        // Create new Admin with same credentials
        return new Admin(user.username, user.email, 'temp-password', level);
    }
    
    viewLogs() {
        console.log(`\n📝 Admin Action Logs for ${this.username}:`);
        this.#actionsLog.forEach(log => {
            console.log(`  ${log.timestamp.toLocaleString()}: ${log.action} -> ${log.target}`);
        });
    }
    
    // Override parent method
    getInfo() {
        const baseInfo = super.getInfo(); // Call parent's version
        return {
            ...baseInfo,
            role: this.role,
            adminLevel: this.#adminLevel,
            permissions: this.permissions,
            totalActions: this.#actionsLog.length
        };
    }
}

// Test the inheritance
console.log('\n\n=== USER/ADMIN INHERITANCE DEMO ===\n');

// Create users
const regularUser = new User('alice', 'alice@example.com', 'password123');
const moderator = new Admin('bob', 'bob@example.com', 'admin456', 2);
const superAdmin = new Admin('charlie', 'charlie@example.com', 'super789', 3);

// Test authentication
regularUser.login('wrongpass');  // Fails
regularUser.login('password123'); // Success

// Test admin actions
moderator.deleteUser(regularUser);
moderator.promoteToAdmin(regularUser); // Fails - insufficient level

const newAdmin = superAdmin.promoteToAdmin(regularUser, 1);
if (newAdmin) {
    console.log('\nNew admin info:', newAdmin.getInfo());
}

// View logs
moderator.viewLogs();

// Type checking
console.log('\nType checking:');
console.log('regularUser is User:', regularUser instanceof User);        // true
console.log('regularUser is Admin:', regularUser instanceof Admin);      // false  
console.log('moderator is User:', moderator instanceof User);            // true
console.log('moderator is Admin:', moderator instanceof Admin);          // true

/*
------------------------------------
DRILL 3: Mastering bind()
------------------------------------
Challenge: Create reusable bound functions
Why This Matters: Event handlers, callbacks, partial application
*/

function introduce(greeting, punctuation = '!') {
    return `${greeting}, I am ${this.name}${punctuation}`;
}

// Create specific bound versions
const bob = { name: 'Bob', age: 30 };
const sayHelloToBob = introduce.bind(bob, 'Hello');

console.log('\n\n=== BIND() MASTERY ===\n');
console.log(sayHelloToBob());         // "Hello, I am Bob!"
console.log(sayHelloToBob('.'));      // "Hello, I am Bob."
console.log(sayHelloToBob('?'));      // "Hello, I am Bob?"

// More advanced: Partial application with bind
function calculatePrice(taxRate, discount, price) {
    const discountedPrice = price * (1 - discount);
    const tax = discountedPrice * taxRate;
    return (discountedPrice + tax).toFixed(2);
}

// Create specialized calculators
const calculateUSPrice = calculatePrice.bind(null, 0.08, 0);    // 8% tax, no discount
const calculateSalePrice = calculatePrice.bind(null, 0.08, 0.2); // 8% tax, 20% discount
const calculateTaxFree = calculatePrice.bind(null, 0, 0.1);      // No tax, 10% discount

console.log('\nPrice Calculators:');
console.log('US Price for $100:', calculateUSPrice(100));        // $108.00
console.log('Sale Price for $100:', calculateSalePrice(100));    // $86.40
console.log('Tax-Free Price for $100:', calculateTaxFree(100));  // $90.00

// Real-world example: Event handler binding
class ClickCounter {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }
    
    handleClick() {
        this.count++;
        console.log(`${this.name} clicked ${this.count} times`);
    }
    
    // Different binding strategies
    getHandlers() {
        return {
            // Arrow function (inherits this)
            arrowHandler: () => this.handleClick(),
            
            // Bound method
            boundHandler: this.handleClick.bind(this),
            
            // Unbound (will lose context)
            unboundHandler: this.handleClick
        };
    }
}

const counter = new ClickCounter('Button');
const handlers = counter.getHandlers();

// Simulate clicks
console.log('\nSimulating clicks:');
handlers.arrowHandler();   // Works
handlers.boundHandler();   // Works
try {
    handlers.unboundHandler(); // Fails - 'this' is undefined
} catch (e) {
    console.log('Unbound handler failed:', e.message);
}

/*
====================================
PROJECT: Course Management System
====================================

Time: 60-90 minutes
Difficulty: Intermediate-Advanced

Your Mission:
Build a complete course management system using modern class features,
inheritance, private fields, static methods, and getters.

What You'll Practice:
- Private fields for encapsulation
- Static methods for factory patterns
- Getters for computed properties
- Inheritance with super()
- Real-world class design
*/

console.log('\n\n=== COURSE MANAGEMENT SYSTEM ===\n');

// ====================================
// BASE COHORT CLASS
// ====================================

class Cohort {
    #students = [];
    #waitlist = [];
    #startDate;
    #endDate;
    #capacity;
    #id;
    
    constructor(startDate, capacity = 20, durationWeeks = 12) {
        this.#startDate = new Date(startDate);
        this.#endDate = new Date(startDate);
        this.#endDate.setDate(this.#endDate.getDate() + (durationWeeks * 7));
        this.#capacity = capacity;
        this.#id = Cohort.generateId();
        this.status = 'upcoming';
        
        this.updateStatus();
    }
    
    // Static counter for unique IDs
    static #idCounter = 1000;
    
    static generateId() {
        return `CHT-${++Cohort.#idCounter}`;
    }
    
    // Getters
    get id() {
        return this.#id;
    }
    
    get isFull() {
        return this.#students.length >= this.#capacity;
    }
    
    get availableSpots() {
        return Math.max(0, this.#capacity - this.#students.length);
    }
    
    get studentCount() {
        return this.#students.length;
    }
    
    get waitlistCount() {
        return this.#waitlist.length;
    }
    
    get startDate() {
        return this.#startDate.toLocaleDateString();
    }
    
    get endDate() {
        return this.#endDate.toLocaleDateString();
    }
    
    get daysUntilStart() {
        const now = new Date();
        const diff = this.#startDate - now;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    
    // Methods
    addStudent(student) {
        if (typeof student === 'string') {
            student = { name: student, enrolledAt: new Date() };
        }
        
        if (this.isFull) {
            this.#waitlist.push(student);
            console.log(`⏳ ${student.name} added to waitlist (Position: ${this.#waitlist.length})`);
            return 'waitlisted';
        }
        
        this.#students.push(student);
        console.log(`✅ ${student.name} enrolled! (${this.availableSpots} spots remaining)`);
        
        // Check if someone can be moved from waitlist
        if (!this.isFull && this.#waitlist.length > 0) {
            const nextStudent = this.#waitlist.shift();
            this.addStudent(nextStudent);
        }
        
        return 'enrolled';
    }
    
    removeStudent(studentName) {
        const index = this.#students.findIndex(s => s.name === studentName);
        
        if (index === -1) {
            console.log(`❌ Student ${studentName} not found`);
            return false;
        }
        
        this.#students.splice(index, 1);
        console.log(`👋 ${studentName} removed from cohort`);
        
        // Auto-enroll from waitlist
        if (this.#waitlist.length > 0) {
            const nextStudent = this.#waitlist.shift();
            this.addStudent(nextStudent);
            console.log(`🎉 ${nextStudent.name} auto-enrolled from waitlist!`);
        }
        
        return true;
    }
    
    updateStatus() {
        const now = new Date();
        if (now < this.#startDate) {
            this.status = 'upcoming';
        } else if (now <= this.#endDate) {
            this.status = 'in-progress';
        } else {
            this.status = 'completed';
        }
    }
    
    getStudentList() {
        return [...this.#students]; // Return copy to maintain encapsulation
    }
    
    getSummary() {
        this.updateStatus();
        
        return {
            id: this.#id,
            status: this.status,
            startDate: this.startDate,
            endDate: this.endDate,
            enrolled: this.studentCount,
            capacity: this.#capacity,
            availableSpots: this.availableSpots,
            waitlist: this.waitlistCount,
            isFull: this.isFull
        };
    }
}

// ====================================
// PREMIUM COHORT (EXTENDS COHORT)
// ====================================

class PremiumCohort extends Cohort {
    #mentor;
    #mentorSessions = [];
    #resources = [];
    
    constructor(startDate, capacity = 15, mentor, durationWeeks = 12) {
        // Call parent constructor
        super(startDate, capacity, durationWeeks);
        
        // Premium-specific properties
        this.#mentor = mentor;
        this.type = 'premium';
        this.features = [
            '1-on-1 mentoring',
            'Code reviews',
            'Career coaching',
            'Priority support',
            'Certificate of completion'
        ];
    }
    
    get mentor() {
        return this.#mentor;
    }
    
    scheduleMentorSession(date, topic, duration = 60) {
        const session = {
            date: new Date(date),
            topic,
            duration,
            mentor: this.#mentor
        };
        
        this.#mentorSessions.push(session);
        console.log(`📅 Mentor session scheduled: ${topic} on ${session.date.toLocaleDateString()}`);
        return session;
    }
    
    addResource(resource) {
        this.#resources.push(resource);
        console.log(`📚 Resource added: ${resource.title}`);
    }
    
    // Override parent method
    getSummary() {
        const baseSummary = super.getSummary();
        return {
            ...baseSummary,
            type: this.type,
            mentor: this.#mentor,
            features: this.features,
            mentorSessions: this.#mentorSessions.length,
            resources: this.#resources.length
        };
    }
}

// ====================================
// COURSE CLASS
// ====================================

class Course {
    // Private fields
    #cohorts = [];
    #enrollmentCount = 0;
    #revenue = 0;
    
    // Static properties
    static #courseTemplates = {
        bootcamp: {
            title: 'Full-Stack Web Development Bootcamp',
            description: 'Intensive 12-week program covering HTML, CSS, JavaScript, React, Node.js, and databases',
            duration: 12,
            price: 12000,
            skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git']
        },
        workshop: {
            title: 'JavaScript Fundamentals Workshop',
            description: '4-week hands-on workshop for JavaScript beginners',
            duration: 4,
            price: 1500,
            skills: ['JavaScript Basics', 'DOM Manipulation', 'Async Programming']
        },
        masterclass: {
            title: 'Advanced JavaScript Masterclass',
            description: '8-week deep dive into advanced JavaScript patterns and architecture',
            duration: 8,
            price: 3500,
            skills: ['Design Patterns', 'Performance', 'Testing', 'Architecture']
        }
    };
    
    constructor(title, description, price = 0) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.createdAt = new Date();
        this.tags = [];
        this.instructors = [];
    }
    
    // Static factory method
    static fromTemplate(templateName) {
        const template = Course.#courseTemplates[templateName];
        
        if (!template) {
            throw new Error(`Unknown template: ${templateName}. Available: ${Object.keys(Course.#courseTemplates).join(', ')}`);
        }
        
        const course = new Course(template.title, template.description, template.price);
        course.duration = template.duration;
        course.tags = [...template.skills];
        
        console.log(`🎓 Course created from '${templateName}' template`);
        return course;
    }
    
    // Static method to list available templates
    static getAvailableTemplates() {
        return Object.keys(Course.#courseTemplates);
    }
    
    // Add a cohort
    addCohort(cohort) {
        if (!(cohort instanceof Cohort)) {
            throw new Error('Invalid cohort object');
        }
        
        this.#cohorts.push(cohort);
        console.log(`🔗 Cohort ${cohort.id} added to "${this.title}"`);
        
        // Update metrics
        this.#enrollmentCount += cohort.studentCount;
        this.#revenue += cohort.studentCount * this.price;
        
        return this;
    }
    
    // Get all cohorts
    getCohorts() {
        return this.#cohorts.map(c => c.getSummary());
    }
    
    // Find specific cohort
    findCohort(cohortId) {
        return this.#cohorts.find(c => c.id === cohortId);
    }
    
    // Add instructor
    addInstructor(name, role = 'Instructor') {
        this.instructors.push({ name, role });
        console.log(`👨‍🏫 ${name} added as ${role}`);
        return this;
    }
    
    // Get course statistics
    getStatistics() {
        const stats = {
            totalCohorts: this.#cohorts.length,
            totalEnrollment: 0,
            totalCapacity: 0,
            upcomingCohorts: 0,
            activeCohorts: 0,
            completedCohorts: 0,
            estimatedRevenue: this.#revenue
        };
        
        this.#cohorts.forEach(cohort => {
            cohort.updateStatus();
            stats.totalEnrollment += cohort.studentCount;
            stats.totalCapacity += cohort.getSummary().capacity;
            
            switch(cohort.status) {
                case 'upcoming': stats.upcomingCohorts++; break;
                case 'in-progress': stats.activeCohorts++; break;
                case 'completed': stats.completedCohorts++; break;
            }
        });
        
        stats.fillRate = stats.totalCapacity > 0 
            ? ((stats.totalEnrollment / stats.totalCapacity) * 100).toFixed(1) + '%'
            : '0%';
        
        return stats;
    }
    
    // Get full course details
    getDetails() {
        return {
            title: this.title,
            description: this.description,
            price: `$${this.price.toLocaleString()}`,
            duration: `${this.duration || 'Variable'} weeks`,
            tags: this.tags,
            instructors: this.instructors,
            statistics: this.getStatistics(),
            cohorts: this.getCohorts()
        };
    }
}

// ====================================
// DEMONSTRATION
// ====================================

// Create courses from templates
const bootcamp = Course.fromTemplate('bootcamp');
const workshop = Course.fromTemplate('workshop');

// Add instructors
bootcamp
    .addInstructor('Sarah Johnson', 'Lead Instructor')
    .addInstructor('Mike Chen', 'Teaching Assistant');

// Create cohorts
const springCohort = new Cohort('2025-03-01', 25, 12);
const summerCohort = new Cohort('2025-06-01', 30, 12);
const premiumFall = new PremiumCohort('2025-09-01', 15, 'Dr. Emily Rodriguez', 12);

// Add students
console.log('\n👥 Enrolling Students...');
const students = [
    'Alice Brown', 'Bob Wilson', 'Charlie Davis', 'Diana Miller',
    'Eve Thompson', 'Frank Garcia', 'Grace Lee', 'Henry Martinez'
];

students.forEach(student => springCohort.addStudent(student));

// Add more students to test waitlist
for (let i = 1; i <= 20; i++) {
    springCohort.addStudent(`Student${i}`);
}

// Premium cohort operations
premiumFall.addStudent('Premium Student 1');
premiumFall.addStudent('Premium Student 2');
premiumFall.scheduleMentorSession('2025-09-15', 'Career Planning');
premiumFall.scheduleMentorSession('2025-09-22', 'Portfolio Review');
premiumFall.addResource({ title: 'Advanced JavaScript Guide', type: 'PDF' });

// Add cohorts to course
console.log('\n🎓 Building Course Structure...');
bootcamp.addCohort(springCohort);
bootcamp.addCohort(summerCohort);
bootcamp.addCohort(premiumFall);

// Display course details
console.log('\n📊 Course Report:');
const details = bootcamp.getDetails();
console.log('Title:', details.title);
console.log('Price:', details.price);
console.log('Instructors:', details.instructors.map(i => `${i.name} (${i.role})`).join(', '));
console.log('\nStatistics:');
Object.entries(details.statistics).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});

// Display cohort summaries
console.log('\n📅 Cohort Summaries:');
details.cohorts.forEach(cohort => {
    console.log(`\n  Cohort ${cohort.id}:`);
    console.log(`    Status: ${cohort.status}`);
    console.log(`    Dates: ${cohort.startDate} - ${cohort.endDate}`);
    console.log(`    Enrollment: ${cohort.enrolled}/${cohort.capacity}`);
    if (cohort.type === 'premium') {
        console.log(`    Type: PREMIUM ✨`);
        console.log(`    Mentor: ${cohort.mentor}`);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Course, Cohort, PremiumCohort };
}
