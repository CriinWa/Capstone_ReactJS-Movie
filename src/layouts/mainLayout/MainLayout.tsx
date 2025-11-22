import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export const MainLayout = () => {
  return (
    <>
        <Header />

        <div className="main-container min-h-[calc(100vh-72px)] flex items-center justify-center py-8 mt-12">
            <main className="main-content w-full"> 
                <Outlet />
            </main>
        </div>
        <Footer />
        
    </>
  )
}
