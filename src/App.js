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
            var tasks = [JSON.parse(localStorage.getItem('tasks'))];
            this.setState({
                tasks : tasks
            });
        }
    }

    onGenerateData = () => {
        var tasks  = [
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

    onToggleForm = () => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        data.id = this.generateID();
        tasks.push(data);
        this.setState({
            tasks : tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render() {
        var { tasks, isDisplayForm } = this.state; //const tasks = this.state.tasks
        var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={ this.onSubmit } onCloseForm={ this.onCloseForm }/> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/*Form*/}
                        {elmTaskForm}
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ this.onToggleForm }
                            >
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


