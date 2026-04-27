/* ============================================================
   PhysioAI — AI Session (No Ghost, Static Stretch Support)
   Built by GPNV Creations
   ============================================================ */

const $ = id => document.getElementById(id);

let U = null, exercises = [], currentIdx = 0;
let sd = { reps:0, wrong:0, pain:0, fat:0, af:0, tf:0 };
let targetAngle = 0, targetDir = 1;
let sesLeft = 150, restLeft = 120, isResting = false;
let sesInterval = null, restInterval = null, rafId = null;
let poseModel = null, faceModel = null;
let camStream = null, mpCamera = null;
let poseLM = null, faceLM = null;
let shiverBuf = [], cooldown = {};
let isUserVisible = false, isUserAligned = false;
let staticStretchRepDone = false, wasWrong = false;

function toast(msg, t='i'){
  const w=$('toastWrap'), el=document.createElement('div');
  el.className='toast toast-'+t; el.textContent=msg;
  w.appendChild(el); setTimeout(()=>el.remove(),3000);
}

function startSession(){
  const ex = exercises[currentIdx];
  if(!ex){ window.location.href='complete.html'; return; }

  sd = {reps:0,wrong:0,pain:0,fat:0,af:0,tf:0};
  staticStretchRepDone = false;
  const isStretch = ex.name.toLowerCase().includes("stretch");
  const isCrossBody = ex.name.toLowerCase().includes("cross body stretch");
  if(isStretch) {
    targetAngle = ex.g.mx;
    targetDir = 0;
  } else {
    targetAngle = ex.g.mn;
    targetDir = 1;
  }
  isResting = false; shiverBuf = []; cooldown = {};
  $('restOverlay').classList.remove('show');
  $('sessExName').textContent = ex.name;

  sesLeft = ex.dur;
  updateTimer();
  clearInterval(sesInterval);
  sesInterval = setInterval(sesTick, 1000);

  openCamera().then(() => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(drawLoop);
    if(isCrossBody) {
      speak(`Starting ${ex.name}. Bring your arm across your chest and hold. Target angle is ${Math.round(ex.g.mx)} degrees.`);
    } else if (isStretch) {
      speak(`Starting ${ex.name}. ${ex.desc} Hold at the target angle.`);
    } else {
      speak(`Starting ${ex.name}. ${ex.desc} Follow the target angle on the right.`);
    }
  });
}

async function openCamera(){
  const video = $('liveVideo'), banner = $('noCamBanner');
  try {
    camStream = await navigator.mediaDevices.getUserMedia({
      video: { width:{ideal:640}, height:{ideal:480}, facingMode:'user' },
      audio: false
    });
    video.srcObject = camStream;
    await video.play();
    banner.style.display = 'none';

    video.addEventListener('loadedmetadata', () => {
      const c = $('skeletonCanvas');
      c.width  = video.videoWidth  || 640;
      c.height = video.videoHeight || 480;
    }, { once: true });
    if(video.videoWidth){ $('skeletonCanvas').width=video.videoWidth; $('skeletonCanvas').height=video.videoHeight; }
    else { $('skeletonCanvas').width=640; $('skeletonCanvas').height=480; }

    setupMediaPipe(video);
    toast('📷 Camera ON — you will see your skeleton overlay.', 's');
  } catch(err) {
    console.warn('Camera error:', err.name, err.message);
    banner.style.display = 'flex';
    $('skeletonCanvas').width=640; $('skeletonCanvas').height=480;
    toast('Camera blocked — allow access and click Retry', 'e');
  }
}

async function retryCamera(){
  $('noCamBanner').style.display = 'none';
  await openCamera();
}

function setupMediaPipe(video){
  if(window.Pose){
    poseModel = new Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}` });
    poseModel.setOptions({ modelComplexity:1, smoothLandmarks:true, minDetectionConfidence:.5, minTrackingConfidence:.5 });
    poseModel.onResults(r => { poseLM = r.poseLandmarks || null; });
  }
  if(window.FaceMesh){
    faceModel = new FaceMesh({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` });
    faceModel.setOptions({ maxNumFaces:1, refineLandmarks:false, minDetectionConfidence:.5, minTrackingConfidence:.5 });
    faceModel.onResults(r => { faceLM = r.multiFaceLandmarks?.[0] || null; });
  }
  if(window.Camera && video.srcObject){
    mpCamera = new Camera(video, {
      onFrame: async () => {
        if(poseModel) await poseModel.send({image: video});
        if(faceModel) await faceModel.send({image: video});
      },
      width:640, height:480
    });
    mpCamera.start();
  }
}

