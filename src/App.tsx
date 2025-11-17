import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/Button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="text-red-400">
        Click on the Vite and React logos to learn more
      </p>
      <Button size='lg'>Click me</Button>
    </>
  )
}

export default App
