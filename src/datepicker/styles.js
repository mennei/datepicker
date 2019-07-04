import styled from 'styled-components';

export const Body = styled.div`
  {
    direction: rtl;
    width: 350px;
    margin: auto;
  }
`;

export const ArrowContainer = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #e8e3e3;
  border-radius: 5%;
`;

export const Arrow = styled.button`
  background-color: #fff;
  width: 10px;
  height: 10px;
  background: transparent;
  position: relative;
  top: -3px;
`;

export const ArrowLeft = styled (Arrow)`
  right: 6px;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  :hover {
    border-right-color: #06c;
    border-bottom-color: #06c;
  }
`;

export const ArrowRight = styled (Arrow)`
  right: 9px;  
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  border-right: 2px solid #e8e3e3;
  border-bottom: 2px solid #e8e3e3;
  :hover {
    border-right-color: #06c;
    border-bottom-color: #06c;
  }
`;

export const CalendarContainer = styled.div`
  padding: 15px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-warp: warp;
`;

export const Header = styled.div`
  text-align: center;
  font-size: 19px;
  font-family: Almoni;
  font-weight: bold;
`;

export const CalendarGrid = styled.div`
  display: grid;
  #grid-template: repeat(7,auto) / repeat(7,auto);
  grid-auto-columns: 45px;
  grid-auto-rows: 40px;
`;

export const CalendarMonthSelect = styled.div`
  font-family: Almoni;
  font-size: 15px;
  text-align: center;
  word-spacing: 5px;
  user-select: none;
`;

export const CalendarCell = styled.div`
  text-align: center;
  margin: auto;
  letter-spacing: 0.1rem;
  user-select: none;
  grid-column: ${props => props.index % 7 + 1} / span 1;
  height: 35px;
  width: 35px;
  line-height: 35px;
  background-color: #d7e5dd;
  border-radius: 50%;
`;

export const CalendarDay = styled (CalendarCell)`
  font-weight: bold;  
  font-size: 14px;
  font-family: Almoni;
  background-color: white;
`;

export const CalendarDate = styled.div`
  text-align: center;
  font-size: 12px;
  font-family: Open Sans;
  color: #e1eff2;
  line-height: 35px;
`;

export const NotInMonthCalendarDate = styled (CalendarDate)`
  color: #e8e3e3 !important;
  background: #fff !important;
`;

export const HighlightedCalendarDate = styled (CalendarCell)`
  font-family: Open Sans;
  font-size: 12px;  
  color: #5aa87c;
  background: #c1d4f2;
  position: relative;
  cursor: pointer;
  :hover {
    color: #fff;
    background: #266842;
  }
`;

export const CalendarFooter = styled.div`
  font-family: Almoni;
  font-size: 14px;
`;

export const FooterUl = styled.ul`
  list-style: none;
  font-weight: bold; 
  width: 350px;
  font-size: 14px;
  display: block;
  padding: 0;
  text-align: right;
`;

export const FooterLi = styled.li`
  content: "\2022";
`;

export const FooterSpan = styled.span`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  display: inline-block;
  float:right;
  margin-left: 10px;
`;

export const FooterSpanBlue = styled (FooterSpan)`
  background-color: #e1eff2;
`;

export const FooterSpanRed = styled (FooterSpan)`
  background-color: #f9e5f6;
`;

export const SelectMonths = styled.select`
  height: 30px;
  width: 150px;
  border: 1px solid #e8e3e3;
  border-radius: 4px;
  font-family: Almoni;
  font-size: 15px;
  overflow-y: scroll;
  :hover{
    background: #efeded;
    color: #5aa87c;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
`;