function drawLoop(){
  if(!document.getElementById('skeletonCanvas')){ rafId=null; return; }
  const cvs=$('skeletonCanvas'), ctx=cvs.getContext('2d');
  const W=cvs.width||640, H=cvs.height||480;

  ctx.clearRect(0,0,W,H);

  if(!isResting && poseLM){
    const ex = exercises[currentIdx];
    if(ex){
      const g = ex.g;
      const isStretch = ex.name.toLowerCase().includes("stretch");
      let userAngle = calcAngle(g.j, poseLM, W, H);
      let aligned = false;
      isUserVisible = false;
      isUserAligned = false;

      if(!isStretch) {
        // Evaluate alignment based on whether user is within the safe exercise bounds
        if (userAngle !== null) {
          isUserVisible = true;
          aligned = (userAngle >= g.mn - g.tl && userAngle <= g.mx + g.tl);
          isUserAligned = aligned;
          
          // Rep counting and target milestone logic
          if (targetDir === 1) { // 1 means moving towards max
            targetAngle = g.mx;
            if (userAngle >= g.mx - g.tl) {
              targetDir = -1; // Change direction to min
              sd.reps++; // Count a rep when they complete the outgoing phase
              updateMetrics();
              if (ex.name.toLowerCase().includes("chin tuck")) {
                speak("Good, keep going.");
              } else {
                speak("Good! Now return.");
              }
            }
          } else { // -1 means moving towards min
            targetAngle = g.mn;
            if (userAngle <= g.mn + g.tl) {
              targetDir = 1; // Change direction to max
              updateMetrics();
              speak("Good rep! Keep going.");
            }
          }

          sd.tf++;
          if(aligned) {
            sd.af++;
            wasWrong = false;
          } else {
            if(!wasWrong) {
              sd.wrong++;
              wasWrong = true;
            }
          }
          updateMetrics();

          if(!aligned && (sd.tf % 20 === 0)) {
            let correction = userAngle < g.mn ? "Increase your angle." : "Decrease your angle.";
            speak(`You are off. ${correction} Stay between ${Math.round(g.mn)} and ${Math.round(g.mx)} degrees.`);
          }
        }
      } else {
        let uAng = userAngle;
        if (g.mn < 0) uAng = Math.abs(userAngle);
        
        if(!staticStretchRepDone) {
          if(uAng !== null && Math.abs(uAng - g.mx) <= g.tl) {
            staticStretchRepDone = true;
            sd.reps++;
            updateMetrics();
            speak("Good stretch! Hold this position.");
          }
        }
        
        if(uAng !== null){
          isUserVisible = true;
          let diff = Math.abs(uAng - targetAngle);
          aligned = diff <= g.tl;
          isUserAligned = aligned;
          sd.tf++;
          if(aligned) {
            sd.af++;
            wasWrong = false;
          } else {
            if(!wasWrong) {
              sd.wrong++;
              wasWrong = true;
            }
          }
          updateMetrics();
          
          if(!aligned && (sd.tf % 30 === 0)) {
            speak(`Try to stretch further. Target is ${Math.round(g.mx)} degrees.`);
          }
        }
      }

      if(userAngle !== null){
        updateAlignHUD(aligned, userAngle, g);
      } else {
        setDet('det-pose','Pose: Not detected','det-warn');
        $('hintBox').textContent = 'Cannot see your full body. Step back.';
      }

      drawSkeleton(ctx, poseLM, aligned, W, H);
      detectPain();
      detectShiver();
    }
  } else if(!poseLM && !isResting) {
    setDet('det-pose','Pose: Searching','det-warn');
    $('hintBox').textContent = 'Position yourself so the camera sees your whole body.';
  }

  rafId = requestAnimationFrame(drawLoop);
}

