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

  // Add filter functionality
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const filter = e.target.dataset.filter;
      nav
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.toggle("active", btn === e.target));

      grid.querySelectorAll(".card-article").forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    }
  });
})();
