// script.js
// Password Protection
const hashedPassword = "$2a$10$..."; // Replace with bcrypt hashed password
document.getElementById("password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("password-input").value;
  bcrypt.compare(input, hashedPassword, (err, result) => {
    if (result) {
      document.getElementById("password-overlay").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    } else {
      document.getElementById("error-message").style.display = "block";
    }
  });
});

// Wallet Net Worth
const holdings = {
  bitcoin: 0.5,
  ethereum: 2,
  solana: 50,
  dogecoin: 1000,
  litecoin: 10
};

async function updateWallet() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin,litecoin&vs_currencies=usd"
    );
    let total = 0;
    const table = document.querySelector("#wallet table");
    table.innerHTML = "<tr><th>Coin</th><th>Amount</th><th>Value (USD)</th></tr>";
    for (const [coin, amount] of Object.entries(holdings)) {
      const price = response.data[coin].usd;
      const value = amount * price;
      total += value;
      table.innerHTML += `<tr><td>${coin}</td><td>${amount}</td><td>$${value.toFixed(2)}</td></tr>`;
    }
    document.getElementById("net-worth").textContent = total.toFixed(2);
  } catch (error) {
    console.error("Error fetching wallet data:", error);
  }
}

updateWallet();
setInterval(updateWallet, 60000); // Update every minute

// Hamburger Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});
