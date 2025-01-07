
import{ BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import DashboardPage from './pages/Dashboard'
import CoinPage from './pages/CoinPage'
import WatchList from './pages/WatchList'

function App() {

  return <div className='App'>
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/coin/:id' element={<CoinPage/>} />
        <Route path='/watchlist' element={<WatchList />} />
     </Routes>
    </BrowserRouter>
  
  </div>
}

export default App
