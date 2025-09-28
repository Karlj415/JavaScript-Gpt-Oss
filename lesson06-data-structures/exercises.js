/*
====================================
LESSON 06: PRACTICE DRILLS  
====================================

Time: 45-60 minutes
Goal: Master data structures and transformations

------------------------------------
DRILL 1: Array Method Chaining
------------------------------------
Challenge: Filter active users and get their names
Why This Matters: Most API data needs filtering and transformation
*/

// Sample data: Social media users
const users = [
    { id: 1, name: 'Alice', age: 28, isActive: true, lastLogin: '2024-01-15' },
    { id: 2, name: 'Bob', age: 34, isActive: false, lastLogin: '2023-12-01' },
    { id: 3, name: 'Charlie', age: 22, isActive: true, lastLogin: '2024-01-14' },
    { id: 4, name: 'Diana', age: 29, isActive: true, lastLogin: '2024-01-16' },
    { id: 5, name: 'Eve', age: 31, isActive: false, lastLogin: '2023-11-15' }
];

// Solution 1: Get active user names
const activeUserNames = users
    .filter(user => user.isActive)        // Keep only active users
    .map(user => user.name);              // Extract just names

console.log('Active users:', activeUserNames);
// ['Alice', 'Charlie', 'Diana']

// Bonus: More complex chaining
const youngActiveUsers = users
    .filter(user => user.isActive)        // Active users
    .filter(user => user.age < 30)        // Under 30
    .map(user => ({
        name: user.name,
        age: user.age,
        daysAgo: Math.floor((new Date() - new Date(user.lastLogin)) / (1000 * 60 * 60 * 24))
    }))
    .sort((a, b) => a.age - b.age);       // Sort by age

console.log('Young active users:', youngActiveUsers);

/*
------------------------------------
DRILL 2: Object to Map Conversion
------------------------------------
Challenge: Convert object to Map using Object.entries and reduce
Why This Matters: Maps have advantages over objects (any key type, size property, iteration order)
*/

const gameSettings = {
    difficulty: 'hard',
    volume: 80,
    graphics: 'ultra',
    vsync: true,
    resolution: '1920x1080'
};

// Solution: Convert to Map
const settingsMap = Object.entries(gameSettings).reduce(
    (map, [key, value]) => {
        map.set(key, value);
        return map;
    },
    new Map()
);

console.log('Settings Map:', settingsMap);
console.log('Map size:', settingsMap.size);
console.log('Volume:', settingsMap.get('volume'));

// Alternative one-liner
const quickMap = new Map(Object.entries(gameSettings));

// Why Map is useful
const user1 = { id: 1 };
const user2 = { id: 2 };

const permissions = new Map();
permissions.set(user1, ['read', 'write']);
permissions.set(user2, ['read']);
permissions.set(gameSettings, 'config');  // Object as key!

console.log('User1 permissions:', permissions.get(user1));

/*
------------------------------------  
DRILL 3: Safe Property Access
------------------------------------
Challenge: Safely access deeply nested properties
Why This Matters: API responses often have inconsistent structure
*/

function getZipCode(user) {
    // Using optional chaining to safely navigate
    return user?.address?.zipCode;
}

// Test with various user objects
const testUsers = [
    {
        name: 'Alice',
        address: {
            street: '123 Main St',
            city: 'Boston',
            zipCode: '02134'
        }
    },
    {
        name: 'Bob',
        address: {
            street: '456 Oak Ave',
            city: 'New York'
            // No zipCode!
        }
    },
    {
        name: 'Charlie'
        // No address at all!
    },
    null,  // Null user
    undefined  // Undefined user
];

testUsers.forEach((user, index) => {
    const zip = getZipCode(user);
    console.log(`User ${index}: ${zip ?? 'No zip code'}`);
});

// More complex example: multiple optional paths
function getUserContact(user) {
    return {
        email: user?.contact?.email ?? 'No email',
        phone: user?.contact?.phone ?? 'No phone',
        preferredContact: user?.preferences?.contactMethod ?? 'email',
        emergencyContact: user?.emergency?.contact?.name ?? 'None specified'
    };
}

