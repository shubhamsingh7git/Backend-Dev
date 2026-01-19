function checkOrderStatus(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderId === "number") {
        resolve("Order Shipped");
      } else {
        reject("Invalid Order ID");
      }
    }, 1000);
  });
}

async function run() {
  try {
    const result = await checkOrderStatus(123);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
