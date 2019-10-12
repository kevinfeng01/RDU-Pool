import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import RideModal from './RideModal';

export default class RideItem extends Component {
    render() {

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return (
            <ListGroupItem key={this.props.ride.id}>
              <div>{this.props.ride.name}</div>
              <div>{this.props.ride.college}</div>
              <div>{months[this.props.month]} {this.props.day} {this.props.year}</div>
              <div>{this.props.hour}:{this.props.minute} {this.props.ampm}</div>
              <div>{this.props.ride.email}</div>
              <RideModal name={this.props.ride.name}></RideModal>
            </ListGroupItem>
        )
    }
}
