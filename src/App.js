import React, {Component} from 'react';
import './App.css';
// import Datepicker from './datepicker/Datepicker';
import Calendar from './datepicker/Calendar';
import * as Styled from './datepicker/styles';

class App extends Component {
  render () {
    return (
      <Styled.Body>
        <Calendar />
      </Styled.Body>
    );
  }
}

export default App;
