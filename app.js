const products = [
  { name:"AULA F75 RGB", type:"keyboard", price:70, tag:"rgb" },
  { name:"RK61 Creamy", type:"keyboard", price:45, tag:"creamy" },

  { name:"Logitech FPS Mouse", type:"mouse", price:60, tag:"fps" },
  { name:"RGB Mouse", type:"mouse", price:30, tag:"rgb" },

  { name:"HyperX Headset", type:"headset", price:65, tag:"fps" },
  { name:"RGB Headset", type:"headset", price:55, tag:"rgb" }
];

function buildSetup() {

  const text = document.getElementById("input").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value) || 200;

  const types = ["keyboard","mouse","headset"];

  let results = [];
  let total = 0;

  types.forEach(type => {

    let best = products
      .filter(p => p.type === type)
      .map(p => {

        let score = 0;

        if (text.includes("rgb") && p.tag === "rgb") score += 50;
        if (text.includes("creamy") && p.tag === "creamy") score += 50;
        if (text.includes("fps") && p.tag === "fps") score += 50;

        if (p.price <= budget / 3) score += 30;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score)[0];

    results.push(best);
    total += best.price;
  });

  render(results, total, budget);
}

/* 🔥 NEW: SUMMARY CARD + RATINGS + BAR */
function render(items, total, budget) {

  const summary = document.getElementById("summary");
  const bar = document.getElementById("bar");
  const results = document.getElementById("results");

  results.innerHTML = "";

  // Setup Name Generator
  let name = "Balanced Setup";
  if (total < 120) name = "Budget Starter Setup";
  else if (total < 200) name = "Gaming Balanced Setup";
  else name = "High-End Gaming Setup";

  // Ratings
  let gaming = Math.min(100, Math.round((total / budget) * 100));
  let value = Math.max(60, 100 - gaming + 60);
  let looks = 85;

  summary.innerHTML = `
    <h2>🔥 ${name}</h2>
    <p>💰 Total Cost: $${total}</p>
    <p>🎮 Gaming Score: ${gaming}/100</p>
    <p>⚖️ Value Score: ${value}/100</p>
    <p>✨ Looks Score: ${looks}/100</p>
  `;

  // Budget bar
  let percent = Math.min(100, (total / budget) * 100);

  bar.innerHTML = `
    <div class="bar">
      <div class="fill" style="width:${percent}%"></div>
    </div>
    <p>${total} / ${budget} used</p>
  `;

  // Items
  items.forEach((item, i) => {

    results.innerHTML += `
      <div class="card">
        ${i === 0 ? "<span class='badge'>🔥 BEST</span>" : ""}
        <h3>${item.name}</h3>
        <p>$${item.price}</p>

        <a target="_blank"
        href="https://www.amazon.com/s?k=${encodeURIComponent(item.name)}">
        Buy on Amazon
        </a>
      </div>
    `;
  });
}