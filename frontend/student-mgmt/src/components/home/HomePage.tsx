"use client"
import React from 'react'
import StudentTable from './student-table/StudentTable'
import { Typography } from 'antd'

const {Title} = Typography

function HomePage() {
    
  return (
    <div
        className='w-full h-screen'
    >
      <Title level={3}>Students</Title>
      <StudentTable/>
    </div>
  )
}

export default HomePage
