import React,{memo,useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {  toast } from 'react-toastify';

import { actions } from '../../actions';

const TodoModal = ({itemId,text,setText}) => {
    const dispatch = useDispatch();

    //get dispaly modal of store 
    const display = useSelector(state =>  state.modal);

    const [textModal,setTextModal] = useState('New');
    const [textButton,setTextButton] = useState('Add');
    //state for show and hide modal
    const [show,setShow] = useState('hidden');

    useEffect(()=>{
        if(itemId){
            setTextModal('Edit');
            setTextButton('Edit');
        }else{
            setTextModal('New');
            setTextButton('Add');
        }
    });
    //close modal
    const cancelModal = () =>{
        dispatch(actions.modal(display));
        setText('');
        document.body.style.overflow = "auto";
    }
    //edit and create todo
    const handleSubmit = () => {
        if(text){
            if(itemId){
                //edit todo
                dispatch(actions.editTodo(text,itemId));
            }else{
                //create todo
                dispatch(actions.addTodo(text));
            }
            //hidden modal
            dispatch(actions.modal(display));
            //value text = null
            setText('');
            //body overflow auto
            document.body.style.overflow = "auto";
        }else{
            toast.error('Please fill in the blank field',{theme: "colored"});
        }
    }
    useEffect(()=>{
        //set show and hide modal class
        if(display)
            setShow('flex');
        else
            setShow('hidden');
    },[display]);
    return (
        <div className={`bg-modalCustom fixed top-0 left-0 right-0 bottom-0 z-20 ${show} items-center justify-center`}> 
            <form 
                onSubmit={(event)=>event.preventDefault()} 
                className='w-11/12 md:w-2/3 bg-whiteCustom rounded-3xl p-5'
            > 
                <h4 className='text-textCustom text-3xl font-bold'>{textModal} Todo</h4>
                <p className='text-blackCustom h-11 mt-5 mb-3'>Please write content of todo in input below!</p>
                <input 
                    className='text-input w-full border-b-2 border-white2Custom focus:outline-none py-2 px-2.5 text-textCustom placeholder:text-grayCustom mb-8' 
                    placeholder='Do something!' 
                    type='text' 
                    value={text}
                    onChange={event=>setText(event.target.value)}
                />   
                <div className='flex justify-end'> 
                    <button 
                        onClick={cancelModal}
                        type='button' 
                        className='text-grayCustom text-center cursor-pointer w-16'
                    >Cancel</button>
                    <button 
                        onClick={handleSubmit}
                        type='submit' 
                        className='text-infoCustom text-center cursor-pointer w-16'
                    >{textButton}</button>
                </div> 
            </form>  
        </div>
    )
}

export default memo(TodoModal);
