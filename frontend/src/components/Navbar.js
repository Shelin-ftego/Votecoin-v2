import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import {Link} from 'react-router-dom';
import './Navbar.css';
//<i class="fas fa-person-booth"></i>


function Navbar() {
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


    window.addEventListener('resize', showButton);
    return (
        <>
         <nav className="navbar">
             <div className="navbar-container">
                 <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> 
                   VOTECOIN <i className='class="fas fa-person-booth"'/>
                 </Link>
                  <div className='menu-icon' onClick={handleClick}>
                      <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                 <ul className= {click ? 'nav-menu active' : 'nav-menu'}>
                     <li className='nav-item'>
                         <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                           Home    
                         </Link> 
                     </li>
                     <li className='nav-item'>
                         <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                           About    
                         </Link> 
                     </li>
                     <li className='nav-item'>
                         <Link to='/register' className='nav-links' onClick={closeMobileMenu}>
                           Register   
                         </Link> 
                     </li>
                     <li className='nav-item'>
                         <Link to='/support' className='nav-links' onClick={closeMobileMenu}>
                           Support   
                         </Link> 
                     </li>
                 </ul>
                 {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
             </div>  
         </nav>   
        </>
    )
}

export default Navbar
