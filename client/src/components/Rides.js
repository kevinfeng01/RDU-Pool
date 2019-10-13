import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';
import './rides.css';
import RideItem from './RideItem';

class Rides extends Component {
  constructor() {
    super();
    this.state = {
      rides: []
    };
  }

  componentDidMount() {
    fetch('/api/items')
      .then(res => res.json())
      .then(rides => this.setState({rides}, () => console.log('Items fetched...', rides)));
  }

  /*componentWillReceiveProps(nextProps) {
    console.log("child update");
    console.log("nextprops: " + nextProps);
    console.log(nextProps.collegeValue);
    
    this.setState({
      college: nextProps.collegeValue,
      date: nextProps.dateValue
    });

  }*/

  render() {

    return (
      <div>
        <h2>Rides</h2>
        <ListGroup>
        {this.state.rides.map(ride => {
          
          var date = new Date(ride.date);
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          var month = date.getMonth();
          var day = date.getDate();
          var year = date.getFullYear();
          var hour = date.getHours();
          var minute = date.getMinutes();
          var ampm = "am";

          if(minute < 10){
            minute = "0" + minute;
          }

          if(hour >= 12){
            ampm = "pm";
          }

          hour = hour%12;
          
          if(hour == 0){
            hour = 12;
          }

          if(!this.props.filterValue){
            /*return(<ListGroupItem key={ride.id}>
              <div>{ride.name}</div>
              <div>{ride.college}</div>
              <div>{months[month]} {day} {year}</div>
              <div>{hour}:{minute} {ampm}</div>
              <div>{ride.email}</div>
            </ListGroupItem>);*/
            return(<RideItem ride={ride} month={month} day={day} year={year} hour={hour} minute={minute} ampm={ampm}></RideItem>);
          }
          else{
            //console.log("collegeValue: " + this.props.collegeValue);
            //console.log(ride.college);

            var similarTime = true;

            console.log(this.props.dateValue);
            var date2 = new Date(this.props.dateValue);
            if(date2 != undefined){
              console.log("check time");
              console.log(date2);
              if(date2.getFullYear() != year || date2.getMonth() != month || date2.getDate() != day || Math.abs(date2.getHours() - date.getHours() > 2)){
                similarTime = false;
              }
            }

            if(this.props.collegeValue == ride.college && similarTime){
              /*return(<ListGroupItem key={ride.id}>
                <div>{ride.name}</div>
                <div>{ride.college}</div>
                <div>{months[month]} {day} {year}</div>
                <div>{hour}:{minute} {ampm}</div>
                <div>{ride.email}</div>
              </ListGroupItem>);*/
              return(<RideItem ride={ride} month={month} day={day} year={year} hour={hour} minute={minute} ampm={ampm}></RideItem>);
            }
            else{
              return(<div></div>);
            }
          }
        }
        )}
        </ListGroup>
      </div>
    );
  }
}

export default Rides;
