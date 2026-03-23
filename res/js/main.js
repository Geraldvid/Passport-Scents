// Mostrar el botón cuando el video termina
const video = document.getElementById("introVideo");
const button = document.getElementById("enterButton");

video.addEventListener("ended", () => {
  button.classList.remove("d-none");
  button.classList.add("fade-in");
});