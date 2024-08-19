const logoutButton = document.getElementById('logout-button');
logoutButton?.addEventListener('click', e => {
  e.preventDefault();
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    console.log(res)
    window.location.href = '../index.html'
  })
})