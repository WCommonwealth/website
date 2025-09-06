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
        gsap.to(row, { backgroundColor: "rgba(255, 105, 180, 0.2)", duration: 0.3 });
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
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Home section (on load)
  gsap.fromTo("#home", 
    { y: 50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  );

  gsap.fromTo(".home-content h1", 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
  );

  gsap.fromTo(".home-content .slogan", 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.out" }
  );

  gsap.fromTo(".button-group", 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, delay: 1, ease: "back.out(1.7)" }
  );

  gsap.fromTo(".subtext", 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, delay: 1.5, ease: "power2.out" }
  );

  // Other sections with ScrollTrigger
  gsap.utils.toArray("section:not(#home)").forEach((section, index) => {
    gsap.fromTo(section, 
      { y: 50, opacity: 0 }, 
      {
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out", 
        delay: index * 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Particles.js with new colors
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ["#ff69b4", "#800080", "#ffd700"] },
      shape: { type: "triangle", polygon: { nb_sides: 3 } },
      opacity: { value: 0.6, random: true },
      size: { value: 6, random: true },
      line_linked: { enable: true, distance: 150, color: "#ff69b4", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 4, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 200 }, push: { particles_nb: 4 } }
    }
  });

  ScrollTrigger.refresh();
}

// Hamburger Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
  if (navLinks.classList.contains("show")) {
    gsap.fromTo(navLinks, { x: "-100%" }, { x: "0%", duration: 0.5, ease: "power2.out" });
  } else {
    gsap.to(navLinks, { 
      x: "-100%", 
      duration: 0.5, 
      ease: "power2.in" 
    });
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    gsap.to(window, { duration: 1, scrollTo: { y: target.offsetTop - 80, autoKill: false }, ease: "power2.inOut" });
  });
});

// Button hover effects
document.querySelectorAll(".cta-button").forEach(button => {
  button.addEventListener("mouseover", () => {
    gsap.to(button, { scale: 1.1, boxShadow: "0 0 25px #ff69b4", duration: 0.3 });
  });
  button.addEventListener("mouseout", () => {
    gsap.to(button, { scale: 1, boxShadow: "0 0 10px rgba(255, 105, 180, 0.5)", duration: 0.3 });
  });
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  updateWallet();
  setInterval(updateWallet, 60000);
});
