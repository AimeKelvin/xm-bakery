import { Link } from 'react-router-dom'
import { BiCart } from 'react-icons/bi'
import { BiSearch } from 'react-icons/bi'
import { useAuthStore } from "../store/useAuthStore"


const Navigation = () => {
    const { authUser } = useAuthStore()

    console.log(authUser)
    return (
        <div className="h-[90px] w-full">
            <div className='bg-black w-full h-[30px] flex justify-center items-center'>
                <p className="text-white cursor-pointer">Get 25% Off This Summer Sole, Grab It Fast!! <span className="font-bold">15H:45M:37S</span></p>
            </div>
            <div className="h-[60px] pr-[40px] pl-[40px] w-full flex justify-between items-center">
                <div className='flex flex-row space-x-[15px] items-center'>
                    <div><Link to='/all'>All Products</Link></div>
                </div>
                <div><p className='font-black text-[25px] cursor-pointer uppercase'><Link to='/'>XM BAKERIES SHOP</Link></p></div>
                <div className='flex flex-row space-x-[20px] items-center'>
                    <div className='cursor-pointer'>
                        <Link to='/search'>
                            <BiSearch />
                        </Link>
                    </div>
                    <div className='cursor-pointer'>
                        <Link to='/cart'>
                            <BiCart />
                        </Link>
                    </div>
                    {authUser ? 
                        <div><Link to='/control'>{authUser.email}</Link></div>
                    : 
                        <div><Link to='/login'>Login</Link></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navigation