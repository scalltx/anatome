import { clinic, procedures } from './config/site.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

document.title = `${clinic.name} | Beleza em harmonia`;
document.querySelector('[data-clinic-eyebrow]').textContent = clinic.eyebrow;
document.querySelector('#year').textContent = new Date().getFullYear();

const procedureGrid = $('#procedure-grid');
procedureGrid.innerHTML = procedures.map((procedure) => `
  <article class="procedure-card">
    <img class="procedure-image" src="${procedure.image}" alt="Imagem ilustrativa de ${procedure.title}" loading="lazy" width="1536" height="1024" />
    <small class="image-caption">Imagem ilustrativa</small>
    <span class="procedure-tag">${procedure.tag}</span>
    <h3>${procedure.title}</h3>
    <p>${procedure.description}</p>
    <button class="text-link js-whatsapp" type="button" aria-label="Consultar sobre ${procedure.title}">Consultar atendimento ↗</button>
  </article>
`).join('');

const formatPhone = (phone) => phone ? phone.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '+55 ($1) $2-$3') : '';
document.querySelector('[data-contact-whatsapp]').textContent = clinic.whatsapp ? formatPhone(clinic.whatsapp) : 'Configure o número oficial';
document.querySelector('[data-contact-instagram]').textContent = clinic.instagram || 'Configure o perfil oficial';
document.querySelector('[data-contact-address]').textContent = clinic.address || 'Configure o endereço da clínica';
document.querySelector('[data-contact-hours]').textContent = clinic.hours || 'Configure os horários';

const setContactLink = (selector, label, url) => {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.textDecoration = 'underline';
  document.querySelector(selector).replaceChildren(link);
};
const whatsappUrl = `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}`;
if (clinic.instagram) setContactLink('[data-contact-instagram]', '@ana_tomelima', clinic.instagram);
if (clinic.whatsapp) {
  setContactLink('[data-contact-whatsapp]', formatPhone(clinic.whatsapp), `${whatsappUrl}?text=${encodeURIComponent(clinic.message)}`);
  setContactLink('[data-contact-hours]', clinic.hours, `${whatsappUrl}?text=${encodeURIComponent('Olá! Gostaria de verificar os horários de atendimento da Ana Tomé.')}`);
}
if (clinic.address) setContactLink('[data-contact-address]', clinic.address, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`);

const toast = $('.toast');
let toastTimer;
const showToast = (message) => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 4000); };
$$('.js-whatsapp').forEach((button) => button.addEventListener('click', () => {
  if (!clinic.whatsapp) { showToast('O contato para agendamento estará disponível em breve.'); return; }
  window.open(`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(clinic.message)}`, '_blank', 'noopener');
}));

const menuButton = $('.menu-toggle');
const nav = $('.site-nav');
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
$$('.site-nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

const header = $('[data-header]');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
