import React from 'react'

// truyền title tư Rooms, Home -> là cái ở giữa của hình nền đầu tiên
export default function Banner({children, title, subtitle}) { 
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div></div>
      <p>{subtitle}</p>
      {children}
    </div>
  )
}
