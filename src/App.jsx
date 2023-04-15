import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <div id="header-left">
          <img src="icons\company_icon.svg" alt="Trainings App Logo" />
          <h1>Trainings</h1>
        </div>
        <div id="header-right">
          <div class="counter">
            <span class="number">2</span>
          </div>
          <button class="violet-button my-trainings">My trainings</button>
        </div>
      </header>

      <main id="container">
        <h1>
          Don’t wait - <br />
          start training now!
        </h1>
        <div class="cards-container">
          <div class="card">
            <div
              class="training-logo"
              src="img\icon1.webp"
              alt="Python Logo"
            ></div>
            <div class="training-content">
              <h2>
                TrainingTrainingTrainingTrainingTrainingTraining
                TrainingTrainingTrainingTrainingTrainingTrainingTrainingTraining
              </h2>
              <div class="training-items">
                <div class="training-item">
                  <img src="/icons/calendar_icon.svg" alt="Calendar Icon" />
                  <span>17.04.2023 - 21.04.2023</span>
                </div>
                <div class="training-item">
                  <img src="/icons/clock_icon.svg" alt="Clock Icon" />
                  <span>08:00 - 16:00 (5x8h)</span>
                </div>
                <div class="training-item">
                  <img src="/icons/language_icon.svg" alt="UK Flag Icon" />
                  <span>English</span>
                </div>
                <div class="training-item">
                  <img src="/icons/level_icon.svg" alt="Level Icon" />
                  <span>Basic</span>
                </div>
                <div class="training-item">
                  <img src="/icons/location_icon.svg" alt="Location Icon" />
                  <span>Remote</span>
                </div>
                <div class="training-item">
                  <img src="/icons/trainer_logo.svg" alt="Trainer Icon" />
                  <span>Trainer: Jan Kowalski</span>
                </div>
              </div>
            </div>
            <button class="violet-button register-button">Register</button>
          </div>

          <div class="card">
            <div
              class="training-logo"
              src="img\icon1.webp"
              alt="Python Logo"
            ></div>
            <div class="training-content">
              <h2>Training</h2>
              <div class="training-items">
                <div class="training-item">
                  <img src="/icons/calendar_icon.svg" alt="Calendar Icon" />
                  <span>17.04.2023 - 21.04.2023</span>
                </div>
                <div class="training-item">
                  <img src="/icons/clock_icon.svg" alt="Clock Icon" />
                  <span>08:00 - 16:00 (5x8h)</span>
                </div>
                <div class="training-item">
                  <img src="/icons/language_icon.svg" alt="UK Flag Icon" />
                  <span>English</span>
                </div>
                <div class="training-item">
                  <img src="/icons/level_icon.svg" alt="Level Icon" />
                  <span>Basic</span>
                </div>
                <div class="training-item">
                  <img src="/icons/location_icon.svg" alt="Location Icon" />
                  <span>Remote</span>
                </div>
                <div class="training-item">
                  <img src="/icons/trainer_logo.svg" alt="Trainer Icon" />
                  <span>Trainer: Jan Kowalski</span>
                </div>
              </div>
            </div>
            <button class="violet-button register-button">Register</button>
          </div>

          <div class="card">
            <div
              class="training-logo"
              src="img\icon1.webp"
              alt="Python Logo"
            ></div>
            <div class="training-content">
              <h2>Training</h2>
              <div class="training-items">
                <div class="training-item">
                  <img src="/icons/calendar_icon.svg" alt="Calendar Icon" />
                  <span>17.04.2023 - 21.04.2023</span>
                </div>
                <div class="training-item">
                  <img src="/icons/clock_icon.svg" alt="Clock Icon" />
                  <span>08:00 - 16:00 (5x8h)</span>
                </div>
                <div class="training-item">
                  <img src="/icons/language_icon.svg" alt="UK Flag Icon" />
                  <span>English</span>
                </div>
                <div class="training-item">
                  <img src="/icons/level_icon.svg" alt="Level Icon" />
                  <span>Basic</span>
                </div>
                <div class="training-item">
                  <img src="/icons/location_icon.svg" alt="Location Icon" />
                  <span>Remote</span>
                </div>
                <div class="training-item">
                  <img src="/icons/trainer_logo.svg" alt="Trainer Icon" />
                  <span>Trainer: Jan Kowalski</span>
                </div>
              </div>
            </div>
            <button class="violet-button register-button">Register</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
