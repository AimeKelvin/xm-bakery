import Navigation from "../components/Navigation"
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

const Search = () => {
    return (
        <div>
            <Navigation />
            <div className="mt-[50px] w-full">
                <p className='font-black text-center text-[32px]'>Search Area</p>
                <p className='text-center text-gray-400 cursor-pointer'>Our latest collection, where classic and contemporary styles converge in<br></br> a perfect harmony</p>
                <div className="flex justify-center mt-[20px]">
                    <div className='flex flex-row items-center space-x-[10px]'>
                        <Input  inputType='text' inputPlaceholder="Search" />
                        <Button buttonText='Search' buttonBG='bg-black' buttonTextColor='text-white' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search