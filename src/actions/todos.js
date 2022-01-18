//get todolist of localstorage 
export const getTodo = () => {
    try {
        return async (dispatch) => {
            if(localStorage.getItem("todolist")){
                const todos = localStorage.getItem("todolist");
                await dispatch({ type: "ADD_TODO", payload: JSON.parse(todos) });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
//create new todo
export const addTodo = (text) => {
    return async (dispatch,getState) => {
        const todos = [...getState().todos];
        //Get now today's date
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let key = -1;
        if(todos.length){
            todos.forEach((item,index)=>{
                let oldDate = parseInt(item.date);
                oldDate = new Date(oldDate);
                const oldYear = oldDate.getFullYear();
                const oldMonth = oldDate.getMonth();
                const oldDay = oldDate.getDate();
                if(oldYear === year && month === oldMonth && day === oldDay){
                    key = index;
                    return false;
                }
            });
        }
        const todo = {
            id: Math.floor(Math.random(100) * 1000),
            text,
            todo: false,
        }
        if(key > -1){
            let todoList = todos[key].todolist;
            todoList.push(todo);
        }else{
            const todoList = {
                date: date.getTime(),
                todolist: [todo]
            }
            todos.push(todoList);
        }
        await dispatch({ type: "ADD_TODO", payload: todos });
        localStorage.setItem("todolist", JSON.stringify(todos));
    }
}

//Completion and non-completion of todo
export const checkTodo = (id,date) => {
    return async (dispatch,getState) => {
        if(id){
            const todos = [...getState().todos];
            const todosIndex = todos.findIndex(item => item.date === date);
            const todoIndex = todos[todosIndex].todolist.findIndex(item => item.id === id);
            if(todoIndex > -1){
                const items = todos[todosIndex].todolist;
                const item = items[todoIndex];
                item.todo = !item.todo;
                items[todoIndex] = item;
                todos[todosIndex].todolist = items;
            }
            console.log(todos);
            await dispatch({ type: "ADD_TODO", payload: todos });
            localStorage.setItem("todolist", JSON.stringify(todos));
        }
    }
}
//delete todo
export const deleteTodo = (id,date) => {
    return async (dispatch,getState) => {
        if(id){
            const todos = [...getState().todos];
            const todosIndex = todos.findIndex(item => item.date === date);
            const todoIndex = todos[todosIndex].todolist.findIndex(item => item.id === id);
            if(todoIndex > -1){
                todos[todosIndex].todolist.splice(todoIndex,1);
            }
            await dispatch({ type: "ADD_TODO", payload: todos });
            localStorage.setItem("todolist", JSON.stringify(todos));
        }
    }
}
//edit todo
export const editTodo = (text,id,date) => {
    return async (dispatch,getState) => {
        const todos = [...getState().todos];
        const todosIndex = todos.findIndex(item => item.date === date);
        const todoIndex = todos[todosIndex].todolist.findIndex(item => item.id === id);
        if(todoIndex > -1){
            const items = todos[todosIndex].todolist;
            const item = items[todoIndex];
            item.text = text;
            items[todoIndex] = item;
            todos[todosIndex].todolist = items;
        }
        await dispatch({ type: "ADD_TODO", payload: todos });
        localStorage.setItem("todolist", JSON.stringify(todos));
}
}