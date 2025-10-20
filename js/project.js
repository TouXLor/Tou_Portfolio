(async function () {
  const grid = document.getElementById("projects-grid");
  const nav = document.querySelector(".project-nav");

  if (!grid || !nav) {
    console.error("Required DOM elements not found");
    return;
  }

  let data = [];
  try {
    const response = await fetch("./data/projects.json");
    console.log("Fetch attempt made");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = await response.json();
    console.log("Projects data loaded:", data);
  } catch (err) {
    console.error("Error loading projects:", err);
    grid.innerHTML = `<p>Error loading projects: ${err.message}</p>`;
    return;
  }

  if (!Array.isArray(data)) {
    console.error("Invalid data format");
    return;
  }

  function createCard(project) {
    if (!project) return "";
    const imagePath = project.image || "./img/placeholder.png";

    return `
      <article class="card-article" data-category="${project.category || ""}">
        <img 
          src="${imagePath}" 
          alt="${project.title}"
          class="card-img"
          onerror="this.onerror=null; this.src='./img/placeholder.png';"
        />
        <div class="card-data">
          <span class="card-description">${project.title || ""}</span>
          <h2 class="card-title">${project.type || ""}</h2>
          <button class="card-button">Learn More</button>
          <div class="card-extra">
            <p>${project.summary || ""}</p>
          </div>
        </div>
      </article>
    `;
  }

  const cards = data.map(createCard).join("");
  grid.innerHTML = cards || "<p>No projects to display</p>";

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
        // show with fade: remove is-hidden and ensure element is layout-visible
        card.classList.remove("is-hidden");
        card.style.display = "";
        // force reflow so transition runs if previously hidden
        void card.offsetWidth;
        card.style.opacity = "";
      } else {
        // start fade then remove from layout after transition
        card.classList.add("is-hidden");
        // after transition, set display:none to remove from layout
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
