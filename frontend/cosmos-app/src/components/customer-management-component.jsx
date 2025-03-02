
function CustomerManagement(){

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");

    const handleCustomerSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("Added  Customer Details");
          console.log(name,email,address);
          const customer = {
            name,
            email,
            address
          };
          const response = await CreateCustomer(customer);
          console.log(response.data);
        } catch (error) {
          alert(error.name);
        }
      };
    return(
        <>
      <p>Create Customer</p>
      <form onSubmit={handleCustomerSubmit}>
        <label htmlFor="name">Customer Id</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <br />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={price}
          onChange={(e) => setAddress(e.target.value)}
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
                <th>Email</th>
                <th>Address</th>
                <th></th>
                <th></th>
            </tr>

            {customers && customers.map(item =>(
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

export default CustomerManagment