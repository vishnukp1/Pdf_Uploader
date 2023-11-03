import './App.css';
import {BrowserRouter, Routes,Route  } from 'react-router-dom'
import UploadPdf from './Pages/UploadPdf';
import Home from './component/Home';
import Collection from './Pages/Collection';

function App() {
  return (
    <div className="App " style={{ background: "#f0f9ff", height: "100%" }}>
  <BrowserRouter>
<Routes>
<Route path='/' element={<UploadPdf />}/>
<Route path='/frontpage' element={<Home />}/>
<Route path='/view' element={<Collection />}/>



</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
