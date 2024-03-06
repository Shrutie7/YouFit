import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react'

const Worklist = () => {
    const [tab,settab] = useState("pendingworklist");

  return (
    <div class="container mx-auto max-w-3xl mt-20 h-screen pt-3" >
    {/* <h1 class="text-3xl font-bold font-sans text-white px-6 md:px-0">Account Settings</h1> */}
    <div className='lg:bg-gray-200 sm:bg-gray-200 md:bg-gray-200 h-[85%] overflow-x-hidden overflow-y-hidden bg-gray-200'>
    <ul class="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-6">
     {/* {parseInt(loginDetails?.roleId) !== 1 ?  <li class="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#_" class= {`${tab==="profileinfo" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("profileinfo")}>Profile Info</a></li>:<></>} */}
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={` ${tab==="pendingworklist" ? "underline":"no-underline"}  py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("pendingworklist")}>Pending Worklist</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="completedworklist" ? "underline":"no-underline"}   py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("completedworklist")}>Completed Worklist</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="requestedworklist" ? "underline":"no-underline"}   py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("requestedworklist")}>Requested Worklist</a></li>
      {/* {parseInt(loginDetails?.roleId)===4 ?<li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="planupdate" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("planupdate")}>Plan Details</a></li>:<></>} */}
       
    
    
    </ul>
     <div class="w-full bg-white rounded-lg mx-auto mt-8 flex h-[72%] overflow-y-auto rounded-b-none flex justify-center items-center">
  <div className='flex justify-center items-center gap-x-6'>
  <div className='flex flex-col gap-y-4 text-xl text-black font-sans font-bold '>
<div>Worklist Name </div>
<div>Initiated By </div>
<div>Initiated On </div>
<div>Email Id</div>
<div>Role Id </div>
<div>Action Taken </div>

</div>
<div className='flex flex-col gap-y-4 text-xl text-black font-sans font-bold'>
<div>: </div>
<div>: </div>
<div>: </div>
<div>: </div>
<div>: </div>
<div>: </div>

</div>

<div className='flex flex-col gap-y-4 text-xl text-black font-sans font-bold'>
<div> Initiate User Registraton </div>
<div>Sara </div>
<div>23 Mar 24</div>
<div>tyrion@gmail.com</div>
<div>Trainer</div>
<div>Reject </div>

</div>
<div className='flex flex-col gap-y-4 text-xl text-black font-sans font-bold'>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div>Category:</div>
<div>Acted On: </div>


</div>
  </div>


      </div>
      <div class=" flex gap-x-7 justify-end p-7 pt-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200 ">
        {/* <p class="float-left text-xs text-gray-500 tracking-tight mt-1">{tab==="profileinfo" ?"Click on Save to update your Profile Info":tab==="passwordupdate" ? "Click on Save to update your Password":"Click on Save to update your Plan"}</p> */}
        {/* <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer mb-2" value="Save"/> */}

        <button className='sm:-mt-4 md:-mt-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer -mt-4' >Approve
                    </button> 
                    <button className='sm:-mt-4 md:-mt-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer -mt-4' >Reject
                    </button> 
      </div>
      </div>

  
  </div>
  )
}

export default Worklist