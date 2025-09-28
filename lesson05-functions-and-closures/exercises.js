/*
====================================
LESSON 05: PRACTICE DRILLS
====================================

Time: 60-90 minutes
Goal: Master functions, closures, and callbacks

------------------------------------
DRILL 1: Higher-Order Function - Repeat
------------------------------------

Challenge: Create a function that repeats another function
Why This Matters: This pattern is used in retry logic, animations, and testing

Your Task:
Implement repeat(fn, times) that calls function 'fn' exactly 'times' times
*/

// Solution with explanations:
function repeat(fn, times) {
    // fn is a callback function (a function passed as parameter)
    for (let i = 0; i < times; i++) {
        fn(i);  // Call the function, passing current iteration
    }
}

// Test it:
repeat((index) => console.log(`Hello #${index + 1}`), 3);
// Output: Hello #1, Hello #2, Hello #3

// Real-world example: Retry logic
function retryOperation(operation, maxAttempts) {
    let attempts = 0;
    
    function tryOnce() {
        attempts++;
        try {
            operation();
            console.log("Success!");
        } catch (error) {
            if (attempts < maxAttempts) {
                console.log(`Attempt ${attempts} failed, retrying...`);
                tryOnce();  // Recursive retry
            } else {
                console.log("All attempts failed!");
            }
        }
    }
    
    tryOnce();
}

// Simulated flaky operation
let counter = 0;
retryOperation(() => {
    counter++;
    if (counter < 3) throw new Error("Not yet!");
    console.log("Operation completed!");
}, 5);

/*
------------------------------------
DRILL 2: Closure - Function Factory
------------------------------------

Challenge: Create a function that makes customized multiplier functions
Why This Matters: This is how libraries create customized utilities

Your Task:
Write makeMultiplier(factor) that returns a function that multiplies by factor
*/

// Solution with step-by-step explanation:
function makeMultiplier(factor) {
    // 'factor' is captured in the closure
    
    // Return a new function that "remembers" factor
    return function(number) {
        return number * factor;
    };
}

// Create specialized functions:
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const half = makeMultiplier(0.5);
const taxCalculator = makeMultiplier(1.08);  // 8% tax

// Use them:
console.log(double(10));        // 20
console.log(triple(10));        // 30
console.log(half(10));          // 5
console.log(taxCalculator(100)); // 108

// Advanced: Closure with multiple variables
function createCalculator(taxRate, discountRate) {
    // Both variables are captured
    
    return {
        calculatePrice: (basePrice) => {
            const afterDiscount = basePrice * (1 - discountRate);
            const withTax = afterDiscount * (1 + taxRate);
            return withTax.toFixed(2);
        },
        
        showRates: () => {
            return `Tax: ${taxRate * 100}%, Discount: ${discountRate * 100}%`;
        }
    };
}

const storeCalculator = createCalculator(0.08, 0.20);  // 8% tax, 20% discount
console.log(storeCalculator.calculatePrice(100));      // "86.40"
console.log(storeCalculator.showRates());              // "Tax: 8%, Discount: 20%"

/*
------------------------------------
DRILL 3: Refactoring with Ternary & Arrow
------------------------------------

Challenge: Convert verbose code to concise modern JavaScript
Why This Matters: Modern codebases favor concise, readable patterns
*/

// BEFORE: Verbose if/else
function getGreeting(hour) {
    let greeting;
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    return greeting;
}

// AFTER: Concise with ternary and arrow
const getGreetingModern = (hour) => 
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

// Test both:
console.log(getGreeting(9));       // "Good morning"
console.log(getGreetingModern(9)); // "Good morning"

// More refactoring examples:

// BEFORE: Setting default with if
function processUser(user) {
    let displayName;
    if (user && user.name) {
        displayName = user.name;
    } else {
        displayName = "Guest";
    }
    return `Welcome, ${displayName}`;
}

