/*
## Practice Drills
1.  Experiment with each primitive type. In a script, declare one of each, then log its value and the result of `typeof`.
2.  Build a unit converter that turns kilometers into miles. Prompt the user for the value, convert it using `Number()`, and print the result with a clear message using a template literal.
3.  Write a script that checks if a user is eligible for a senior discount. Define variables for `age` and `isMember`. The user is eligible if they are over 65 OR if they are over 60 and a member. Log the result.
*/

/*
## Project: Personal Finance Snapshot
Create `finance-snapshot.js` that calculates and displays a user's basic financial health.
*/

// #### Project Starter Code
// finance-snapshot.js

// --- Inputs (hard-coded for now) ---
const monthlyIncome = 5000;
const rent = 1500;
const groceries = 400;
const utilities = 250;
const otherExpenses = 800;

// --- Calculations ---
// TODO: Calculate total monthly expenses.
const totalExpenses = rent + groceries + utilities + otherExpenses;

// TODO: Calculate monthly savings.
const monthlySavings = monthlyIncome - totalExpenses;

// TODO: Calculate the savings rate as a percentage (e.g., 20%)
// Hint: (savings / income) * 100
const savingsRate = (monthlySavings / monthlyIncome) * 100;

// TODO: Calculate the remaining daily budget after all expenses.
// Assume 30 days in a month.
const dailyBudget = (monthlyIncome - totalExpenses) / 30;

// --- Output ---
console.log("--- Your Financial Snapshot ---");
// TODO: Use console.log and template literals to print a formatted summary.
// Example: `Total Monthly Expenses: $XXXX`
// Example: `You are saving XX% of your income.`
console.log(`Monthly Income: $${monthlyIncome}`);
console.log(`Total Monthly Expenses: $${totalExpenses}`);
console.log(`Monthly Savings: $${monthlySavings}`);
console.log(`Savings Rate: ${savingsRate.toFixed(2)}%`);
console.log(`Your average daily budget is: $${dailyBudget.toFixed(2)}`);
console.log("-----------------------------");
