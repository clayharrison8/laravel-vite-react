import './bootstrap';
import '../css/app.css';

import ReactDOM from 'react-dom/client';        
import TodoForm from './components/TodoForm';

ReactDOM.createRoot(document.getElementById('app')).render(     
    <TodoForm />        
);