document.addEventListener('DOMContentLoaded', () => {
  // Tab switching logic
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('tab-active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      tab.classList.add('tab-active');
      document.getElementById(tab.getAttribute('data-target')).classList.add('active');
    });
  });

  // Fetching announcements from Google Sheets
  const sheetId = '1Z3e-BJe0PhSuse2d7idTAvd_q2c6Rqg0knqq8KVgNyc';
  const apiKey = 'AIzaSyDf05OjK82WvtCm9c2Ho9kT7FlUsgy6HOs'; 
  const range = 'Sheet1!A1:Z1000'; 
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  async function fetchAnnouncements() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data);

      if (data.values) {
        const announcements = data.values.map(row => row[0]).join(' | ');
        console.log('Announcements:', announcements);
        document.querySelector('#announcement-marquee div').textContent = announcements;
      } else {
        console.error('No data found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchAnnouncements();
});




document.addEventListener('DOMContentLoaded', () => {
  // Leaderboard - Corporate Style
  const leaderboardForm = document.getElementById('leaderboardForm');
  const leaderboardList = document.getElementById('leaderboardListItems');

  leaderboardForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const steps = document.getElementById('steps').value;
    
    const listItem = document.createElement('li');
    listItem.classList.add('corporate-item');
    listItem.innerHTML = `
      <div class="corporate-item-header"><strong>Steps:</strong> ${steps}</div>
    `;

    
    leaderboardList.appendChild(listItem);

    leaderboardForm.reset();
  });
});

 

// Poll Feature
document.addEventListener('DOMContentLoaded', () => {
  const pollForm = document.getElementById('pollForm');
  const pollResults = document.getElementById('pollResults');

  pollForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pollQuestion = document.getElementById('pollQuestion').value;
    const pollOptions = Array.from(document.querySelectorAll('#pollOptions input[type="text"]'))
      .map(input => input.value)
      .filter(value => value);

    const pollDiv = document.createElement('div');
    pollDiv.classList.add('poll');
    pollDiv.innerHTML = `
      <h3>${pollQuestion}</h3>
      <ul>
        ${pollOptions.map(option => `<li>${option}</li>`).join('')}
      </ul>
    `;
    pollResults.appendChild(pollDiv);

    pollForm.reset();
  });
});

// Poll Vote Functionality
pollResults.addEventListener('click', (e) => {
  if (e.target.classList.contains('poll-option')) {
    const button = e.target;
    const voteCountElement = button.querySelector('.vote-count');
    const currentVotes = parseInt(voteCountElement.textContent, 10);
    voteCountElement.textContent = currentVotes + 1;
  }
});

let timer;
let timeLeft;
let timerDuration = 25; 

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timeOption = document.getElementById('time-option');


function initializeTimerDisplay() {
  timerDisplay.textContent = `${String(timerDuration).padStart(2, '0')}:00`;
}

function startTimer(duration) {
  timeLeft = duration * 60; 
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    timerDisplay.textContent = "00:00";
    alert('Time is up!');
    return;
  }
  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {

  timerDuration = parseInt(timeOption.value, 10) || 25;

  if (timer) {

    clearInterval(timer);
  }

 
  timeLeft = timerDuration * 60;
  startTimer(timerDuration);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timer);
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  initializeTimerDisplay();
});

initializeTimerDisplay();
