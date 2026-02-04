document.addEventListener('DOMContentLoaded', () => {

  const app = document.getElementById('app');

  let inspectionData = null;

  let state = {
    vehicleType: null,
    currentStage: 'A',
    currentIM: null,
    results: {} // im -> { severity, note }
  };

  fetch('inspectionData.json')
    .then(res => res.json())
    .then(data => {
      inspectionData = data;
      renderStart();
    })
    .catch(() => {
      app.innerHTML = '<p style="padding:20px">Failed to load inspection data</p>';
    });

  /* ---------- SCREENS ---------- */

  function renderStart() {
    app.innerHTML = `
      <div class="screen">
        <h1>DVSA HGV Walkaround</h1>
        <p class="subtitle">Training Inspection Tool</p>
        <button onclick="selectVehicle('HGV')">HGV</button>
        <button onclick="selectVehicle('TRAILER')">Trailer</button>
      </div>
    `;
  }

  function selectVehicle(type) {
    state.vehicleType = type;
    renderStage();
  }

  function renderStage() {
    const stage = inspectionData.stages.find(s => s.stage === state.currentStage);
    const items = stage.items.filter(i =>
      i.appliesTo.includes(state.vehicleType)
    );

    app.innerHTML = `
      ${renderTabs()}
      <div class="screen">
        <h2>Stage ${stage.stage} – ${stage.title}</h2>
        <ul class="im-list">
          ${items.map(item => `
            <li onclick="openIM('${item.im}')">
              <span>${item.im} – ${item.title}</span>
              <span class="status ${getStatus(item.im)}">${getStatusIcon(item.im)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  function openIM(im) {
    const stage = inspectionData.stages.find(s => s.stage === state.currentStage);
    state.currentIM = stage.items.find(i => i.im === im);
    renderIM();
  }

  function renderIM() {
    const item = state.currentIM;
    const existing = state.results[item.im] || {};

    app.innerHTML = `
      ${renderTabs()}
      <div class="screen">
        <h2>${item.im} – ${item.title}</h2>

        <ul class="requirements">
          ${item.inspect.map(r => `<li>${r}</li>`).join('')}
        </ul>

        <div class="severity">
          ${renderSeverityButton('pass', existing.severity)}
          ${renderSeverityButton('advisory', existing.severity)}
          ${renderSeverityButton('minor', existing.severity)}
          ${renderSeverityButton('major', existing.severity)}
          ${renderSeverityButton('dangerous', existing.severity)}
        </div>

        <div id="evidence">
          ${existing.note ? `<textarea>${existing.note}</textarea>` : ''}
        </div>

        <button class="secondary" onclick="renderStage()">Back to stage</button>
      </div>
    `;
  }

  /* ---------- HELPERS ---------- */

  function setSeverity(level) {
    const im = state.currentIM.im;
    state.results[im] = { severity: level, note: '' };

    const evidence = document.getElementById('evidence');
    if (['minor','major','dangerous'].includes(level)) {
      evidence.innerHTML = `
        <label>Reason for failure</label>
        <textarea oninput="saveNote(this.value)"></textarea>
      `;
    } else {
      evidence.innerHTML = '';
    }
    renderIM();
  }

  function saveNote(text) {
    state.results[state.currentIM.im].note = text;
  }

  function renderTabs() {
    return `
      <div class="tabs">
        ${['A','B','C','D'].map(s =>
          `<button class="${state.currentStage===s?'active':''}"
            onclick="switchStage('${s}')">Stage ${s}</button>`
        ).join('')}
      </div>
    `;
  }

  function switchStage(stage) {
    state.currentStage = stage;
    renderStage();
  }

  function renderSeverityButton(level, current) {
    return `
      <button class="sev ${level} ${current===level?'active':''}"
        onclick="setSeverity('${level}')">
        ${level.toUpperCase()}
      </button>
    `;
  }

  function getStatus(im) {
    return state.results[im]?.severity || 'pending';
  }

  function getStatusIcon(im) {
    const s = getStatus(im);
    if (s === 'pass') return '✅';
    if (s === 'advisory') return '⚠️';
    if (s === 'pending') return '⏳';
    return '❌';
  }

  /* ---------- EXPOSE ---------- */
  window.selectVehicle = selectVehicle;
  window.openIM = openIM;
  window.switchStage = switchStage;
  window.setSeverity = setSeverity;
  window.saveNote = saveNote;

});
