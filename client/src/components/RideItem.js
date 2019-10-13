import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import RideModal from './RideModal';
import dukeLogo from '../NC-Logos/duke-logo.png';
import ncsLogo from '../NC-Logos/ncs-logo.png';
import uncLogo from '../NC-Logos/unc-logo.png';
import uncgLogo from '../NC-Logos/uncg-logo.png';
import wfLogo from '../NC-Logos/wf-logo.png';
import './rideItem.css';

export default class RideItem extends Component {
    render() {

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var logo;

        switch(this.props.ride.college){
            case "Duke":
                logo = dukeLogo;
                break;
            case "UNC Chapel Hill":
                logo = uncLogo;
                break;
            case "NC State":
                logo = ncsLogo;
                break;
            case "Wake Forest":
                logo = wfLogo;
                break;
            case "UNC Greensboro":
                logo = uncgLogo;
                break;

        }

        return (
            <ListGroupItem key={this.props.ride.id}>
                <div className="row">
                    <div className="col-6 mt-4">              
                        <div>{this.props.ride.name}</div>
                        <div>{this.props.ride.college}</div>
                        <div>{months[this.props.month]} {this.props.day} {this.props.year}</div>
                        <div>Flight Time - {this.props.hour}:{this.props.minute} {this.props.ampm}</div>
                    </div>
                    <div className="col-6">
                        <img src={logo} alt={this.props.ride.college} className="img"></img>
                        <RideModal name={this.props.ride.name} emailReceiver={this.props.ride.email}></RideModal>
                    </div>
                </div>
            </ListGroupItem>
        )
    }
}
