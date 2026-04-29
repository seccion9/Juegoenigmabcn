/**
 * Enigma BCN — Chat Widget
 * Burbuja flotante + panel de chat lateral
 *
 * Uso: incluir este script en cualquier página.
 * Cuando el equipo de automatizaciones entregue su código,
 * pegarlo dentro de la función  insertAutomationCode()  (ver abajo).
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     CONFIGURACIÓN
  ───────────────────────────────────────── */
  const CONFIG = {
    // Texto del encabezado del panel
    panelTitle: '¿En qué podemos ayudarte?',
    panelSubtitle: 'Chat con Enigma BCN',
    // Mensaje de bienvenida mientras no hay integración
    placeholderMsg: 'Pronto podrás chatear con nosotros directamente desde aquí. Mientras tanto, escríbenos por WhatsApp.',
    // Número de WhatsApp fallback
    waNumber: '34673423738',
    waPrefilledMsg: 'Hola, quiero información sobre Enigma BCN',
    // Colores del sitio
    colorOrange: '#ff5f01',
    colorDark: '#1a1a1a',
    colorText: '#f0f0f0',
  };

  /* ─────────────────────────────────────────
     INYECCIÓN DE CÓDIGO DE AUTOMATIZACIÓN
     ⬇  El equipo de automatizaciones pega su
        código/snippet AQUÍ dentro.
  ───────────────────────────────────────── */
  function insertAutomationCode(container) {
    // TODO: reemplazar este bloque con el snippet del equipo de automatizaciones
    // Ejemplo: container.innerHTML = '<iframe src="..."></iframe>';
    // O:       const script = document.createElement('script'); script.src = '...'; container.appendChild(script);

    container.innerHTML = `
      <div class="ecw-placeholder">
        <div class="ecw-placeholder-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="${CONFIG.colorOrange}" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M8.5 9.5c0-.828.672-1.5 1.5-1.5h4a1.5 1.5 0 010 3h-4a1.5 1.5 0 01-1.5-1.5zM8.5 14.5a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 000-3H10a1.5 1.5 0 00-1.5 1.5z" fill="${CONFIG.colorOrange}"/>
          </svg>
        </div>
        <p>${CONFIG.placeholderMsg}</p>
        <a
          class="ecw-wa-btn"
          href="https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waPrefilledMsg)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Abrir WhatsApp
        </a>
      </div>
    `;
  }
  /* ────────────────── FIN ZONA INTEGRACIÓN ─ */


  /* ─────────────────────────────────────────
     CSS
  ───────────────────────────────────────── */
  const css = `
    /* Burbuja */
    #ecw-bubble {
      position: fixed;
      bottom: 120px;
      right: 25px;
      z-index: 9998;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #25d366;
      box-shadow: 0 4px 18px rgba(0,0,0,.35);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      transition: transform .2s ease, box-shadow .2s ease;
    }
    #ecw-bubble:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(0,0,0,.45);
    }
    #ecw-bubble svg {
      width: 30px;
      height: 30px;
      fill: #fff;
      transition: opacity .2s ease;
    }
    #ecw-bubble .ecw-icon-close {
      display: none;
    }
    #ecw-bubble.ecw-open .ecw-icon-wa {
      display: none;
    }
    #ecw-bubble.ecw-open .ecw-icon-close {
      display: block;
    }
    /* Badge de notificación */
    #ecw-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 16px;
      height: 16px;
      background: ${CONFIG.colorOrange};
      border-radius: 50%;
      border: 2px solid #fff;
      transition: opacity .3s;
    }
    /* Panel */
    #ecw-panel {
      position: fixed;
      bottom: 190px;
      right: 25px;
      z-index: 9997;
      width: 340px;
      max-width: calc(100vw - 32px);
      max-height: 520px;
      background: ${CONFIG.colorDark};
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(.97);
      pointer-events: none;
      transition: opacity .25s ease, transform .25s ease;
    }
    #ecw-panel.ecw-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    /* Encabezado del panel */
    #ecw-panel-header {
      background: #111;
      padding: 16px 18px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .ecw-header-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: ${CONFIG.colorOrange};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ecw-header-avatar svg {
      width: 22px;
      height: 22px;
      fill: #fff;
    }
    .ecw-header-text {
      flex: 1;
    }
    .ecw-header-title {
      color: #fff;
      font-family: 'BankGothic Medium', 'Bank Gothic', sans-serif;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: .5px;
      line-height: 1.2;
    }
    .ecw-header-subtitle {
      color: rgba(255,255,255,.55);
      font-size: 11px;
      margin-top: 2px;
    }
    .ecw-online-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #25d366;
      flex-shrink: 0;
    }
    /* Cuerpo del panel */
    #ecw-panel-body {
      flex: 1;
      overflow-y: auto;
      padding: 0;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,.15) transparent;
    }
    #ecw-panel-body::-webkit-scrollbar { width: 4px; }
    #ecw-panel-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 4px; }
    /* Placeholder (mientras no hay integración) */
    .ecw-placeholder {
      padding: 28px 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      text-align: center;
    }
    .ecw-placeholder-icon svg {
      width: 52px;
      height: 52px;
      opacity: .85;
    }
    .ecw-placeholder p {
      color: rgba(255,255,255,.65);
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
    }
    .ecw-wa-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25d366;
      color: #fff !important;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: bold;
      transition: background .2s;
    }
    .ecw-wa-btn:hover {
      background: #1ebe5d;
    }
    /* Responsive — mismos breakpoints que el botón original */
    @media (min-width: 551px) and (max-width: 770px) {
      #ecw-bubble {
        bottom: 50px;
      }
      #ecw-panel {
        bottom: 120px;
      }
    }
    @media (max-width: 550px) {
      #ecw-bubble {
        bottom: 35px;
        right: 16px;
      }
      #ecw-panel {
        bottom: 105px;
        right: 16px;
        width: calc(100vw - 32px);
      }
    }
  `;

  /* ─────────────────────────────────────────
     CONSTRUCCIÓN DEL DOM
  ───────────────────────────────────────── */
  function buildWidget() {
    // Inyectar estilos
    const styleEl = document.createElement('style');
    styleEl.id = 'ecw-styles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // Burbuja
    const bubble = document.createElement('button');
    bubble.id = 'ecw-bubble';
    bubble.setAttribute('aria-label', 'Abrir chat de ayuda');
    bubble.setAttribute('aria-expanded', 'false');
    bubble.innerHTML = `
      <span id="ecw-badge" aria-hidden="true"></span>
      <!-- Icono WhatsApp -->
      <svg class="ecw-icon-wa" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <!-- Icono cerrar -->
      <svg class="ecw-icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
    document.body.appendChild(bubble);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'ecw-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat de ayuda Enigma BCN');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div id="ecw-panel-header">
        <div class="ecw-header-avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div class="ecw-header-text">
          <div class="ecw-header-title">${CONFIG.panelTitle}</div>
          <div class="ecw-header-subtitle">${CONFIG.panelSubtitle}</div>
        </div>
        <div class="ecw-online-dot" title="En línea" aria-hidden="true"></div>
      </div>
      <div id="ecw-panel-body"></div>
    `;
    document.body.appendChild(panel);

    // Contenido (integración de automatizaciones)
    const body = panel.querySelector('#ecw-panel-body');
    insertAutomationCode(body);

    // Ocultar el botón wa.me original si existe
    // (cuando la integración esté activa se puede descomentar)
    // const oldWa = document.querySelector('a.whatsapp');
    // if (oldWa) oldWa.style.display = 'none';

    /* ── Lógica abrir/cerrar ── */
    let isOpen = false;

    function openPanel() {
      isOpen = true;
      panel.classList.add('ecw-visible');
      bubble.classList.add('ecw-open');
      bubble.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      // Ocultar badge al abrir
      const badge = document.getElementById('ecw-badge');
      if (badge) badge.style.opacity = '0';
    }

    function closePanel() {
      isOpen = false;
      panel.classList.remove('ecw-visible');
      bubble.classList.remove('ecw-open');
      bubble.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    }

    bubble.addEventListener('click', () => {
      isOpen ? closePanel() : openPanel();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closePanel();
    });

    // Cerrar al hacer clic fuera del widget
    document.addEventListener('click', (e) => {
      if (isOpen && !panel.contains(e.target) && e.target !== bubble && !bubble.contains(e.target)) {
        closePanel();
      }
    });
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

})();
