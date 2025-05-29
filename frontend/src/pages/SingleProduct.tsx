import { useState, useEffect } from 'react'
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Button from "../components/atoms/Button"
import ProductCard from "../components/atoms/ProductCard"


const SingleProduct = () => {
    const [productChoseQuantity, setProductChoseQuantity] = useState(1)
    const [isQuantityLessThanOne, setIsQuantityLessThanOne] = useState(false)

    useEffect(() => {
        if (productChoseQuantity <= 1) {
            setIsQuantityLessThanOne(true)
        }
    }, [productChoseQuantity])

    const products = [
        {
            "productID": "SGhdj7368",
            "productName": "Lora Piana",
            "productDescription": "Slim-fit shirt with stripes.",
            "productPrice": 45,
            "productColor": "red",
            "productSpecifiedGender": "male",
            "productCategory": "shirts"
        }
    ]

    const productPrice = 40

    const filteredProducts = products.filter((filteredProduct) => (
        filteredProduct.productCategory === "shirts" &&
        filteredProduct.productSpecifiedGender === "male"
    ))

    const handleReduceProductQuantity = () => {
        let newQuantity = productChoseQuantity - 1
        setProductChoseQuantity(newQuantity)
    }

    const handleIncreaseProductQuantity = () => {
        let newQuantity = productChoseQuantity + 1
        setProductChoseQuantity(newQuantity)
    }
    return (
        <div>
            <Navigation />
            <div className='w-full pr-[40px] pl-[40px]'>

                <div className='w-full flex flex-row space-x-[15px]'>
                    <div className="w-[50%]">
                        <div className="rounded-[12px] h-[450px] w-full bg-gray-400 cursor-pointer">
                            <img src='/images/shirt.png' className='w-full h-full object-center object-cover rounded-[12px]' alt='cloth' />
                        </div>
                        <div className="grid grid-cols-4 mt-[15px] gap-4">
                            <div className="rounded-[12px] h-[150px] bg-gray-400 cursor-pointer">
                                <img src='/images/shirt.png' className='w-full h-full object-center object-cover rounded-[12px]' alt='cloth' />
                            </div>
                            <div className="rounded-[12px] h-[150px] bg-gray-400 cursor-pointer">
                                <img src='/images/shirt.png' className='w-full h-full object-center object-cover rounded-[12px]' alt='cloth' />
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <p className="text-gray-600">Nike / Running Shoes</p>
                        <div className='mt-[10px]'>
                            <p className='font-bold text-[30px]'>Nike Air Force</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-[18px]">Product Description</p>
                            <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae ratione non dicta eius, quos voluptatum, cumque doloremque, accusantium dolorem distinctio accusamus quod optio omnis esse aspernatur possimus quidem? Cumque fugiat incidunt nam enim voluptatum possimus repellendus ratione. Debitis, quidem. Consequatur dolores libero neque vel illum nostrum blanditiis sunt veritatis dolorum!</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-[18px]">Quantity</p>
                            <div className="bg-gray-200 pr-[6px] pl-[6px] pt-[6px] pb-[6px] rounded-full w-[100px] h-[40px] flex flex-row items-center justify-between">
                                <div onClick={handleReduceProductQuantity} className={`w-[30px] select-none h-[30px] p-[10px] flex justify-center items-center ${isQuantityLessThanOne ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-full bg-black`}><p className='text-white'>-</p></div>
                                <div><p>{productChoseQuantity}</p></div>
                                <div onClick={handleIncreaseProductQuantity} className="w-[30px] h-[30px] select-none p-[10px] flex justify-center items-center rounded-full bg-black cursor-pointer"><p className='text-white cursor-pointer'>+</p></div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <p className='text-[30px] uppercase'>$ {productPrice * productChoseQuantity}</p>
                            <div className='mt-[10px]'>
                                <Button buttonText='Add To Cart' buttonBG='bg-black' buttonTextColor='text-white' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-[30px]'>
                    <p className="text-[18px]">You May Also like:</p>
                    <div className="mt-[10px]">
                        {filteredProducts.length == 0 ? 
                            <div>
                                <p className='text-center'>No Suggested Clothings</p>
                            </div>
                        : 
                            <div className='grid grid-cols-4 gap-4'>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.productID} productID={product.productID} productName={product.productName} productPrice={product.productPrice} productDescription={product.productDescription} />
                                ))}
                            </div>
                        }
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default SingleProduct