// Store Details
const storeName = "PC Hardware Hub";
const storeLocation = "Las Piñas City";
const storeCapacity = 400;

// Product Inventory
let products = [
  { name: "CPU", price: 20000, quantity: 30 },
  { name: "GPU", price: 50000, quantity: 20 },
  { name: "Motherboard", price: 12000, quantity: 40 },
  { name: "RAM (16GB)", price: 6000, quantity: 60 },
  { name: "Power Supply (750W)", price: 5000, quantity: 50 },
];

// Calculate Total Products
function calculateTotalProducts() {
  return products.reduce((total, product) => total + product.quantity, 0);
}

// Check Inventory Capacity
function checkInventoryCapacity() {
  const totalQuantity = calculateTotalProducts();
  console.log(totalQuantity);
  return totalQuantity < storeCapacity;
}

// Add Product
function addProduct(productName, price, quantity) {
  if (calculateTotalProducts() + quantity <= storeCapacity) {
    products.push({ name: productName, price, quantity });
    console.log(`Added ${quantity} ${productName}(s) to inventory.`);
  } else {
    console.log("Cannot add item, store is full");
  }
}

// Remove Product
function removeProduct(productName, quantity) {
  const productIndex = products.findIndex((p) => p.name === productName);
  if (productIndex === -1) {
    console.log("Error: Product not found.");
    return;
  }

  const product = products[productIndex];
  if (product.quantity < quantity) {
    console.log("Error: Requested quantity exceeds available stock.");
    console.log(
      `Removing all available ${productName} (${product.quantity} units).`
    );
    product.quantity = 0;
  } else {
    product.quantity -= quantity;
  }

  console.log(`Updated quantity of ${productName}: ${product.quantity}`);

  if (product.quantity === 0) {
    products.splice(productIndex, 1);
    console.log(`${productName} has been removed from the inventory.`);
  }
}

// Get Most Expensive Product
function getMostExpensiveProduct() {
  return products.reduce((max, product) =>
    product.price > max.price ? product : max
  );
}

// Calculate Total Inventory Value
function calculateTotalInventoryValue() {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

// Restock Product
function restockProduct(productName, threshold) {
  const product = products.find((p) => p.name === productName);
  if (!product) {
    console.log(`Error: ${productName} not found in inventory.`);
    return;
  }

  if (product.quantity <= threshold) {
    const restockAmount = 20;
    if (calculateTotalProducts() + restockAmount <= storeCapacity) {
      product.quantity += restockAmount;
      console.log(
        `Restocked ${productName}. New quantity: ${product.quantity}`
      );
    } else {
      console.log(
        `Cannot restock ${productName}. Store capacity would be exceeded.`
      );
    }
  } else {
    console.log(
      `${productName} does not need restocking. Current quantity: ${product.quantity}`
    );
  }
}

// Display Inventory Status
function displayInventoryStatus() {
  console.log(`Store Name: ${storeName}`);
  console.log(`Store Location: ${storeLocation}`);
  console.log(`Total Number of Products: ${calculateTotalProducts()}`);
  console.log(`Total Inventory Value: ${calculateTotalInventoryValue()}`);
  console.log(`Most Expensive Product: ${getMostExpensiveProduct().name}`);

  if (!checkInventoryCapacity()) {
    console.log("Store is at full capacity, cannot add new products.");
  }

  console.log("\nCurrent Inventory:");
  products.forEach((product) => {
    console.log(`${product.name}: ${product.quantity} units`);
  });
}

// Example usage
console.log(
  checkInventoryCapacity() ? "Inventory still has space." : "Inventory is full."
);
displayInventoryStatus();

// Uncomment these lines to test other functions
addProduct("SSD (1TB)", 8000, 25);
// removeProduct("GPU", 5);
// restockProduct("CPU", 20);
// displayInventoryStatus();
