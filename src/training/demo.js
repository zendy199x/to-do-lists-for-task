import { createStore } from 'redux';
import { status, sort } from './actions/index';
import myReducer from './reducers/index';



const store = createStore(myReducer);
console.log('Default: ',store.getState());

//Thực hiện công việc thay đổi Status
store.dispatch(status());
console.log('TOGGLE_STATUS : ', store.getState());

//Thực hiện công việc sắp sếp từ Z tới A
store.dispatch(sort({
    by : 'name',
    value : -1
}));
console.log('SORT : ',store.getState());