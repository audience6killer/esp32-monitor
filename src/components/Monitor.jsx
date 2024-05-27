import React from 'react'

function Monitor() {
  return (
    <div className='flex-col justify-center items-center text-center'>
        <h2 className='text-xl lg:text-3xl'>Monitor</h2>
        <div className='p-3 border-rose-800 border-2 rounded-md m-2'>
            <label htmlFor="gps-reading" className='mr-2'>Lectura de GPS</label>
            <input id='gps-reading' type="text" className='border-slate-700 border-2 rounded-md h-auto' readOnly/>
        </div>
    </div>
  )
}

export default Monitor
