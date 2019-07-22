import * as types from './../contants/actiontype';

export const status = () => {
    return {
        type : types.TOGGLE_STATUS
    }
}

export const sort = (sort) => {
    return {
        type : types.SORT,
        sort // sort :  sort
    }
}