/*
====================================
LESSON 03: PRACTICE DRILLS
====================================

Time: 45-60 minutes
Goal: Master variables, data types, and operators

------------------------------------
DRILL 1: Data Type Detective (15 mins)
------------------------------------
Mission: Explore all 7 primitive types and understand typeof

Why This Matters:
- You'll encounter all these types in real code
- typeof helps you debug type-related bugs
- Understanding types prevents 50% of JavaScript errors
*/

// YOUR TASK: Create one variable of each type and check its type
// Example is done for you:
const myName = "Alice";           // String
console.log(myName);              // "Alice" 
console.log(typeof myName);       // "string"

// Now you create the rest:
// Number:
const myAge = 25;
console.log(`myAge value: ${myAge}, type: ${typeof myAge}`);

// Boolean:
const isStudent = true;
console.log(`isStudent value: ${isStudent}, type: ${typeof isStudent}`);

// Undefined (declare but don't assign):
let futureGoal;
console.log(`futureGoal value: ${futureGoal}, type: ${typeof futureGoal}`);

// Null (intentionally empty):
let currentJob = null;
console.log(`currentJob value: ${currentJob}, type: ${typeof currentJob}`);
// Note: typeof null returns "object" - this is a JavaScript bug!

// Challenge: Create a BigInt
const bigNumber = 123n;  // Add 'n' to make it BigInt
console.log(`bigNumber value: ${bigNumber}, type: ${typeof bigNumber}`);

/*
------------------------------------
DRILL 2: Unit Converter (15 mins)
------------------------------------
Mission: Build a kilometers to miles converter

Why This Matters:
- Practice type conversion (string to number)
- Use template literals for clear output
- Real-world math application

Formula: miles = kilometers * 0.621371
*/

// METHOD 1: Hard-coded value (start here)
const kilometersString = "100";  // Simulating user input
const kilometers = Number(kilometersString);  // Convert to number
const miles = kilometers * 0.621371;

console.log(`${kilometers} km = ${miles.toFixed(2)} miles`);
// toFixed(2) rounds to 2 decimal places

// METHOD 2: Using prompt (only works in browser, not Node.js)
// Uncomment this if running in browser:
/*
const userInput = prompt("Enter kilometers:");
const km = Number(userInput);
const mi = km * 0.621371;
alert(`${km} kilometers = ${mi.toFixed(2)} miles`);
*/

// BONUS: Add error checking
const badInput = "abc";
const convertedBad = Number(badInput);
if (isNaN(convertedBad)) {
    console.log("Error: Please enter a valid number!");
} else {
    console.log(`Result: ${convertedBad * 0.621371} miles`);
}

/*  
------------------------------------
DRILL 3: Senior Discount Checker (15 mins)
------------------------------------
Mission: Use logical operators to check discount eligibility

Business Rules:
- Over 65: Always gets discount
- 60-65 + Member: Gets discount
- Everyone else: No discount

Why This Matters:
- Real business logic uses these patterns
- Practice with AND (&&) and OR (||)
- Combine multiple conditions
*/

// Test Case 1: Senior citizen
let age1 = 70;
let isMember1 = false;
let eligible1 = age1 > 65 || (age1 > 60 && isMember1);
console.log(`Age ${age1}, Member: ${isMember1}, Eligible: ${eligible1}`);
// Should be: true (over 65, membership doesn't matter)

// Test Case 2: Member between 60-65
let age2 = 62;
let isMember2 = true;
let eligible2 = age2 > 65 || (age2 > 60 && isMember2);
console.log(`Age ${age2}, Member: ${isMember2}, Eligible: ${eligible2}`);
// Should be: true (over 60 AND member)

// Test Case 3: Non-member between 60-65
let age3 = 62;
let isMember3 = false;
let eligible3 = age3 > 65 || (age3 > 60 && isMember3);
console.log(`Age ${age3}, Member: ${isMember3}, Eligible: ${eligible3}`);
// Should be: false (over 60 but NOT member)

// Test Case 4: Young person
let age4 = 30;
let isMember4 = true;
let eligible4 = age4 > 65 || (age4 > 60 && isMember4);
console.log(`Age ${age4}, Member: ${isMember4}, Eligible: ${eligible4}`);
// Should be: false (too young)

// BONUS: Make it a function
function checkSeniorDiscount(age, isMember) {
    return age > 65 || (age > 60 && isMember);
}

console.log("\nUsing function:");
console.log(checkSeniorDiscount(70, false));  // true
console.log(checkSeniorDiscount(62, true));   // true
console.log(checkSeniorDiscount(62, false));  // false

/*
====================================
PROJECT: Personal Finance Calculator
====================================

Time: 30-45 minutes
Difficulty: Beginner

Your Mission:
Build a financial health calculator that shows if someone
is saving enough money and living within their means.

What You'll Learn:
- Working with multiple variables
- Performing calculations
- Using template literals for formatted output
- Making financial data meaningful

Real-World Application:
This is similar to what apps like Mint or YNAB do!
*/

// ====================================
// PART 1: INPUT DATA (Modify these to test)
// ====================================

// Monthly income (what you earn)
const monthlyIncome = 5000;  // Try different amounts: 3000, 7500, etc.

