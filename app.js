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
      <h2>IM 62 – Rear Markings & Reflectors</h2>
      <ul class="requirements">
        <li>Present where required</li>
        <li>Correct colour and type</li>
        <li>Securely attached</li>
        <li>Clearly visible from the rear</li>
        <li>Not damaged or obscured</li>
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

renderStart();
