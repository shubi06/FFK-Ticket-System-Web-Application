import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Userlist from './Userlist'
import Selektorlist from './Selektort/SelektorList'
import SelektorCreate from './Selektort/SelektorCreate'
import SelektorEdit from './Selektort/SelektorEdit'
import SelektorDelete from './Selektort/SelektorDelete'

function Portal() {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className='container-fluid'>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Portal

