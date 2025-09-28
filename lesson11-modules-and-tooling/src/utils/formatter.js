// src/utils/formatter.js - Date formatting utilities
// This demonstrates dynamic imports and third-party library integration

/**
 * Format current date using dynamic import of date-fns
 * This is loaded only when needed for performance optimization
 */
export async function formatCurrentDate() {
  try {
    // Dynamic import - loads date-fns only when this function is called
    const { format, formatDistanceToNow, isToday, isWeekend } = await import(
      'date-fns'
    );

    const now = new Date();
    
    const results = {
      formatted: format(now, 'EEEE, MMMM do, yyyy \'at\' h:mm a'),
      iso: format(now, 'yyyy-MM-dd HH:mm:ss'),
      relative: formatDistanceToNow(now, { addSuffix: true }),
      isToday: isToday(now),
      isWeekend: isWeekend(now),
      timestamp: now.getTime(),
    };

    console.log('✅ Date formatting completed with date-fns');
    return results;
  } catch (error) {
    console.error('❌ Failed to load date-fns:', error);
    
    // Fallback to native Date methods
    const now = new Date();
    return {
      formatted: now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      iso: now.toISOString().slice(0, 19),
      relative: 'just now',
      isToday: true,
      isWeekend: [0, 6].includes(now.getDay()),
      timestamp: now.getTime(),
      fallback: true,
    };
  }
}

/**
 * Format a specific date with custom format
 * @param {Date} date - Date to format
 * @param {string} formatString - Format string for date-fns
 * @returns {Promise<string>} Formatted date string
 */
export async function formatDate(date, formatString = 'PPP') {
  try {
    const { format } = await import('date-fns');
    return format(date, formatString);
  } catch (error) {
    console.warn('Using fallback date formatting:', error.message);
    return date.toLocaleDateString();
  }
}

/**
 * Get various date formats for demonstration
 */
export async function getDemoFormats() {
  const now = new Date();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  try {
    const { format, formatDistanceToNow } = await import('date-fns');
    
    return {
      'Full Date': format(now, 'EEEE, MMMM do, yyyy'),
      'Short Date': format(now, 'MMM d, yyyy'),
      'Time Only': format(now, 'h:mm a'),
      'ISO Format': format(now, 'yyyy-MM-dd'),
      'Relative (Yesterday)': formatDistanceToNow(yesterday, { addSuffix: true }),
      'Relative (Next Week)': formatDistanceToNow(nextWeek, { addSuffix: true }),
      'Custom Format': format(now, "'Today is' EEEE 'the' do 'of' MMMM"),
    };
  } catch (error) {
    return {
      'Error': 'Could not load date-fns library',
      'Fallback': now.toLocaleDateString(),
    };
  }
}