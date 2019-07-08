import React, { Component } from 'react';
import "./App.css";
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Control from './components/Control';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false
        }
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')) {
            const tasks = [JSON.parse(localStorage.getItem('tasks'))];
            this.setState({
                tasks : tasks
            });
        }
    }

    onGenerateData = () => {
        const tasks  = [
            {
                id: this.generateID(),
                name: 'Học lập trình',
                status: true
            },
            {
                id: this.generateID(),
                name: 'Học bơi',
                status: false
            },
            {
                id: this.generateID(),
                name: 'Học tán gái',
                status: true
            }
        ];
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify('tasks'));
    }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { tasks, isDisplayForm } = this.state; //const tasks = this.state.tasks
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {/*Form*/}
                        <TaskForm />
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" className="btn btn-primary">
                            <span className="fa fa-plus mr-5" />
                            Thêm Công Việc
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger ml-5"
                            onClick={ this.onGenerateData }>
                            Generate Data 
                        </button>

                        {/*Search-Sort*/}
                        <Control />
                        {/*List*/}
                        <TaskList tasks = {tasks}/>
                    </div>
                </div>
            </div>
        );
    }
}
 



export default App;


