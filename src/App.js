import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from  './components/books/Books';
import MainLayout from './mainLayout/mainLayout';
import ReturnStatus from './components/returnStatus/ReturnStatus';
import Member from './components/member/Member';
import Issuance from './components/issuance/Issuance';

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="books/" element={<Books />} />
        <Route path="issuance/" element={<Issuance />} />
        <Route path="members/" element={<Member />} />
        <Route path='return-status' element={<ReturnStatus />} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App