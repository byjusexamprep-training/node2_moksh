const { getProducts,getProductByID, categoriesList } = require('../model/product')

const productsList = async(req,res) => {
    const data = await getProducts()
    res.status(201).json({ data : data})
}

const getProduct = async(req,res) => {
    const id = req.params.id;
    const data = await getProductByID(id)
    res.status(201).json({ data : data })


}

const getCategories = async(req,res) => {
    const data = await categoriesList()
    res.status(201).json({ data : data })
}

module.exports = { 
    productsList,
    getProduct,
    getCategories 
}