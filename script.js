// Default prices
let prices = { skin: 200, skinless: 250 };
let offers = [
  { title: "20% off on 2kg+", imgUrl: "images/chicken2.jpg" }
];

// Display offers
function displayOffers() {
  const container = document.getElementById('offers');
  container.innerHTML = '';
  offers.forEach(o => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${o.title}</h3><img src="${o.imgUrl}" class="offer-img">`;
    container.appendChild(div);
  });
}
document.addEventListener('DOMContentLoaded', displayOffers);

// Calculate weight
function calculateWeight() {
  const type = document.getElementById('chicken-type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (!amount || amount <= 0) return alert("Enter valid amount");
  const weight = (amount / prices[type]).toFixed(2);
  document.getElementById('result').innerText = `You get ${weight} kg of ${type} chicken.`;
}

// WhatsApp order
function sendWhatsAppOrder() {
  const type = document.getElementById('chicken-type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const weight = (amount / prices[type]).toFixed(2);
  const time = document.getElementById('delivery-time').value || "ASAP";
  const place = document.getElementById('delivery-place').value || "Not specified";
  const message = `Hello, I want ${weight} kg of ${type} chicken for ₹${amount}. Delivery at: ${place}, Time: ${time}`;
  const phone = "919999999999"; // replace with your WhatsApp number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Payment placeholder
function payNow() { alert("Payment integration coming soon"); }
