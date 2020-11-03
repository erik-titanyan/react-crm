import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    useEffect(() => {
        window.M.AutoInit()
    });


    const sidebarCategories = [
            {title: 'Balance', url: '/'},
            {title: 'History', url: '/history'},
            {title: 'Planning', url: '/planning'},
            {title: 'New record', url: '/record'},
            {title: 'Categories', url: '/categories'},
    ]
    return (
        <ul className={`sidenav app-sidenav ${isOpen ? 'open' : ''}`} >
            {
                sidebarCategories.map((cat,idx) => {
                    return <li key={idx}>
                        <Link to={cat.url} className="waves-effect waves-orange pointer">{cat.title}</Link>
                    </li>
                })
            }
        </ul>
    )
}

export default Sidebar