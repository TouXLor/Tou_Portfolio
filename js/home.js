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

// Light/Dark mode toggle logic
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("toggle");
  var body = document.body;
  if (toggle) {
    toggle.addEventListener("change", function () {
      if (toggle.checked) {
        body.classList.add("light-mode");
      } else {
        body.classList.remove("light-mode");
      }
    });
  }
});