function calcAngle(j, lm, W, H){
  if(!lm) return null;
  const p = i => { const lp=lm[i]; return lp&&lp.visibility>.3?{x:(1-lp.x)*W,y:lp.y*H}:null; };
  try {
    switch(j){
      case'sh_circle':{
        const sL = p(11), wL = p(15), sR = p(12), wR = p(16);
        let aL=0, aR=0;
        if(sL && wL) aL = Math.atan2(wL.x - sL.x, wL.y - sL.y) * 180 / Math.PI;
        if(sR && wR) aR = Math.atan2(wR.x - sR.x, wR.y - sR.y) * 180 / Math.PI;
        if(!sL && !sR) return null;
        return Math.abs(aL) > Math.abs(aR) ? aL : aR;
      }
      case'nk_r': case'nk_t': case'nk_s': case'nk_f': case'nk_ext':{
        const ls=p(11),rs=p(12),n=p(0);
        if(!ls||!rs||!n) return null;
        const dx = n.x - (ls.x+rs.x)/2;
        const dy = (ls.y+rs.y)/2 - n.y; // Positive means head is above shoulders
        return Math.atan2(dx, dy) * 180 / Math.PI;
      }
      case'sh_abd':{
        const sL=p(11),eL=p(13),hL=p(23);
        const sR=p(12),eR=p(14),hR=p(24);
        let aL=0, aR=0;
        if(sL&&eL&&hL) aL = ang3(hL,sL,eL);
        if(sR&&eR&&hR) aR = ang3(hR,sR,eR);
        if(!sL && !sR) return null;
        return Math.max(Math.abs(aL), Math.abs(aR));
      }
      case'sh_ext':{
        const eL = p(13), wL = p(15), sL = p(11);
        const eR = p(14), wR = p(16), sR = p(12);
        let aL=0, aR=0;
        if(eL && wL && sL) {
          aL = Math.atan2(wL.x - eL.x, wL.y - eL.y) * 180 / Math.PI;
          if(aL < 0) aL = 0; if(aL > 60) aL = 60;
        }
        if(eR && wR && sR) {
          aR = Math.atan2(wR.x - eR.x, wR.y - eR.y) * 180 / Math.PI;
          if(aR < 0) aR = 0; if(aR > 60) aR = 60;
        }
        if(!sL && !sR) return null;
        return Math.max(aL, aR);
      }
      case'sh_cross':{
        const sL = p(11), eL = p(13), sR = p(12), eR = p(14);
        let aL=90, aR=90;
        if(sL && eL && sR) {
          const cv = { x: sR.x - sL.x, y: sR.y - sL.y };
          const av = { x: eL.x - sL.x, y: eL.y - sL.y };
          const dot = av.x * cv.x + av.y * cv.y;
          const magC = Math.hypot(cv.x, cv.y), magA = Math.hypot(av.x, av.y);
          if(magA>0 && magC>0) aL = Math.acos(dot / (magA * magC)) * 180 / Math.PI;
        }
        if(sR && eR && sL) {
          const cv = { x: sL.x - sR.x, y: sL.y - sR.y };
          const av = { x: eR.x - sR.x, y: eR.y - sR.y };
          const dot = av.x * cv.x + av.y * cv.y;
          const magC = Math.hypot(cv.x, cv.y), magA = Math.hypot(av.x, av.y);
          if(magA>0 && magC>0) aR = Math.acos(dot / (magA * magC)) * 180 / Math.PI;
        }
        if(!sL && !sR) return null;
        return Math.min(Math.min(aL, 90), Math.min(aR, 90));
      }
      case'el_rot':{
        const sL=p(11),eL=p(13),wL=p(15), sR=p(12),eR=p(14),wR=p(16);
        let aL=0, aR=0;
        if(sL&&eL&&wL) aL = ang3(sL,eL,wL);
        if(sR&&eR&&wR) aR = ang3(sR,eR,wR);
        if(!sL && !sR) return null;
        return Math.max(aL, aR);
      }
      case'kn': case'kn_e':{
        const hL=p(23),kL=p(25),aL=p(27), hR=p(24),kR=p(26),aR=p(28);
        let angL=180, angR=180;
        if(hL&&kL&&aL) angL = ang3(hL,kL,aL);
        if(hR&&kR&&aR) angR = ang3(hR,kR,aR);
        if(!hL && !hR) return null;
        return Math.min(angL, angR);
      }
      case'hp': case'hp_s':{
        const sL=p(11),hL=p(23),kL=p(25), sR=p(12),hR=p(24),kR=p(26);
        let aL=180, aR=180;
        if(sL&&hL&&kL) aL = ang3(sL,hL,kL);
        if(sR&&hR&&kR) aR = ang3(sR,hR,kR);
        if(!sL && !sR) return null;
        return Math.min(aL, aR);
      }
      case'sp':{
        const ls=p(11),lh=p(23),lk=p(25);
        if(!ls||!lh||!lk) return null; return ang3(ls,lh,lk)-180;
      }
      case'ank':{
        const kL=p(25),aL=p(27),tL=p(31), kR=p(26),aR=p(28),tR=p(32);
        let a1=90, a2=90;
        if(kL&&tL&&aL) a1 = ang3(kL,aL,tL);
        if(kR&&tR&&aR) a2 = ang3(kR,aR,tR);
        if(!kL && !kR) return null;
        return Math.max(Math.abs(a1), Math.abs(a2));
      }
      case'sh_roll': case'sh_ret':{
        const sL = p(11), sR = p(12), elbL = p(13), elbR = p(14);
        let angSideL = null, angSideR = null;
        
        // Measure angle of upper arm (shoulder to elbow) from the vertical plumb line
        if(sL && elbL && sL.visibility > 0.4 && elbL.visibility > 0.4) {
          angSideL = Math.abs(Math.atan2(elbL.x - sL.x, elbL.y - sL.y) * 180 / Math.PI);
        }
        if(sR && elbR && sR.visibility > 0.4 && elbR.visibility > 0.4) {
          angSideR = Math.abs(Math.atan2(elbR.x - sR.x, elbR.y - sR.y) * 180 / Math.PI);
        }
        
        if (angSideL !== null && angSideR !== null) return Math.max(angSideL, angSideR);
        if (angSideL !== null) return angSideL;
        if (angSideR !== null) return angSideR;
        
        return null;
      }
      case'toe':{
        const k=p(27),h=p(31);
        if(!k||!h) return null; return Math.atan2(h.y-k.y,h.x-k.x)*180/Math.PI;
      }
      case'heel_raise':{
        const knee = p(25), ankle = p(27), toe = p(31);
        if(!knee || !ankle || !toe) return null;
        return ang3(knee, ankle, toe);
      }
      default: return null;
    }
  } catch(e){ return null; }
}

