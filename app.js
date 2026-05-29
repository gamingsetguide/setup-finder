const products = [
  {
    name: "RK61 Mechanical Keyboard",
    price: 45,
    color: "white",
    sound: "creamy",
    type: "keyboard",
    link: "https://amazon.com"
  },
  {
    name: "Redragon K617",
    price: 25,
    color: "white",
    sound: "clicky",
    type: "keyboard",
    link: "https://amazon.com"
  },
  {
    name: "Logitech G213",
    price: 35,
    color: "black",
    sound: "silent",
    type: "keyboard",
    link: "https://amazon.com"
  },
  {
    name: "HyperX Pulsefire Mouse",
    price: 20,
    color: "black",
    sound: "silent",
    type: "mouse",
    link: "https://amazon.com"
  }
];

function searchProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const budget = document.getElementById("budget").value;
  const type = document.getElementById("type").value;
  const color = document.getElementById("color").value;
  const sound = document.getElementById("sound").value;

  let results = products.filter(p => {
    return (
      (budget === "" || p.price <= budget) &&
      (type === "" || p.type === type) &&
      (color === "" || p.color === color) &&
      (sound === "" || p.sound === sound) &&
      (search === "" || p.name.toLowerCase().includes(search))
    );
  });

  displayResults(results);
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (items.length === 0) {
    resultsDiv.innerHTML = "<p>No matches found 😢</p>";
    return;
  }

  items.forEach(item => {

    let score = 100 - item.price;

    let badge = "";
    if (score > 70) badge = "<div class='badge'>🔥 BEST</div>";

    resultsDiv.innerHTML += `
      <div class="card">
        ${badge}
        <h3>${item.name}</h3>
        <p>💰 Price: $${item.price}</p>
        <p>🎨 Color: ${item.color}</p>
        <p>🔊 Sound: ${item.sound}</p>
        <p>⚡ Match Score: ${score}/100</p>

        <a class="buy" href="${item.link}" target="_blank">
          Buy Now
        </a>
      </div>
    `;
  });
}