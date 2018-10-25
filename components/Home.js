import React, { Component } from 'react';
import { List } from './List';

export class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>To Do List</h1>
                <div><List /></div>
            </div>
        );
    }
}

export default Home;