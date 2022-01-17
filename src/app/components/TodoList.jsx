import React,{memo,useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';

import TodoModal from './TodoModal';
import TodoTable from './TodoTable';
import DeleteTodoModal from './DeleteTodoModal';
import { actions } from '../../actions';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TodoList = () => {
    const dispatch = useDispatch();
    //get all todos
    const todos = useSelector(state => state.todos);
    const display = useSelector(state =>  state.modal);

    //count complate todo
    const [completet,setCompletet] = useState(0);
    //count incompletet todo
    const [incompletet,setIncompletet] = useState(0);

    const [year,setYear] = useState('');
    const [month,setMonth] = useState('');
    const [day,setDay] = useState('');

    //get id todo (create new todo button state=0 && edit button state = todo id)
    const [itemId,setItemId] = useState(0);
    
    //input value
    const [text,setText] = useState('');

    useEffect(()=>{
        //Get today's date to display at the top of todolist
        const date = new Date();
        setYear(date.getFullYear());
        let getMonth = date.getMonth();
        getMonth = months.filter((item,index) => index === getMonth ? item : '');
        setMonth(getMonth);
        setDay(date.getDate());
    },[]);

    useEffect(()=>{
        //count complate todo and incomplate todo
        let countComplate = 0;
        let countIncomplate = 0;
        todos.forEach(item => {
            if(item.todo)
                countComplate++;
            else
                countIncomplate++;
        });
        setCompletet(countComplate);
        setIncompletet(countIncomplate);
    });

    const createTodo = () =>{
        //show modal for create new todo
        dispatch(actions.modal(display));
        setItemId(0);
        setText('');
        document.body.style.overflow = "hidden"
    }
    return (
        <>
        <main>  
            {todos.length > 0 ?
                <div className='bg-whiteCustom rounded-3xl p-14 mx-auto shadow-card my-16 w-11/12 lg:w-3/4 md:w-11/12'>
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
                            <span className='w-52 text-center text-blueCustom font-black'>incompletet task: {incompletet}</span>
                            <span className='w-30 text-center text-textCustom'>completet task: {completet}</span>
                        </div>
                    </div>
                    <TodoTable setText={setText} setItemId={setItemId}/>
                </div> 
                : null
            }
            {/* circle add button for create todo */}
            <button 
                onClick={createTodo}
                type='button' 
                className='fixed bottom-5 bg-infoCustom rounded-full w-14 h-14 flex justify-center items-center text-whiteCustom text-2xl right-5 md:right-56'
            >+</button>  
        </main>
        {/* create and edit todo modal */}
        <TodoModal itemId={itemId} text={text} setText={setText}/>
        <DeleteTodoModal itemId={itemId}/>
      </>
    )
}

export default memo(TodoList);
