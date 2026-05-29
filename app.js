let mode = "single";

/* PRODUCTS (enough variety so results actually change) */
const products = [
  { name:"AULA F75 RGB", price:70, type:"keyboard", color:"black", tag:"rgb" },
  { name:"RK61 Creamy", price:45, type:"keyboard", color:"white", tag:"creamy" },
  { name:"Budget Keyboard K1", price:25, type:"keyboard", color:"black", tag:"budget" },

  { name:"Logitech G Pro Mouse", price:60, type:"mouse", color:"black", tag:"fps" },
  { name:"RGB Gaming Mouse X", price:30, type:"mouse", color:"black", tag:"rgb" },

  { name:"HyperX Headset", price:65, type:"headset", color:"black", tag:"fps" },
  { name:"RGB Headset Pro", price:55, type:"headset", color:"black", tag:"rgb" },

  { name:"Redragon Speaker", price:25, type:"speaker", color:"black", tag:"bass" },
  { name:"Creative Speakers", price:40, type:"speaker", color:"black", tag:"clean" }
];

/* MODE TOGGLE */
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

  const query = document.getElementById("query").value.toLowerCase();
  const budget = parseInt(document.getElementById("singleBudget").value);
  const sort = document.getElementById("singleSort").value;

  let results = products.map(p => {

    let score = 0;

    if (query.includes(p.type)) score += 40;
    if (query.includes(p.color)) score += 20;
    if (query.includes(p.tag)) score += 25;

    if (budget && p.price <= budget) score += 50;

    score += Math.random() * 3; // makes results not identical every time

    return { ...p, score };
  })
  .filter(p => p.score > 0);

  sortResults(results, sort);
  display(results);
}

/* FULL SETUP MODE (COHESIVE SET BUILDER) */
function buildSetup() {

  const text = document.getElementById("setupText").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value);
  const sort = document.getElementById("setupSort").value;

  const types = ["keyboard","mouse","headset","speaker"];
  let results = [];

  types.forEach(type => {

    let best = products
      .filter(p => p.type === type)
      .map(p => {

        let score = 0;

        // style matching
        if (text.includes("rgb") && p.tag.includes("rgb")) score += 40;
        if (text.includes("creamy") && p.tag.includes("creamy")) score += 40;
        if (text.includes("fps") && p.tag.includes("fps")) score += 40;

        if (text.includes("black") && p.color === "black") score += 20;
        if (text.includes("white") && p.color === "white") score += 20;

        if (budget && p.price <= budget / 4) score += 50;

        score += Math.random() * 3;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score)[0];

    if (best) results.push(best);
  });

  sortResults(results, sort);
  display(results);
}

/* SORT */
function sortResults(items, sort) {

  if (sort === "low") items.sort((a,b) => a.price - b.price);
  else if (sort === "high") items.sort((a,b) => b.price - a.price);
  else if (sort === "name") items.sort((a,b) => a.name.localeCompare(b.name));
  else items.sort((a,b) => b.score - a.score);

}

/* DISPLAY */
function display(items) {

  const div = document.getElementById("results");
  div.innerHTML = "";

  items.forEach((item, i) => {

    div.innerHTML += `
      <div class="card">
        ${i === 0 ? "<div class='badge'>🔥 BEST</div>" : ""}
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