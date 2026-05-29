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
  const query = document.getElementById("query").value.toLowerCase();

  let results = products.map(p => {

    // BASE SCORE so everything always shows
    let score = 10;

    // TYPE
    if (query.includes("keyboard") && p.type === "keyboard") score += 40;
    if (query.includes("mouse") && p.type === "mouse") score += 40;

    // COLOR
    if (query.includes("white") && p.color === "white") score += 30;
    if (query.includes("black") && p.color === "black") score += 30;

    // SOUND
    if (query.includes("creamy") && p.sound === "creamy") score += 35;
    if (query.includes("clicky") && p.sound === "clicky") score += 35;
    if (query.includes("silent") && p.sound === "silent") score += 35;

    // PRICE
    if (query.includes("cheap") && p.price <= 30) score += 25;
    if (query.includes("under 50") && p.price <= 50) score += 25;

    return { ...p, score };
  });

  // sort best first
  results = results.sort((a, b) => b.score - a.score);

  displayResults(results);
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  items.forEach((item, index) => {

    let badge = index === 0 ? "<div class='badge'>🔥 BEST MATCH</div>" : "";

    resultsDiv.innerHTML += `
      <div class="card">
        ${badge}
        <h3>${item.name}</h3>
        <p>💰 Price: $${item.price}</p>
        <p>🎨 Color: ${item.color}</p>
        <p>🔊 Sound: ${item.sound}</p>
        <p>⚡ Score: ${item.score}</p>

        <a class="buy" href="${item.link}" target="_blank">
          Buy Now
        </a>
      </div>
    `;
  });
}