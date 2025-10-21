'use client'
import ProgressBar from '@/components/ProgressBar';
import { useState } from 'react';
const Page = ({ }) => {
  const [formData, setFormData] = useState({});

  return (
    <>
      <div className="flex justify-center mt-8 mb-4">
        <ProgressBar />
        </div>



    </>
  )
}

export default Page