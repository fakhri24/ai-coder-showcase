let count = 0
const button = document.getElementById('clicker')

button.addEventListener('click', () => {
  count += 1
  button.textContent = `Diklik ${count} kali`
})
