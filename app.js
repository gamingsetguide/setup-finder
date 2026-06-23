```javascript
// Better product database
const products = [
  {
    name: "AULA F75 RGB",
    type: "keyboard",
    price: 70,
    tags: ["black", "white", "rgb", "mechanical", "creamy"]
  },
  {
    name: "RK61",
    type: "keyboard",
    price: 45,
    tags: ["black", "white", "clicky", "mechanical"]
  },
  {
    name: "AJAZZ AK820",
    type: "keyboard",
    price: 65,
    tags: ["white", "creamy", "rgb"]
  },
  {
    name: "Logitech G305",
    type: "mouse",
    price: 40,
    tags: ["black", "wireless", "fps"]
  },
  {
    name: "Razer Viper Mini",
    type: "mouse",
    price: 45,
    tags: ["black", "fps", "lightweight"]
  },
  {
    name: "HyperX Cloud II",
    type: "headset",
    price: 70,
    tags: ["black", "gaming", "fps"]
  },
  {
    name: "HyperX Cloud Core",
    type: "headset",
    price: 50,
    tags: ["black", "gaming"]
  }
];

// ---------- QUICK SEARCH ----------
function quickSearch() {
  const type = document.getElementById("qType").value;
  const desc = document.getElementById("qDesc").value.toLowerCase();
  const budget = parseInt(document.getElementById("qBudget").value) || 999;

  const best = pick(type, desc, budget);
  render([best], budget, best.price);
}

// ---------- FULL SETUP ----------
function buildSetup() {
  const kb = document.getElementById("kbDesc").value.toLowerCase();
  const ms = document.getElementById("msDesc").value.toLowerCase();
  const hs = document.getElementById("hsDesc").value.toLowerCase();
  const budget = parseInt(document.getElementById("fullBudget").value) || 300;

  const items = [
    pick("keyboard", kb, budget),
    pick("mouse", ms, budget),
    pick("headset", hs, budget)
  ];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  render(items, budget, total);
}

// ---------- SMART PICK ----------
function pick(type, desc, budget) {

  const words = desc.split(/\s+/);

  return products
    .filter(p => p.type === type)
    .map(p => {

      let score = 0;

      words.forEach(word => {
        if (p.tags.includes(word)) score += 25;
      });

      if (p.price <= budget) {
        score += 15;
      } else {
        score -= (p.price - budget);
      }

      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)[0];
}

// ---------- RENDER ----------
function render(items, budget, total) {

  const results = document.getElementById("results");
  const summary = document.getElementById("summary");
  const bar = document.getElementById("bar");

  results.innerHTML = "";

  summary.innerHTML = `
    <h2>🔥 Setup Result</h2>
    <p>💰 Total: $${total}</p>
  `;

  const percent = Math.min(100, (total / budget) * 100);

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
        <a target="_blank"
           href="https://www.amazon.com/s?k=${encodeURIComponent(item.name)}">
           Buy on Amazon
        </a>
      </div>
    `;
  });
}
```
