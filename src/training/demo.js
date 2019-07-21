import { createStore } from 'redux';

var initialState = {
    status : 'name',
    sort : {
        by : 'name',
        value : 1 // 1: tăng, -1: giảm
    }
}

var myReducer = ( state = initialState, action ) => {
    if( action.type === 'TOGGLE_STATUS') {
        state.status = !state.status;
        return state;
    }
    if(action.type === 'SORT') {
        var { by, value } = action.sort;
        var { status } = state;
        return {
            status : status,
            sort : {
                by : by,
                value : value
            }
        }
        // state.sort = {
        //     by : action.sort.by,
        //     value :  action.sort.value
        // }
    }
    return state;
}

const store = createStore(myReducer);
console.log('Default: ',store.getState());

//Thực hiện công việc thay đổi Status
var action = { type : 'TOGGLE_STATUS'};
store.dispatch(action);
console.log('TOGGLE_STATUS : ', store.getState());

//Thực hiện công việc sắp sếp từ Z tới A
var sortAction = {
    type: 'SORT',
    sort : {
        by : 'name',
        value : -1
    }
}
store.dispatch(sortAction);
console.log('SORT : ',store.getState());