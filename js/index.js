// Animate each letter of "WELCOME" with custom delays
gsap.from(".welcome_text .text-white span", {
  opacity: 0,
  y: 50,
  ease: "bounce.out",
  stagger: function (index) {
    const delays = [1, 0.6, 0.5, 0.2, 0.9, 0.7, 0.8];
    return delays[index] || 0;
  },
  duration: 3,
});

// Animate the button: fade in and slide up
gsap.from(".enter_btn", {
  opacity: 1, // Start invisible
  y: -30, // Start 50px lower
  duration: 1,
  delay: 3, // Wait until after the welcome text
});

// Animate each letter on hover
document
  .querySelectorAll(".welcome_text .text-white span")
  .forEach((letter) => {
    letter.addEventListener("mouseenter", () => {
      gsap.to(letter, {
        scale: 1.2,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
    letter.addEventListener("mouseleave", () => {
      gsap.to(letter, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });

// Change button text on hover
const btn = document.querySelector(".enter_btn");
btn.addEventListener("mouseenter", () => (btn.textContent = "Go???"));
btn.addEventListener("mouseleave", () => (btn.textContent = "Enter"));