/*
------------------------------------
DRILL 4: Unique Characters with Set
------------------------------------
Challenge: Count unique characters in a string
Why This Matters: Sets are perfect for uniqueness problems
*/

function countUniqueCharacters(str) {
    // Convert string to Set (automatically removes duplicates)
    const uniqueChars = new Set(str.toLowerCase());
    return uniqueChars.size;
}

function getUniqueCharacters(str) {
    // Return array of unique characters
    return [...new Set(str.toLowerCase())].sort();
}

function characterFrequency(str) {
    // Bonus: Count frequency of each character
    return str.toLowerCase().split('').reduce((freq, char) => {
        if (char !== ' ') {  // Ignore spaces
            freq[char] = (freq[char] || 0) + 1;
        }
        return freq;
    }, {});
}

// Test the functions
const testStrings = [
    'hello world',
    'mississippi',
    'abracadabra',
    'JavaScript is awesome!'
];

testStrings.forEach(str => {
    console.log(`\n"${str}"`);
    console.log(`  Unique count: ${countUniqueCharacters(str)}`);
    console.log(`  Unique chars: ${getUniqueCharacters(str).join(', ')}`);
    console.log(`  Frequency:`, characterFrequency(str));
});

// Real-world use: Password strength
function checkPasswordStrength(password) {
    const uniqueCount = countUniqueCharacters(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    
    let strength = 'Weak';
    if (password.length >= 12 && uniqueCount >= 8 && hasNumbers && hasSpecial) {
        strength = 'Strong';
    } else if (password.length >= 8 && uniqueCount >= 6) {
        strength = 'Medium';
    }
    
    return {
        strength,
        length: password.length,
        uniqueChars: uniqueCount,
        hasNumbers,
        hasSpecial
    };
}

console.log('\nPassword Strength Check:');
console.log(checkPasswordStrength('password123'));  // Weak-Medium
console.log(checkPasswordStrength('P@ssw0rd!2024')); // Strong

/*
====================================
PROJECT: Student Progress Dashboard
====================================

Time: 45-60 minutes
Difficulty: Intermediate

Your Mission:
Build a complete student analytics dashboard that handles messy data,
calculates statistics, and generates reports.

What You'll Learn:
- Safe data access with optional chaining
- Immutable data transformations
- Complex array method chaining
- JSON serialization for APIs
- Real-world data processing patterns
*/

// ====================================
// STUDENT DATA (Intentionally Messy!)
// ====================================

const students = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@school.edu",
        modulesCompleted: ["Basics", "Control Flow", "Functions"],
        scores: [85, 92, 88, 91, 87],
        attendance: 0.95,
        isActive: true,
        enrollmentDate: "2023-09-01"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@school.edu",
        modulesCompleted: ["Basics"],
        scores: [70, 81, 75],
        attendance: 0.78,
        isActive: false,  // Dropped out
        enrollmentDate: "2023-09-15"
    },
    {
        id: 3,
        name: null,  // Missing name!
        email: "student3@school.edu",
        modulesCompleted: ["Basics", "Control Flow", "Functions", "Arrays", "Objects"],
        scores: [95, 98, 100, 97, 99],
        attendance: 0.99,
        isActive: true,
        enrollmentDate: "2023-08-28"
    },
    {
        id: 4,
        name: "Charlie Davis",
        email: "charlie@school.edu",
        modulesCompleted: ["Basics", "Control Flow", "Functions", "Arrays"],
        // Missing scores!
        attendance: 0.88,
        isActive: true,
        enrollmentDate: "2023-09-05"
    },
    {
        id: 5,
        name: "Diana Prince",
        // Missing email!
        modulesCompleted: ["Basics", "Control Flow"],
        scores: [88, 85, 90, 92],
        attendance: 0.92,
        isActive: true,
        enrollmentDate: "2023-09-10"
    },
    {
        id: 6,
        name: "Eve Anderson",
        email: "eve@school.edu",
        modulesCompleted: [],  // Just started!
        scores: [],
        attendance: 1.0,
        isActive: true,
        enrollmentDate: "2024-01-10"
    }
];

