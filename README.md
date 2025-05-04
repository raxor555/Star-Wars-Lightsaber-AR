# 🖐️🔦 Star Wars Lightsaber AR (Web-Based Hand-Tracking AR)

A browser-based **Augmented Reality Lightsaber** built using **HTML, JavaScript, and MediaPipe Hand Tracking**. Activate your lightsaber with a simple hand gesture — **open fist through thumb**, just like a Jedi!


## ⚙️ Features

- 🖐️ Real-time **hand tracking** using MediaPipe
- ✨ Lightsaber activates with a **custom gesture** (fist open through thumb)
- 🎯 Works directly in the browser — no app installs!
- 📱 Mobile & desktop compatible (camera access required)
- 💡 Built using **pure HTML, JS, and CSS** — no frameworks required

---

## 🚀 Demo

📽️ Watch it in action: (https://www.linkedin.com/posts/rayyan-shaikh-ai_augmentedreality-javascript-html-activity-7324820984606126080-0I-g?utm_source=share&utm_medium=member_desktop&rcm=ACoAAES7FvoBhKv0jhrbk0ZWy0t-oR73vhG0dZU)) 

---

## 🧠 Tech Stack

- **JavaScript**
- **HTML5 / CSS3**
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html) (Google)
- **Web Camera API (getUserMedia)**

---

## 🖐️ Gesture Logic

The lightsaber activates when:
- A **hand is detected**
- The hand transitions from a **closed fist** to an **open thumb**
- Lightsaber turns off when hand is fully open again
