import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {cloneDeep,clone} from "lodash"

import TodoModal from './TodoModal';
import TodoTable from './TodoTable';
import DeleteTodoModal from './DeleteTodoModal';
import { actions } from '../../actions';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TodoList = () => {
    const dispatch = useDispatch();
    //get all todos
    useEffect(()=>{
        try{
            dispatch(actions.getTodo());
        }catch(error){
            console.log(error);
        }
    },[]);
    let todos = useSelector(state => state.todos);
    const [todosFilter,setTodosFilter] = useState([]);

    useEffect(()=>{
        setTodosFilter(todos);
    },[todos]);
    const display = useSelector(state =>  state.modal);

    //get id todo (create new todo button state=0 && edit button state = todo id)
    const [itemId,setItemId] = useState(0);
    const [itemDate,setItemDate] = useState(0);
    
    //input value
    const [text,setText] = useState('');

    const createTodo = () =>{
        //show modal for create new todo
        dispatch(actions.modal(display));
        setItemId(0);
        setText('');
        document.body.style.overflow = "hidden";
    }
    //incompletetTask filter
    const incompletetTask = (index) => {
        const newTodo = cloneDeep(todos);
        const incompletet = newTodo[index].todolist.filter(item => item.todo === false);
        newTodo[index].todolist = incompletet;
        setTodosFilter(newTodo);
    }
    //completetTask filter
    const completetTask = (index) => {
        const newTodo = cloneDeep(todos);
        console.log(newTodo);
        const incompletet = newTodo[index].todolist.filter(item => item.todo);
        newTodo[index].todolist = incompletet;
        setTodosFilter(newTodo);
    }
    return (
        <>
        <main className='mb-16'>  
            {todosFilter.map((item,index) => {
                const date = new Date(item.date);
                const year = date.getFullYear();
                let month = date.getMonth();
                month = months.filter((item,index) => index === month ? item : '');
                const day = date.getDate();
                return (
                    <div key={index} className='bg-whiteCustom rounded-3xl p-5 md:p-14 mx-auto shadow-card mt-16 w-11/12 lg:w-3/4 md:w-11/12'>
                        {/* heade todos content */}
                        <div className='flex flex-col md:flex-row  items-center justify-between mb-9'> 
                            <div className='flex items-center'> 
                                <span className='text-blackCustom pr-1 text-5xl'>{day}</span>    
                                <div>   
                                    <span className='block text-blackCustom'>{month}</span> 
                                    <span className='block text-textCustom'>{year}</span> 
                                </div>
                            </div>
                            <div className='flex flex-col mt-2 md:flex-row md:mt-0'> 
                                <button onClick={()=>incompletetTask(index)} type='button' className='w-52 text-center text-blueCustom font-black cursor-pointer'>incompletet task</button>
                                <button onClick={()=>completetTask(index)} type='button' className='w-30 text-center text-textCustom cursor-pointer'>completet task</button>
                            </div>
                        </div>
                        <TodoTable 
                            data={item.todolist} 
                            date={item.date} 
                            setText={setText} 
                            setItemId={setItemId} 
                            setItemDate={setItemDate} 
                        />
                    </div> 
                );
            })}
                    
            {/* circle add button for create todo */}
            <button 
                onClick={createTodo}
                type='button' 
                className='fixed bottom-5 bg-infoCustom rounded-full w-14 h-14 flex justify-center items-center text-whiteCustom text-2xl right-5 md:right-56'
            >+</button>  
        </main>
        {/* create and edit todo modal */}
        <TodoModal itemId={itemId} itemDate={itemDate} text={text} setText={setText}/>
        <DeleteTodoModal itemId={itemId} itemDate={itemDate}/>
      </>
    )
}

export default TodoList;
