"use client"

import React from 'react'
// import Home from "./home/Home"
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './home/home'
import { Layout } from './components/Layout'


export default function page() {
  return (
    <div className='' >
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}
