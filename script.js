// Password Protection
const hashedPassword = "$2a$10$7W1z6Xz8z6Xz8z6Xz8z6Xu7W1z6Xz8z6Xz8z6Xz8z6Xz8z6Xz8z6"; // Hashed version of $Walar$
document.getElementById("password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("password-input").value;
  bcrypt.compare(input, hashedPassword, (err, result) => {
    if (result) {
      document.getElementById("password-overlay").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      initAnimations(); // Start animations after login
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
    const tableBody = document.getElementById("wallet-table");
    tableBody.innerHTML = "";
    for (const [coin, amount] of Object.entries(holdings)) {
      const price = response.data[coin]?.usd || 0;
      const value = amount * price;
      total += value;
      tableBody.innerHTML += `<tr><td>${coin.charAt(0).toUpperCase() + coin.slice(1)}</td><td>${amount}</td><td>$${value.toFixed(2)}</td></tr>`;
    }
    document.getElementById("net-worth").textContent = total.toFixed(2);
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    document.getElementById("net-worth").textContent = "Error";
  }
}

// Animations
function initAnimations() {
  // GSAP Animations
  gsap.from("#home h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
  gsap.from("#home p", { duration: 1, y: 50, opacity: 0, delay: 0.2, ease: "power2.out" });
  gsap.from(".cta-button", { duration: 1, scale: 0.8, opacity: 0, delay: 0.4, ease: "back.out(1.7)" });

  // Particles.js
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#ffd700" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffd700", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
      modes: { grab: { distance: 200 }, push: { particles_nb: 4 } }
    }
  });
}

// Hamburger Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// Initialize Wallet
updateWallet();
setInterval(updateWallet, 60000); // Update every minute
