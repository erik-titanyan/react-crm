import React, { useEffect, useMemo, useState } from 'react'
import { setDateFilter } from '../../hooks/setDateFilter.hook'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../redux/auth/authActions'
import { getUserInfo } from '../../redux/info/infoActions'




const Navbar = ({ toggleSidebar, signOut, getUserInfo, info }) => {
    const [isOpen,setIsOpen] = useState(true)
    const history = useHistory()

    const today = useMemo(() => setDateFilter(Date.now()), [new Date().getDate()])

    useEffect(() => {
      if(!info.user.name && !info.user.bill){
        (async function () {
          return await getUserInfo()
        })()
      }
        const instance = window.M.Dropdown.init(document.getElementById('dropdowner'))
        return () => instance.destroy && instance.destroy()
    }, []);
   
    const sidebarClickHandler = () => {
        setIsOpen(!isOpen)
        toggleSidebar(isOpen)
    }

    const signoutHandler = async () => {
      await signOut()
      history.push('/login?message=logout')
    }
    


    return (
    <nav className="navbar orange lighten-1">
      <div className="nav-wrapper">
        <div className="navbar-left">
          <a href="#" >
            <i className="material-icons black-text" onClick={sidebarClickHandler}>dehaze</i>
          </a>
          <span className="black-text">{today}</span>
        </div>

        <ul className="right hide-on-small-and-down">
          <li>
            <a
                className="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                id='dropdowner'
            >
                {'Hi ' + info.user.name}
              <i className="material-icons right">arrow_drop_down</i>
              
            </a>

            <ul id='dropdown' className='dropdown-content'>
                <li><Link  className="black-text" to='/profile'>
                  <i className="material-icons">account_circle</i>Profile
                </Link></li>
              <li><a href="#" className="black-text" onClick={signoutHandler}>
                  Sign Out
                </a></li>
                {/* <li className="divider" tabIndex="-1"></li> */}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
)}

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
}

const mapDispatchToProps = {
  signOut, getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps )(Navbar)