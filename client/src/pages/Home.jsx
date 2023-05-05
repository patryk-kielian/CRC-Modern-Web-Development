import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main id="container">
        <h1>
          Don’t wait - <br />
          start training now!
        </h1>
        <div className="cards-container">
          <div className="card">
            <div
              className="training-logo"
              src="img\icon1.webp"
              alt="Python Logo"
            />
            <div className="training-content">
              <h2>
                TrainingTrainingTrainingTrainingTrainingTraining
                TrainingTrainingTrainingTrainingTrainingTrainingTrainingTraining
              </h2>
              <div className="training-items">
                <div className="training-item">
                  <img
                    src="/src/assets/icons/calendar_icon.svg"
                    alt="Calendar Icon"
                  />
                  <span>17.04.2023 - 21.04.2023</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/clock_icon.svg"
                    alt="Clock Icon"
                  />
                  <span>08:00 - 16:00 (5x8h)</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/language_icon.svg"
                    alt="UK Flag Icon"
                  />
                  <span>English</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/level_icon.svg"
                    alt="Level Icon"
                  />
                  <span>Basic</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/location_icon.svg"
                    alt="Location Icon"
                  />
                  <span>Remote</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/trainer_logo.svg"
                    alt="Trainer Icon"
                  />
                  <span>Trainer: Jan Kowalski</span>
                </div>
              </div>
            </div>
            <button className="violet-button register-button">Register</button>
          </div>
          <div className="card">
            <div
              className="training-logo"
              src="img\icon1.webp"
              alt="Python Logo"
            />
            <div className="training-content">
              <h2>Training</h2>
              <div className="training-items">
                <div className="training-item">
                  <img
                    src="/src/assets/icons/calendar_icon.svg"
                    alt="Calendar Icon"
                  />
                  <span>17.04.2023 - 21.04.2023</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/clock_icon.svg"
                    alt="Clock Icon"
                  />
                  <span>08:00 - 16:00 (5x8h)</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/language_icon.svg"
                    alt="UK Flag Icon"
                  />
                  <span>English</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/level_icon.svg"
                    alt="Level Icon"
                  />
                  <span>Basic</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/location_icon.svg"
                    alt="Location Icon"
                  />
                  <span>Remote</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/trainer_logo.svg"
                    alt="Trainer Icon"
                  />
                  <span>Trainer: Jan Kowalski</span>
                </div>
              </div>
            </div>
            <button className="violet-button register-button">Register</button>
          </div>
          <div className="card">
            <div
              className="training-logo"
              src="img\icon1.webp"
              alt="Python Logo"
            />
            <div className="training-content">
              <h2>Training</h2>
              <div className="training-items">
                <div className="training-item">
                  <img
                    src="/src/assets/icons/calendar_icon.svg"
                    alt="Calendar Icon"
                  />
                  <span>17.04.2023 - 21.04.2023</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/clock_icon.svg"
                    alt="Clock Icon"
                  />
                  <span>08:00 - 16:00 (5x8h)</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/language_icon.svg"
                    alt="UK Flag Icon"
                  />
                  <span>English</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/level_icon.svg"
                    alt="Level Icon"
                  />
                  <span>Basic</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/location_icon.svg"
                    alt="Location Icon"
                  />
                  <span>Remote</span>
                </div>
                <div className="training-item">
                  <img
                    src="/src/assets/icons/trainer_logo.svg"
                    alt="Trainer Icon"
                  />
                  <span>Trainer: Jan Kowalski</span>
                </div>
              </div>
            </div>
            <button className="violet-button register-button">Register</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
