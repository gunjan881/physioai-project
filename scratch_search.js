const https = require('https');

function searchYouTube(query) {
  return new Promise((resolve, reject) => {
    const q = encodeURIComponent(query + ' physical therapy exercise rehab');
    const options = {
      hostname: 'www.youtube.com',
      port: 443,
      path: '/results?search_query=' + q,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
        if (match) {
          resolve(match[1]);
        } else {
          resolve(null);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

const exercises = [
  "Pendulum Exercises",
  "Shoulder Rolls",
  "Cross Body Stretch",
  "Wall Crawl",
  "Towel Stretch",
  "Shoulder Pendulum + Ice",
  "Scapular Retraction",
  "External Rotation",
  "Neck Rotation",
  "Side Stretch",
  "Chin Tuck",
  "Neck Extension",
  "Neck Flexion",
  "Ankle Circles",
  "Ankle Towel Stretch",
  "Heel Raises",
  "Heel Drops (Eccentric)",
  "Toe Raises",
  "Toe Stretch",
  "Hamstring Stretch",
  "Quadriceps Stretch",
  "Calf Stretch",
  "Heel Walk",
  "Straight Leg Raise",
  "Knee to Chest",
  "Piriformis Stretch",
  "Pelvic Tilt",
  "Cat-Cow Stretch",
  "McKenzie Extension",
  "Seated Forward Bend",
  "Plantar Fascia Stretch"
];

async function run() {
  const map = {};
  for(let ex of exercises) {
    try {
      const id = await searchYouTube(ex);
      map[ex] = id;
      console.log(`"${ex}": "${id}",`);
    } catch(e) {
      console.log(`"${ex}": "ERROR",`);
    }
    await new Promise(r => setTimeout(r, 500));
  }
}

run();
