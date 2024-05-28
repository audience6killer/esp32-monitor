import React from 'react'
import OTA from './OTA'
import WifiMonitor from './WifiMonitor'


function ControlStickyBar({className}) {
  return (
    <div className={`${className} sticky section-container`}>
      <OTA />
      <hr className="border-none h-0.5 w-auto bg-slate-800" />
      <WifiMonitor/>
    </div>
  )
}

export default ControlStickyBar
