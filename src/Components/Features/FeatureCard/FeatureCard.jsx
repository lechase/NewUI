import React from 'react'
import "./FeatureCard.css"
export default function FeatureCard({Cards}) {
  return (
    <>
    {
        Cards?.map(({Svg,Name})=>{
            return(
                <div className='feature-card'>
                <div className='feature-card__icon'>
                 {Svg}
                </div>
                <div className='feature-card__info'>
                  {Name}
                </div>
            </div>
            )
        })
    }
 
    
    
    </>
  )
}
