import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDisplayForm : false,
            keyword : '',
            filterName : '',
            filterStatus : '-1',
            itemEditing : null,
            sortBy : 'name',
            sortValue : 1
        };
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onUpdateStatus = (id) => {
        var tasks = this.state.tasks;
        var index = this.findIndex(id);
        tasks[index].status = !tasks[index].status;
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onSave = (data) => {
        var tasks = this.state.tasks;
        data.status = data.status === 'true' ? true : false;
        if(data.id === ''){
            data.id = this.guid();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index]= data;
        }
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm = () => {
        if(this.state.itemEditing !== null){
            console.log('th1')
            this.setState({
                itemEditing : null
            });
        }else{
            this.setState({
                isShowingForm : !this.state.isShowingForm
            });
        }
    }

    onExitForm = () =>{
        this.setState({
            isShowingForm : false,
            itemEditing : null
        });
    }

    onDeleteTask = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onExitForm();
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }

    onFilter = (filterName, filterStatus) => {
        this.setState({
            filterName : filterName,
            filterStatus : filterStatus
        });
    }

    onSelectedItem = (item) => {
        this.setState({
            itemEditing : item,
            isDisplayForm : true
        })
    }

    render() {
        var { isDisplayForm, sortBy, sortValue, filterName, filterStatus, itemEditing } = this.state;
        // tasks = filter(tasks, (task) => {
        //     return includes(task.name.toLowerCase(), keyword.toLowerCase());
        // });
        // if(filterName){
        //     tasks = filter(tasks, (task) => {
        //         return includes(task.name.toLowerCase(), filterName.toLowerCase());
        //     });
        // }
        // if(filterStatus){
        //     tasks = filter(tasks, (task) => {
        //         if(filterStatus === '-1' || filterStatus === -1){
        //             return task;
        //         }else{
        //             return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
        //         }
        //     });
        // }
        // tasks = orderBy(tasks, [sortBy], [sortValue]);
        var elmForm = isDisplayForm === true ? 
        <TaskForm
            onSave={this.onSave}
            onExitForm={this.onExitForm}
            itemEditing={ itemEditing }
            /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        { elmForm }
                    </div>
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <TaskControl
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        <TaskList
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            filterName={filterName}
                            filterStatus={filterStatus}
                            onFilter={this.onFilter}
                            onSelectedItem={this.onSelectedItem}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;