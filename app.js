const products = [
  { name:"AULA F75 RGB", type:"keyboard", price:70, tag:"rgb" },
  { name:"RK61 Creamy", type:"keyboard", price:45, tag:"creamy" },
  { name:"AJAZZ AK820", type:"keyboard", price:65, tag:"creamy" },

  { name:"Logitech G305", type:"mouse", price:40, tag:"fps" },
  { name:"Razer Viper Mini", type:"mouse", price:45, tag:"fps" },

  { name:"HyperX Cloud II", type:"headset", price:70, tag:"fps" },
  { name:"HyperX Cloud Core", type:"headset", price:50, tag:"fps" }
];

let mode = "single";

function setMode(m) {
  mode = m;

  document.getElementById("singleMode").style.display =
    m === "single" ? "block" : "none";

  document.getElementById("setupMode").style.display =
    m === "setup" ? "block" : "none";
}

/* ---------------- SINGLE MODE ---------------- */

function singleSearch() {

  const type = document.getElementById("singleType").value;
  const desc = document.getElementById("singleDesc").value.toLowerCase();
  const budget = parseInt(document.getElementById("singleBudget").value) || 999;

  let best = products
    .filter(p => p.type === type)
    .map(p => {

      let score = 0;

      if (desc.includes("rgb") && p.tag === "rgb") score += 50;
      if (desc.includes("creamy") && p.tag === "creamy") score += 50;
      if (desc.includes("fps") && p.tag === "fps") score += 50;

      if (p.price <= budget) score += 30;

      return { ...p, score };
    })
    .sort((a,b)=>b.score-a.score)[0];

  render([best], budget, best.price);
}

/* ---------------- SETUP MODE ---------------- */

function buildSetup() {

  const kb = document.getElementById("setupKeyboard").value.toLowerCase();
  const ms = document.getElementById("setupMouse").value.toLowerCase();
  const hs = document.getElementById("setupHeadset").value.toLowerCase();
  const budget = parseInt(document.getElementById("setupBudget").value) || 300;

  let items = [
    pick("keyboard", kb),
    pick("mouse", ms),
    pick("headset", hs)
  ];

  let total = items.reduce((a,b)=>a + b.price, 0);

  render(items, budget, total);
}

/* smart picker */
function pick(type, desc) {

  let best = products
    .filter(p => p.type === type)
    .map(p => {

      let score = 0;

      if (desc.includes("rgb") && p.tag === "rgb") score += 50;
      if (desc.includes("creamy") && p.tag === "creamy") score += 50;
      if (desc.includes("fps") && p.tag === "fps") score += 50;

      return { ...p, score };
    })
    .sort((a,b)=>b.score-a.score)[0];

  return best;
}

/* ---------------- RENDER ---------------- */

function render(items, budget, total) {

  const results = document.getElementById("results");
  const summary = document.getElementById("summary");
  const bar = document.getElementById("bar");

  results.innerHTML = "";

  summary.innerHTML = `
    <h2>🔥 Setup Result</h2>
    <p>💰 Total: $${total}</p>
  `;

  let percent = Math.min(100, (total / budget) * 100);

  bar.innerHTML = `
    <div class="bar">
      <div class="fill" style="width:${percent}%"></div>
    </div>
    <p>${total} / ${budget}</p>
  `;

  items.forEach(item => {

    results.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
    `;
  });
}