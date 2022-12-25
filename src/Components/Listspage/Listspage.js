import React from 'react'

export const Listspage = () => {
    const logout = () => { 
        window.open('http://localhost:3000/logout', '_self')
    }

    return (
    <div>
        Listspage
        <button onClick={logout}>Logout</button>
    </div>
    )
}
