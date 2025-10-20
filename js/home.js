// JS to watch when each card enters the viewport
const cards = document.querySelectorAll(".card-article");
const io = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("pop-up");
        observer.unobserve(entry.target); // only pop once
      }
    });
  },
  { threshold: 0.1 }
); // fire when 10% of the card is visible

cards.forEach((card) => io.observe(card));

document.querySelectorAll(".card-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".card-article");

    // collapse others
    document.querySelectorAll(".card-article").forEach((c) => {
      if (c !== card) c.classList.remove("active");
    });

    // toggle this one
    card.classList.toggle("active");

    if (card.classList.contains("active")) {
      btn.textContent = "Close";
    } else {
      btn.textContent = "Read More";
    }
  });
});

// new bit: collapse on mouse leave
document.querySelectorAll(".card-article").forEach((card) => {
  card.addEventListener("mouseleave", () => {
    card.classList.remove("active");

    const btn = card.querySelector(".card-button");
    if (!btn) return;

    // 3) if it currently says "Close", reset it
    if (btn.textContent.trim() === "Close") {
      btn.textContent = "Read More";
    }
  });
});

document.querySelectorAll(".toggle").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // find the card container
    const card = checkbox.closest(".card-article");
    if (!card) return;

    // toggle the sun/moon icons inside this card
    const sunIcon = card.querySelector(".sun");
    const moonIcon = card.querySelector(".moon");
    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle("active", !checkbox.checked);
      moonIcon.classList.toggle("active", checkbox.checked);
    }

    // toggle the card's active state
    card.classList.toggle("active", checkbox.checked);

    // update the button text
    const btn = card.querySelector(".card-button");
    if (btn) {
      btn.textContent = checkbox.checked ? "Close" : "Read More";
    }
  });
});

const toggle = document.getElementById("toggle");

toggle.addEventListener("change", () => {
  // if checked, add .dark to <body>; otherwise remove it
  document.body.classList.toggle("dark", toggle.checked);
});

// For the modal functionality
document.querySelectorAll(".card-button").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (window.openModalExternally) {
      window.openModalExternally();
    }
  });
});

// ---------- PROJECT FILTER SECTION ----------
function setupProjectFilter() {
  const nav = document.querySelector(".project-nav");
  if (!nav) return;

  const buttons = nav.querySelectorAll("button");

  // ⬇️ Only grab cards inside the container that follows the project nav
  const cardsContainer = nav.nextElementSibling; // this is your <div class="container"> for Projects
  const cards = cardsContainer
    ? cardsContainer.querySelectorAll(".card-article")
    : [];

  // helper: update which button is "pressed"
  function setActiveButton(clickedBtn) {
    buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    clickedBtn.setAttribute("aria-pressed", "true");
  }

  // helper: apply the filter to all cards
  function applyFilter(filter) {
    const isAll = filter === "all";
    cards.forEach((card) => {
      if (isAll) {
        card.classList.remove("is-hidden");
        return;
      }
      const raw = (card.dataset.category || "").toLowerCase().trim();
      const tokens = raw.split(/\s+/); // handles multiple spaces
      const match = tokens.includes(filter);
      card.classList.toggle("is-hidden", !match);
    });
  }

  // click handling (event delegation)
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const filter = (btn.dataset.filter || "").toLowerCase();
    setActiveButton(btn);
    applyFilter(filter);
  });

  // on load: use whichever button is aria-pressed="true" as the default
  const initiallyPressed =
    nav.querySelector('button[aria-pressed="true"]') || buttons[0];
  setActiveButton(initiallyPressed);
  applyFilter((initiallyPressed.dataset.filter || "all").toLowerCase());
}

// run after DOM is ready
document.addEventListener("DOMContentLoaded", setupProjectFilter);