function ang3(a, b, c){
  const v1={x:a.x-b.x,y:a.y-b.y}, v2={x:c.x-b.x,y:c.y-b.y};
  return Math.atan2(v1.x*v2.y-v1.y*v2.x, v1.x*v2.x+v1.y*v2.y)*180/Math.PI;
}

function drawSkeleton(ctx, lm, aligned, W, H){
  const color = aligned ? '#06d6a0' : '#ff4d6d';
  const p = i => {
    const lp = lm[i];
    return lp && lp.visibility > 0.32 ? { x:(1-lp.x)*W, y:lp.y*H } : null;
  };
  const connections = [
    [11,13],[13,15],[12,14],[14,16],
    [11,12],[23,24],[11,23],[12,24],
    [23,25],[25,27],[24,26],[26,28],
    [27,31],[28,32]
  ];
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  connections.forEach(([a,b]) => {
    const ptA = p(a), ptB = p(b);
    if(ptA && ptB){
      ctx.beginPath();
      ctx.moveTo(ptA.x, ptA.y);
      ctx.lineTo(ptB.x, ptB.y);
      ctx.stroke();
    }
  });
  ctx.fillStyle = color;
  [0,11,12,13,14,15,16,23,24,25,26,27,28,31,32].forEach(i => {
    const pt = p(i);
    if(pt){
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, 2*Math.PI);
      ctx.fill();
    }
  });
  ctx.restore();
}

