import axios from "axios"

const baseUrl = "http://localhost:3001/products"
const CreateProduct = async (product) => {
    return axios.post(baseUrl, product);
}

const GetProduct = async () => {
    return axios.get(baseUrl);
}

export { CreateOrder, GetOrders };