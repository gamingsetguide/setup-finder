const products = [
  { name:"AULA F75 Pro", price:70, type:"keyboard", color:"black", tag:"rgb" },
  { name:"RK61 Creamy", price:45, type:"keyboard", color:"white", tag:"creamy" },

  { name:"RGB Gaming Mouse", price:30, type:"mouse", color:"black", tag:"rgb" },

  { name:"RGB Headset", price:60, type:"headset", color:"black", tag:"rgb" },

  { name:"RGB Speaker", price:25, type:"speaker", color:"black", tag:"bass" }
];

let modePreset = null;

/* PRESET BUTTONS */
function setMode(mode) {
  modePreset = mode;

  const text = document.getElementById("customText");

  if (mode === "fps") {
    text.value = "low latency keyboard, fast mouse, competitive headset";
  }

  if (mode === "rgb") {
    text.value = "rgb keyboard, rgb mouse, rgb headset, rgb speaker";
  }

  if (mode === "budget") {
    text.value = "cheap keyboard, cheap mouse, budget headset";
  }

  if (mode === "creamy") {
    text.value = "white creamy keyboard, soft mouse, chill setup";
  }
}

/* MAIN BUILDER */
function buildSetup() {

  const text = document.getElementById("customText").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value);
  const sort = document.getElementById("sort").value;

  const types = ["keyboard","mouse","headset","speaker"];
  let results = [];

  types.forEach(type => {

    let best = products
      .filter(p => p.type === type)
      .map(p => {

        let score = 0;

        if (text.includes("rgb") && p.tag.includes("rgb")) score += 30;
        if (text.includes("creamy") && p.tag.includes("creamy")) score += 30;
        if (text.includes("black") && p.color === "black") score += 20;
        if (text.includes("white") && p.color === "white") score += 20;

        if (text.includes("fast") || text.includes("fps")) score += 20;

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