import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home/Home'
import VIdeo from './page/Video/VIdeo'

const App = () => {

  const [sidebar , setSidebar] = useState(true)

  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}></Route>
        <Route path='/video/:categoryId/:videoId' element={<VIdeo />}></Route>

      </Routes>
    </div>
  )
}

export default App
