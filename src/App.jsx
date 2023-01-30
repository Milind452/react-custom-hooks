import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Hooks
import UseFetch from './Components/UseFetch';
import UseMap from './Components/UseMap';
import UseLocalStorage from './Components/UseLocalStorage';
import UseInterval from './Components/UseInterval';
import UseStateWithHistory from './Components/UseStateWithHistory';
import UseWindowSize from './Components/UseWindowSize';

import Home from './Components/Home';
import './App.css'

function App() {
  const hooks = [
    {'name': 'useFetch', 'component': <UseFetch/>}, 
    {'name': 'useLocalStorage', 'component': <UseLocalStorage/>}, 
    {'name': 'useInterval', 'component': <UseInterval/>}, 
    {'name': 'useStateWithHistory', 'component': <UseStateWithHistory/>}, 
    {'name': 'useMap', 'component': <UseMap/>}, 
    {'name': 'useWindowSize', 'component': <UseWindowSize/>}
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          hooks.map(({name, component}) => {
            console.log(name, component);
            return <Route key={name} path={name} element={component} />;
          })
        }
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
