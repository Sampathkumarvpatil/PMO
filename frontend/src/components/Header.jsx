import React from 'react'

const Header = () => {
  return (
    <table className='p-2 text-[18px] border-collapse border-2 border-[#aaa] m-2'>
      <tbody>
        <tr className="task-row"> 
          {/* Sr */}
          <td className='p-2 border-solid border-2 border-[#aaa] w-[20px]'>
            Sr.
          </td>
          {/* TaskId */}
          <td className='p-2 border-solid border-2 border-[#aaa] w-[150px]'>
            <span className='text-[#848482]'>Task ID:</span>{' '}
          </td>
          {/* Title */}
          <td className='p-2 border-solid border-2 border-[#aaa] w-[200px]'>
            <span className='text-[#848482]'>Title:</span><br />
          </td>
          {/* Planning Poker */}
          <td className='p-2 border-solid border-2 border-[#aaa]'>
            <span className='text-[#848482]'>Planning Poker</span>
          </td>



          {/* Status */}
          <td className='p-2 border-solid border-2 border-[#aaa]'>
            <span className='text-[#848482]'>Status</span>
          </td>

          {/* Resources */}
            <td
            className='p-1 border-solid border-2 border-[#aaa]'>
              R
            </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Header