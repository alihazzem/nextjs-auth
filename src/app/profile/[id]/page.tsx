import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UserProfile({ params }: any) {
    const { id } = await params
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 mx-w-md mx-auto'>
            <h1 className=''>Profile Page <span className='text-red-500'>{id}</span></h1>
        </div>
    )
}