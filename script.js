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
      const row = document.createElement("tr");
      row.innerHTML = `<td>${coin.charAt(0).toUpperCase() + coin.slice(1)}</td><td>${amount}</td><td>$${value.toFixed(2)}</td>`;
      row.addEventListener("mouseover", () => {
        gsap.to(row, { backgroundColor: "rgba(255, 215, 0, 0.2)", duration: 0.3 });
      });
      row.addEventListener("mouseout", () => {
        gsap.to(row, { backgroundColor: "transparent", duration: 0.3 });
      });
      tableBody.appendChild(row);
    }
    let worth = { value: 0 };
    gsap.to(worth, {
      value: total,
      duration: 1,
      snap: "value",
      onUpdate: () => {
        document.getElementById("net-worth").textContent = worth.value.toFixed(2);
      }
    });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    document.getElementById("net-worth").textContent = "Error";
  }
}

// Animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // GSAP Animations
  gsap.from(".home-content h1", { duration: 1.5, y: 100, opacity: 0, ease: "elastic.out(1, 0.5)" });
  gsap.from(".home-content .slogan", { duration: 1.5, y: 100, opacity: 0, delay: 0.5, ease: "power2.out" });
  gsap.from(".button-group", { duration: 1.5, y: 100, opacity: 0, delay: 1, ease: "back.out(1.7)" });
  gsap.from(".subtext", { duration: 1.5, y: 100, opacity: 0, delay: 1.5, ease: "power2.out" });

  gsap.utils.toArray("section").forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: index * 0.2
    });
  });

  // Particles.js (Glowing Triangles and Orbits)
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ["#ffd700", "#800080", "#00b7eb"] },
      shape: { type: "triangle", polygon: { nb_sides: 3 } },
      opacity: { value: 0.6, random: true },
      size: { value: 6, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffd700", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 4, direction: "none", random: true, straight: false, out_mode: "out" },
      rotate: { value: 0, random: true, direction: "clockwise", animation: { enable: true, speed: 5, sync: false } }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 200 }, push: { particles_nb: 4 } }
    }
  });
}

// Hamburger Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks.classList.contains("show")) {
    gsap.to(navLinks, { 
      x: "-100%", 
      duration: 0.5, 
      ease: "power2.in", 
      onComplete: () => navLinks.classList.remove("show") 
    });
  } else {
    navLinks.classList.add("show");
    gsap.fromTo(navLinks, { x: "-100%" }, { x: "0%", duration: 0.5, ease: "power2.out" });
  }
});

// Smooth Scrolling and Button Interactions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    gsap.to(window, { duration: 1, scrollTo: { y: target.offsetTop - 80, autoKill: false }, ease: "power2.inOut" });
  });
});

document.querySelectorAll(".cta-button").forEach(button => {
  button.addEventListener("mouseover", () => {
    gsap.to(button, { scale: 1.1, boxShadow: "0 0 25px #ffd700", duration: 0.3 });
  });
  button.addEventListener("mouseout", () => {
    gsap.to(button, { scale: 1, boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)", duration: 0.3 });
  });
});

// Initialize
initAnimations();
updateWallet();
setInterval(updateWallet, 60000); // Update every minute