function detectPain(){
  if(faceLM){
    try {
      const fT = faceLM[10], fB = faceLM[152];
      const fL = faceLM[234], fR = faceLM[454];
      if (!fT || !fB || !fL || !fR) return;

      const fH = fB.y - fT.y, fW = Math.abs(fR.x - fL.x);
      if (fH <= 0 || fW <= 0) return;

      const uLip = faceLM[13], lLip = faceLM[14];
      const mL = faceLM[61], mR = faceLM[291];

      // 1. Yawn Check (Mouth opening relative to face height)
      if (uLip && lLip && (lLip.y - uLip.y) / fH > 0.22) {
        return triggerPain('Yawn detected');
      }

      // 2. Sad face / Frown (Mouth corners pulled down to lower lip level)
      if (mL && mR && lLip) {
        const cornerY = (mL.y + mR.y) / 2;
        if ((cornerY - lLip.y) / fH > 0.02) {
          return triggerPain('Sad face detected');
        }
      }

      // 3. Grimace Check (Wide mouth relative to face width)
      if (mL && mR && Math.abs(mL.x - mR.x) / fW > 0.55) {
        return triggerPain('Grimace detected');
      }
    } catch(e){}
  } 
}

function detectShiver(){
  if(poseLM){
    const rw=poseLM[15], lw=poseLM[16];
    if(rw && lw){
      shiverBuf.push({ x:(rw.x+lw.x)/2, y:(rw.y+lw.y)/2, t:performance.now() });
      if(shiverBuf.length > 25) shiverBuf.shift();
      if(shiverBuf.length >= 15){
        const diffs = [];
        for(let i=1; i<shiverBuf.length; i++){
          const dx=shiverBuf[i].x-shiverBuf[i-1].x, dy=shiverBuf[i].y-shiverBuf[i-1].y;
          const dt=(shiverBuf[i].t-shiverBuf[i-1].t)/1000;
          diffs.push(Math.sqrt(dx*dx+dy*dy)/Math.max(dt,.01));
        }
        const mean=diffs.reduce((a,b)=>a+b,0)/diffs.length;
        const variance=diffs.reduce((a,d)=>a+(d-mean)**2,0)/diffs.length;
        if(variance > 1.1) triggerShiver();
      }
    }
  } 
}

function triggerPain(reason){
  if(cooldown.pain && Date.now()-cooldown.pain < 9000) return;
  cooldown.pain = Date.now();
  sd.pain++; updateMetrics();
  setDet('det-face','🥱 Tiredness Detected','det-bad');
  speak('You are tired, take a rest for 1 minute.');
  startRest('Tiredness 🥱', 'You are tired, take a rest for 1 min.', '🥱', 60);
  setTimeout(()=>setDet('det-face','Expression: Normal','det-ok'), 11000);
}

function triggerShiver(){
  if(cooldown.shiver && Date.now()-cooldown.shiver < 9000) return;
  cooldown.shiver = Date.now();
  sd.fat++; updateMetrics();
  setDet('det-shiv','🫨 Muscle Fatigue','det-bad');
  speak('Muscle fatigue detected. Resting now.');
  startRest('Muscle Fatigue 🫨', 'Trembling detected. Rest to recover.', '🫨', 60);
  setTimeout(()=>setDet('det-shiv','Muscle: Steady','det-ok'), 11000);
}

function setDet(id, txt, cls){
  const el=$(id);
  el.innerHTML=`<span class="dd"></span>${txt}`;
  el.className=`det ${cls}`;
}

