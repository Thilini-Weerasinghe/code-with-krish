import axios from "axios"

const baseUrl = "http://localhost:3002/customers"
const CreateCustomer = async (customer) => {
    return axios.post(baseUrl, customer);
}

const GetCustomers = async () => {
    return axios.get(baseUrl);
}

export { CreateCustomer, GetCustomers };