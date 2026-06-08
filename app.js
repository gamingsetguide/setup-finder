const products = [

  // KEYBOARDS
  { name:"AULA F75 RGB", type:"keyboard", price:70, tag:"rgb" },
  { name:"RK61 Creamy", type:"keyboard", price:45, tag:"creamy" },
  { name:"AJAZZ AK820", type:"keyboard", price:65, tag:"creamy" },

  // MICE
  { name:"Logitech G305", type:"mouse", price:40, tag:"fps" },
  { name:"Razer Viper Mini", type:"mouse", price:45, tag:"fps" },

  // HEADSETS
  { name:"HyperX Cloud II", type:"headset", price:70, tag:"fps" },
  { name:"HyperX Cloud Core", type:"headset", price:50, tag:"fps" },

  // SPEAKERS
  { name:"Creative Pebble", type:"speaker", price:35, tag:"clean" },

  // CPUs
  { name:"Ryzen 5 5600", type:"cpu", price:120, tag:"gaming" },

  // GPUs
  { name:"RTX 3060", type:"gpu", price:250, tag:"gaming" }

];

function buildSetup() {

  const text = document.getElementById("input").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value) || 200;

  const types = ["keyboard","mouse","headset"];

  let results = [];
  let total = 0;

  for (let type of types) {

    let options = products
      .filter(p => p.type === type)
      .map(p => {

        let score = 0;

        if (text.includes("rgb") && p.tag === "rgb") score += 50;
        if (text.includes("creamy") && p.tag === "creamy") score += 50;
        if (text.includes("fps") && p.tag === "fps") score += 50;

        // budget awareness
        if (p.price <= budget / 3) score += 30;
        if (p.price > budget / 3) score -= 20;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score);

    let chosen = null;

    for (let item of options) {
      if (total + item.price <= budget) {
        chosen = item;
        break;
      }
    }

    if (!chosen) chosen = options[0];

    results.push(chosen);
    total += chosen.price;
  }

  render(results, total, budget);
}

function render(items, total, budget) {

  const summary = document.getElementById("summary");
  const bar = document.getElementById("bar");
  const results = document.getElementById("results");

  results.innerHTML = "";

  let name =
    total < 120 ? "Budget Setup" :
    total < 200 ? "Balanced Setup" :
    "High-End Setup";

  summary.innerHTML = `
    <h2>🔥 ${name}</h2>
    <p>💰 Total Cost: $${total}</p>
  `;

  let percent = Math.min(100, (total / budget) * 100);

  bar.innerHTML = `
    <div class="bar">
      <div class="fill" style="width:${percent}%"></div>
    </div>
    <p>${total} / ${budget} used</p>
  `;

  items.forEach((item,i) => {

    results.innerHTML += `
      <div class="card">
        ${i === 0 ? "<span class='badge'>🔥 BEST</span>" : ""}
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
    `;
  });
}