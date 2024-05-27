import React from 'react'
import Monitor from '../components/Monitor'
import OTA from '../components/OTA'
import WifiMonitor from '../components/WifiMonitor'

function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center py-3 space-y-4'>
      <Monitor />
      <OTA />
      <WifiMonitor/>
    </div>
  )
}

export default HomePage
