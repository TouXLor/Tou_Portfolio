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

  function createCard(project, idx) {
    if (!project) return "";
    const imagePath = project.image || "./img/placeholder.png";

    return `
      <article class="card-article" data-category="${
        project.category || ""
      }" data-index="${idx}">
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

  const cards = data.map((p, i) => createCard(p, i)).join("");
  grid.innerHTML = cards || "<p>No projects to display</p>";

  // Side drawer: open project details when Learn More is clicked
  const drawer = document.getElementById("project-drawer");
  const pdContent = drawer ? drawer.querySelector(".pd-content") : null;
  let _lastTrigger = null;

  function buildContent(project) {
    if (!project) return `<p>Details not available.</p>`;
    const title = project.title || project.name || "Untitled";
    const type = project.type || "";
    const long =
      project.longSummary || project.description || project.summary || "";
    const tools = Array.isArray(project.tools)
      ? project.tools
      : project.tools
      ? [project.tools]
      : [];
    const images = Array.isArray(project.gallery)
      ? project.gallery
      : Array.isArray(project.images)
      ? project.images
      : project.image
      ? [project.image]
      : [];

    return `
      <header>
        <small class="pd-type">${type}</small>
        <h2>${title}</h2>
      </header>
      <section class="pd-body">
        <p>${long}</p>
        ${
          tools.length
            ? `<p><strong>Tools:</strong> ${tools.join(", ")}</p>`
            : ""
        }
        ${
          images.length
            ? `<div class="pd-gallery">${images
                .map(
                  (src) =>
                    `<img src="${src}" onerror="this.onerror=null; this.src='./img/placeholder.png'" />`
                )
                .join("")}</div>`
            : ""
        }
      </section>
    `;
  }

  function openDrawer(project, trigger) {
    if (!drawer || !pdContent) return;
    _lastTrigger = trigger || null;
    pdContent.innerHTML = buildContent(project);
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    // focus management
    drawer.focus();

    // Esc to close
    document.addEventListener("keydown", handleKeydown);
  }

  function closeDrawer(returnFocus = true) {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", handleKeydown);
    // return focus to the trigger optionally; avoid immediate focus on overlay clicks
    if (returnFocus) {
      try {
        if (_lastTrigger && typeof _lastTrigger.focus === "function")
          _lastTrigger.focus();
      } catch (e) {}
    }
  }

  function handleKeydown(e) {
    if (e.key === "Escape") closeDrawer();
  }

  if (drawer) {
    // close when clicking the close button or anywhere outside the panel (overlay/click-through)
    drawer.addEventListener("click", (e) => {
      // prevent the click from bubbling to underlying elements
      e.stopPropagation();
      const closeBtn = e.target.closest(".pd-close");
      if (closeBtn) {
        closeDrawer(true);
        return;
      }

      // if the click target is not inside the panel, close (overlay click)
      const insidePanel = e.target.closest(".pd-panel");
      if (!insidePanel) {
        // when clicking outside (overlay), don't immediately return focus to the trigger
        // to avoid visual jumps on the originating card
        closeDrawer(false);
      }
    });
  }

  // delegate Learn More clicks
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-button");
    if (!btn) return;
    const card = btn.closest(".card-article");
    if (!card) return;
    const idx = Number(card.dataset.index);
    const project = data[idx];
    if (!project) return;
    openDrawer(project, btn);
  });

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
