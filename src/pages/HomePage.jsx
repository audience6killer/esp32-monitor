import React from 'react'
import Monitor from '../components/Monitor'
import ControlStickyBar from '../components/ControlStickyBar'

function HomePage() {
  return (
    <div className='flex xl:flex-row sm:flex-col items-center justify-around py-3 space-y-4'>
      <Monitor className="basis-3/4"/>
      <ControlStickyBar className="basis-1/4"/>
    </div>
  )
}

export default HomePage
