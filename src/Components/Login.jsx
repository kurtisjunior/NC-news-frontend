import React, { Component } from 'react';

import {
    Form, FormGroup, Input, Label, Button, ModalFooter
} from 'reactstrap';

class Login extends Component {
    state = {
        user: ''
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup >
                        <Label>Username</Label>
                        <Input type="textarea" placeholder='JessJelly' onChange={this.handleChange} value={this.state.user} />
                        <Label>Password</Label>
                        <Input type="password" />
                        <Button color="primary" >submit</Button>
                        <Button color="secondary">Cancel</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Login;

