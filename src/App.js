import './App.css';
import {Routes, Route} from 'react-router-dom'
import Feed from 'pages/Feed';
import PrivateRoute from 'utils/PrivateRoute';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<PrivateRoute><Feed/></PrivateRoute>} />
    </Routes>
    </>
  );
}

export default App;
