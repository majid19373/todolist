import { combineReducers } from "redux";
import { todos } from './todos';
import { modal } from './modal';
import { deleteModal } from './modal';

export const reducers = combineReducers({
    todos,
    modal,
    deleteModal,
});