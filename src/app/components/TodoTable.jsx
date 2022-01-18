import React,{useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from 'react-redux';

import { actions } from '../../actions';

const TodoTable = ({data,date,setText,setItemId,setItemDate,completet,setCompletet,incompletet,setIncompletet}) => {
    const dispatch = useDispatch();
    //get all todos of store
    const display = useSelector(state => state.display);
    //get dispaly delete modal of store 
    const displayDelete = useSelector(state => state.deleteModal);

    const editTodo = (id,title,date) =>{
        //show edit modal 
        dispatch(actions.modal(display));
        setItemId(id);
        setItemDate(date);
        setText(title);
        //body overflow hidden for freeze
        document.body.style.overflow = "hidden";
    }
    const deleteModal = (id,date) => {
        //show delete modal
        dispatch(actions.deleteModal(displayDelete));
        setItemId(id);
        setItemDate(date);
        //body overflow hidden for freeze
        document.body.style.overflow = "hidden";
    }
    return (
        <>
            <ul>
                {/* todos builder */}
                {data.map(item=>{
                    const checkClass = item.todo ? 'bg-successCustom' : 'border-2 border-grayCustom';
                    const lineThrough = item.todo ? 'line-through' : '';
                    return(
                        <li key={item.id} className='flex py-3 pl-2 md:pl-8 justify-between border-b-2 border-white2Custom'> 
                            <div className='flex1 flex'>  
                                <input 
                                    id={`todo${item.id}`} 
                                    type='checkbox' 
                                    className='absolute -z-10 invisible'
                                    onChange={()=>dispatch(actions.checkTodo(item.id,date))}
                                />
                                <label className='flex1 flex items-center cursor-pointer' htmlFor={`todo${item.id}`}>
                                    <div className={`basis-5 shrink-0 h-5 rounded-full flex items-center justify-center ${checkClass}`}>   
                                        <FontAwesomeIcon className='text-xs text-whiteCustom' icon={faCheck} />
                                    </div>
                                    <span className={`pl-3 break-all ${lineThrough}`}>
                                        {item.text}
                                    </span>
                                </label>
                            </div>
                            <div className='flex'> 
                                <button className='px-4 cursor-pointer' type='button' onClick={()=>editTodo(item.id,item.text,date)}>    
                                    <FontAwesomeIcon className='text-blue2Custom' icon={faPencilAlt} />
                                </button>  
                                <button className='px-4 cursor-pointer' type='button' onClick={()=>deleteModal(item.id,date)}>    
                                    <FontAwesomeIcon className='text-errorCustom' icon={faTrashAlt} />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default TodoTable;
