import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Button from "../components/atoms/Button"
import CartProductCard from "../components/atoms/CartProductCard"


const Cart = () => {
    const cartItems = [
        {   
            "productID": "cdhcdh737cd",
            "productName": "Lior Piana",
            "productPrice": 40,
            "productColor": "red",
            "productCategory": "shirts"
        },
        {   
            "productID": "cdhcdh737cd",
            "productName": "Lior Piana",
            "productPrice": 40,
            "productColor": "red",
            "productCategory": "shirts"
        }
    ]
    return (
        <div>
            <Navigation />
            <div className='w-full pr-[40px] pl-[40px]'>
                <div className='w-full flex flex-row space-x-[15px]'>
                    <div className='w-[60%]'>
                        <p className="text-[18px]">Your Cart</p>
                        <div className='mt-[20px] flex flex-col space-y-[6px] w-full'>
                            {cartItems.length == 0 ?
                                (<div><p>No Items in Cart</p></div>) 
                            :  
                                (
                                    cartItems.map((cartItem) => (
                                        <CartProductCard key={cartItem.productID} isUsedInCartPage={true} productName={cartItem.productName} productPrice={cartItem.productPrice} productColor={cartItem.productColor} productCategory={cartItem.productCategory} />
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className='w-[40%]'>
                        <p className="text-[18px]">Summary</p>
                        <div className='mt-[20px] border-b-[1px] border-solid border-gray-200 pb-[10px] w-full'>
                            <div className='flex items-center justify-between'>
                                <p className="text-[16px]">Sub total</p>
                                <p className="text-[16px]">$ 40</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className="text-[16px]">Estimated Delivery</p>
                                <p className="text-[16px]">Free</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className="text-[16px]">Estimated Taxes</p>
                                <p className="text-[16px]">$ 10</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                                <p className="text-[16px]">Total</p>
                                <p className="text-[16px]">$ 50</p>
                        </div>
                        <div className='mt-[10px]'>
                            <Button buttonText='Coninue To Payment' buttonBG='bg-black' buttonTextColor='text-white' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart