import React ,{Component} from 'react';
import {Footer} from './Footer';
import {Layout} from './Layout';

class App extends Component {
    render(){
        return(
        <div>
            <h1>To Do List</h1>
            <Layout />
            <Footer />
            </div>
        );}
}

export default App;