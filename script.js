// Skill bar animation
document.querySelectorAll(".fill").forEach(f => {
  requestAnimationFrame(() => {
    f.style.width = (f.dataset.fill || 0) + "%";
  });
});

// Toast helper
const toast = document.getElementById("toast");
function showToast(text){
  toast.textContent = text;
  toast.style.opacity = "1";
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(() => toast.style.opacity = "0", 1200);
}

// Theme toggle
document.getElementById("btnTheme").addEventListener("click", () => {
  const body = document.body;
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
  showToast("Theme switched!");
});

// Print / Save as PDF
document.getElementById("btnPrint").addEventListener("click", () => window.print());

// Bazinga button
document.getElementById("btnBazinga").addEventListener("click", () => showToast("Bazinga! 😄"));

// Quotes
const quotes = [
  "I’m not insane. My mother had me tested.",
  "You’re in my spot.",
  "There’s a difference between not liking something and not understanding it.",
  "I’m a genius, and you’re not.",
  "Bazinga!"
];
const quoteBox = document.getElementById("quoteBox");
document.getElementById("btnQuote").addEventListener("click", () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.innerHTML = `“${q}”<div class="by">— Sheldon Cooper</div>`;
});

// Fun with Flags data (simple + safe)
const flags = {
  india: {
    name: "India",
    fact: "The Ashoka Chakra has 24 spokes.",
    render: () => `
      <div style="height:33.33%;background:#FF9933"></div>
      <div style="height:33.33%;background:#FFFFFF;position:relative">
        <div style="width:26px;height:26px;border:2px solid #000080;border-radius:50%;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);"></div>
      </div>
      <div style="height:33.33%;background:#138808"></div>
    `
  },
  usa: {
    name: "USA",
    fact: "The flag has 50 stars representing 50 states.",
    render: () => {
      let stripes = "";
      for(let i=0;i<13;i++){
        stripes += `<div style="height:${100/13}%;background:${i%2===0?'#B22234':'#FFFFFF'}"></div>`;
      }
      return `
        <div style="position:relative;height:100%">
          ${stripes}
          <div style="position:absolute;left:0;top:0;width:45%;height:54%;background:#3C3B6E"></div>
        </div>
      `;
    }
  },
  uk: {
    name: "United Kingdom",
    fact: "The Union Jack combines crosses of patron saints.",
    render: () => `
      <div style="height:100%;background:#012169;position:relative">
        <div style="position:absolute;inset:0;background:
          linear-gradient(45deg, transparent 42%, #FFFFFF 42%, #FFFFFF 58%, transparent 58%),
          linear-gradient(-45deg, transparent 42%, #FFFFFF 42%, #FFFFFF 58%, transparent 58%),
          linear-gradient(45deg, transparent 47%, #C8102E 47%, #C8102E 53%, transparent 53%),
          linear-gradient(-45deg, transparent 47%, #C8102E 47%, #C8102E 53%, transparent 53%),
          linear-gradient(90deg, transparent 40%, #FFFFFF 40%, #FFFFFF 60%, transparent 60%),
          linear-gradient(0deg, transparent 40%, #FFFFFF 40%, #FFFFFF 60%, transparent 60%),
          linear-gradient(90deg, transparent 46%, #C8102E 46%, #C8102E 54%, transparent 54%),
          linear-gradient(0deg, transparent 46%, #C8102E 46%, #C8102E 54%, transparent 54%);
        "></div>
      </div>
    `
  },
  france: {
    name: "France",
    fact: "A classic tricolour: blue, white, red.",
    render: () => `
      <div style="display:flex;height:100%">
        <div style="width:33.33%;background:#0055A4"></div>
        <div style="width:33.33%;background:#FFFFFF"></div>
        <div style="width:33.33%;background:#EF4135"></div>
      </div>
    `
  },
  japan: {
    name: "Japan",
    fact: "The red circle represents the sun.",
    render: () => `
      <div style="height:100%;background:#FFFFFF;position:relative">
        <div style="width:34px;height:34px;background:#BC002D;border-radius:50%;
          position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);"></div>
      </div>
    `
  },
  brazil: {
    name: "Brazil",
    fact: "The motto means 'Order and Progress'.",
    render: () => `
      <div style="height:100%;background:#009C3B;position:relative">
        <div style="width:0;height:0;border-left:46px solid transparent;border-right:46px solid transparent;border-bottom:30px solid #FFDF00;
          position:absolute;left:50%;top:50%;transform:translate(-50%,-60%);"></div>
        <div style="width:0;height:0;border-left:46px solid transparent;border-right:46px solid transparent;border-top:30px solid #FFDF00;
          position:absolute;left:50%;top:50%;transform:translate(-50%,-40%);"></div>
        <div style="width:30px;height:30px;background:#002776;border-radius:50%;
          position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);"></div>
      </div>
    `
  }
};

const flagSelect = document.getElementById("flagSelect");
const flagBox = document.getElementById("flagBox");
const flagTitle = document.getElementById("flagTitle");
const flagFact = document.getElementById("flagFact");

function setFlag(key){
  const f = flags[key];
  if(!f) return;
  flagTitle.textContent = f.name;
  flagFact.textContent = f.fact;
  flagBox.innerHTML = f.render();
}

flagSelect.addEventListener("change", e => setFlag(e.target.value));
document.getElementById("btnRandomFlag").addEventListener("click", () => {
  const keys = Object.keys(flags);
  const k = keys[Math.floor(Math.random() * keys.length)];
  flagSelect.value = k;
  setFlag(k);
  showToast(`Today's flag: ${flags[k].name}`);
});

document.getElementById("btnHostLine").addEventListener("click", () => {
  const lines = [
    "Hello, I’m Dr. Sheldon Cooper. Welcome to Fun with Flags.",
    "Today’s topic: correctness, precision, and a flag.",
    "Welcome. Please refrain from incorrect statements.",
    "Let us proceed with the flag… and your education."
  ];
  document.getElementById("hostLine").textContent =
    lines[Math.floor(Math.random() * lines.length)];
});

// Initialize
setFlag(flagSelect.value);

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".imgbtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.dataset.full;
    lightboxImg.src = src;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox(){
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeLightbox(); });
