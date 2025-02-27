// For last day in month calcultion
export const moment = require ('moment');

// (int) The current year
export const THIS_YEAR = +new Date ().getFullYear ();

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +new Date ().getMonth () + 1;

export const MONTH_TILL_NEXT_YEAR = +new Date (THIS_YEAR, 11, 0);

// Week days names and shortnames
export const WEEK_DAYS = {
  Sunday: "א'",
  Monday: "ב'",
  Tuesday: "ג'",
  Wednesday: "ד'",
  Thursday: "ה'",
  Friday: "ו'",
  Saturday: "ש'",
};

// Calendar months names and shortnames
export const CALENDAR_MONTHS = {
  January: 'ינואר',
  February: 'פברואר',
  March: 'מרץ',
  April: 'אפריל',
  May: 'מאי',
  June: 'יוני',
  July: 'יולי',
  August: 'אוגוסט',
  September: 'ספטמבר',
  October: 'אוקטובר',
  November: 'נובמבר',
  December: 'דצמבר',
};

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => {
  return `${value}`.padStart (length, '0');
};

// (int) Number days in a month for a given year from 28 - 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear ? 29 : 28
    : months30.includes (month) ? 30 : 31;
};

// (int) First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  if (month !== 0) {
    // Exclude Jun case
    return new Date (`${year}-${zeroPad (month, 2)}-01`).getDay () + 1;
  } else {
    return new Date (`${year}-${zeroPad (month + 1, 2)}-01`).getDay () + 1;
  }
};

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = date => {
  const isDate = Object.prototype.toString.call (date) === '[object Date]';
  const isValidDate = date && !Number.isNaN (date.valueOf ());

  return isDate && isValidDate;
};

// (bool) Checks if date value is in rand of today till end month
export const inLastDays = (date, today = moment ()) => {
  let dateToCheck = moment (date);
  return dateToCheck.diff (today, 'days') >= 0 ? true : false;
};

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedate = new Date ()) => {
  if (!(isDate (date) && isDate (basedate))) return false;

  const basedateMonth = +basedate.getMonth () + 1;
  const basedateYear = basedate.getFullYear ();

  const dateMonth = +date.getMonth () + 1;
  const dateYear = date.getFullYear ();

  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

// (bool) Checks if two date values are the same day
export const isSameDay = (date, basedate = new Date ()) => {
  if (!(isDate (date) && isDate (basedate))) return false;

  const basedateDate = basedate.getDate ();
  const basedateMonth = +basedate.getMonth () + 1;
  const basedateYear = basedate.getFullYear ();

  const dateDate = date.getDate ();
  const dateMonth = +date.getMonth () + 1;
  const dateYear = date.getFullYear ();

  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
};

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
export const getDateISO = (date = new Date ()) => {
  if (!isDate (date)) return null;

  return [
    date.getFullYear (),
    zeroPad (+date.getMonth () + 1, 2),
    zeroPad (+date.getDate (), 2),
  ].join ('-');
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return {month: prevMonth, year: prevMonthYear};
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return {month: nextMonth, year: nextMonthYear};
};

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  // Get number of days in the month and the month's first day

  const monthDays = getMonthDays (month, year);
  const monthFirstDay = getMonthFirstDay (month, year);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  // Get the previous and next months and years

  const {month: prevMonth, year: prevMonthYear} = getPreviousMonth (
    month,
    year
  );
  const {month: nextMonth, year: nextMonthYear} = getNextMonth (month, year);

  // Get number of days in previous month
  const prevMonthDays = getMonthDays (prevMonth, prevMonthYear);

  // Builds dates to be displayed from previous month

  const prevMonthDates = [...new Array (daysFromPrevMonth)].map ((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad (prevMonth, 2), zeroPad (day, 2)];
  });

  // Builds dates to be displayed from current month

  const thisMonthDates = [...new Array (monthDays)].map ((n, index) => {
    const day = index + 1;
    return [year, zeroPad (month, 2), zeroPad (day, 2)];
  });

  // Builds dates to be displayed from next month

  const nextMonthDates = [...new Array (daysFromNextMonth)].map ((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad (nextMonth, 2), zeroPad (day, 2)];
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
