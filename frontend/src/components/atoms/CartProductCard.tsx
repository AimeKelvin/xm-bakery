import React from 'react'

interface CartProductCardTypesProps {
    productID?: string;
    productName: string;
    productPrice: number;
    productColor: string;
    productCategory: string;
    isUsedInCartPage: boolean;
}

const CartProductCard: React.FC<CartProductCardTypesProps> = ({ productID, isUsedInCartPage, productName, productPrice, productColor, productCategory }) => {
    return (
        <div className='flex flex-row border-b-[1px] pb-[20px] border-solid border-gray-200 space-x-[10px]'>
            <div>
                <div className="rounded-[12px] h-[150px] w-[150px] bg-gray-400 cursor-pointer">
                    <img src='/images/shirt.png' className='w-full h-full object-center object-cover rounded-[12px]' alt='cloth' />
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <p className='text-[18px]'>{productName} | $ {productPrice}</p>
                    </div>
                </div>
                <div>
                    <p className='text-gray-400'>Color: {productColor}</p>
                    <p className='text-gray-400'>Catgeory: {productCategory}</p>
                </div>
                {isUsedInCartPage && 
                <div className="bg-gray-200 mt-[20px] pr-[6px] pl-[6px] pt-[6px] pb-[6px] rounded-full w-[100px] h-[40px] flex flex-row items-center justify-between">
                    <div className="w-[30px] h-[30px] p-[10px] flex justify-center items-center rounded-full bg-black cursor-pointer"><p className='text-white cursor-pointer'>-</p></div>
                    <div><p>0</p></div>
                    <div className="w-[30px] h-[30px] p-[10px] flex justify-center items-center rounded-full bg-black cursor-pointer"><p className='text-white cursor-pointer'>+</p></div>
                </div>
                }
            </div>
        </div>
    )
}

export default CartProductCard