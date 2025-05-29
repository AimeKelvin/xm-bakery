import express from 'express'
import { config } from 'dotenv'
import sequelize from './config/database.js'
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

config()

const app = express()
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const port = process.env.APP_PORT || 5000

app.use(express.json())

const syncToDatabase = async () => {
    try {
        sequelize.sync()
        console.log('DB Synced successfully')
    } catch(error) {
        console.log(`Faileed to sync to DB ${error}`)
    }
}

syncToDatabase()

app.use('/api', userRoutes)
app.use('/api', productRoutes)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})