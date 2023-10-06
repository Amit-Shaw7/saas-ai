import { InputType } from '@/types'
import React from 'react'

const Input = ({ id, label, type, value, placeholder } : InputType) => {
    return (
        <div className='w-full flex flex-col gap-y-1'>
            <label className='text-base font-semibold text-black' htmlFor={id}>{label}</label>
            <div id={id} className='p-1'>
                <input
                    type={type}
                    className='p-1 border-none outline-none text-base text-slate-900'
                    value={value}
                    placeholder={placeholder}
                    disabled
                />
            </div>
        </div>
    )
}

export default Input