import React from 'react'

const Setting = () => {
  return (
    
<div class="bg-gray-200 ">

  {/* <header class="px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
    <div class="flex-1 flex justify-between items-center font-black text-gray-700">
      <a href="#">LOGO</a>
    </div> */}

    {/* <label for="menu-toggle" class="cursor-pointer lg:hidden block">
     <svg class="fill-current text-gray-600 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"</path></svg>
    </label> */}
    {/* <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
      <nav>
        <ul class="lg:flex items-center justify-between text-sm font-medium text-gray-700 pt-4 lg:pt-0">
          <li><a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Dashboard</a></li>
          <li><a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Courses</a></li>
          <li><a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Users</a></li>
          <li><a class="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900 lg:mb-0 mb-2" href="#">Support</a></li>
        </ul>
      </nav>
      <a href="#" class="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor" id="userdropdown">
      <img class="rounded-full w-10 h-10 border-2 border-transparent hover:border-pink-400 ignore-body-click" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_normal.jpg" alt="avatar">
    </a>
      <div id="usermenu" class="absolute lg:mt-12 pt-1 z-40 left-0 lg:left-auto lg:right-0 lg:top-0 invisible lg:w-auto w-full">
        <div class="bg-white shadow-xl lg:px-8 px-6 lg:py-4 pb-4 pt-0 rounded lg:mr-3 rounded-t-none">
          <a href="/settings" class="pb-2 block text-gray-600 hover:text-gray-900 ignore-body-click">Settings</a>
          <a href="/logout" class="block text-gray-600 hover:text-gray-900 ignore-body-click">Logout</a>
        </div>
      </div>

    </div>

  </header> */}
  <div class="container mx-auto max-w-3xl mt-20 h-screen pt-3">

{/* <!--     @if (session('alert'))
          <p>{{ session('alert') }}</p>
    @endif --> */}

    <h1 class="text-2xl font-bold text-gray-700 px-6 md:px-0">Account Settings</h1>
    <ul class="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
      <li class="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#_" class="py-4 inline-block text-black">Profile Info</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class="py-4 inline-block text-black">Password Update</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class="py-4 inline-block text-black">Plan Update</a></li>
    </ul>
    <form action="{{ route('profile.save') }}" method="POST" enctype="multipart/form-data">
      {/* <!-- @csrf --> */}
      <div class="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
        <div class="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
          <h2 class="font-medium text-md text-gray-700 mb-4 tracking-wide">Profile Info</h2>
          <p class="text-xs text-gray-500">Update your basic profile information such as Email Address, Name, and Image.</p>
        </div>
        <div class="md:w-2/3 w-full">
          <div class="py-8 px-16">
            <label for="name" class="text-sm text-gray-600">Name</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" value="" name="name"/>
          </div>
          <hr class="border-gray-200"/>
          <div class="py-8 px-16">
            <label for="email" class="text-sm text-gray-600">Email Address</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="email" name="email" value=""/>
          </div>
          <hr class="border-gray-200"/>
          <div class="py-8 px-16 clearfix">
            <label for="photo" class="text-sm text-gray-600 w-full block">Photo</label>
            <img class="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left" id="photo" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_400x400.jpg" alt="photo"/>
            <div class="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
              <input type="file" name="photo" onchange="loadFile(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/> Change Photo
            </div>
          </div>

        </div>

      </div>
      <div class="p-16 py-12 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200">
        <p class="float-left text-xs text-gray-500 tracking-tight mt-2">Click on Save to update your Profile Info</p>
        <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer" value="Save"/>
      </div>
    </form>
  </div>

    </div>
  )
}

export default Setting;