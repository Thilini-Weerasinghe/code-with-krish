import React, { useEffect } from "react";
import {GetOrders} from "../services/order-service";
import {CreateOrder} from "../services/order-service";

function OrderManagement() {
  const [customerId, setCustomerId] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQuantity] = React.useState("");
  const [orders, setOrders] = React.useState("");

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Order Submitted");
      console.log(customerId, productId, price, qty);
      const order = {
        customerId,
        items: [{ productId, price, quantity: qty }],
      };
      const response = await CreateOrder(order);
      console.log(response.data);
    } catch (error) {
      alert(error.name);
    }
  };

  useEffect(()=> {
    fetchOrders()
  },[])

const fetchOrders = async () => {
    try{
        const response = await GetOrders();
        console.log(response.data);
        setOrders(response.data);
    }catch(error){
        console.log(error);
    }
}

  return (
    <>
      <p>Create User</p>
      <form onSubmit={handleOrderSubmit}>
        <label htmlFor="cus_id">Customer Id</label>
        <input
          type="text"
          id="cus_id"
          name="cus_id"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        ></input>
        <br />
        <label htmlFor="prod_id">Product Id</label>
        <input
          type="text"
          id="prod_id"
          name="prod_id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        ></input>
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        ></input>
        <br />
        <label htmlFor="qty">QTY</label>
        <input
          type="text"
          id="qty"
          name="qty"
          value={qty}
          onChange={(e) => setQuantity(e.target.value)}
          required
        ></input>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Order Date</th>
                <th></th>
                <th></th>
            </tr>

            {orders && orders.map(item =>(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.customerId}</td>
                    <td>{item.createdAt}</td>
                    <td>Edit</td>
                    <td>View</td>
                </tr>
            ) )}
        </table>
      </div>
    </>
  );
}

export default OrderManagement;
