import ReactDOM from 'react-dom/client'; 
import '/src/styles/index.css';
import { RoutesApplication } from './RoutesApp.jsx';

const root= ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <RoutesApplication/>
)