// AFTER: One-liner with optional chaining and nullish coalescing
const processUserModern = (user) => 
    `Welcome, ${user?.name ?? "Guest"}`;

// BEFORE: Array filtering with loop
function getAdults(people) {
    const adults = [];
    for (let i = 0; i < people.length; i++) {
        if (people[i].age >= 18) {
            adults.push(people[i]);
        }
    }
    return adults;
}

// AFTER: Array method with arrow function
const getAdultsModern = (people) => 
    people.filter(person => person.age >= 18);

/*
====================================
PROJECT: Habit Tracker with Closures
====================================

Time: 45-60 minutes
Difficulty: Intermediate

Your Mission:
Build a habit tracking system that uses closures to maintain private state.
This is how real apps like Duolingo track your streaks!

What You'll Learn:
- Using closures for data privacy
- Creating function factories
- Building APIs with object methods
- Working with dates and time

The Challenge:
Create a habit tracker that:
1. Keeps track of when you do a habit
2. Calculates your current streak
3. Maintains privacy (no direct access to data)
*/

// ====================================
// COMPLETE SOLUTION WITH EXPLANATIONS
// ====================================

function createHabitTracker(habitName) {
    // ===== PRIVATE STATE (Closure Variables) =====
    // These variables are "enclosed" - accessible only to functions below
    const entries = [];  // Stores all entry dates
    let longestStreak = 0;  // Track best performance
    
    // Welcome message
    console.log(`
    ╔════════════════════════════════════╗
    ║ Habit Tracker: "${habitName}" ║
    ║ Created at: ${new Date().toLocaleString()} ║
    ╚════════════════════════════════════╝
    `);

    // ===== HELPER FUNCTIONS (Private) =====
    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };
    
    const isYesterday = (date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
    };
    
    const areDatesConsecutive = (date1, date2) => {
        // Check if date2 is the day after date1
        const oneDay = 24 * 60 * 60 * 1000;  // milliseconds in a day
        const diff = Math.abs(date2 - date1);
        return diff <= oneDay * 1.5;  // Allow for timezone issues
    };

    // ===== PUBLIC API (Returned Object) =====
    return {
        // Method 1: Log a new entry
        logEntry: (date = new Date()) => {
            // Check if already logged today
            const alreadyLoggedToday = entries.some(entry => 
                isToday(entry)
            );
            
            if (alreadyLoggedToday) {
                console.log(`⚠️ Already logged "${habitName}" today!`);
                return false;
            }
            
            entries.push(date);
            entries.sort((a, b) => a - b);  // Keep chronological order
            
            console.log(`✅ Entry logged for "${habitName}" on ${date.toDateString()}`);
            console.log(`Total entries: ${entries.length}`);
            
            return true;
        },
        
        // Method 2: Calculate current streak
        getStreak: () => {
            if (entries.length === 0) {
                console.log(`📅 No entries yet for "${habitName}"`);
                return 0;
            }
            
            // Sort entries by date (newest first)
            const sortedEntries = [...entries].sort((a, b) => b - a);
            
            // Check if streak is broken (didn't do it today or yesterday)
            const lastEntry = sortedEntries[0];
            if (!isToday(lastEntry) && !isYesterday(lastEntry)) {
                console.log(`❌ Streak broken! Last entry was ${lastEntry.toDateString()}`);
                return 0;
            }
            
            // Count consecutive days
            let streak = 1;
            for (let i = 1; i < sortedEntries.length; i++) {
                if (areDatesConsecutive(sortedEntries[i], sortedEntries[i-1])) {
                    streak++;
                } else {
                    break;  // Streak broken
                }
            }
            
            // Update longest streak
            if (streak > longestStreak) {
                longestStreak = streak;
                console.log(`🎆 NEW RECORD! Longest streak: ${longestStreak} days!`);
            }
            
            console.log(`
            🔥 Current Streak: ${streak} days
            🏆 Best Streak: ${longestStreak} days
            📊 Total Entries: ${entries.length}
            `);
            
            return streak;
        },
        
        // Method 3: Reset tracker
        reset: () => {
            const confirmReset = true;  // In real app, would confirm with user
            
            if (confirmReset) {
                const oldCount = entries.length;
                entries.length = 0;  // Clear array
                longestStreak = 0;
                
                console.log(`🔄 Habit "${habitName}" reset. (${oldCount} entries cleared)`);
                return true;
            }
            
            return false;
        },
        
        // Method 4: Get statistics
        getStats: () => {
            const totalDays = entries.length;
            const currentStreak = tracker.getStreak();
            
            // Calculate completion rate
            if (totalDays === 0) {
                return {
                    habitName,
                    totalDays: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    completionRate: 0
                };
            }
            
            const firstEntry = new Date(Math.min(...entries));
            const daysSinceStart = Math.floor((new Date() - firstEntry) / (1000 * 60 * 60 * 24)) + 1;
            const completionRate = ((totalDays / daysSinceStart) * 100).toFixed(1);
            
            const stats = {
                habitName,
                totalDays,
                currentStreak,
                longestStreak,
                completionRate: `${completionRate}%`,
                firstEntry: firstEntry.toDateString(),
                lastEntry: entries[entries.length - 1].toDateString()
            };
            
            console.log("\n📊 HABIT STATISTICS:");
            console.log(JSON.stringify(stats, null, 2));
            
            return stats;
        },
        
        // Method 5: Visualize progress (bonus!)
        visualize: (days = 30) => {
            console.log(`\n🗺️ Last ${days} days for "${habitName}":\n`);
            
            const today = new Date();
            let output = "";
            
            for (let i = days - 1; i >= 0; i--) {
                const checkDate = new Date();
                checkDate.setDate(today.getDate() - i);
                
                const wasLogged = entries.some(entry => 
                    entry.toDateString() === checkDate.toDateString()
                );
                
                output += wasLogged ? "✅" : "❌";
                
                if ((days - i) % 7 === 0) output += "\n";  // New line every week
            }
            
            console.log(output);
            console.log("\n✅ = Completed, ❌ = Missed\n");
        },
        
        // Debug helper (wouldn't exist in production)
        _debug: () => {
            console.log("Debug - Raw entries:", entries.map(e => e.toDateString()));
        }
    };
}

