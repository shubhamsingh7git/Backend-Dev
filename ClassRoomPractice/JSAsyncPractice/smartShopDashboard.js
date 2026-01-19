function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", isPremium: true });
    }, 1000);
  });
}

function fetchOrders(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { item: "Laptop", price: 1000, status: "delivered" },
        { item: "Phone", price: 500, status: "pending" }
      ]);
    }, 2000);
  });
}

async function displayDashboard(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(id);

    const deliveredOrders = orders.filter(order => order.status === "delivered");

    const discountedOrders = deliveredOrders.map(order => {
      const finalPrice = user.isPremium ? order.price * 0.9 : order.price;
      return { ...order, price: finalPrice };
    });

    const total = discountedOrders.reduce((sum, order) => sum + order.price, 0);

    console.log(`Hello ${user.name}`);
    console.log(discountedOrders);
    console.log(`Final Total: ${total}`);
  } catch (error) {
    console.log(error);
  }
}

displayDashboard(1);
