document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = Object.fromEntries(fd.entries());
  const res = await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  const msg = document.getElementById('formMsg');
  if (res.ok) {
    msg.textContent = 'Thank you! Site unlocked.';
    document.getElementById('gate').style.display = 'none';
    document.getElementById('site').style.display = 'block';
  } else {
    msg.textContent = 'Error sending form.';
  }
});