function startRest(title, msg, icon, duration = 120){
  if(isResting) return;
  isResting=true; restLeft=duration;
  $('restTitle').textContent=title; $('restMsg').textContent=msg; $('restIcon').textContent=icon;
  $('restOverlay').classList.add('show');
  updateRestClock();
  clearInterval(restInterval);
  restInterval=setInterval(()=>{ restLeft--; updateRestClock(); if(restLeft<=0) skipRest(); },1000);
}
function skipRest(){
  clearInterval(restInterval); isResting=false;
  $('restOverlay').classList.remove('show');
  speak('Rest over. Continue the exercise.');
}
function updateRestClock(){
  const m=Math.floor(restLeft/60), s=restLeft%60;
  $('restClock').textContent=`${m}:${s<10?'0':''}${s}`;
}
function sesTick(){
  if(isResting) return;
  if(!isUserVisible || !isUserAligned) return;
  sesLeft--; updateTimer();

  const ex = exercises[currentIdx];
  if(ex && ex.reps && ex.reps.toLowerCase().includes('each')) {
    if(sesLeft === Math.floor(ex.dur / 2)) {
      speak("Halfway there. Please switch sides now.");
    }
  }

  if(sesLeft <= 0) endSession();
}
function updateTimer(){
  const m=Math.floor(sesLeft/60), s=sesLeft%60;
  $('sessTimer').textContent=`${m}:${s<10?'0':''}${s}`;
}
function endSession(){
  clearInterval(sesInterval); clearInterval(restInterval);
  stopCamera(); saveSession();
  const nextIdx = currentIdx + 1;
  if(nextIdx < exercises.length){
    localStorage.setItem('currentExIdx', nextIdx.toString());
    toast(`✓ Done! Next: ${exercises[nextIdx].name}`, 's');
    setTimeout(()=>{ window.location.href='demo.html'; }, 700);
  } else {
    window.location.href='complete.html';
  }
}
function stopCamera(){
  if(mpCamera){ try{ mpCamera.stop(); }catch(e){} mpCamera=null; }
  if(camStream){ camStream.getTracks().forEach(t=>t.stop()); camStream=null; }
  $('liveVideo').srcObject = null;
  cancelAnimationFrame(rafId); rafId=null;
  poseLM=null; faceLM=null;
}
function saveSession(){
  const acc = sd.tf > 0 ? Math.round(sd.af/sd.tf*100) : Math.round(76+Math.random()*14);
  const record = {
    user: U?.username || 'guest',
    date: new Date().toISOString(),
    exercise: exercises[currentIdx]?.name || '—',
    acc, reps:sd.reps, wrong:sd.wrong, pain:sd.pain, fat:sd.fat
  };
  const all = JSON.parse(localStorage.getItem('ps')||'[]');
  all.push(record);
  localStorage.setItem('ps', JSON.stringify(all));
}
function updateMetrics(){
  $('metReps').textContent  = sd.reps;
  $('metWrong').textContent = sd.wrong;
  $('metPain').textContent  = sd.pain;
  $('metFat').textContent   = sd.fat;
  const a = sd.tf>0 ? Math.round(sd.af/sd.tf*100) : 0;
  $('accPct').textContent = a + '%';
  $('accArc').style.strokeDashoffset = 213.63 - (a/100)*213.63;
  $('accArc').style.stroke = a>70?'var(--g)':a>40?'var(--y)':'var(--r)';
}
function updateAlignHUD(aligned, ua, g){
  const chip=$('alignChip');
  if(ua === null){
    chip.className='align-chip chip-wait'; chip.textContent='⏳ No skeleton';
    setDet('det-pose','Pose: Not detected','det-warn');
    $('hintBox').textContent='Step back so your full body is visible.';
  } else if(aligned){
    chip.className='align-chip chip-ok'; chip.textContent='✓ Correct posture!';
    setDet('det-pose','Pose: ✓ Good','det-ok');
    $('hintBox').textContent='Great! Keep this position.';
  } else {
    chip.className='align-chip chip-bad'; chip.textContent='✗ Adjust posture';
    setDet('det-pose','Pose: Off','det-warn');
    $('hintBox').textContent=`Adjust your angle. Target: ${Math.round(targetAngle)}°, Yours: ${Math.round(ua)}°`;
  }
  const tPct = (targetAngle-g.mn)/(g.mx-g.mn)*100;
  $('ghostAngle').textContent = Math.round(targetAngle) + '°';
  $('targetBar').style.width = Math.max(2,tPct) + '%';
  if(ua !== null){
    const uPct = (ua-g.mn)/(g.mx-g.mn)*100;
    $('yourAngle').textContent = Math.round(ua) + '°';
    $('yourBar').style.width = Math.max(0,Math.min(100,uPct)) + '%';
    $('yourBar').style.background = aligned ? 'var(--g)' : 'var(--r)';
  }
}
let lastSpeak = 0;
function speak(msg){
  if(!window.speechSynthesis || Date.now()-lastSpeak < 3000) return;
  lastSpeak = Date.now();
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(msg);
  u.rate=.94; u.pitch=1; speechSynthesis.speak(u);
  $('hintBox').textContent = msg;
}
window.onload = () => {
  U = JSON.parse(localStorage.getItem('pu')||'null');
  if(!U || !U.profile){ window.location.href='login.html'; return; }
  exercises   = getExs(U.profile.cause);
  currentIdx  = parseInt(localStorage.getItem('currentExIdx')||'0');
  if(currentIdx >= exercises.length) currentIdx = 0;
  startSession();
};