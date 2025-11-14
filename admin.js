// Initialize
if (!localStorage.getItem("prices")) localStorage.setItem("prices", JSON.stringify({ skin: 200, skinless: 250 }));
if (!localStorage.getItem("offers")) localStorage.setItem("offers", JSON.stringify([]));
if (!localStorage.getItem("orders")) localStorage.setItem("orders", JSON.stringify([]));

// Save prices
function savePrices() {
  const skin = parseFloat(document.getElementById("price-skin").value);
  const skinless = parseFloat(document.getElementById("price-skinless").value);
  if (skin && skinless) {
    localStorage.setItem("prices", JSON.stringify({ skin, skinless }));
    alert("Prices updated successfully!");
  } else alert("Enter valid prices");
}

// Manage offers
function displayOffers() {
  const offers = JSON.parse(localStorage.getItem("offers"));
  const container = document.getElementById("offers-list");
  container.innerHTML = "";
  offers.forEach((o, i) => {
    const div = document.createElement("div");
    div.innerHTML = `${o.title} <img src="${o.imgUrl}" width="80"> <button onclick="removeOffer(${i})">Remove</button>`;
    container.appendChild(div);
  });
}
displayOffers();

function addOffer() {
  const title = document.getElementById("offer-title").value;
  const imgUrl = document.getElementById("offer-img").value;
  if (!title || !imgUrl) return alert("Enter offer title and image");
  const offers = JSON.parse(localStorage.getItem("offers"));
  offers.push({ title, imgUrl });
  localStorage.setItem("offers", JSON.stringify(offers));
  displayOffers();
  document.getElementById("offer-title").value = "";
  document.getElementById("offer-img").value = "";
}

function removeOffer(index) {
  const offers = JSON.parse(localStorage.getItem("offers"));
  offers.splice(index, 1);
  localStorage.setItem("offers", JSON.stringify(offers));
  displayOffers();
}

// Display customer orders
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders"));
  const ul = document.getElementById("orders-list");
  ul.innerHTML = "";
  orders.forEach(order => {
    const li = document.createElement("li");
    li.textContent = order;
    ul.appendChild(li);
  });
}
loadOrders();
