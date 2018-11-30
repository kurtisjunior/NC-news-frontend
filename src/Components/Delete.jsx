import React, { Component } from 'react';
import * as api from '../api.js'

import {
    Button,

} from 'reactstrap';

class Delete extends Component {
    render() {
        return (
            <>
                <Button size="sm" onClick={() => this.handleDelete(this.props.id)}>Delete</Button>{''}
            </>
        );
    }

    handleDelete = (id) => {
        api.deleteSomething(id)
            .then(res => {
                console.log(res)
            })

        this.props.optimisticDelete(id)

    }
}

export default Delete;