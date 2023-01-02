import React from 'react'

export const Lists = () => {
    const logout = () => { 
        window.open('http://localhost:3000/logout', '_self')
    }

    return (
    <div>
        <h1>Lists</h1>
        <button onClick={logout}>Logout</button>
    </div>
    )
}
