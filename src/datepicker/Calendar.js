import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styles';

// Calendar is Two-dimensional array that manage in util.js
import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  inLastDays,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
} from '../helpers/utils';

/**
 * The calendar component
 */
class Calendar extends Component {
  // The state hold resolveStateFromProp function (see above)
  // and the selectedOption.
  state = {
    ...this.resolveStateFromProp (),
    // today: new Date (),
    selectedOption: Object.values (CALENDAR_MONTHS)[
      new Date ().getMonth () + 1
    ] +
      ' ' +
      new Date ().getFullYear (),
  };

  /**
   * Resolve state from date
   * 
   * @param {optional} date 
   */
  resolveStateFromDate (date) {
    const isDateObject = isDate (date);
    // When the isDateObject == null (when first loading) it initailze from today.
    const _date = isDateObject ? date : new Date ();

    return {
      current: isDateObject ? date : null,
      month: _date.getMonth () + 1, // getMonth can return 0
      year: _date.getFullYear (),
    };
  }

  /**
   * Call resolveStateFromDate that initailzes the calender.
   * Support applying calendar from datepicker component (not requierd for this task).
   */
  resolveStateFromProp () {
    return this.resolveStateFromDate (this.props.date);
  }

  /**
   * Get calendar dates
   */
  getCalendarDates = () => {
    const {current, month, year} = this.state;
    if (current !== null) {
      const calendarMonth = month || +current.getMonth () + 1;
      const calendarYear = year || current.getFullYear ();
      return calendar (calendarMonth, calendarYear);
    } else {
      return calendar (month, year);
    }
  };

  /**
   * Full the select input in months names (in hebrew) and year,
   * from now up to 12 months.
   */
  fullSelectOption = (month, year) => {
    const options = [];
    for (let i = 0; i <= 12; i++) {
      let dynamicMonth = month + i - 1;
      let dynamicYear = year + 1;
      let dynamicNext = {};
      if (0 <= dynamicMonth && dynamicMonth <= 12) {
        dynamicNext = getNextMonth (dynamicMonth, year);
      } else {
        // New months in new year
        dynamicMonth = dynamicMonth - 12;
        // New year (year + 1)
        dynamicNext = getNextMonth (dynamicMonth, year + 1);
      }
      dynamicMonth = dynamicNext.month;
      // Place in opsions array the months form current month.
      let dynamicMonthName = Object.values (CALENDAR_MONTHS)[dynamicMonth];
      // Start new year, bring January value ('ינואר')
      if (dynamicMonthName == null) {
        dynamicMonthName = Object.values (CALENDAR_MONTHS)[0];
        options.push ({
          value: dynamicMonthName + ' ' + dynamicYear,
          label: dynamicMonthName + ' ' + dynamicYear,
        });
      } else {
        options.push ({
          value: dynamicMonthName + ' ' + dynamicNext.year,
          label: dynamicMonthName + ' ' + dynamicNext.year,
        });
      }
    }
    return options;
  };

  /**
   * Handle select input onChange event
   */
  handleChange = evt => {
    evt && evt.preventDefault ();
    let selectedDate = evt.target.value;
    const selectedArr = selectedDate.split (' ');
    const hebArr = Object.values (CALENDAR_MONTHS);
    let selectedMonth = hebArr.indexOf (selectedArr[0]);
    let selectedYear = selectedArr[1];
    this.setState (
      {
        selectedOption: selectedDate,
        month: Number (selectedMonth),
        year: Number (selectedYear),
      },
      () => {
        const {month, year} = this.state;
        const currentMonth = new Date ().getUTCDate ();
        if (selectedMonth < currentMonth) {
          this.setState (getPreviousMonth (month, year));
        }
        if (selectedMonth > currentMonth) {
          this.setState (getNextMonth (month, year));
        }
      }
    );
  };

  /**
   * Render the month and year header with arrow controls
   * for navigating through months and years
   */
  renderMonthAndYear = () => {
    const {month, year, selectedOption} = this.state;

    // Resolve the month name from the CALENDAR_MONTHS object map
    const options = this.fullSelectOption (month, year);

    return (
      <div>
        <Styled.Header>
          <div>תאריך יציאה</div>
        </Styled.Header>
        <Styled.CalendarHeader>
          <Styled.ArrowContainer>
            <Styled.ArrowRight
              onMouseDown={this.handlePrevious}
              onMouseUp={this.clearPressureTimer}
              title="Previous Month"
            />
          </Styled.ArrowContainer>
          <Styled.CalendarMonthSelect>
            <Styled.SelectMonths
              value={selectedOption}
              onChange={this.handleChange}
            >
              {options.map ((o, index) => (
                <option key={index} value={o.value}>{o.label}</option>
              ))}
            </Styled.SelectMonths>
          </Styled.CalendarMonthSelect>
          <Styled.ArrowContainer>
            <Styled.ArrowLeft
              onMouseDown={this.handleNext}
              onMouseUp={this.clearPressureTimer}
              title="Next Month"
            />
          </Styled.ArrowContainer>
        </Styled.CalendarHeader>
      </div>
    );
  };

