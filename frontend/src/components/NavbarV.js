import React, { useState, useEffect } from 'react';
import { LogoutButton} from './LogoutButton'
import {Link} from 'react-router-dom';
import './NavbarV.css';
import axios from 'axios'
//<i class="fas fa-person-booth"></i>


function NavbarV() {
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
        await axios.post('/voter/logout', body, config)
      }
      catch(e){
        console.log(e)

      }
    }

    window.addEventListener('resize', showButton);
    return (
        <>
         <nav className="navbarV">
             <div className="navbarV-container">
                 <Link to="/voter" className="navbarV-logo" onClick={closeMobileMenu}> 
                   VOTECOIN <i className='class="fas fa-person-booth"'/>
                 </Link>
                  <div className='menu-icon' onClick={handleClick}>
                      <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                 <ul className= {click ? 'navV-menu active' : 'nav-menu'}>
                 <li className='navV-item'>
                         <Link to='/upload' className='navV-links' onClick={closeMobileMenu}>
                           Upload Images    
                         </Link> 
                     </li>
                     <li className='navV-item'>
                         <Link to='/Vcard' className='navV-links' onClick={closeMobileMenu}>
                           Vote    
                         </Link> 
                     </li>
                     <li className='navV-item'>
                         <Link to='/verify' className='navV-links' onClick={closeMobileMenu}>
                           Verification    
                         </Link> 
                     </li>
                     <li className='navV-item'>
                         <Link to='/results' className='navV-links' onClick={closeMobileMenu}>
                           Results   
                         </Link> 
                     </li>
                 </ul>
                 {button && <LogoutButton buttonStyle='btn--outline' onClick={logoutUser}>LOG OUT</LogoutButton>}
             </div>  
         </nav>   
        </>
    )
}

export default NavbarV