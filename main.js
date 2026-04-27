const news = [
        './assets/img/banner1.webp',
        './assets/img/banner2.webp',
        './assets/img/banner3.webp',
        './assets/img/banner4.webp'
  ];

let currentIndex = 0; // Índice de la imagen actual

// Crear elementos img y añadirlos al contenedor (doble capa para crossfade)
const container = document.querySelector('.banner');
let imgA = container ? container.querySelector('img.banner-img[data-slot="a"]') : null;
let imgB = container ? container.querySelector('img.banner-img[data-slot="b"]') : null;

if (container && !imgA) {
  imgA = document.createElement('img');
  imgA.className = 'banner-img';
  imgA.dataset.slot = 'a';
  container.appendChild(imgA);
}

if (container && !imgB) {
  imgB = document.createElement('img');
  imgB.className = 'banner-img';
  imgB.dataset.slot = 'b';
  container.appendChild(imgB);
}

if (imgA) {
  imgA.src = news[currentIndex];
  imgA.style.opacity = 1;
}

function changeImage() {
  if (!imgA || !imgB) return;

  const nextIndex = (currentIndex + 1) % news.length;
  const isAVisible = imgA.style.opacity === '1';
  const outgoing = isAVisible ? imgA : imgB;
  const incoming = isAVisible ? imgB : imgA;

  incoming.src = news[nextIndex];
  incoming.style.opacity = 1;
  outgoing.style.opacity = 0;

  currentIndex = nextIndex;
}

if (window.__bannerIntervalId) {
  clearInterval(window.__bannerIntervalId);
}
window.__bannerIntervalId = setInterval(changeImage, 6000);