// Monthly expenses (what you spend)
const rent = 1500;           // Housing cost
const groceries = 400;       // Food budget
const utilities = 250;       // Electric, water, internet
const transportation = 300;  // Car/bus/gas
const entertainment = 200;   // Fun money
const otherExpenses = 350;   // Everything else

// Financial goals
const savingsGoalPercent = 20;  // Experts recommend saving 20%

// ====================================
// PART 2: CALCULATIONS (Your code here)
// ====================================

// Step 1: Calculate total monthly expenses
const totalExpenses = rent + groceries + utilities + transportation + entertainment + otherExpenses;

// Step 2: Calculate monthly savings
const monthlySavings = monthlyIncome - totalExpenses;

// Step 3: Calculate actual savings rate
const savingsRate = (monthlySavings / monthlyIncome) * 100;

// Step 4: Calculate if meeting savings goal
const meetingSavingsGoal = savingsRate >= savingsGoalPercent;

// Step 5: Calculate daily spending money (after fixed expenses)
const daysInMonth = 30;
const dailyBudget = monthlySavings / daysInMonth;

// Step 6: Calculate yearly projections
const yearlySavings = monthlySavings * 12;
const yearlyIncome = monthlyIncome * 12;

// Step 7: Financial health score (custom formula)
let financialHealth;
if (savingsRate >= 20) {
    financialHealth = "Excellent! 🌟";
} else if (savingsRate >= 10) {
    financialHealth = "Good 👍";
} else if (savingsRate >= 5) {
    financialHealth = "Fair ⚠️";
} else if (savingsRate >= 0) {
    financialHealth = "Needs Improvement 🔴";
} else {
    financialHealth = "Critical - Spending more than earning! 🆘";
}

// ====================================
// PART 3: OUTPUT REPORT
// ====================================

console.log("\n📊 ==================================");
console.log("   YOUR PERSONAL FINANCE SNAPSHOT");
console.log("===================================\n");

// Income Section
console.log("💰 INCOME");
console.log(`   Monthly: $${monthlyIncome.toFixed(2)}`);
console.log(`   Yearly:  $${yearlyIncome.toFixed(2)}\n`);

// Expenses Breakdown
console.log("💳 EXPENSES BREAKDOWN");
console.log(`   Rent:           $${rent.toFixed(2)} (${((rent/monthlyIncome)*100).toFixed(1)}% of income)`);
console.log(`   Groceries:      $${groceries.toFixed(2)} (${((groceries/monthlyIncome)*100).toFixed(1)}% of income)`);
console.log(`   Utilities:      $${utilities.toFixed(2)}`);
console.log(`   Transportation: $${transportation.toFixed(2)}`);
console.log(`   Entertainment:  $${entertainment.toFixed(2)}`);
console.log(`   Other:          $${otherExpenses.toFixed(2)}`);
console.log(`   ------------------------------`);
console.log(`   TOTAL:          $${totalExpenses.toFixed(2)}\n`);

// Savings Analysis  
console.log("🎯 SAVINGS ANALYSIS");
console.log(`   Monthly Savings: $${monthlySavings.toFixed(2)}`);
console.log(`   Savings Rate:    ${savingsRate.toFixed(1)}%`);
console.log(`   Goal Rate:       ${savingsGoalPercent}%`);
console.log(`   Meeting Goal?    ${meetingSavingsGoal ? 'YES ✅' : 'NO ❌'}`);
console.log(`   Yearly Savings:  $${yearlySavings.toFixed(2)}\n`);

// Daily Budget
console.log("📅 DAILY BUDGET");
console.log(`   After expenses, you can spend $${dailyBudget.toFixed(2)}/day\n`);

// Financial Health
console.log("🏥 FINANCIAL HEALTH: " + financialHealth);

// Recommendations
console.log("\n💡 RECOMMENDATIONS:");
if (savingsRate < 20) {
    const additionalSavingsNeeded = (monthlyIncome * 0.20) - monthlySavings;
    console.log(`   • Try to save an additional $${additionalSavingsNeeded.toFixed(2)}/month`);
    console.log(`   • Consider reducing your largest expense (${rent > groceries ? 'rent' : 'groceries'})`);
}
if (rent / monthlyIncome > 0.30) {
    console.log(`   • Your rent is ${((rent/monthlyIncome)*100).toFixed(1)}% of income (recommended: <30%)`);
}
if (savingsRate >= 20) {
    console.log(`   • Great job! Consider investing your surplus savings`);
    console.log(`   • You're on track to save $${(yearlySavings * 5).toFixed(0)} in 5 years!`);
}

console.log("\n===================================\n");

// ====================================
// BONUS CHALLENGES
// ====================================

/*
Challenge 1: Add an emergency fund calculator
- Calculate how many months of expenses are covered by savings
- Recommend 3-6 months of expenses as emergency fund

Challenge 2: Add debt payments
- Add variables for credit card, student loans, etc.
- Calculate debt-to-income ratio
- Show how much faster debt could be paid with extra payments

Challenge 3: Investment calculator
- If saving 20%, calculate compound interest over 10 years
- Show the power of investing early

Challenge 4: Make it interactive
- Use prompt() to get user input (works in browser)
- Validate that inputs are numbers
- Handle edge cases (negative income, etc.)
*/
