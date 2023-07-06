import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage'
import ContactPage from './Components/ContactPage';
import Charts from './Components/Charts';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='contact' element={<ContactPage></ContactPage>}></Route>
        <Route path='charts' element={<Charts></Charts>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

