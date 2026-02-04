document.addEventListener('DOMContentLoaded', () => {

  const app = document.getElementById('app');

  let inspectionData = null;

  let state = {
    vehicleType: null,
    severity: null,
    note: ''
  };

  // LOAD INSPECTION DATA
  fetch('inspectionData.json')
    .then(res => res.json())
    .then(data => {
      inspectionData = data;
      renderStart();
    })
    .catch(() => {
      app.innerHTML = '<p style="padding:20px">Failed to load inspection data</p>';
    });

  // START SCREEN
  function renderStart() {
    app.innerHTML = `
      <div class="screen">
        <h1>DVSA HGV Walkaround</h1>
        <h3>Select vehicle type</h3>
        <button onclick="selectVehicle('HGV')">HGV</button>
        <button onclick="selectVehicle('TRAILER')">Trailer</button>
      </div>
    `;
  }

  // VEHICLE SELECT
  function selectVehicle(type) {
    state.vehicleType = type;
    renderInspection();
  }

  // INSPECTION SCREEN (FIRST IM ONLY – SAFE TEST)
  function renderInspection() {
    const stage = inspectionData.stages[0];
    const item = stage.items.find(i =>
      i.appliesTo.includes(state.vehicleType)
    );

    app.innerHTML = `
      <div class="screen">
        <h2>${item.im} – ${item.title}</h2>

        <ul class="requirements">
          ${item.inspect.map(r => `<li>${r}</li>`).join('')}
        </ul>

        <button onclick="setSeverity('pass')">Pass</button>
        <button onclick="setSeverity('advisory')">Advisory</button>
        <button onclick="setSeverity('minor')">Minor</button>
        <button onclick="setSeverity('major')">Major</button>
        <button onclick="setSeverity('dangerous')">Dangerous*</button>

        <div id="evidence"></div>

        <button style="margin-top:20px" onclick="renderSummary()">Next</button>
      </div>
    `;
  }

  // SEVERITY HANDLING
  function setSeverity(level) {
    state.severity = level;
    const evidence = document.getElementById('evidence');

    if (['minor', 'major', 'dangerous'].includes(level)) {
      evidence.innerHTML = `
        <label>Reason for failure</label>
        <textarea
          placeholder="Record the reason for failure"
          oninput="state.note=this.value"></textarea>
      `;
    } else {
      state.note = '';
      evidence.innerHTML = '';
    }
  }

  // SUMMARY
  function renderSummary() {
    if (['minor', 'major', 'dangerous'].includes(state.severity) && !state.note) {
      alert('Reason for failure required');
      return;
    }

    app.innerHTML = `
      <div class="screen">
        <h2>Summary</h2>
        <p><strong>Vehicle:</strong> ${state.vehicleType}</p>
        <p><strong>Outcome:</strong> ${state.severity}</p>
        <p><strong>Reason:</strong> ${state.note || 'N/A'}</p>
        <button onclick="renderStart()">Start Again</button>
      </div>
    `;
  }

  // EXPOSE FUNCTIONS FOR BUTTONS
  window.selectVehicle = selectVehicle;
  window.setSeverity = setSeverity;
  window.renderSummary = renderSummary;

});
