import React, { ReactNode } from 'react'

const LandingLayout = ({ children } : { children: ReactNode }) => {
    return (
        <main className='h-full bg-[#111827] overflow-auto '>
            <div className='mx-auto max-w-screen-xl h-full'>
                {children}
            </div>
        </main>
    )
}

export default LandingLayout;