const Footer = () => {
    return (
        <div className="w-full h-[40px] mt-[40px] flex justify-between items-center pr-[40px] pl-[40px]">
            <p>&copy; 2025 Tolus Production</p>
            <div className='flex flex-row space-x-[20px] items-center'>
                <div><p>Terms & Conditions</p></div>
                <div><p>Privacy Policy</p></div>
                <div><p>Cookie Policy</p></div>
            </div>
        </div>
    )
}

export default Footer