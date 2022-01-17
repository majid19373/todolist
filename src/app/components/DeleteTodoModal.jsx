import React,{memo,useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { actions } from '../../actions';

const DeleteTodoModal = ({itemId}) => {
    const dispatch = useDispatch();

    //get dispaly modal of store 
    const displayDelete = useSelector(state =>  state.deleteModal);
    //state for show and hide modal
    const [show,setShow] = useState('hidden');
    //close modal
    const cancelModal = () =>{
        dispatch(actions.deleteModal(displayDelete));
        document.body.style.overflow = "auto";
    }
    //delete todo
    const deleteModal = () =>{
        dispatch(actions.deleteTodo(itemId));
        dispatch(actions.deleteModal(displayDelete));
        document.body.style.overflow = "auto";
    }
    useEffect(()=>{
        //set show and hide modal class
        if(displayDelete)
            setShow('flex');
        else
            setShow('hidden');
    },[displayDelete]);
    return (
        <div className={`bg-modalCustom fixed top-0 left-0 right-0 bottom-0 z-20 ${show} items-center justify-center`}> 
            <form 
                onSubmit={(event)=>event.preventDefault()} 
                className='w-11/12 md:w-96 bg-whiteCustom rounded-3xl p-5'
            > 
                <p className='text-blackCustom h-11 mt-3 mb-3'>Are you sure you want to delete todo?</p>
                <div className='flex justify-end'> 
                    <button 
                        onClick={cancelModal}
                        type='button' 
                        className='text-grayCustom text-center cursor-pointer w-16'
                    >Cancel</button>
                    <button 
                        onClick={deleteModal}
                        type='submit' 
                        className='text-infoCustom text-center cursor-pointer w-16'
                    >Delete</button>
                </div> 
            </form>  
        </div>
    )
}

export default memo(DeleteTodoModal);
