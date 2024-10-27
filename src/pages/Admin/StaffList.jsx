import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const StaffList = () => {
  const { staffs, aToken, getAllStaffs,changeAvailability } = useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllStaffs()
    }
  }, [aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
      <h1 className='text-lg font-medium'> All Staff</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {staffs.map((itm, idx) => (
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={idx}>
            <img className='bg-indego-50 group-hover:bg-primary transition-all duration-500' src={itm.image} alt='' />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium '>{itm.name}</p>
              <p className='text-zinc-600 text-sm'>{itm.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
              <input onChange={() => changeAvailability(itm._id)} type='checkbox' checked={itm.available} />
              <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StaffList
