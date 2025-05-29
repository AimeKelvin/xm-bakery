import ProductCard from "./atoms/ProductCard"


const Products = () => {

    const products = [
        {
            "productID": "SGhdj7368",
            "productName": "Lora Piana",
            "productDescription": "Slim-fit shirt with stripes.",
            "productPrice": 45
        },
        {
            "productID": "SGhdj7368",
            "productName": "Lora Piana",
            "productDescription": "Slim-fit shirt with stripes.",
            "productPrice": 45
        },
        {
            "productID": "SGhdj7368",
            "productName": "Lora Piana",
            "productDescription": "Slim-fit shirt with stripes.",
            "productPrice": 45
        },
        {
            "productID": "SGhdj7368",
            "productName": "Lora Piana",
            "productDescription": "Slim-fit shirt with stripes.",
            "productPrice": 45
        },
    ]
    return (
        <div className='pr-[40px] mt-[15px] pl-[40px]'>
            {products.length == 0 ? 
                <div>
                    <p>No Clothings</p>
                </div>
            : 
                <div className='grid grid-cols-4 gap-4'>
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.productID} productID={product.productID} productName={product.productName} productPrice={product.productPrice} productDescription={product.productDescription} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Products