document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".gallery-grid");
  const items = grid.querySelectorAll(".gallery-item img");

  const adjustGridItemHeight = () => {
    items.forEach((item) => {
      const rowSpan = Math.ceil((item.offsetHeight / grid.offsetHeight) * 10);
      item.parentElement.style.gridRowEnd = `span ${rowSpan}`;
    });
  };

  // Ensure images are loaded before calculating heights
  window.onload = () => {
    adjustGridItemHeight();
  };

  // Optional: Re-adjust on window resize if necessary
  window.addEventListener("resize", adjustGridItemHeight);
});
