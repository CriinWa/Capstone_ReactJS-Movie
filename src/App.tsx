import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Button } from './components/ui/Button'
import { routes } from './router'


function App() {
    const [count, setCount] = useState(0)

    return (
        useRoutes(routes)
        /* Qua router/index.tsx để chỉnh các thẻ route */
    )
}

export default App
