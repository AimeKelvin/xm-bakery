import Navigation from "../components/Navigation"
import Hero from "../components/Hero"
import Products from "../components/Products"
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { Link } from 'react-router-dom'
import Footer from "../components/Footer"

const Home = () => {
    return (
        <div>
            <Navigation />
            <Hero />
            <div className='mt-[50px]'>
                <div>
                    <p className='text-center text-[32px] cursor-pointer'>New Collection</p>
                    <p className='text-center text-gray-400 cursor-pointer'>Our latest collection, where classic and contemporary styles converge in<br></br> a perfect harmony</p>
                </div>
                <Products />
                <div className='mt-[20px] w-full flex justify-center'>
                    <Link to='/all'>
                        <Button buttonText='View More' buttonBG='bg-black' buttonTextColor='text-white' />
                    </Link>
                </div>
            </div>

            <div className="mt-[50px] w-full">
                <p className='font-black text-center text-[32px]'>Tolus News Letter</p>
                <p className='text-center text-gray-400 cursor-pointer'>Our latest collection, where classic and contemporary styles converge in<br></br> a perfect harmony</p>
                <div className="flex justify-center mt-[20px]">
                    <div className='flex flex-row items-center space-x-[10px]'>
                        <Input  inputType='email' inputPlaceholder="Email Address" />
                        <Button buttonText='Subscribe' buttonBG='bg-black' buttonTextColor='text-white' />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home