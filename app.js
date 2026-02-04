:root {
  --gov-blue: #005ea5;
  --gov-blue-dark: #003a8f;
  --bg: #f7f8fa;
  --card: #ffffff;
  --text: #0b0c0c;
  --muted: #6f777b;
  --border: #d8dde0;

  --pass: #00703c;
  --advisory: #f59f00;
  --minor: #f08c00;
  --major: #d4351c;
  --dangerous: #942514;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--text);
}

/* ---------- TOP TABS ---------- */

.tabs {
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}

.tabs button {
  flex: 1;
  padding: 14px 0;
  border: none;
  background: none;
  font-size: 15px;
  font-weight: 600;
  color: var(--muted);
}

.tabs button.active {
  color: var(--gov-blue);
  border-bottom: 3px solid var(--gov-blue);
}

/* ---------- SCREENS ---------- */

.screen {
  padding: 16px;
}

h1 {
  font-size: 26px;
  margin-bottom: 8px;
}

h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.subtitle {
  color: var(--muted);
  margin-bottom: 24px;
}

/* ---------- BUTTONS ---------- */

button {
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  background: var(--gov-blue);
  color: white;
}

button:active {
  background: var(--gov-blue-dark);
}

button.secondary {
  background: #505a5f;
}

/* ---------- IM LIST ---------- */

.im-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.im-list li {
  background: var(--card);
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  border-left: 6px solid var(--border);
}

.im-list li:hover {
  background: #f0f4f8;
}

/* Status colours */
.status.pending { color: var(--muted); }
.status.pass { color: var(--pass); }
.status.advisory { color: var(--advisory); }
.status.minor,
.status.major,
.status.dangerous { color: var(--major); }

/* ---------- CARDS ---------- */

.requirements {
  background: var(--card);
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
}

.requirements li {
  margin-bottom: 8px;
}

/* ---------- SEVERITY ---------- */

.severity {
  margin-bottom: 16px;
}

.sev {
  border-radius: 14px;
  margin-bottom: 10px;
  font-weight: 700;
}

.sev.pass { background: var(--pass); }
.sev.advisory { background: var(--advisory); }
.sev.minor { background: var(--minor); }
.sev.major { background: var(--major); }
.sev.dangerous { background: var(--dangerous); }

.sev.active {
  outline: 3px solid rgba(0,0,0,0.15);
}

/* ---------- TEXTAREA ---------- */

textarea {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-top: 8px;
  min-height: 90px;
}

/* ---------- SUMMARY ---------- */

p {
  margin-bottom: 8px;
}
