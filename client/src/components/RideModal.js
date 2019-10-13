import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class RideModal extends Component {
    state = {
        modal: false,
        name: "",
        emailSender: "",
        emailReceiver: "",
        message: ""
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        //e.preventDefault();

        console.log("Email sent!");

        const emailReceiver = this.props.emailReceiver;
        const {name, emailSender, message} = this.state;

        if(name != "" && emailSender != "" && message != ""){
            const form = await axios.post('/api/form', {
                name,
                emailReceiver,
                emailSender,
                message
            })
        }

        //Close modal
        this.toggle();
    }

    render(){
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem', marginTop:'2rem'}}
                    onClick={this.toggle}
                >
                Contact</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Send an email to {this.props.name}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input onChange={this.onChange} type="name" name="name" id="name" placeholder="Enter your name..." />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input onChange={this.onChange} type="email" name="emailSender" id="email" placeholder="Enter your email..." />
                            </FormGroup>
                            <FormGroup>
                                <Label for='message'>Message *Your name and email will be sent to {this.props.name}.</Label>
                                <Input
                                    onChange={this.onChange}
                                    type='textarea'
                                    name='message'
                                    id='message'
                                    placeholder="Type your message..."
                                    onChange={this.onChange}
                                />
                                <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Send</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default RideModal;
