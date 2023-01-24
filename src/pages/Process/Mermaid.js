import React, { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose'
})

export const Mermaid = (props) => {

    useEffect(() => { 
        mermaid.contentLoaded()
     }, [])

  return (
    <div className='mermaid'>{props.chart}</div>
  )
}
