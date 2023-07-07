function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');

  btn.addEventListener("click", () => text.toggleAttribute('hidden'));
}


