import React, { Component } from 'react';





export class List extends React.Component {
    constructor(props) {
        super(props);
        this.changeUserInput = this.changeUserInput.bind(this);
        this.addToList = this.addToList.bind(this);
        this.state = {
            userInput: '',
            list: ["Task1", "Task2"],
            visible: false,
            err: "",
            duplicate: false,
            editBtn: false,
            successmsg: ""


        }
        this.deleteItem = this.deleteItem.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateTask = this.updateTask.bind(this);

    }
    changeUserInput(e) {
        this.setState({
            userInput: e.target.value,
            err: "",
            successmsg: ""
        });
    }
    checkDuplicates() {

        let list = this.state.list
        let userInput = this.state.userInput
        if (list.length >= 1) {
            for (let i = 0; i < list.length; i++) {
                if (userInput == list[i]) {
                    this.setState({
                        err: "Task is already added",
                        duplicate: true
                    })
                    return true;
                }
                else {
                    this.setState({
                        err: "",
                        duplicate: false
                    })
                }
            }
        }
        if (this.state.duplicate == false) {
            this.addToList();
        }
    }



    addToList() {

        let input = this.state.userInput
        if (input == '') {
            this.setState({
                err: "Fill the input field!",
            })
        } else {
            let { list } = this.state
            list.push(input);
            this.setState({
                list,
                userInput: "",
                editBtn: false
            })
        }
    }

    deleteItem(input) {
        return new Promise((resolve, reject) => {
            this.setState(state => ({
                list: state.list.filter(val => val != input)
            }));

            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error:error something went wrong');
            }
        });
    }


    editItem(val, index) {
        return new Promise((resolve, reject) => {
            let list = this.state.list


            this.setState({
                userInput: val,
                but: index,
                list: list,
                editBtn: true

            })

            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error:error something went wrong');
            }
        });
    }


    updateTask() {
        let list = this.state.list
        let but = this.state.but
        let userInput = this.state.userInput

        this.updateList(list,but,userInput)
        .then((result)=>{
            this.setState({
                list: result,
                userInput: "",
                successmsg: "Task is updated",
                editBtn: false
            })
        })
        
        
    }

    updateList(list,but,userInput){

        return new Promise((resolve, reject) => {
            list.splice(but, 1, userInput)
            resolve(list)
        })
    }

    visible() {
        this.setState({
            visible: true
        })
    }


    render() {
        const CSSerr = {
            color: 'red',
        };
        const CSSsuccess = {
            color: 'green'
        }
        let button
        let editBtn = this.state.editBtn
        if (editBtn) {
            button = <button onClick={this.updateTask}>Update</button>
        }
        else {
            button = <button onClick={this.checkDuplicates}>Add Task</button>
        }
        const er = this.state.err
        const successmsg = this.state.successmsg
        const maplist = this.state.list
        let todoList = maplist.map((val, index) =>
            <li key={index}>{val}&nbsp;
                            <button onClick={this.deleteItem.bind(this, val)}>Remove</button>
                <button onClick={this.editItem.bind(this, val, index)}>Edit</button>

            </li>

        )

        return (
            <div>
                <div style={CSSerr} >{er}</div>
                <div style={CSSsuccess}>{successmsg}</div>
                <div className="Container">
                    <input onChange={this.changeUserInput} value={this.state.userInput} type="textarea" />
                    {button}
                    <ul>
                        {todoList}
                    </ul>
                </div></div>
        );
    }
}

export default List;