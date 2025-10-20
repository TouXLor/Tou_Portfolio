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

  // Add filter functionality
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const filter = e.target.dataset.filter;
      nav
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.toggle("active", btn === e.target));

      grid.querySelectorAll(".card-article").forEach((card) => {
        if (filter === "all" || card.dataset.category.includes(filter)) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    }
  });
})();
