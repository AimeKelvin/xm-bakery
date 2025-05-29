import Product from '../models/product.model.js'

export const createProduct = async (req, res) => {
    try {
        const { productName, productImage, productDescription, productPrice } = req.body
        const userId = req.user.userId;

        const product = await Product.create({ productName, productImage, productDescription, productPrice, userId })

        res.status(201).json({
            message: "Product added",
            product: product
        })
    } catch(error) {
        console.log(`Failed to add product ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).json({
            products: products
        })
    } catch(error) {
        console.log(`Failed to get all products ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.json(404).json({
                message: "No product with this id"
            })
        }

        res.status(200).json({
            product: product
        })
    } catch(error) {
        console.log(`Failed to get product ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

export const deleteSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.json(404).json({
                message: "No product with this id"
            })
        }

        product.destroy()
        res.status(200).json({
            message: "Product deleted"
        })
    } catch(error) {
        console.log(`Failed to get product ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { productName, productImage, productDescription, productPrice } = req.body

        const product = await Product.findByPk(id)

        if(!product) {
            res.json(404).json({
                message: "No product with this id"
            })
        }

        product.update({ productName, productImage, productDescription, productPrice })
        res.status(200).json({
            message: "Product updated"
        })
    } catch(error) {
        console.log(`Failed to get product ${error}`)
        res.status(500).json({
            error: error.message
        })
    }
}

