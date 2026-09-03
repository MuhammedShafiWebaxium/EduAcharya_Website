const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const toast = document.querySelector('.toast');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.lead-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const details = [...data.entries()]
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key.replace(/\b\w/g, c => c.toUpperCase())}: ${value}`)
      .join('\n');
    const title = form.dataset.formTitle || 'Website enquiry';
    const message = `Hello EduAcharya, I am submitting the ${title} form.\n\n${details}`;
    toast.textContent = 'Opening WhatsApp with your enquiry…';
    toast.classList.add('show');
    window.open(`https://wa.me/919633830220?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  });
});
