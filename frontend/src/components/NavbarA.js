import React, { useState, useEffect } from 'react';
import { LogoutButton} from './LogoutButton'
import {Link} from 'react-router-dom';
import './NavbarA.css';
import axios from 'axios'
//<i class="fas fa-person-booth"></i>

//const newAx = axios.create({
//  headers:{
//    Content-type: "application/json",
//    Authorization: `Bearer ${localStorage.getItem('token')}`
//  }
//})
function NavbarA() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);

    const logoutUser = async()=>{
      try{
        const body ={}
        const token = localStorage.getItem('token')
        const config ={
          headers:{
            "Content-type": "application/json",
            "Authorization": "Bearer "+ token
          }
        }
        localStorage.setItem('token',null)
        await axios.post('/admin/logout', body, config)
      }
      catch(e){
        console.log(e)

      }
    }


    window.addEventListener('resize', showButton);
    return (
        <>
         <nav className="navbarA">
             <div className="navbarA-container">
                 <Link to="/admin" className="navbarA-logo" onClick={closeMobileMenu}> 
                   VOTECOIN <i className='class="fas fa-person-booth"'/>
                 </Link>
                  <div className='menu-icon' onClick={handleClick}>
                      <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                 <ul className= {click ? 'navA-menu active' : 'navA-menu'}>
                     <li className='navA-item'>
                         <Link to='/add-candidate' className='navA-links' onClick={closeMobileMenu}>
                           Candidates    
                         </Link> 
                     </li>
                     <li className='navA-item'>
                         <Link to='/electionstatus' className='navA-links' onClick={closeMobileMenu}>
                           Election Status    
                         </Link> 
                     </li>
                     <li className='navA-item'>
                         <Link to='/view-voters' className='navA-links' onClick={closeMobileMenu}>
                           Voters Roll  
                         </Link> 
                     </li>
                     <li className='navA-item'>
                         <Link to='/blockchain' className='navA-links' onClick={closeMobileMenu}>
                           Authenticate Voters   
                         </Link>
                     </li>
                 </ul>
                 {button && <LogoutButton buttonStyle='btn--outline' onClick={logoutUser}>LOG OUT</LogoutButton>}
             </div>  
         </nav>   
        </>
    )
}

export default NavbarA