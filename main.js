
const MOODS = {
  happy: {
    emoji: "😊",
    title: "Happy",
    tagline: "Bright vibes, upbeat energy.",
    songs: [
      { title: "Happy Upbeat Mix", url: "https://www.youtube.com/results?search_query=happy+upbeat+music" },
      { title: "Feel Good Hits", url: "https://www.youtube.com/results?search_query=feel+good+music" },
      { title: "Pop Party", url: "https://www.youtube.com/results?search_query=pop+party+hits" },
      { title: "Sunny Day Tunes", url: "https://www.youtube.com/results?search_query=sunny+day+music" },
      { title: "Dance Pop Mix", url: "https://www.youtube.com/results?search_query=dance+pop+mix" },
    ]
  },
  sad: {
    emoji: "😢",
    title: "Sad",
    tagline: "Slow tempo, soft and emotional.",
    songs: [
      { title: "Sad Piano", url: "https://www.youtube.com/results?search_query=sad+piano+music" },
      { title: "Melancholy Acoustic", url: "https://www.youtube.com/results?search_query=melancholy+acoustic+music" },
      { title: "Rainy Day Songs", url: "https://www.youtube.com/results?search_query=rainy+day+sad+songs" },
      { title: "Emotional Ballads", url: "https://www.youtube.com/results?search_query=emotional+ballads" },
      { title: "Slow Indie Mix", url: "https://www.youtube.com/results?search_query=slow+indie+mix" },
    ]
  },
  energetic: {
    emoji: "🔥",
    title: "Energetic",
    tagline: "High BPM, hype and workout friendly.",
    songs: [
      { title: "Workout EDM", url: "https://www.youtube.com/results?search_query=workout+edm+mix" },
      { title: "Bass Boosted", url: "https://www.youtube.com/results?search_query=bass+boosted+songs" },
      { title: "Hype Trap", url: "https://www.youtube.com/results?search_query=hype+trap+mix" },
      { title: "Power Mix", url: "https://www.youtube.com/results?search_query=power+music+mix" },
      { title: "Hardstyle Pump", url: "https://www.youtube.com/results?search_query=hardstyle+workout+mix" },
    ]
  },
  chill: {
    emoji: "😌",
    title: "Chill",
    tagline: "Lo-fi, calm and laid-back.",
    songs: [
      { title: "Lo-fi Beats to Study", url: "https://www.youtube.com/results?search_query=lofi+beats" },
      { title: "Chillhop Essentials", url: "https://www.youtube.com/results?search_query=chillhop+essentials" },
      { title: "Coffeehouse Mix", url: "https://www.youtube.com/results?search_query=coffeehouse+mix" },
      { title: "Ambient Chill", url: "https://www.youtube.com/results?search_query=ambient+chill+music" },
      { title: "Rain + Lofi", url: "https://www.youtube.com/results?search_query=rain+sounds+lofi" },
    ]
  },
  angry: {
    emoji: "😡",
    title: "Angry",
    tagline: "Aggressive, heavy, cathartic.",
    songs: [
      { title: "Hard Rock", url: "https://www.youtube.com/results?search_query=hard+rock+mix" },
      { title: "Heavy Metal", url: "https://www.youtube.com/results?search_query=heavy+metal+mix" },
      { title: "Industrial Energy", url: "https://www.youtube.com/results?search_query=industrial+music+mix" },
      { title: "Drum & Bass Rage", url: "https://www.youtube.com/results?search_query=angry+drum+and+bass+mix" },
      { title: "Breakcore Surge", url: "https://www.youtube.com/results?search_query=breakcore+mix" },
    ]
  },
  romantic: {
    emoji: "💞",
    title: "Romantic",
    tagline: "Warm, tender, slow and sweet.",
    songs: [
      { title: "Romantic Bollywood", url: "https://www.youtube.com/results?search_query=romantic+bollywood+songs" },
      { title: "Love Ballads", url: "https://www.youtube.com/results?search_query=love+ballads+mix" },
      { title: "Acoustic Love", url: "https://www.youtube.com/results?search_query=acoustic+love+songs" },
      { title: "Slow Dance", url: "https://www.youtube.com/results?search_query=slow+dance+music" },
      { title: "Soft R&B", url: "https://www.youtube.com/results?search_query=soft+r%26b+mix" },
    ]
  }
};


const moodTitle  = document.getElementById("moodTitle");
const moodTag    = document.getElementById("moodTagline");
const moodEmoji  = document.getElementById("moodEmoji");
const songList   = document.getElementById("songList");
const readBtn    = document.getElementById("readBtn");
const randomBtn  = document.getElementById("randomBtn");
const shareBtn   = document.getElementById("shareBtn");


const DEFAULT_MOOD = "happy";
const urlMood = new URLSearchParams(location.search).get("mood");
const savedMood = localStorage.getItem("mood");
let currentMood = (urlMood && MOODS[urlMood]) ? urlMood : (savedMood || DEFAULT_MOOD);
applyMood(currentMood);


document.querySelectorAll(".mood-card").forEach(card => {
  card.addEventListener("click", () => {
    const mood = card.dataset.mood;
    applyMood(mood);
  });
});


randomBtn.addEventListener("click", () => {
  const keys = Object.keys(MOODS);
  const m = keys[Math.floor(Math.random() * keys.length)];
  applyMood(m);
});


shareBtn.addEventListener("click", async () => {
  const link = `${location.origin}${location.pathname}?mood=${currentMood}`;
  try {
    await navigator.clipboard.writeText(link);
    shareBtn.textContent = "✅ Copied!";
    setTimeout(() => (shareBtn.textContent = "🔗 Share"), 1000);
  } catch {
    alert(link);
  }
});


readBtn.addEventListener("click", () => {
  const data = MOODS[currentMood];
  const names = data.songs.map(s => s.title).slice(0, 5).join(", ");
  const text = `${data.title} mood. Suggestions are: ${names}. Enjoy!`;
  speak(text);
});


function applyMood(moodKey) {
  currentMood = moodKey;
  localStorage.setItem("mood", moodKey);

  
  document.body.setAttribute("data-theme", moodKey);

  
  const m = MOODS[moodKey];
  moodEmoji.textContent = m.emoji;
  moodTitle.textContent = m.title;
  moodTag.textContent = m.tagline;

  
  renderSongs(m.songs);

  
  const url = new URL(location.href);
  url.searchParams.set("mood", moodKey);
  history.replaceState({}, "", url);
}

function renderSongs(items) {
  songList.innerHTML = "";
  items.forEach((s, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="idx">#${i + 1}</div>
      <div class="title">${s.title}</div>
      <a class="btn" href="${s.url}" target="_blank" rel="noopener">▶ Open</a>
    `;
    songList.appendChild(li);
  });
}


function speak(text) {
  if (!("speechSynthesis" in window)) {
    alert("Speech not supported in this browser.");
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.05;
  u.pitch = 1;
  u.lang = "en-IN";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
