// ---------------- CIRCUIT STATE (Single Source of Truth) ----------------

const circuit = {
  arduino: null,
  led: null,
  button: null,
  usedPins: [],
  simulationRunning: false,
  buttonState: 0, // 0 = LOW, 1 = HIGH
  ledState: 0     // 0 = OFF, 1 = ON
};


// ---------------- DOM REFERENCES ----------------
const paletteItems = document.querySelectorAll(".component");
const canvas = document.getElementById("canvas");
const codeView = document.getElementById("codeView");

const circuitViewBtn = document.getElementById("circuitViewBtn");
const codeViewBtn = document.getElementById("codeViewBtn");
const componentsArea = document.getElementById("componentsArea");


// ---------------- VIEW TOGGLE ----------------
circuitViewBtn.onclick = () => {
  codeView.hidden = true;
};

codeViewBtn.onclick = () => {
  codeView.hidden = false;
  updateCodeView(); // IMPORTANT
};

// ---------------- ADD COMPONENT HANDLING ----------------
paletteItems.forEach(item => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    addComponent(type);
  });
});

function addComponent(type) {
  if (type === "arduino" && circuit.arduino) {
    alert("Arduino already added");
    return;
  }

  if (type !== "arduino" && circuit[type]) {
    alert(`${type} already added`);
    return;
  }

  let pin = null;
  if (type === "led") pin = 10;
  if (type === "button") pin = 2;

  circuit[type] = { type, pin };

  if (pin !== null) {
    circuit.usedPins.push(pin);
  }

  redrawCanvas();
  updateCodeView(); // 🔴 THIS WAS MISSING
}

// ---------------- RENDERING ----------------
function renderComponent(type) {
  const wrapper = document.createElement("div");
  wrapper.className = "canvas-component";
  wrapper.style.margin = "10px";
  wrapper.style.padding = "10px";
  wrapper.style.border = "1px solid black";
  wrapper.style.display = "inline-block";

  const title = document.createElement("div");
  title.innerText = type.toUpperCase();
  wrapper.appendChild(title);

  // ---------- PIN DROPDOWN (LED + BUTTON) ----------
  if (type === "led" || type === "button") {
    const select = document.createElement("select");

    const availablePins = getAvailablePins(circuit[type].pin);
    availablePins.forEach(pin => {
      const option = document.createElement("option");
      option.value = pin;
      option.text = `D${pin}`;
      if (pin === circuit[type].pin) option.selected = true;
      select.appendChild(option);
    });

    select.onchange = () => updatePin(type, Number(select.value));
    wrapper.appendChild(select);
  }

  // ---------- LED STATUS ----------
  if (type === "led") {
    const status = document.createElement("div");
    status.innerText = circuit.ledState ? "LED ON" : "LED OFF";
    status.style.color = circuit.ledState ? "green" : "red";
    wrapper.appendChild(status);
  }

  // ---------- BUTTON SIMULATION ----------
  if (type === "button") {
    const btn = document.createElement("button");
    btn.innerText = "PRESS";

    btn.onmousedown = () => {
      if (!circuit.simulationRunning) return;
      circuit.buttonState = 1;
      runSimulation();
    };

    btn.onmouseup = () => {
      if (!circuit.simulationRunning) return;
      circuit.buttonState = 0;
      runSimulation();
    };

    wrapper.appendChild(btn);
  }

  componentsArea.appendChild(wrapper);
}

 

function runSimulation() {
  // Button HIGH → LED ON
  if (circuit.buttonState === 1) {
    circuit.ledState = 1;
  } else {
    circuit.ledState = 0;
  }

  redrawCanvas();
}


// ---------------- PIN UPDATE ----------------
function updatePin(type, newPin) {
  const oldPin = circuit[type].pin;

  circuit.usedPins = circuit.usedPins.filter(p => p !== oldPin);
  circuit.usedPins.push(newPin);
  circuit[type].pin = newPin;

  redrawCanvas();
  updateCodeView(); // 🔴 THIS WAS MISSING
}

// ---------------- UTILITIES ----------------
function getAvailablePins(excludePin = null) {
  const pins = [];
  for (let i = 2; i <= 13; i++) pins.push(i);

  return pins.filter(p => p === excludePin || !circuit.usedPins.includes(p));
}


function redrawCanvas() {
  componentsArea.innerHTML = "";

  if (circuit.arduino) renderComponent("arduino");
  if (circuit.led) renderComponent("led");
  if (circuit.button) renderComponent("button");
}


// ---------------- CODE GENERATION ----------------
function generateArduinoCode() {
  if (!circuit.led || !circuit.button) {
    return "// Add LED and Button to generate code";
  }

  return `
int ledPin = ${circuit.led.pin};
int buttonPin = ${circuit.button.pin};

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  digitalWrite(ledPin, buttonState);
}
`.trim();
}

function updateCodeView() {
  codeView.textContent = generateArduinoCode();
}

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.onclick = () => {
  circuit.simulationRunning = true;
};

stopBtn.onclick = () => {
  circuit.simulationRunning = false;
  circuit.buttonState = 0;
  circuit.ledState = 0;
  redrawCanvas();
};
