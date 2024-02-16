"use client"

import React from 'react'
// import Home from "./home/Home"
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './home/home'


export default function page() {
  return (
    <div className='' >
      {/* <Navbar /> */}
      <Home />     
      <Toaster />
    </div>
  )
}
