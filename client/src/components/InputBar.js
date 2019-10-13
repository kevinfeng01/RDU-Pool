import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form, FormGroup, Label, Popover, PopoverHeader, PopoverBody, FormText } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './inputBar.css';

export default class InputBar extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            date: new Date(),
            name: "",
            college: "UNC Chapel Hill",
            email: "",
            popoverOpen: false
        };
      }
    
    /*state = {
        date: new Date(),
        name: "",
        college: "UNC Chapel Hill",
        email: "",
        popoverOpen: false
    }*/

    onDateChange = (d) => {
        this.setState({date: d});
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    } 

    onFormSubmit = (e) => {
        e.preventDefault();

        console.log("Name: " + this.state.name);
        console.log("College: " + this.state.college);

        fetch('/api/items', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                college: this.state.college,
                date: this.state.date,
                email: this.state.email
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        window.location.reload(true);
    }

    render() {
        return (
            <div id="bar"> 
                <Form onSubmit={this.onFormSubmit}>
                    <div className = "row">
                        <FormGroup className="col-4">
                            <Label>Name</Label>
                            <Input type="name" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/>
                        </FormGroup>

                        <FormGroup className="col-4">
                            <Label for="exampleSelect">College</Label>
                            <Input type="select" name="select" id="exampleSelect" value={this.state.college} onChange={e => this.setState({ college: e.target.value })}>
                            <option>UNC Chapel Hill</option>
                            <option>Duke</option>
                            <option>NC State</option>
                            <option>Wake Forest</option>
                            <option>UNC Greensboro</option>
                            </Input>
                        </FormGroup>

                        <FormGroup className="col-4">
                            <Label>Email</Label>
                            <Input type="email" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}/>
                        </FormGroup>
                        
                        <DateTimePicker
                            value = {this.state.date}
                            onChange = {this.onDateChange}
                            className = "row m-auto p-2"
                        >

                        </DateTimePicker>
                    </div>
                
                    <div className = "row mt-3">
                        <Button id="Popover1" onClick={this.toggle}>
                            Help
                        </Button>
                        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                            <PopoverHeader>Popover Title</PopoverHeader>
                            <PopoverBody>Filter: Filters to list entries with similar flight time on date from same school
                                Submit: Submits your data into the database so that others can view
                            </PopoverBody>
                        </Popover>
                        <Button type="button" onClick={() => this.props.filterList(this.state.college,this.state.date)} className="button col-4 m-auto">Filter</Button>
                        <Button type="submit" className="button col-4 m-auto">Submit</Button>
                        <Button type="button" onClick={this.props.resetList} className="button col-4 m-auto">Reset</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
