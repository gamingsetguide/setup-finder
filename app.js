const products = [
  {
    name: "Redragon K617",
    price: 25,
    color: "white",
    sound: "clicky",
    link: "https://amazon.com"
  },
  {
    name: "RK Royal Kludge RK61",
    price: 45,
    color: "white",
    sound: "creamy",
    link: "https://amazon.com"
  },
  {
    name: "Logitech G213",
    price: 35,
    color: "black",
    sound: "silent",
    link: "https://amazon.com"
  }
];

function searchProducts() {
  const budget = document.getElementById("budget").value;
  const color = document.getElementById("color").value;
  const sound = document.getElementById("sound").value;

  let results = products.filter(p => {
    return (
      (budget === "" || p.price <= budget) &&
      (color === "" || p.color === color) &&
      (sound === "" || p.sound === sound)
    );
  });

  displayResults(results);
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (items.length === 0) {
    resultsDiv.innerHTML = "<p>No matches found 😢</p>";
    return;
  }

  items.forEach(item => {
    resultsDiv.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Color: ${item.color}</p>
        <p>Sound: ${item.sound}</p>
        <a href="${item.link}" target="_blank">
          <button>Buy Now</button>
        </a>
      </div>
    `;
  });
}