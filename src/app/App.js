import React,{memo} from 'react';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Provider } from 'react-redux';

import Header from './components/Header';
import { store } from '../store';
import TodoList from './components/TodoList';
const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <TodoList />
      
      {/* toastify message */}
      <ToastContainer 
        position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    </Provider>
  );
}

export default memo(App);
