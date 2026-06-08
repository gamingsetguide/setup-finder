const products = [

  // KEYBOARDS
  { name:"AULA F75 RGB", type:"keyboard", price:70, tag:"rgb" },
  { name:"AULA F75 Pro", type:"keyboard", price:85, tag:"creamy" },
  { name:"RK61 Creamy", type:"keyboard", price:45, tag:"creamy" },
  { name:"RK M75", type:"keyboard", price:90, tag:"creamy" },
  { name:"AJAZZ AK820", type:"keyboard", price:65, tag:"creamy" },
  { name:"Redragon K552", type:"keyboard", price:40, tag:"budget" },
  { name:"Logitech K835", type:"keyboard", price:55, tag:"silent" },

  // MICE
  { name:"Logitech G305", type:"mouse", price:40, tag:"fps" },
  { name:"Logitech G Pro", type:"mouse", price:90, tag:"fps" },
  { name:"Attack Shark X3", type:"mouse", price:50, tag:"fps" },
  { name:"Razer Viper Mini", type:"mouse", price:45, tag:"fps" },
  { name:"RGB Gaming Mouse", type:"mouse", price:30, tag:"rgb" },

  // HEADSETS
  { name:"HyperX Cloud II", type:"headset", price:70, tag:"fps" },
  { name:"HyperX Cloud Core", type:"headset", price:50, tag:"fps" },
  { name:"SteelSeries Arctis 3", type:"headset", price:60, tag:"fps" },
  { name:"RGB Headset Pro", type:"headset", price:55, tag:"rgb" },

  // SPEAKERS
  { name:"Creative Pebble", type:"speaker", price:35, tag:"clean" },
  { name:"Redragon GS520", type:"speaker", price:40, tag:"rgb" },
  { name:"Logitech Z200", type:"speaker", price:30, tag:"budget" },

  // CPUs
  { name:"Ryzen 5 5600", type:"cpu", price:120, tag:"gaming" },
  { name:"Ryzen 5 7600", type:"cpu", price:180, tag:"gaming" },
  { name:"Intel i5 12400F", type:"cpu", price:140, tag:"gaming" },
  { name:"Ryzen 7 7700X", type:"cpu", price:300, tag:"gaming" },

  // GPUs
  { name:"RTX 3060", type:"gpu", price:250, tag:"gaming" },
  { name:"RTX 4060", type:"gpu", price:300, tag:"gaming" },
  { name:"RTX 4070", type:"gpu", price:550, tag:"gaming" },

  // MONITORS
  { name:"AOC 24G2", type:"monitor", price:130, tag:"fps" },
  { name:"Gigabyte G27Q", type:"monitor", price:250, tag:"gaming" },
  { name:"MSI G2412", type:"monitor", price:150, tag:"fps" },

  // EXTRA VARIETY (to reach ~60+ feel)
  { name:"SteelSeries Mousepad XL", type:"mousepad", price:20, tag:"fps" },
  { name:"RGB Mousepad", type:"mousepad", price:25, tag:"rgb" }

];


// 🔍 QUICK SEARCH
function quickSearch() {

  const category = document.getElementById("category").value;
  const budget = parseInt(document.getElementById("budget").value) || 9999;

  let results = products
    .filter(p =>
      (category === "all" || p.type === category) &&
      p.price <= budget
    )
    .sort((a,b) => a.price - b.price);

  display(results);
}


// 🧠 FULL SETUP BUILDER
function buildSetup() {

  const text = document.getElementById("input").value.toLowerCase();

  const types = ["keyboard","mouse","headset","speaker"];
  let results = [];
  let total = 0;

  types.forEach(type => {

    let best = products
      .filter(p => p.type === type)
      .map(p => {

        let score = 0;

        if (text.includes("rgb") && p.tag === "rgb") score += 40;
        if (text.includes("fps") && p.tag === "fps") score += 40;
        if (text.includes("creamy") && p.tag === "creamy") score += 40;

        score += Math.random() * 3;

        return { ...p, score };
      })
      .sort((a,b) => b.score - a.score)[0];

    results.push(best);
    total += best.price;
  });

  renderSetup(results, total);
}


// 📦 DISPLAY QUICK SEARCH
function display(items) {

  const div = document.getElementById("results");
  div.innerHTML = "";

  items.forEach((item,i) => {

    div.innerHTML += `
      <div class="card">
        ${i === 0 ? "<span class='badge'>🔥 BEST</span>" : ""}
        <h3>${item.name}</h3>
        <p>$${item.price}</p>

        <a target="_blank"
        href="https://www.amazon.com/s?k=${encodeURIComponent(item.name)}">
          Buy
        </a>
      </div>
    `;
  });
}


// 🧾 FULL SETUP DISPLAY
function renderSetup(items, total) {

  const div = document.getElementById("results");
  const summary = document.getElementById("summary");
  const bar = document.getElementById("bar");

  div.innerHTML = "";

  let name =
    total < 150 ? "Budget Setup" :
    total < 300 ? "Balanced Setup" :
    "High-End Setup";

  summary.innerHTML = `
    <h2>🔥 ${name}</h2>
    <p>💰 Total: $${total}</p>
  `;

  let percent = Math.min(100, total / 5);

  bar.innerHTML = `
    <div class="bar">
      <div class="fill" style="width:${percent}%"></div>
    </div>
  `;

  items.forEach((item,i) => {

    div.innerHTML += `
      <div class="card">
        ${i === 0 ? "<span class='badge'>🔥 BEST</span>" : ""}
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
    `;
  });
}