  /**
   * Render the label for day of the week
   * This method is used as a map callback as seen in render()
   */
  renderDayLabel = (day, index) => {
    // Resolve the day of the week label from the WEEK_DAYS object map
    const daylabel = WEEK_DAYS[day].toUpperCase ();

    return (
      <Styled.CalendarDay key={daylabel} index={index}>
        {daylabel}
      </Styled.CalendarDay>
    );
  };

  /**
   * Render a calendar date as returned from the calendar builder function
   * This method is used as a map callback as seen in render()
   */
  renderCalendarDate = (date, index) => {
    // console.log ('date ', date, ' index ', index);
    const {current, month, year} = this.state;
    const _date = new Date (date.join ('-'));

    // Check if calendar date is same day as currently selected date
    const isCurrent = current && isSameDay (_date, current);

    // Check if calendar date is in the same month as the state month and year
    const inMonth =
      month &&
      year &&
      isSameMonth (_date, new Date ([year, month, 1].join ('-')));

    // For checking the last days from now till end of month.
    const inLastDaysOfMonth = inLastDays (_date);
    // console.log (inLastDaysOfMonth);
    // The click handler
    const onClick = this.gotoDate (_date);

    const props = {
      isCurrent,
      index,
      inMonth,
      onClick,
      title: _date.toDateString (),
    };

    const DateComponent = !inLastDaysOfMonth
      ? Styled.NotInMonthCalendarDate
      : inLastDaysOfMonth
          ? Styled.HighlightedCalendarDate
          : Styled.CalendarDate;

    return !isNaN (_date.getTime ())
      ? <DateComponent key={getDateISO (_date)} {...props}>
          {_date.getDate ()}
        </DateComponent>
      : <div />;
  };

  /**
   * Activate choosen date
   */
  gotoDate = date => evt => {
    evt && evt.preventDefault ();
    let choosingDateStr = inLastDays (date)
      ? date.toString ()
      : 'לא ניתן לבחור בתאריך זה';
    this.setState ({clickableDate: choosingDateStr});
  };

  /**
   * Go to previous month
   */
  gotoPreviousMonth = () => {
    const {month, year} = this.state;
    this.setState (getPreviousMonth (month, year));
  };

  /**
   * Go to next month
   */
  gotoNextMonth = () => {
    const {month, year} = this.state;
    this.setState (getNextMonth (month, year));
  };

  /**
   * Go to previous year
   */
  gotoPreviousYear = () => {
    const {year} = this.state;
    this.setState ({year: year - 1});
  };

  /**
   * Go to next year
   */
  gotoNextYear = () => {
    const {year} = this.state;
    this.setState ({year: year + 1});
  };

  /**
   * The handlePressure() method simply uses timers to simulate pressure clicking 
   * for rapidly cycling through months or years, 
   * while the clearPressureTimer() method clears these timers.
   */
  handlePressure = fn => {
    if (typeof fn === 'function') {
      fn ();
      this.pressureTimeout = setTimeout (() => {
        this.pressureTimer = setInterval (fn, 100);
      }, 500);
    }
  };

  clearPressureTimer = () => {
    this.pressureTimer && clearInterval (this.pressureTimer);
    this.pressureTimeout && clearTimeout (this.pressureTimeout);
  };

  /**
   * The handlePrevious() and handleNext() event handlers share a similar behavior. 
   * By default, they cycle through the months. 
   * However if the shift key is pressed, then they cycle through years instead. 
   * Finally, they handover control to the handlePressure() method.
   */
  handlePrevious = evt => {
    evt && evt.preventDefault ();
    const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;
    this.handlePressure (fn);
  };

  handleNext = evt => {
    evt && evt.preventDefault ();
    const fn = evt.shiftKey ? this.gotoNextYear : this.gotoNextMonth;
    this.handlePressure (fn);
  };

  render () {
    return (
      <Styled.CalendarContainer>

        {this.renderMonthAndYear ()}

        <Styled.CalendarGrid>
          <Fragment>
            {Object.keys (WEEK_DAYS).map (this.renderDayLabel)}
          </Fragment>

          <Fragment>
            {this.getCalendarDates ().map (this.renderCalendarDate)}
          </Fragment>
        </Styled.CalendarGrid>
        <Styled.FooterUl>
          <Styled.FooterLi>
            <Styled.FooterSpanBlue />
            תאריכי יציאה וחזרה אפשריים
          </Styled.FooterLi>
          <Styled.FooterLi>
            <Styled.FooterSpanRed />
            אפשרית טיסת צ'רטר בתאריכים אלו
          </Styled.FooterLi>
        </Styled.FooterUl>
        <div>{this.state.clickableDate}</div>
      </Styled.CalendarContainer>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf (Date),
  onDateChanged: PropTypes.func,
};

export default Calendar;
