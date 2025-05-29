import { DataTypes } from "sequelize";
import sequelize from '../config/database.js'


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    productImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT', // Prevent deletion of a user if products are associated
    },
}, {
    tableName: 'products',
    timestamps: true,
})

export default Product