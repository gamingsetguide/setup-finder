const products = [
  { name:"AULA F75 Pro", price:70, type:"keyboard", color:"black", tag:"rgb" },
  { name:"AULA F75 Max", price:90, type:"keyboard", color:"black", tag:"rgb" },
  { name:"RK61 Keyboard", price:45, type:"keyboard", color:"white", tag:"creamy" },

  { name:"RGB Gaming Mouse", price:30, type:"mouse", color:"black", tag:"led" },
  { name:"RGB Headset", price:60, type:"headset", color:"black", tag:"rgb" },
  { name:"RGB Speaker", price:25, type:"speaker", color:"black", tag:"bass" }
];

let mode = "single";

/* FIXED MODE TOGGLE */
function toggleMode() {
  mode = mode === "single" ? "setup" : "single";

  document.getElementById("singleMode").style.display =
    mode === "single" ? "block" : "none";

  document.getElementById("setupMode").style.display =
    mode === "setup" ? "block" : "none";

  document.getElementById("modeBtn").innerText =
    mode === "single" ? "Switch to FULL SETUP MODE" : "Switch to SINGLE MODE";

  document.getElementById("results").innerHTML = "";
}

/* SINGLE MODE */
function searchProducts() {
  const query = document.getElementById("query").value.toLowerCase().trim();

  if (query.length < 2) {
    document.getElementById("results").innerHTML =
      "<p>Type something real 😭</p>";
    return;
  }

  let results = products.map(p => {
    let score = 0;

    if (query.includes(p.type)) score += 40;
    if (query.includes(p.color)) score += 25;
    if (query.includes("led") && p.tag.includes("led")) score += 25;
    if (query.includes("rgb") && p.tag.includes("rgb")) score += 25;

    return { ...p, score };
  });

  results = results.filter(r => r.score > 0)
                   .sort((a,b) => b.score - a.score);

  display(results);
}

/* FULL SETUP MODE (FIXED AI BUILDER) */
function buildSetup() {
  const text = document.getElementById("setupText").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value);
  const sort = document.getElementById("sort").value;

  const types = ["keyboard","mouse","headset","speaker"];
  let results = [];

  types.forEach(type => {

    let best = products
      .filter(p => p.type === type)
      .map(p => {
        let score = 0;

        if (text.includes("black") && p.color === "black") score += 20;
        if (text.includes("white") && p.color === "white") score += 20;

        if (text.includes("led") && p.tag.includes("led")) score += 30;
        if (text.includes("rgb") && p.tag.includes("rgb")) score += 30;
        if (text.includes("creamy") && p.tag.includes("creamy")) score += 30;

        if (budget && p.price <= budget / 4) score += 50;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score)[0];

    if (best) results.push(best);
  });

  results = sortResults(results, sort);
  display(results);
}

/* SORT */
function sortResults(items, sort) {
  if (sort === "low") return items.sort((a,b) => a.price - b.price);
  if (sort === "high") return items.sort((a,b) => b.price - a.price);
  if (sort === "name") return items.sort((a,b) => a.name.localeCompare(b.name));
  return items.sort((a,b) => b.score - a.score);
}

/* DISPLAY */
function display(items) {
  const div = document.getElementById("results");
  div.innerHTML = "";

  items.forEach((item, i) => {

    const badge = i === 0 ? "<div class='badge'>🔥 BEST</div>" : "";

    div.innerHTML += `
      <div class="card">
        ${badge}
        <h3>${item.name}</h3>
        <p>💰 $${item.price}</p>
        <p>Type: ${item.type}</p>

        <a class="buy" target="_blank"
        href="https://www.amazon.com/s?k=${encodeURIComponent(item.name)}">
          Buy on Amazon
        </a>
      </div>
    `;
  });
}