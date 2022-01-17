import {  toast } from 'react-toastify';

//create new todo
export const addTodo = (text) => {
    return async (dispatch,getState) => {
        if(text){
            const todos = [...getState().todos];
            const todo = {
                id: Math.floor(Math.random(100) * 1000),
                text,
                todo: false,
            }
            todos.push(todo);
            await dispatch({ type: "ADD_TODO", payload: todos });
            const modal = document.querySelector('.modal');
            modal.classList.add('hidden');
        }else{
            toast.error('Please fill in the blank field',{theme: "colored"});
        }
    }
}

//Completion and non-completion of todo
export const checkTodo = (id) => {
    return async (dispatch,getState) => {
        if(id){
            const todos = [...getState().todos];
            const todoIndex = todos.findIndex((item,index) => item.id === id);
            if(todoIndex > -1){
                const item = todos[todoIndex];
                item.todo = !item.todo;
                todos[todoIndex] = item;
            }
            await dispatch({ type: "ADD_TODO", payload: todos });
        }
    }
}
//delete todo
export const deleteTodo = (id) => {
    return async (dispatch,getState) => {
        if(id){
            const todos = [...getState().todos];
            const todoIndex = todos.findIndex((item,index) => item.id === id);
            if(todoIndex > -1){
                todos.splice(todoIndex,1);
            }
            await dispatch({ type: "ADD_TODO", payload: todos });
        }
    }
}
//edit todo
export const editTodo = (text,id) => {
    return async (dispatch,getState) => {
        if(id && text){
            const todos = [...getState().todos];
            const todoIndex = todos.findIndex((item,index) => item.id === id);
            if(todoIndex > -1){
                const item = todos[todoIndex];
                item.text = text;
                todos[todoIndex] = item;
            }
            await dispatch({ type: "ADD_TODO", payload: todos });
            const modal = document.querySelector('.modal');
            modal.classList.add('hidden');
        }else{
            toast.error('Please fill in the blank field',{theme: "colored"});
        }
    }
}