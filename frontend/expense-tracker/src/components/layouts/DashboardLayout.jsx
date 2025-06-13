import React,{useContext} from 'react'
import {Usercontext} from '../../context/user.context.jsx'
import Navbar from './Navbar.jsx';
import SideMenu from './SideMenu.jsx';

const DashboardLayout = ({children,activeMenu}) => {
    const {user} = useContext(Usercontext);
    // console.log("after login",user);
  return (
    <div className=''>
        <Navbar activeMenu ={activeMenu} />
        {user && (
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        )}
    </div>
  )
}

export default DashboardLayout