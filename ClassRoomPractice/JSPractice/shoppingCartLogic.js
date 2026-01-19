const cart = [
  { item: "Laptop", price: 50000, quantity: 1, inStock: true },
  { item: "Mouse", price: 1500, quantity: 2, inStock: true },
  { item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

const readyToShip = cart.every(item => item.inStock) ? "Ready to Ship" : "Wait";

const inStockItems = cart.filter(item => item.inStock);

const totalBill = inStockItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

console.log(readyToShip);
console.log(inStockItems);
console.log(totalBill);
