import React from 'react'

export default function GoogleSvg(props) {
  return (
 

<svg fill="#000000"  viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M128,228A100,100,0,1,1,198.71069,57.28906,12.0001,12.0001,0,1,1,181.74,74.25977,75.99547,75.99547,0,1,0,203.05371,140H128a12,12,0,0,1,0-24h88a12,12,0,0,1,12,12A100.11332,100.11332,0,0,1,128,228Z" fill={props?.fill || "black"}/>
</svg>
  )
}
