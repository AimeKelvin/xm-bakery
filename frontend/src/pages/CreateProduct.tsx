import Navigation from "../components/Navigation"
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { Link } from "react-router-dom"


const CreateProduct = () => {
    return (
        <div>
            <Navigation />
            <div className="mt-[50px] w-full">
                <p className='font-black text-center text-[32px]'>Create Product</p>
                <p className='text-center text-gray-400 cursor-pointer'>Our latest collection, where classic and contemporary styles converge in<br></br> a perfect harmony</p>
                <div className="flex justify-center mt-[20px]">
                    <div className='flex flex-col items-center space-y-[6px]'>
                        <Input  inputType='text' inputPlaceholder="Product Name" />
                        <Input  inputType='number' inputPlaceholder="Product Price" />
                        <Input  inputType='text' inputPlaceholder="Product Description" />
                        <Button buttonText='Create Product' buttonBG='bg-black' buttonTextColor='text-white' />
                    </div>
                </div>
                <p className='text-center text-gray-400 cursor-pointer'>Not Now? <Link to='/control' className='text-black'>Cancel</Link></p>
            </div>
        </div>
    )
}

export default CreateProduct