const products = [
  { name:"AULA F75 Pro Keyboard", price:70, type:"keyboard", color:"white", sound:"creamy", link:"https://www.amazon.com/s?k=aula+f75+pro" },
  { name:"AULA F75 Max Keyboard", price:90, type:"keyboard", color:"black", sound:"creamy", link:"https://www.amazon.com/s?k=aula+f75+max" },
  { name:"RK61 Keyboard", price:45, type:"keyboard", color:"white", sound:"creamy", link:"https://www.amazon.com/s?k=rk61" },
  { name:"Gaming Mouse RGB", price:30, type:"mouse", color:"black", sound:"silent", link:"https://www.amazon.com/s?k=gaming+mouse" },
  { name:"RGB Headset", price:60, type:"headset", color:"black", sound:"bass", link:"https://www.amazon.com/s?k=gaming+headset" },
  { name:"RGB Speaker", price:25, type:"speaker", color:"black", sound:"bass", link:"https://www.amazon.com/s?k=rgb+speaker" }
];

let setupMode = false;

function toggleMode() {
  setupMode = !setupMode;

  document.getElementById("singleMode").style.display = setupMode ? "none" : "block";
  document.getElementById("setupMode").style.display = setupMode ? "block" : "none";

  document.getElementById("modeBtn").innerText =
    setupMode ? "Switch to SINGLE MODE" : "Switch to FULL SETUP MODE";

  document.getElementById("results").innerHTML = "";
}

/* SINGLE MODE */
function searchProducts() {
  const query = document.getElementById("query").value.toLowerCase();
  let budget = extractBudget(query);

  let results = products.map(p => {
    let score = 10;

    if (query.includes(p.type)) score += 40;
    if (query.includes(p.color)) score += 25;
    if (query.includes(p.sound)) score += 25;

    if (budget && p.price <= budget) score += 50;

    return { ...p, score };
  });

  results.sort((a,b) => b.score - a.score);
  displayResults(results);
}

/* FULL SETUP MODE */
function buildSetup() {
  const text = document.getElementById("setupText").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value);

  let types = ["keyboard","mouse","headset","speaker"];
  let results = [];

  types.forEach(type => {

    let best = products
      .filter(p => p.type === type)
      .map(p => {
        let score = 10;

        if (text.includes("white") && p.color === "white") score += 20;
        if (text.includes("black") && p.color === "black") score += 20;

        if (text.includes("rgb") || text.includes("led")) score += 20;

        if (budget && p.price <= budget / 4) score += 50;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score)[0];

    if (best) results.push(best);
  });

  displayResults(results);
}

function extractBudget(text) {
  let match = text.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

function displayResults(items) {
  const div = document.getElementById("results");
  div.innerHTML = "";

  items.forEach((item, i) => {

    let badge = i === 0 ? "<div class='badge'>🔥 BEST</div>" : "";

    div.innerHTML += `
      <div class="card">
        ${badge}
        <h3>${item.name}</h3>
        <p>💰 $${item.price}</p>
        <p>Type: ${item.type}</p>

        <a class="buy" href="${item.link}" target="_blank">
          Buy on Amazon
        </a>
      </div>
    `;
  });
}