// ====================================
// HELPER FUNCTIONS
// ====================================

// Calculate average of an array (handles empty arrays)
function calculateAverage(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

// Get student's average score (safe)
function getStudentAverage(student) {
    const scores = student?.scores ?? [];
    return calculateAverage(scores);
}

// Get student display name (handles missing names)
function getStudentName(student) {
    return student?.name ?? `Student #${student?.id ?? 'Unknown'}`;
}

// ====================================
// MAIN ANALYTICS FUNCTIONS
// ====================================

function getClassAverage(studentList) {
    // Flatten all scores from all students
    const allScores = studentList
        .filter(student => student?.scores?.length > 0)  // Only students with scores
        .flatMap(student => student.scores);             // Combine all scores
    
    return calculateAverage(allScores);
}

function getTopPerformers(studentList, threshold = 90) {
    return studentList
        .filter(student => student?.isActive)  // Only active students
        .map(student => ({
            name: getStudentName(student),
            average: getStudentAverage(student),
            modules: student?.modulesCompleted?.length ?? 0
        }))
        .filter(student => student.average >= threshold)
        .sort((a, b) => b.average - a.average)  // Sort by average (descending)
        .map(student => student.name);          // Just return names
}

function getStudentsNeedingSupport(studentList, threshold = 75) {
    return studentList
        .filter(student => student?.isActive)  // Only active students
        .map(student => ({
            name: getStudentName(student),
            average: getStudentAverage(student),
            attendance: student?.attendance ?? 0
        }))
        .filter(student => 
            student.average < threshold || 
            student.attendance < 0.8  // Also flag low attendance
        )
        .map(student => ({
            name: student.name,
            issues: [
                student.average < threshold && 'Low grades',
                student.attendance < 0.8 && 'Low attendance'
            ].filter(Boolean)  // Remove false values
        }));
}

function getModuleCompletion(studentList) {
    const allModules = new Set();
    const moduleCount = {};
    
    // Collect all unique modules and count completions
    studentList.forEach(student => {
        const modules = student?.modulesCompleted ?? [];
        modules.forEach(module => {
            allModules.add(module);
            moduleCount[module] = (moduleCount[module] || 0) + 1;
        });
    });
    
    // Calculate completion percentage for each module
    const activeStudents = studentList.filter(s => s?.isActive).length;
    
    return Array.from(allModules).map(module => ({
        module,
        completedBy: moduleCount[module],
        completionRate: ((moduleCount[module] / activeStudents) * 100).toFixed(1) + '%'
    }));
}

function generateDetailedReport(studentList) {
    const activeStudents = studentList.filter(s => s?.isActive);
    const inactiveStudents = studentList.filter(s => !s?.isActive);
    
    // Calculate various statistics
    const report = {
        metadata: {
            generatedAt: new Date().toISOString(),
            totalStudents: studentList.length,
            activeStudents: activeStudents.length,
            inactiveStudents: inactiveStudents.length
        },
        
        academics: {
            classAverage: parseFloat(getClassAverage(studentList).toFixed(2)),
            topPerformers: getTopPerformers(studentList, 90),
            excellentStudents: getTopPerformers(studentList, 95),
            needsSupport: getStudentsNeedingSupport(studentList, 75),
            
            scoreDistribution: {
                'A (90-100)': activeStudents.filter(s => getStudentAverage(s) >= 90).length,
                'B (80-89)': activeStudents.filter(s => {
                    const avg = getStudentAverage(s);
                    return avg >= 80 && avg < 90;
                }).length,
                'C (70-79)': activeStudents.filter(s => {
                    const avg = getStudentAverage(s);
                    return avg >= 70 && avg < 80;
                }).length,
                'D (60-69)': activeStudents.filter(s => {
                    const avg = getStudentAverage(s);
                    return avg >= 60 && avg < 70;
                }).length,
                'F (Below 60)': activeStudents.filter(s => getStudentAverage(s) < 60).length
            }
        },
        
        progress: {
            moduleCompletion: getModuleCompletion(studentList),
            averageModulesCompleted: parseFloat(
                calculateAverage(
                    activeStudents.map(s => s?.modulesCompleted?.length ?? 0)
                ).toFixed(1)
            ),
            
            fastestLearners: activeStudents
                .filter(s => s?.modulesCompleted?.length > 0)
                .sort((a, b) => 
                    (b?.modulesCompleted?.length ?? 0) - (a?.modulesCompleted?.length ?? 0)
                )
                .slice(0, 3)
                .map(s => ({
                    name: getStudentName(s),
                    modulesCompleted: s?.modulesCompleted?.length ?? 0
                }))
        },
        
        attendance: {
            averageAttendance: parseFloat(
                (calculateAverage(activeStudents.map(s => s?.attendance ?? 0)) * 100).toFixed(1)
            ) + '%',
            
            perfectAttendance: activeStudents
                .filter(s => s?.attendance >= 0.95)
                .map(s => getStudentName(s))
        },
        
        dataQuality: {
            missingNames: studentList.filter(s => !s?.name).length,
            missingScores: studentList.filter(s => !s?.scores || s.scores.length === 0).length,
            missingEmails: studentList.filter(s => !s?.email).length,
            dataCompleteness: parseFloat(
                ((studentList.filter(s => 
                    s?.name && s?.email && s?.scores?.length > 0
                ).length / studentList.length) * 100).toFixed(1)
            ) + '%'
        },
        
        recommendations: []
    };
    
    // Add recommendations based on data
    if (report.academics.needsSupport.length > studentList.length * 0.3) {
        report.recommendations.push('Over 30% of students need additional support');
    }
    
    if (report.dataQuality.dataCompleteness < 80) {
        report.recommendations.push('Improve data collection - many fields are missing');
    }
    
    if (report.attendance.averageAttendance < 85) {
        report.recommendations.push('Address attendance issues - below 85% average');
    }
    
    return report;
}

// ====================================
// GENERATE AND DISPLAY REPORT
// ====================================

console.log('\n' + '='.repeat(50));
console.log('     📊 STUDENT PROGRESS DASHBOARD');
console.log('='.repeat(50));

const fullReport = generateDetailedReport(students);

// Display summary
console.log('\n📈 QUICK SUMMARY:');
console.log(`• Class Average: ${fullReport.academics.classAverage}%`);
console.log(`• Active Students: ${fullReport.metadata.activeStudents}/${fullReport.metadata.totalStudents}`);
console.log(`• Top Performers: ${fullReport.academics.topPerformers.join(', ') || 'None'}`);
console.log(`• Need Support: ${fullReport.academics.needsSupport.length} students`);

// Convert to JSON for "sending to server"
const reportJSON = JSON.stringify(fullReport, null, 2);

console.log('\n📤 JSON Report (Ready for API):');
console.log(reportJSON.substring(0, 500) + '...'); // Show first 500 chars

// Save to file simulation
console.log('\n✅ Report generated successfully!');
console.log(`📁 Report size: ${reportJSON.length} bytes`);

// ====================================
// BONUS: INDIVIDUAL STUDENT CARDS
// ====================================

function generateStudentCard(student) {
    const name = getStudentName(student);
    const average = getStudentAverage(student);
    const modules = student?.modulesCompleted?.length ?? 0;
    const attendance = ((student?.attendance ?? 0) * 100).toFixed(1);
    
    return `
╔════════════════════════════════════╗
║         STUDENT REPORT CARD         ║
╠════════════════════════════════════╣
║ Name: ${name.padEnd(29)} ║
║ Average: ${average.toFixed(1).padEnd(26)} ║
║ Modules: ${modules.toString().padEnd(26)} ║  
║ Attendance: ${(attendance + '%').padEnd(23)} ║
║ Status: ${student?.isActive ? '✅ Active' : '❌ Inactive'}              ║
╚════════════════════════════════════╝
`;
}

console.log('\n📋 INDIVIDUAL STUDENT CARDS:');
students.slice(0, 2).forEach(student => {
    console.log(generateStudentCard(student));
});
