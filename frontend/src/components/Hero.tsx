import Button from "./atoms/Button"

const Hero = () => {
    return (
        <div className='pr-[40px] pl-[40px]'>
            <div className='w-full relative rounded-[20px] h-[550px] cursor-pointer bg-blue-500/[20%]'>
                <img src="/images/clothes-collection.jpg" className='w-full rounded-[20px] h-full object-center object-cover' alt="Clothes collection" />
                <div className='w-full h-full rounded-[20px] bg-blue-500/[20%] absolute top-0 left-0 bottom-0 right-0'>
                    <div className='absolute bottom-[30px] left-[30px]'>
                        <p className='uppercase text-white cursor-pointer text-[32px]'>Tolus Spring Collection</p>
                        <div className='mt-[30px] flex items-center flex-row space-x-[30px]'>
                            <p className='text-white cursor-pointer text-start'>Find out our best spring collection. Offering our best quality product in a Tolus<br></br> Spring Collection.</p>
                            <Button buttonText='Buy Now' buttonBG='bg-white' buttonTextColor='text-black' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero