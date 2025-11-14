// Default prices
let prices = { skin: 200, skinless: 250 };
let offers = [];

// ---------------- Admin Functions ----------------
function setPrices() {
  const skinPrice = parseFloat(document.getElementById('skin-price').value);
  const skinlessPrice = parseFloat(document.getElementById('skinless-price').value);

  if (isNaN(skinPrice) || isNaN(skinlessPrice)) { alert('Enter valid prices'); return; }

  prices.skin = skinPrice;
  prices.skinless = skinlessPrice;

  if (Notification.permission === 'granted') {
    new Notification('Prices Updated - Azeem Chicken Center', {
      body: `With Skin: ₹${skinPrice}, Skinless: ₹${skinlessPrice}`,
      icon: '/images/icon-192.png'
    });
  }

  document.getElementById('admin-msg').innerText = 'Prices updated successfully!';
}

// ---------------- Offers Functions ----------------
function addOffer() {
  const title = document.getElementById('offer-title').value;
  const imgUrl = document.getElementById('offer-image').value;

  if (!title || !imgUrl) { alert('Enter title and image URL'); return; }

  offers.push({ title, imgUrl });
  displayOffers();
  document.getElementById('offer-title').value = '';
  document.getElementById('offer-image').value = '';
}

function displayOffers() {
  const container = document.getElementById('offers');
  if (!container) return;
  container.innerHTML = '';
  offers.forEach(o => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${o.title}</h3><img src="${o.imgUrl}" class="offer-img">`;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', displayOffers);

// ---------------- Customer Functions ----------------
function calculateWeight() {
  const type = document.getElementById('chicken-type').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || amount <= 0) { alert('Enter valid amount'); return; }

  const weight = (amount / prices[type]).toFixed(2);
  document.getElementById('result').innerText = `You will get ${weight} kg of ${type} chicken.`;

  saveOrder(type, amount, weight);
}

// Save offline
function saveOrder(type, amount, weight) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const deliveryTime = document.getElementById('delivery-time')?.value || 'ASAP';
  const deliveryPlace = document.getElementById('delivery-place')?.value || 'Not specified';
  orders.push({ type, amount, weight, deliveryTime, deliveryPlace, date: new Date().toISOString() });
  localStorage.setItem('orders', JSON.stringify(orders));
}

// View saved orders
function viewOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  if (orders.length === 0) { alert('No saved orders'); return; }

  let msg = 'Saved Orders:\n\n';
  orders.forEach((o, i) => {
    msg += `${i + 1}. ${o.type} - ₹${o.amount} - ${o.weight} kg - Delivery: ${o.deliveryPlace}, ${o.deliveryTime} (${new Date(o.date).toLocaleString()})\n`;
  });
  alert(msg);
}

// ---------------- WhatsApp Order ----------------
function sendWhatsAppOrder() {
  const type = document.getElementById('chicken-type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const weight = (amount / prices[type]).toFixed(2);
  const time = document.getElementById('delivery-time').value || "ASAP";
  const place = document.getElementById('delivery-place').value || "Not specified";

  const message = `Hello, I want to order ${weight} kg of ${type} chicken for ₹${amount}. Delivery at: ${place}, Time: ${time}`;
  const phone = "919999999999"; // replace with your WhatsApp number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  notifyAdminOrder(type, amount, weight, time, place);
}

// ---------------- Payment Integration ----------------
function payNow() {
  const type = document.getElementById('chicken-type').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (!amount || amount <= 0) { alert('Enter valid amount'); return; }

  const options = {
    "key": "YOUR_RAZORPAY_KEY",
    "amount": amount * 100,
    "currency": "INR",
    "name": "Azeem Chicken Center",
    "description": `Order for ${type} chicken`,
    "handler": function(response){
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
    }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}

// ---------------- Notifications ----------------
if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

function notifyAdminOrder(type, amount, weight, time, place) {
  if (Notification.permission === 'granted') {
    new Notification('New Customer Order - Azeem Chicken Center', {
      body: `${weight} kg ${type} - ₹${amount}\nDelivery at: ${place}\nTime: ${time}`,
      icon: '/images/icon-192.png'
    });
  }
}

// ---------------- Service Worker ----------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.log('Service Worker failed', err));
}
