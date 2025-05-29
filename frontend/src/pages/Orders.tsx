import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Button from "../components/atoms/Button"
import CartProductCard from "../components/atoms/CartProductCard"


const Orders = () => {
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
                <div className='w-full'>
                    <p className="text-[18px]">Orders</p>
                    <div className='mt-[20px] flex flex-col space-y-[6px] w-full'>
                        {cartItems.length == 0 ?
                            (<div><p>No Items in Cart</p></div>) 
                        :  
                            (
                                cartItems.map((cartItem) => (
                                    <CartProductCard key={cartItem.productID} isUsedInCartPage={false} productName={cartItem.productName} productPrice={cartItem.productPrice} productColor={cartItem.productColor} productCategory={cartItem.productCategory} />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Orders