// ====================================
// DEMONSTRATION
// ====================================

console.log("\n=== HABIT TRACKER DEMO ===");

// Create trackers for different habits
const exerciseTracker = createHabitTracker("Daily Exercise");
const readingTracker = createHabitTracker("Read 30 Minutes");

// Simulate activity over several days
console.log("\n--- Simulating Past Week ---");

// Add entries for past days (for demo)
const today = new Date();

// Exercise: 5 days in a row
for (let i = 4; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    exerciseTracker.logEntry(date);
}

// Reading: Missed yesterday
for (let i = 4; i >= 0; i--) {
    if (i === 1) continue;  // Skip yesterday
    const date = new Date();
    date.setDate(today.getDate() - i);
    readingTracker.logEntry(date);
}

// Check streaks
console.log("\n--- Current Status ---");
exerciseTracker.getStreak();
readingTracker.getStreak();

// Visualize progress
exerciseTracker.visualize(14);
readingTracker.visualize(14);

// Get statistics
exerciseTracker.getStats();
readingTracker.getStats();

// Try to log again today (should warn)
console.log("\n--- Testing Duplicate Prevention ---");
exerciseTracker.logEntry();

// The power of closures: Each tracker has its own private data!
// We can't access 'entries' directly:
// console.log(exerciseTracker.entries);  // undefined!

/*
====================================
BONUS CHALLENGES
====================================

1. Add a method to log multiple days at once
2. Add rewards/badges for milestones (7 days, 30 days, etc.)
3. Export/import data as JSON
4. Add reminder notifications
5. Track time of day for habits
6. Add habit categories and filtering
7. Create a web interface with charts
*/
