function ProductManagement(){

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [quantity, setQuantity] = React.useState("");

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("Added  Product Details");
          console.log(name,price,quantity);
          const product = {
            name,
            price,
            quantity
          };
          const response = await CreateProduct(product);
          console.log(response.data);
        } catch (error) {
          alert(error.name);
        }
      };
    return(
        <>
      <p>Create Product</p>
      <form onSubmit={handleProductSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label htmlFor="quantity">Address</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        ></input>
        <br/>
        <input type="submit" value="Submit" />
      </form>

      <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
                <th></th>
            </tr>

            {products && products.map(item =>(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>Edit</td>
                    <td>View</td>
                </tr>
            ) )}
        </table>
      </div>
    </>
    );
}

export default ProductManagement