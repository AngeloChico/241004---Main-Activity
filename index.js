const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function userInteraction() {
  rl.question("Enter 'add' to add a product, 'remove' to remove a product, or 'restock' to restock a product: ", (action) => {
    action = action.toLowerCase();
    if (action === "add") {
      rl.question("Enter product name: ", (name) => {
        rl.question("Enter product price: ", (price) => {
          rl.question("Enter product quantity: ", (quantity) => {
            addProduct(name, parseFloat(price), parseInt(quantity));
            console.log("Updated Inventory Value: ", calculateTotalInventoryValue());
            rl.close();
          });
        });
      });
    } else if (action === "remove") {
      rl.question("Enter product name to remove: ", (name) => {
        rl.question("Enter quantity to remove: ", (quantity) => {
          removeProduct(name, parseInt(quantity));
          console.log("Updated Inventory Value: ", calculateTotalInventoryValue());
          rl.close();
        });
      });
    } else if (action === "restock") {
      rl.question("Enter product name to restock: ", (name) => {
        rl.question("Enter threshold quantity: ", (threshold) => {
          restockProduct(name, parseInt(threshold));
          console.log("Updated Inventory Value: ", calculateTotalInventoryValue());
          rl.close();
        });
      });
    } else {
      console.log("Invalid action. Please enter 'add', 'remove', or 'restock'.");
      rl.close();
    }
  });
}

// Initial Output
console.log(
  checkInventoryCapacity() ? "Inventory still has space." : "Inventory is full."
);
displayInventoryStatus();

// Run User Interaction
userInteraction();
