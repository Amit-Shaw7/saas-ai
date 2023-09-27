import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getQueryCount } from '@/lib/api-limit';
import React from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const queryCount = await getQueryCount();
    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
                <Sidebar queryCount={queryCount}/>
            </div>

            <main className='md:pl-72'>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;