const products = [
  { name:"AULA F75 RGB", type:"keyboard", price:70, tag:"rgb" },
  { name:"RK61 Creamy", type:"keyboard", price:45, tag:"creamy" },
  { name:"AJAZZ AK820", type:"keyboard", price:65, tag:"creamy" },

  { name:"Logitech G305", type:"mouse", price:40, tag:"fps" },
  { name:"Razer Viper Mini", type:"mouse", price:45, tag:"fps" },

  { name:"HyperX Cloud II", type:"headset", price:70, tag:"fps" },
  { name:"HyperX Cloud Core", type:"headset", price:50, tag:"fps" },

  { name:"Creative Pebble", type:"speaker", price:35, tag:"clean" },

  { name:"AOC 24G2", type:"monitor", price:130, tag:"fps" },
  { name:"RTX 3060", type:"gpu", price:250, tag:"gaming" },
  { name:"Ryzen 5 5600", type:"cpu", price:120, tag:"gaming" }
];

function search() {

  const category = document.getElementById("category").value;
  const budget = parseInt(document.getElementById("budget").value) || 9999;

  let results = products.filter(p =>
    (category === "all" || p.type === category) &&
    p.price <= budget
  );

  render(results, budget, budget);
}

function buildSetup() {

  const text = document.getElementById("input").value.toLowerCase();
  const budget = 300;

  const types = ["keyboard","mouse","headset"];

  let results = [];
  let total = 0;

  for (let type of types) {

    let options = products
      .filter(p => p.type === type)
      .map(p => {

        let score = 0;

        if (text.includes("rgb") && p.tag === "rgb") score += 40;
        if (text.includes("creamy") && p.tag === "creamy") score += 40;
        if (text.includes("fps") && p.tag === "fps") score += 40;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score);

    let chosen = options[0];

    results.push(chosen);
    total += chosen.price;
  }

  render(results, budget, total);
}

function render(items, budget, total) {

  const results = document.getElementById("results");
  const summary = document.getElementById("summary");
  const bar = document.getElementById("bar");

  results.innerHTML = "";

  summary.innerHTML = `
    <h2>🔥 Setup</h2>
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