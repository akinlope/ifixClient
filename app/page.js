"use client"

import React from 'react'
import Home from "./home/Home"
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'


export default function page() {
  return (
    <div className='' >
      {/* <Navbar /> */}
      <Home />     
      <Toaster />
    </div>
  )
}
