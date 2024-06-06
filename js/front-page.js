import SlideWordAnimation from "./slideword.js";

window.addEventListener("load", () => {
  document.querySelectorAll(".slideword").forEach((slideword) => {
    new SlideWordAnimation(slideword);
  });
});
