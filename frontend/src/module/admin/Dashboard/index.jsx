import React from 'react'
import Sidebar from '../Sidebar'

export default function Dashboard() {
  return (
    <div className='flex'>
      {/* //sidebar */}
    <Sidebar/>
    <div className='flex-1 p-8'>Dashboard</div>
    </div>
  )
}
