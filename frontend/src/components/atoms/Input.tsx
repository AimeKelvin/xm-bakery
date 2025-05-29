import React from 'react'

interface InputTypesProps {
    inputPlaceholder: string;
    inputType: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputTypesProps> = ({ inputPlaceholder,  inputType, value, onChange }) => {
    return (
        <input type={inputType} value={value} onChange={onChange} className='outline-0 border-[1px] border-solid border-gray-400 pl-[20px] pt-[10px] pb-[10px] pr-[10px] rounded-full' placeholder={inputPlaceholder} />
    )
}

export default Input