const products = [
  { name:"AULA F75 Pro Keyboard", price:70, type:"keyboard", color:"black", tag:"rgb", link:"aula f75 pro keyboard" },
  { name:"AULA F75 Max Keyboard", price:90, type:"keyboard", color:"black", tag:"rgb", link:"aula f75 max keyboard" },
  { name:"RK61 Keyboard", price:45, type:"keyboard", color:"white", tag:"creamy", link:"rk61 keyboard" },

  { name:"RGB Gaming Mouse", price:30, type:"mouse", color:"black", tag:"led", link:"gaming rgb mouse" },

  { name:"RGB Headset", price:60, type:"headset", color:"black", tag:"rgb", link:"gaming headset rgb" },

  { name:"RGB Speaker", price:25, type:"speaker", color:"black", tag:"bass", link:"rgb speaker" }
];

/* MAIN AI BUILDER */
function buildSetup() {
  const text = document.getElementById("query").value.toLowerCase();
  const budget = parseInt(document.getElementById("budget").value);
  const sort = document.getElementById("sort").value;

  const itemsNeeded = detectItems(text);

  let results = [];

  itemsNeeded.forEach(type => {

    let options = products.filter(p => p.type === type).map(p => {
      let score = 0;

      if (text.includes(p.color)) score += 20;
      if (text.includes("led") && p.tag.includes("led")) score += 30;
      if (text.includes("rgb") && p.tag.includes("rgb")) score += 30;
      if (text.includes("creamy") && p.tag.includes("creamy")) score += 30;

      if (budget && p.price <= budget / itemsNeeded.length) score += 50;

      return { ...p, score };
    });

    options.sort((a,b) => b.score - a.score);

    if (options[0]) results.push(options[0]);
  });

  results = sortResults(results, sort);

  display(results);
}

/* DETECT MULTIPLE ITEMS (THIS IS THE “AI PART”) */
function detectItems(text) {
  let items = [];

  if (text.includes("keyboard")) items.push("keyboard");
  if (text.includes("mouse")) items.push("mouse");
  if (text.includes("headset") || text.includes("headphones")) items.push("headset");
  if (text.includes("speaker")) items.push("speaker");

  // default fallback
  if (items.length === 0) items = ["keyboard"];

  return items;
}

/* SORT SYSTEM */
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

    let badge = i === 0 ? "<div class='badge'>🔥 BEST</div>" : "";

    div.innerHTML += `
      <div class="card">
        ${badge}
        <h3>${item.name}</h3>
        <p>💰 $${item.price}</p>
        <p>Type: ${item.type}</p>

        <a class="buy" href="https://www.amazon.com/s?k=${encodeURIComponent(item.link)}" target="_blank">
          Buy on Amazon
        </a>
      </div>
    `;
  });
}