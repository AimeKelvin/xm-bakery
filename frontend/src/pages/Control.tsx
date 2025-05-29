import React, { useState } from 'react'
import Navigation from "../components/Navigation"
import ProductCard from "../components/atoms/ProductCard"
import Select from '../components/atoms/Select'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { Link } from 'react-router-dom'

const Control = () => {
    const [productCategory, setProductCategory] = useState('shirts')
    const [productPrice, setProductPrice] = useState(40)

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

    const filteredProducts = products.filter((filteredProduct) => {
        let minPrice = 0;
        let maxPrice = productPrice;

        if (productPrice === 50) {
            minPrice = 0;
            maxPrice = 50;
        } else if (productPrice === 100) {
            minPrice = 50;
            maxPrice = 100;
        }
        return (
            filteredProduct.productCategory === productCategory &&
            filteredProduct.productPrice >= minPrice &&
            filteredProduct.productPrice <= maxPrice
        )
    })

    return (
        <div>
            <Navigation />
            <div className='pr-[40px] mt-[15px] pl-[40px]'>
                <p>Products you created:</p>
                <div className='flex flex-row items-center justify-between mt-[10px]'>
                    <div className='flex space-x-[10px] items-center flex-row'>
                        <Input  inputType='text' inputPlaceholder="Search" />
                        <Select handleSelectChange={(e) => {setProductCategory(e.target.value)}} selectOptionTerm="Sort by category" options={['Pants', 'Shirts', 'Dresses', 'Coats', 'Others']} />
                        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setProductPrice(parseInt(e.target.value, 10))}} className='outline-0 border-[1px] border-solid border-gray-400 pl-[20px] pt-[10px] pb-[10px] pr-[20px] rounded-full'>
                            <option className='text-[14px] font-afacadFlux' value={0}>Sort by price</option>
                            <option className='text-[14px] font-afacadFlux' value={50}>$0 - $50</option>
                            <option className='text-[14px] font-afacadFlux' value={100}>$50 - $100</option>
                        </select>
                    </div>
                    <div className='flex space-x-[10px] items-center flex-row'>
                        <div>
                            <Link to='/create-product'>
                                <Button buttonText='Create New Product' buttonBG='bg-black' buttonTextColor='text-white' />
                            </Link>
                        </div>
                        <div>
                            <Link to='/control/orders'>
                                <Button buttonText='View Orders (10)' buttonBG='bg-black/[90%]' buttonTextColor='text-white' />
                            </Link>
                        </div>
                        <div>
                            <p>{filteredProducts.length} {filteredProducts.length == 1 ? 'Product' : 'Products'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pr-[40px] mt-[15px] pl-[40px]'>
                {filteredProducts.length == 0 ? 
                    <div>
                        <p className='text-center'>No Clothings</p>
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
    )
}

export default Control