import React, {  useState } from 'react'
import useRoutes from '../routes'
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'

const FilledLayout = () => {
    const routes = useRoutes()
    const [toggle, setToggle] = useState(false);

    
    return (
            <div className="app-main-layout open">
                <Navbar toggleSidebar={(isOpen) => setToggle(isOpen)} />
                <Sidebar isOpen={toggle} /> 
                <main className={`app-content ${!toggle ? 'full' : ''}`}>
                    <div className="app-page">
                        {routes}
                    </div>
                </main>
            </div>   
    )
}

export default FilledLayout