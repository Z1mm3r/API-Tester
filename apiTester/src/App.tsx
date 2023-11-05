import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RouteTester from './screens/routeTester'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouteTester />
    </>
  )
}

export default App
