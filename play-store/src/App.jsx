import React from 'react'
import AppRouter from "./AppRouter"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </>
  )
}

export default App;
