let inspectionData = null;

fetch('inspectionData.json')
  .then(res => res.json())
  .then(data => {
    inspectionData = data;
    renderStart();
  })
  .catch(err => {
    console.error('Failed to load inspection data', err);
    alert('Inspection data failed to load');
  });
const app = document.getElementById('app');

let state = {
  vehicleType: null,
  severity: null,
  note: '',
};

function renderStart() {
  app.innerHTML = `
    <div class="screen">
      <h1>DVSA HGV Walkaround</h1>
      <h3>Select vehicle type</h3>
      <button onclick="selectVehicle('rigid')">Rigid</button>
      <button onclick="selectVehicle('artic')">Artic</button>
      <button onclick="selectVehicle('trailer')">Trailer</button>
    </div>
  `;
}

function selectVehicle(type) {
  state.vehicleType = type;
  renderInspection();
}

function renderInspection() {
  app.innerHTML = `
    <div class="screen">
      function renderInspection() {
  const stageA = inspectionData.stages[0];
  const item = stageA.items[0]; // first IM for now (IM1)

  app.innerHTML = `
    <div class="screen">
      <h2>${item.im} – ${item.title}</h2>

      <ul class="requirements">
        ${item.inspect.map(i => `<li>${i}</li>`).join('')}
      </ul>

      <button class="pass" onclick="setSeverity('pass')">Pass</button>
      <button class="advisory" onclick="setSeverity('advisory')">Advisory</button>
      <button class="minor" onclick="setSeverity('minor')">Minor</button>
      <button class="major" onclick="setSeverity('major')">Major</button>
      <button class="dangerous" onclick="setSeverity('dangerous')">Dangerous*</button>

      <div id="evidence"></div>

      <div class="nav">
        <span></span>
        <button onclick="renderSummary()">Next →</button>
      </div>
    </div>
  `;
}

      <button class="pass" onclick="setSeverity('pass')">Pass</button>
      <button class="advisory" onclick="setSeverity('advisory')">Advisory</button>
      <button class="minor" onclick="setSeverity('minor')">Minor</button>
      <button class="major" onclick="setSeverity('major')">Major</button>
      <button class="dangerous" onclick="setSeverity('dangerous')">Dangerous*</button>

      <div id="evidence"></div>

      <div class="nav">
        <span></span>
        <button onclick="renderSummary()">Next →</button>
      </div>
    </div>
  `;
}

function setSeverity(level) {
  state.severity = level;
  const evidence = document.getElementById('evidence');
  if (level === 'minor' || level === 'major' || level === 'dangerous') {
    evidence.innerHTML = `
      <label>Reason for failure</label>
      <textarea placeholder="Record the reason for failure"
        oninput="state.note=this.value"></textarea>
    `;
  } else {
    evidence.innerHTML = '';
  }
}

function renderSummary() {
  if ((state.severity === 'minor' || state.severity === 'major' || state.severity === 'dangerous')
      && !state.note) {
    alert('Reason for failure required.');
    return;
  }

  app.innerHTML = `
    <div class="screen">
      <h2>Summary</h2>
      <p><strong>Vehicle:</strong> ${state.vehicleType}</p>
      <p><strong>IM 62:</strong> ${state.severity}</p>
      <p><strong>Reason:</strong> ${state.note || 'N/A'}</p>
      <button onclick="renderStart()">Start Again</button>
    </div>
  `;
}


