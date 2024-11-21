let cart = [];

function addToCart(productId) {
  const productElement = document.querySelector(`.product[data-id="${productId}"]`);
  const name = productElement.getAttribute('data-name');
  const price = parseInt(productElement.getAttribute('data-price'));

  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id: productId, name, price, quantity: 1 });
  }

  updateCart();
  animateCartButton(productId);
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </td>
      <td>Rp ${item.price * item.quantity}</td>
      <td><button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button></td>
    `;
    cartItems.appendChild(row);
  });

  document.getElementById('total-price').innerText = `Rp ${totalPrice}`;
}

function updateQuantity(productId, change) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += change;

    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
  animateRemoveButton(productId);
}

function checkout() {
  if (cart.length === 0) {
    alert('Keranjang belanja kosong!');
  } else {
    alert('Pembayaran berhasil!');
    cart = [];
    updateCart();
  }
}

function animateCartButton(productId) {
  const productButton = document.querySelector(`.product[data-id="${productId}"] button`);
  productButton.classList.add('added');
  setTimeout(() => productButton.classList.remove('added'), 500);
}

function animateRemoveButton(productId) {
  const removeButton = document.querySelector(`.remove-btn`);
  removeButton.classList.add('removed');
  setTimeout(() => removeButton.classList.remove('removed'), 500);
}
