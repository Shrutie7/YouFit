import React, { useState } from 'react'

const Setting = () => {

  const [tab,settab] = useState("profileinfo");
  return (
    

  <div class=" container mx-auto max-w-3xl mt-20 h-screen pt-3" >
    {/* <h1 class="text-3xl font-bold font-sans text-white px-6 md:px-0">Account Settings</h1> */}
    <div className='lg:bg-gray-200 h-[85%] overflow-x-hidden overflow-y-hidden sm:bg-gray-200 md:bg-gray-200'>
    <ul class="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-6">
      <li class="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#_" class= {`${tab==="profileinfo" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("profileinfo")}>Profile Info</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="passwordupdate" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("passwordupdate")}>Password Update</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="planupdate" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("planupdate")}>Plan Details</a></li>
    </ul>
     <div class="w-full bg-white rounded-lg mx-auto mt-8 flex h-[72%] overflow-y-auto rounded-b-none">
        <div class="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
          <h2 class="font-medium text-md text-gray-700 mb-4 tracking-wide">{tab==="profileinfo" ?"Profile Info":tab==="passwordupdate" ? "Password Update":"Plan Details"}</h2>
          <p class="text-xs text-gray-500">{tab==="profileinfo" ?"Update your basic profile information such as Email Address, Name, and Image.":tab==="passwordupdate" ? "Update your Password":"Update your Plan to switch to a newer and better Plan"}</p>
        </div>
        {tab==="profileinfo"?<div class="md:w-2/3 w-full px-8 pt-6 pb-8 mb-4  flex flex-col">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">First Name</label>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-gray-700" type="text" value="" name="name"/> */}
          <input type="text" class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white"/>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Last Name</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text"  />
          </div>
          {/* <hr class="border-gray-200"/> */}
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="email" class="text-sm text-gray-600">Email Address</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="email"  />
          </div>
          </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Gender</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Gym Address</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" />
          </div>
          {/* <hr class="border-gray-200"/> */}
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="email" class="text-sm text-gray-600">Trainer</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="email" name="email"/>
          </div>
          </div>
          <hr class="border-gray-200"/>
          <div class="py-8 px-16 clearfix">
            <label for="photo" class="text-sm text-gray-600 w-full block">Photo</label>
            <img class="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left" id="photo" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_400x400.jpg" alt="photo"/>
            <div class="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
              <input type="file" name="photo" onchange="loadFile(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/> Change Photo
            </div>
          </div>

        </div>:tab==="passwordupdate" ? 
<div>

</div>

        
        
        
        :<div></div> }

      </div>
      <div class="p-10 pt-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200 ">
        <p class="float-left text-xs text-gray-500 tracking-tight mt-2">{tab==="profileinfo" ?"Click on Save to update your Profile Info":tab==="passwordupdate" ? "Click on Save to update your Password":"Click on Save to update your Plan"}</p>
        <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer mb-2" value="Save"/>
      </div>
      </div>
  </div>

  )
}

export default Setting;