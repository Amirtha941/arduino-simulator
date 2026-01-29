# Minimal Web-Based Arduino Simulator

This project is a minimal, web-based Arduino simulator built as part of the **FOSSEE OSHW Winter Internship – 2025 screening task**.

The simulator focuses on **logical auto-wiring, automatic Arduino code generation, and logic-level simulation**, rather than physical wiring graphics.

---

## Features

### 1. Component Handling
- Supports **Arduino Uno**, **LED**, and **Push Button**
- Components can be added through a simple web-based UI
- Only one Arduino is allowed (realistic constraint)

### 2. Automatic Pin Assignment (Auto-Wiring)
- Default pin mapping:
  - LED → Digital Pin 10
  - Push Button → Digital Pin 2
- Arduino digital pins **D2–D13** are supported
- Pin conflicts are automatically prevented
- Pin reassignment updates:
  - Internal wiring logic
  - Generated Arduino code
  - Simulation behavior

> Wiring is handled **logically**, not through manual wire drawing.

---

### 3. Automatic Arduino Code Generation
- Arduino code is generated automatically based on current pin assignments
- Includes:
  - `pinMode()`
  - `digitalRead()`
  - `digitalWrite()`
- Code updates instantly when pins are changed
- No manual code editing is required

---

### 4. Logic-Level Simulation
- Start / Stop controls simulation
- Button press simulates GPIO HIGH / LOW
- LED turns ON when button is pressed and OFF when released
- Simulation behavior is fully driven by the same state used for code generation

---

## Technology Stack
- HTML
- CSS
- JavaScript (Vanilla)

No frameworks are used.

---

## Project Structure
```
arduino-simulator/
├── index.html
├── style.css
├── script.js
└── README.md
```


---

## How to Run
1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build steps or dependencies required

---

## Design Philosophy
- **Single source of truth**: Circuit state drives UI, code generation, and simulation
- **Automatic consistency**: No manual wiring or code editing
- **Minimal UI, maximum correctness**: Matches screening task requirements

---

## Demo
A short screen-recorded demo video demonstrates:
- Component addition
- Automatic pin assignment
- Pin reassignment with conflict prevention
- Automatic code generation
- Button-controlled LED simulation

---

## Notes
This project is intentionally minimal and focuses on **system integration and engineering correctness**, as required by the FOSSEE OSHW screening task.


