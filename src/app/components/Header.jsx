import React,{memo} from 'react';

const Header = () => {
    return (
        <header className='w-full bg-infoCustom h-24 flex items-center px-5 rounded-br-3xl rounded-bl-3xl'>
            <h5 className='text-whiteCustom text-2xl font-bold'>My Todo List</h5>  
        </header>
    )
}

export default memo(Header);
