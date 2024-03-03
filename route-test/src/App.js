import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/u/:id' element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
