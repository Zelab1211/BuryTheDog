import './style.css';
import { initialState, applyAction } from './state.js';

let state = { ...initialState, ...JSON.parse(localStorage.getItem('taotao-state') || '{}') };
const messages = { feed: '草莓蛋糕！今天也被你好好照顾啦 ♡', play: '抓到你啦！再玩一次好不好？', sleep: '呼…桃桃要做一个软绵绵的梦。' };
const app = document.querySelector('#app');
app.innerHTML = `
  <main class="pet-window">
    <header class="topbar" data-drag>
      <div class="brand"><span class="brand-dot">♥</span><span>TAOTAO</span></div>
      <div class="window-actions"><button data-window="minimize" aria-label="最小化">—</button><button data-window="close" aria-label="关闭">×</button></div>
    </header>
    <section class="sky">
      <div class="cloud cloud-one"></div><div class="cloud cloud-two"></div>
      <div class="day"><span>DAY</span><b>07</b></div>
      <div class="speech" role="status">今天也要一起开心哦！<i></i></div>
      <div class="spark s1">✦</div><div class="spark s2">✦</div><div class="heart">♥</div>
      <div class="pet-wrap"><div class="pet-shadow"></div><img class="pet" src="/pet.svg" alt="棕色短发、穿白色睡裙的像素动漫女孩" /></div>
      <div class="ground"><span></span><span></span><span></span></div>
    </section>
    <section class="panel">
      <div class="identity"><div><h1>桃桃 <small>LV. 12</small></h1><p>你的桌面小伙伴</p></div><div class="coins"><span>●</span> <b data-stat="coins"></b></div></div>
      <div class="stats">
        <div class="stat"><div><span>🍓 饱食</span><b data-value="hunger"></b></div><div class="bar"><i data-bar="hunger"></i></div></div>
        <div class="stat"><div><span>♥ 心情</span><b data-value="mood"></b></div><div class="bar pink"><i data-bar="mood"></i></div></div>
        <div class="stat"><div><span>☀ 活力</span><b data-value="energy"></b></div><div class="bar yellow"><i data-bar="energy"></i></div></div>
      </div>
      <nav class="actions" aria-label="照顾桃桃">
        <button data-action="feed"><span>🍰</span><b>投喂</b><small>-5 ●</small></button>
        <button data-action="play"><span>🧶</span><b>玩耍</b><small>+12 ♥</small></button>
        <button data-action="sleep"><span>🌙</span><b>休息</b><small>+18 ☀</small></button>
      </nav>
      <p class="hint">拖动顶部移动桃桃 · 数据会自动保存</p>
    </section>
  </main>`;

function render() {
  for (const key of ['hunger', 'mood', 'energy']) {
    app.querySelector(`[data-value="${key}"]`).textContent = `${state[key]}%`;
    app.querySelector(`[data-bar="${key}"]`).style.width = `${state[key]}%`;
  }
  app.querySelector('[data-stat="coins"]').textContent = state.coins;
  localStorage.setItem('taotao-state', JSON.stringify(state));
}
app.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.action;
  state = applyAction(state, action);
  app.querySelector('.speech').childNodes[0].textContent = messages[action];
  app.querySelector('.pet').classList.remove('bounce'); void app.querySelector('.pet').offsetWidth; app.querySelector('.pet').classList.add('bounce');
  render();
}));
app.querySelectorAll('[data-window]').forEach(button => button.addEventListener('click', () => window.desktopPet?.[button.dataset.window]?.()));
let drag;
app.querySelector('[data-drag]').addEventListener('pointerdown', e => { if (e.target.closest('button')) return; drag = { x: e.screenX, y: e.screenY }; e.currentTarget.setPointerCapture(e.pointerId); });
app.querySelector('[data-drag]').addEventListener('pointermove', e => { if (!drag || !window.desktopPet) return; window.desktopPet.drag(e.screenX - drag.x, e.screenY - drag.y); drag = { x: e.screenX, y: e.screenY }; });
app.querySelector('[data-drag]').addEventListener('pointerup', () => drag = null);
render();
