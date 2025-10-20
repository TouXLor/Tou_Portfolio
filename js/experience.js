(async function () {
  const grid = document.getElementById("experiences-grid");
  const nav = document.querySelector(".experience-nav");

  if (!grid || !nav) {
    console.error("Required DOM elements not found");
    return;
  }

  let data = [];
  try {
    const response = await fetch("./data/experience.json");
    console.log("Fetch attempt made");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = await response.json();
    console.log("Experiences data loaded:", data);
  } catch (err) {
    console.error("Error loading experiences:", err);
    grid.innerHTML = `<p>Error loading experiences: ${err.message}</p>`;
    return;
  }

  if (!Array.isArray(data)) {
    console.error("Invalid data format");
    return;
  }

  function createCard(experience) {
    if (!experience) return "";
    const imagePath = experience.image || "./img/placeholder.png";

    return `
      <article class="card-article" data-category="${
        experience.category || ""
      }">
        <img 
          src="${imagePath}" 
          alt="${experience.title}"
          class="card-img"
          onerror="this.onerror=null; this.src='./img/placeholder.png';"
        />
        <div class="card-data">
          <span class="card-description">${experience.title || ""}</span>
          <h2 class="card-title">${experience.organization || ""}</h2>
          <button class="card-button">Learn More</button>
          <div class="card-extra">
            <p>${experience.summary || ""}</p>
          </div>
        </div>
      </article>
    `;
  }

  const cards = data.map(createCard).join("");
  grid.innerHTML = cards || "<p>No experiences to display</p>";

  // Add filter functionality (robust: support multi-category values and show/hide via style)
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const filter = (btn.dataset.filter || "all").toString();

    // toggle active class
    nav
      .querySelectorAll("button")
      .forEach((b) => b.classList.toggle("active", b === btn));

    // for each card, check its data-category (allow multiple categories separated by space or comma)
    grid.querySelectorAll(".card-article").forEach((card) => {
      const raw = card.dataset.category || "";
      const cats = raw
        .toString()
        .split(/[,\s]+/) // split on commas or whitespace
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (filter === "all" || cats.includes(filter.toLowerCase())) {
        card.classList.remove("is-hidden");
        card.style.display = "";
        void card.offsetWidth;
        card.style.opacity = "";
      } else {
        card.classList.add("is-hidden");
        const onEnd = (ev) => {
          if (ev.propertyName !== "opacity") return;
          card.style.display = "none";
          card.removeEventListener("transitionend", onEnd);
        };
        card.addEventListener("transitionend", onEnd);
      }
    });
  });
})();
