/* ============================================================
   PhysioAI — Exercise Database & Injury Mapping
   Built by GPNV Creations
   ============================================================ */

const DB = {
  /* ─── SHOULDER PAIN ─── */
  "Frozen Shoulder": [
    {
      name: "Pendulum Exercises", vid: "-37fDuC83DQ", dur: 90, reps: "1-2 min",
      desc: "Lean forward, let arm hang freely. Make small circles using gravity and momentum. No muscle force needed.",
      syms: ["Shoulder stiffness", "Post-surgery", "Frozen shoulder stage 1"],
      g: { j: "sh_circle", mn: -30, mx: 30, sp: 1.0, tl: 15 }
    },
    {
      name: "Shoulder Rolls", vid: "IKJZL4hvppw", dur: 60, reps: "10-15 reps",
      desc: "Roll shoulders forward and backward in large circles. Releases tension in shoulder girdle.",
      syms: ["Tightness", "Reduced mobility", "Stiffness"],
      g: { j: "sh_roll", mn: -20, mx: 20, sp: 0.8, tl: 12 }
    },
    {
      name: "Cross Body Stretch", vid: "8s8lJe_VR6g", dur: 45, reps: "15 sec x3 each",
      desc: "Bring arm across chest, hold at elbow with other arm. Stretches posterior capsule.",
      syms: ["Limited ROM", "Posterior tightness", "Frozen shoulder stage 2"],
      g: { j: "sh_abd", mn: 0, mx: 80, sp: 0.6, tl: 12 }
    }
  ],
  "Calcific Tendinopathy": [
    {
      name: "Pendulum Exercises", vid: "-37fDuC83DQ", dur: 90, reps: "1-2 min",
      desc: "Let arm hang and swing in small circles using gravity. Essential for calcific tendinopathy recovery.",
      syms: ["Acute shoulder pain", "Calcium deposits", "Night pain"],
      g: { j: "sh_circle", mn: -30, mx: 30, sp: 0.9, tl: 15 }
    },
    {
      name: "Wall Crawl", vid: "ir4f0_O4wiY", dur: 60, reps: "5-10 reps",
      desc: "Face wall, walk fingers upward as high as comfortable. Gradually restores shoulder elevation.",
      syms: ["Limited overhead", "Stage 2-3", "Calcium deposits"],
      g: { j: "sh_abd", mn: 20, mx: 110, sp: 0.4, tl: 12 }
    },
    {
      name: "Towel Stretch", vid: "kuJjYd-rdww", dur: 45, reps: "15 sec x3",
      desc: "Hold towel behind back, use good arm to gently pull affected arm upward.",
      syms: ["Internal rotation loss", "Behind-back tightness"],
      g: { j: "sh_ext", mn: 0, mx: 50, sp: 0.5, tl: 12 }
    },
    {
      name: "Shoulder Pendulum + Ice", vid: "omeww85Mhkw", dur: 60, reps: "2 min",
      desc: "Gentle pendulum combined with rest and ice application. Reduces inflammation from calcium deposits.",
      syms: ["Acute flare", "Severe pain", "Post-injection"],
      g: { j: "sh_circle", mn: -20, mx: 20, sp: 0.7, tl: 18 }
    }
  ],
  "Shoulder Osteoarthritis": [
    {
      name: "Pendulum Exercises", vid: "-37fDuC83DQ", dur: 90, reps: "1-2 min",
      desc: "Gravity-assisted pendulum movement. Lubricates the arthritic joint without loading it.",
      syms: ["Morning stiffness", "Grinding sensation", "OA joint pain"],
      g: { j: "sh_circle", mn: -25, mx: 25, sp: 0.8, tl: 15 }
    },
    {
      name: "Wall Crawl", vid: "ir4f0_O4wiY", dur: 60, reps: "5-10 reps",
      desc: "Walk fingers up wall slowly. Maintains shoulder range of motion in arthritic shoulder.",
      syms: ["Limited overhead", "Stiffness", "Reduced ROM"],
      g: { j: "sh_abd", mn: 20, mx: 100, sp: 0.4, tl: 12 }
    },
    {
      name: "Shoulder Rolls", vid: "IKJZL4hvppw", dur: 60, reps: "10-15 reps",
      desc: "Slow, circular shoulder rolls forward and back. Maintains mobility and reduces stiffness.",
      syms: ["Stiffness", "Aching", "Poor posture"],
      g: { j: "sh_roll", mn: -20, mx: 20, sp: 0.6, tl: 12 }
    },
    {
      name: "Scapular Retraction", vid: "aE5Ag1JBAf4", dur: 45, reps: "10 reps",
      desc: "Squeeze shoulder blades together and hold 5 seconds. Strengthens periscapular muscles.",
      syms: ["Weak rotator cuff", "Poor posture", "Shoulder instability"],
      g: { j: "sh_ret", mn: 0, mx: 25, sp: 0.5, tl: 10 }
    }
  ],
  "Rotator Cuff-Related Pain": [
    {
      name: "Pendulum Exercises", vid: "-37fDuC83DQ", dur: 90, reps: "1-2 min",
      desc: "Lean forward, let arm hang. Swing in small circles. Essential first exercise for rotator cuff.",
      syms: ["Night pain", "Weakness", "Impingement"],
      g: { j: "sh_circle", mn: -30, mx: 30, sp: 1.0, tl: 15 }
    },
    {
      name: "External Rotation", vid: "4fM554Org3o", dur: 60, reps: "10 reps",
      desc: "Elbow at 90 degrees, rotate forearm outward against resistance. Strengthens infraspinatus and teres minor.",
      syms: ["Overhead pain", "Throwing pain", "Rotator cuff tear"],
      g: { j: "sh_ext", mn: 0, mx: 60, sp: 0.5, tl: 10 }
    },
    {
      name: "Wall Crawl", vid: "ir4f0_O4wiY", dur: 60, reps: "5-10 reps",
      desc: "Walk fingers up wall. Restores overhead range of motion lost from rotator cuff pain.",
      syms: ["Limited overhead", "Shoulder arc pain", "60-120 deg pain"],
      g: { j: "sh_abd", mn: 20, mx: 120, sp: 0.4, tl: 12 }
    }
  ],
  "AC Joint Disorder": [
    {
      name: "Pendulum Exercises", vid: "-37fDuC83DQ", dur: 90, reps: "1-2 min",
      desc: "Gravity-assisted shoulder movement. Maintains mobility without loading the AC joint.",
      syms: ["Top of shoulder pain", "AC joint tenderness", "Post-separation"],
      g: { j: "sh_circle", mn: -25, mx: 25, sp: 0.8, tl: 15 }
    },
    {
      name: "Cross Body Stretch", vid: "8s8lJe_VR6g", dur: 45, reps: "15 sec x3 each side",
      desc: "Bring arm across chest gently. Stretches posterior capsule while protecting AC joint.",
      syms: ["Cross-body pain", "AC joint stiffness", "Post-injury"],
      g: { j: "sh_abd", mn: 0, mx: 70, sp: 0.5, tl: 12 }
    },
    {
      name: "Scapular Retraction", vid: "aE5Ag1JBAf4", dur: 45, reps: "10 reps",
      desc: "Squeeze shoulder blades back together. Stabilises AC joint and improves posture.",
      syms: ["Shoulder instability", "Weak periscapular", "Poor alignment"],
      g: { j: "sh_ret", mn: 0, mx: 25, sp: 0.5, tl: 10 }
    }
  ],

  /* ─── NECK PAIN ─── */
  "Muscle Strain": [
    {
      name: "Neck Rotation", vid: "dVjexqdvWqk", dur: 60, reps: "10 reps each side",
      desc: "Slowly turn head left then right, hold 5 seconds each side. Maintains cervical range of motion.",
      syms: ["Neck stiffness", "Pain while turning", "Tightness in shoulders"],
      g: { j: "nk_r", mn: -45, mx: 45, sp: 0.7, tl: 10 }
    },
    {
      name: "Side Stretch", vid: "vsqsLmm4ZuM", dur: 45, reps: "15 sec each side",
      desc: "Tilt ear toward shoulder gently. Stretches scalenes and upper trapezius muscles.",
      syms: ["Shoulder tightness", "Neck stiffness", "Sometimes headache"],
      g: { j: "nk_s", mn: -30, mx: 30, sp: 0.5, tl: 10 }
    },
    {
      name: "Chin Tuck", vid: "O2kkwT6t3R0", dur: 45, reps: "10 reps",
      desc: "Retract chin straight back without tilting. Strengthens deep cervical flexors, corrects forward head.",
      syms: ["Forward head posture", "Tech neck", "Upper back pain"],
      g: { j: "nk_t", mn: 0, mx: 15, sp: 0.5, tl: 8 }
    }
  ],
  "Cervical Spondylosis": [
    {
      name: "Chin Tuck", vid: "O2kkwT6t3R0", dur: 45, reps: "10 reps",
      desc: "Retract chin straight back. Key exercise for cervical spondylosis to decompress nerve roots.",
      syms: ["Neck stiffness", "Tingling in hand", "Radiating arm pain"],
      g: { j: "nk_t", mn: 0, mx: 15, sp: 0.5, tl: 8 }
    },
    {
      name: "Neck Rotation", vid: "dVjexqdvWqk", dur: 60, reps: "10 reps each side",
      desc: "Slow, controlled head rotation. Maintains cervical mobility and reduces stiffness.",
      syms: ["Limited rotation", "Headache back of head", "Neck pain"],
      g: { j: "nk_r", mn: -40, mx: 40, sp: 0.6, tl: 10 }
    },
    {
      name: "Side Stretch", vid: "vsqsLmm4ZuM", dur: 45, reps: "15 sec each side",
      desc: "Gentle lateral neck stretch. Relieves nerve tension and upper trapezius tightness.",
      syms: ["Shoulder arm pain", "Neck stiffness", "Radiating pain"],
      g: { j: "nk_s", mn: -28, mx: 28, sp: 0.5, tl: 10 }
    },
    {
      name: "Scapular Retraction", vid: "aE5Ag1JBAf4", dur: 45, reps: "10 reps",
      desc: "Squeeze shoulder blades back. Reduces forward head posture and cervical nerve compression.",
      syms: ["Tingling hands", "Poor posture", "Nerve compression"],
      g: { j: "sh_ret", mn: 0, mx: 25, sp: 0.5, tl: 10 }
    }
  ],

  "Cervical Stenosis": [
    {
      name: "Chin Tuck", vid: "O2kkwT6t3R0", dur: 45, reps: "10 reps",
      desc: "Chin retraction opens the spinal canal slightly and decompresses compressed nerves.",
      syms: ["Arm weakness", "Balance issues", "Tingling hands"],
      g: { j: "nk_t", mn: 0, mx: 15, sp: 0.4, tl: 8 }
    },
    {
      name: "Neck Flexion", vid: "v9vK-ORuvKo", dur: 45, reps: "10 reps",
      desc: "Gentle forward neck flexion opens posterior spinal canal. Relieves stenosis symptoms.",
      syms: ["Spreading arm pain", "Numbness", "Stenosis"],
      g: { j: "nk_f", mn: 0, mx: 35, sp: 0.5, tl: 10 }
    },
    {
      name: "Scapular Retraction", vid: "aE5Ag1JBAf4", dur: 45, reps: "10 reps",
      desc: "Strengthens periscapular muscles to support and decompress cervical spine.",
      syms: ["Weakness", "Poor posture", "Instability"],
      g: { j: "sh_ret", mn: 0, mx: 25, sp: 0.4, tl: 10 }
    }
  ],
  "Whiplash": [
    {
      name: "Chin Tuck", vid: "O2kkwT6t3R0", dur: 45, reps: "10 reps",
      desc: "Gentle chin retraction. First-line exercise after whiplash to restore cervical control.",
      syms: ["Headache back of head", "Neck stiffness", "Reduced movement"],
      g: { j: "nk_t", mn: 0, mx: 15, sp: 0.4, tl: 8 }
    },
    {
      name: "Neck Rotation", vid: "dVjexqdvWqk", dur: 60, reps: "10 reps each side",
      desc: "Slow, small range head rotation. Gently restores rotation lost after whiplash injury.",
      syms: ["Limited rotation", "Pain turning head", "Dizziness"],
      g: { j: "nk_r", mn: -30, mx: 30, sp: 0.5, tl: 12 }
    },
    {
      name: "Side Stretch", vid: "vsqsLmm4ZuM", dur: 45, reps: "15 sec each side",
      desc: "Lateral neck stretch. Reduces muscle spasm in scalenes following whiplash.",
      syms: ["Shoulder pain", "Tightness", "Muscle spasm"],
      g: { j: "nk_s", mn: -25, mx: 25, sp: 0.4, tl: 10 }
    }
  ],

  /* ─── ANKLE PAIN ─── */
  "Ankle Sprain": [
    {
      name: "Ankle Circles", vid: "mzTQGYGI0Ng", dur: 60, reps: "10 reps each direction",
      desc: "Rotate ankle in full circles clockwise and anti-clockwise. Restores mobility post-sprain.",
      syms: ["Pain while walking", "Swelling", "Limited movement"],
      g: { j: "ank", mn: -20, mx: 30, sp: 0.8, tl: 12 }
    },
    {
      name: "Ankle Towel Stretch", vid: "KoFs5dOz25k", dur: 45, reps: "15 sec x3",
      desc: "Sit and loop towel around foot, pull toward you. Stretches calf and Achilles after sprain.",
      syms: ["Stiffness", "Tenderness", "Bruising"],
      g: { j: "ank", mn: -15, mx: 25, sp: 0.5, tl: 12 }
    },
    {
      name: "Heel Raises", vid: "5nc36z_Zt-Q", dur: 60, reps: "10 reps",
      desc: "Stand and rise onto toes slowly, lower back. Rebuilds calf strength and ankle stability.",
      syms: ["Weakness after sprain", "Instability", "Fear of re-injury"],
      g: { j: "hp_s", mn: 0, mx: 35, sp: 0.6, tl: 12 }
    }
  ],
  "Achilles Tendinopathy": [
    {
      name: "Calf Stretch", vid: "mDxFZDA7Uq0", dur: 60, reps: "15 sec x3",
      desc: "Stand facing wall, back leg straight. Stretch calf and Achilles tendon slowly.",
      syms: ["Pain at back of heel", "Morning stiffness", "Tendon pain"],
      g: { j: "ank", mn: -20, mx: 30, sp: 0.4, tl: 10 }
    },
    {
      name: "Heel Drops (Eccentric)", vid: "5nc36z_Zt-Q", dur: 60, reps: "10 reps",
      desc: "Stand on step, lower heel below step slowly. Eccentric loading is gold standard for Achilles rehab.",
      syms: ["Tendinopathy", "Running pain", "Morning heel stiffness"],
      g: { j: "ank", mn: -20, mx: 10, sp: 0.4, tl: 10 }
    },
    {
      name: "Ankle Towel Stretch", vid: "KoFs5dOz25k", dur: 45, reps: "15 sec x3",
      desc: "Loop towel around foot and pull toward body. Gentle stretch for Achilles and plantar fascia.",
      syms: ["Achilles tightness", "Morning stiffness", "Heel pain"],
      g: { j: "ank", mn: -15, mx: 25, sp: 0.4, tl: 12 }
    },
    {
      name: "Ankle Circles", vid: "mzTQGYGI0Ng", dur: 45, reps: "10 reps each direction",
      desc: "Slow ankle circles to maintain mobility while tendon heals.",
      syms: ["Stiffness", "Limited motion", "Swelling"],
      g: { j: "ank", mn: -20, mx: 30, sp: 0.6, tl: 12 }
    }
  ],
  "Ankle Osteoarthritis": [
    {
      name: "Ankle Circles", vid: "mzTQGYGI0Ng", dur: 60, reps: "10 reps",
      desc: "Gentle ankle circles to lubricate arthritic joint without excessive loading.",
      syms: ["Morning stiffness", "Grinding sensation", "Swelling"],
      g: { j: "ank", mn: -20, mx: 30, sp: 0.6, tl: 12 }
    },
    {
      name: "Ankle Towel Stretch", vid: "KoFs5dOz25k", dur: 45, reps: "15 sec x3",
      desc: "Towel stretch for plantar fascia and calf flexibility in arthritic ankle.",
      syms: ["Stiffness", "Pain while walking", "Reduced movement"],
      g: { j: "ank", mn: -15, mx: 25, sp: 0.4, tl: 12 }
    },
    {
      name: "Heel Raises", vid: "5nc36z_Zt-Q", dur: 60, reps: "10 reps",
      desc: "Calf raises to maintain ankle strength and joint health in osteoarthritis.",
      syms: ["Weakness", "Instability", "OA joint pain"],
      g: { j: "hp_s", mn: 0, mx: 35, sp: 0.5, tl: 12 }
    },
    {
      name: "Toe Raises", vid: "gRHg6v6-szc", dur: 45, reps: "10 reps",
      desc: "Lift toes up while heel stays on ground. Strengthens tibialis anterior and improves balance.",
      syms: ["Foot drop tendency", "Ankle weakness", "Balance issues"],
      g: { j: "ank", mn: 10, mx: 35, sp: 0.5, tl: 12 }
    }
  ],
  "Gout": [
    {
      name: "Ankle Circles", vid: "mzTQGYGI0Ng", dur: 60, reps: "10 reps each direction",
      desc: "Very gentle ankle circles. Only after acute pain reduces. Do not force range.",
      syms: ["Post-gout stiffness", "Swelling reducing", "Recovery phase"],
      g: { j: "ank", mn: -15, mx: 25, sp: 0.5, tl: 15 }
    },
    {
      name: "Toe Stretch", vid: "SbQ2RYxbppE", dur: 45, reps: "15 sec x3",
      desc: "Gentle toe extension stretch. Restores big toe mobility after gout attack.",
      syms: ["Big toe stiffness", "Gout recovery", "Uric acid crystals"],
      g: { j: "toe", mn: 0, mx: 30, sp: 0.4, tl: 15 }
    },
    {
      name: "Heel Raises", vid: "5nc36z_Zt-Q", dur: 45, reps: "8-10 reps",
      desc: "Light calf raises to improve circulation and reduce uric acid buildup.",
      syms: ["Post-gout weakness", "Circulation", "Prevention"],
      g: { j: "hp_s", mn: 0, mx: 30, sp: 0.4, tl: 15 }
    }
  ],

  /* ─── LEG PAIN ─── */
  "Muscle Strain (Leg)": [
    {
      name: "Hamstring Stretch", vid: "Il1L75v6gq0", dur: 60, reps: "15 sec x3",
      desc: "Sit or stand, reach toward foot. Stretches tight hamstrings after muscle strain.",
      syms: ["Thigh tightness", "Calf pain", "Stiffness"],
      g: { j: "kn", mn: 140, mx: 170, sp: 0.4, tl: 12 }
    },
    {
      name: "Quadriceps Stretch", vid: "_xU-wIiMxpI", dur: 60, reps: "15 sec x3",
      desc: "Stand on one leg, pull foot to buttock. Stretches quadriceps after strain.",
      syms: ["Front thigh pain", "Stiffness", "Swelling"],
      g: { j: "kn", mn: 40, mx: 90, sp: 0.4, tl: 12 }
    },
    {
      name: "Calf Stretch", vid: "mDxFZDA7Uq0", dur: 60, reps: "15 sec x3",
      desc: "Lean against wall, back leg straight heel on floor. Stretches gastrocnemius.",
      syms: ["Calf tightness", "Pain while walking", "Muscle spasm"],
      g: { j: "ank", mn: -20, mx: 25, sp: 0.4, tl: 12 }
    },
    {
      name: "Heel Raises", vid: "5nc36z_Zt-Q", dur: 60, reps: "10 reps",
      desc: "Calf raises to rebuild strength after leg muscle strain.",
      syms: ["Weakness", "Reduced power", "Return to activity"],
      g: { j: "hp_s", mn: 0, mx: 35, sp: 0.5, tl: 12 }
    }
  ],
  "Shin Splints": [
    {
      name: "Calf Stretch", vid: "mDxFZDA7Uq0", dur: 60, reps: "15 sec x3",
      desc: "Gastrocnemius stretch. Reduces tension on shin muscles that cause shin splints.",
      syms: ["Anterior shin pain", "Running pain", "Exercise pain"],
      g: { j: "ank", mn: -20, mx: 25, sp: 0.4, tl: 12 }
    },
    {
      name: "Toe Raises", vid: "gRHg6v6-szc", dur: 45, reps: "10 reps",
      desc: "Lift toes upward repeatedly. Strengthens tibialis anterior — the key shin splints muscle.",
      syms: ["Shin tenderness", "Mild swelling", "Tibialis pain"],
      g: { j: "ank", mn: 10, mx: 35, sp: 0.6, tl: 12 }
    },
    {
      name: "Heel Walk", vid: "KLvHb02X6wU", dur: 30, reps: "20-30 sec",
      desc: "Walk on heels only. Directly rehabilitates tibialis anterior after shin splints.",
      syms: ["Shin pain after exercise", "Tenderness", "Mild swelling"],
      g: { j: "ank", mn: 15, mx: 40, sp: 0.7, tl: 12 }
    },
    {
      name: "Ankle Circles", vid: "mzTQGYGI0Ng", dur: 45, reps: "10 reps each direction",
      desc: "Ankle mobility exercise. Maintains range of motion during shin splints recovery.",
      syms: ["Stiffness", "Reduced mobility", "Recovery"],
      g: { j: "ank", mn: -20, mx: 30, sp: 0.6, tl: 12 }
    }
  ],
  "Patellofemoral Pain (Leg)": [
    {
      name: "Quadriceps Stretch", vid: "_xU-wIiMxpI", dur: 60, reps: "15 sec x3",
      desc: "Stand, pull foot to buttock. Stretches tight quadriceps that cause patellofemoral compression.",
      syms: ["Kneecap pain", "Stair pain", "Squatting pain"],
      g: { j: "kn", mn: 40, mx: 90, sp: 0.4, tl: 12 }
    },
    {
      name: "Straight Leg Raise", vid: "qvi8aM02_GY", dur: 60, reps: "10 reps",
      desc: "Lie on back, raise straight leg to 45 degrees and hold 5 seconds. Strengthens quad without knee stress.",
      syms: ["Kneecap pain", "Post-surgery", "Quad weakness"],
      g: { j: "hp_s", mn: 0, mx: 45, sp: 0.4, tl: 10 }
    },
    {
      name: "Hamstring Stretch", vid: "Il1L75v6gq0", dur: 60, reps: "15 sec x3",
      desc: "Hamstring stretch to balance quad and hamstring forces across the knee.",
      syms: ["Clicking sensation", "Long sitting pain", "Grinding"],
      g: { j: "kn", mn: 140, mx: 170, sp: 0.4, tl: 12 }
    }
  ],
  "Sciatica": [
    {
      name: "Knee to Chest Stretch", vid: "Yd9wY25koVk", dur: 60, reps: "15 sec x3",
      desc: "Lie on back, pull one knee to chest. Decompresses lumbar spine and reduces sciatic nerve irritation.",
      syms: ["Leg radiating pain", "Burning shooting pain", "Tingling numbness"],
      g: { j: "kn", mn: 80, mx: 130, sp: 0.4, tl: 12 }
    },
    {
      name: "Piriformis Stretch", vid: "mT-3b4rgRzg", dur: 60, reps: "15 sec x3",
      desc: "Cross ankle over knee and lean forward. Stretches piriformis muscle compressing sciatic nerve.",
      syms: ["Buttock pain", "Hip pain", "Sciatica"],
      g: { j: "hp", mn: 60, mx: 100, sp: 0.4, tl: 12 }
    },
    {
      name: "Pelvic Tilt", vid: "ZIQjHtghzqw", dur: 60, reps: "10 reps",
      desc: "Lie on back, flatten lower back to floor. Core activation that reduces sciatic pressure.",
      syms: ["Lower back pain", "Leg weakness", "Nerve pain"],
      g: { j: "sp", mn: -10, mx: 15, sp: 0.5, tl: 12 }
    }
  ],

  /* ─── BACK PAIN ─── */
  "Muscle Strain / Ligament Sprain": [
    {
      name: "Cat-Cow Stretch", vid: "LIVJZZyZ2qM", dur: 60, reps: "10 reps",
      desc: "On all fours, alternate arching and rounding spine. Mobilises entire lumbar spine gently.",
      syms: ["Lower back pain", "Muscle spasm", "Bending pain"],
      g: { j: "sp", mn: -20, mx: 20, sp: 0.5, tl: 12 }
    },
    {
      name: "Knee to Chest", vid: "Yd9wY25koVk", dur: 60, reps: "15 sec x3",
      desc: "Pull one knee to chest while lying. Decompresses lumbar facets and stretches extensors.",
      syms: ["Stiffness", "Muscle tightness", "Morning pain"],
      g: { j: "kn", mn: 80, mx: 130, sp: 0.4, tl: 12 }
    },
    {
      name: "Pelvic Tilt", vid: "ZIQjHtghzqw", dur: 60, reps: "10 reps",
      desc: "Flatten lower back to floor repeatedly. Activates core muscles and reduces muscle spasm.",
      syms: ["Back strain", "Muscle spasm", "Lifting injury"],
      g: { j: "sp", mn: -10, mx: 15, sp: 0.5, tl: 12 }
    }
  ],
  "Herniated Disc": [
    {
      name: "McKenzie Extension", vid: "tIZppe-RB0g", dur: 60, reps: "10 reps",
      desc: "Lie on stomach, press up onto hands. McKenzie extension centralises disc herniation pain.",
      syms: ["Leg radiating pain", "Disc herniation", "Sciatica from disc"],
      g: { j: "sp", mn: 0, mx: 25, sp: 0.4, tl: 12 }
    },
    {
      name: "Pelvic Tilt", vid: "ZIQjHtghzqw", dur: 60, reps: "10 reps",
      desc: "Gentle pelvic tilts. Maintains lumbar stability and reduces disc pressure.",
      syms: ["Lower back pain", "Numbness", "Tingling leg"],
      g: { j: "sp", mn: -10, mx: 15, sp: 0.4, tl: 12 }
    },
    {
      name: "Knee to Chest", vid: "Yd9wY25koVk", dur: 60, reps: "15 sec x3",
      desc: "Single leg knee to chest. Gently flexes lumbar spine to reduce disc nerve compression.",
      syms: ["Weakness in leg", "Disc pain", "Leg tingling"],
      g: { j: "kn", mn: 80, mx: 130, sp: 0.4, tl: 12 }
    }
  ],
  "Spinal Stenosis": [
    {
      name: "Knee to Chest (Both)", vid: "Yd9wY25koVk", dur: 60, reps: "15 sec x3",
      desc: "Pull both knees to chest. Forward flexion opens the spinal canal — direct stenosis treatment.",
      syms: ["Walking pain", "Leg weakness", "Pain standing"],
      g: { j: "kn", mn: 80, mx: 130, sp: 0.4, tl: 12 }
    },
    {
      name: "Pelvic Tilt", vid: "ZIQjHtghzqw", dur: 60, reps: "10 reps",
      desc: "Flatten back to floor. Posterior pelvic tilt opens spinal canal in stenosis.",
      syms: ["Tingling numbness", "Balance issues", "Leg weakness"],
      g: { j: "sp", mn: -10, mx: 15, sp: 0.4, tl: 12 }
    },
    {
      name: "Seated Forward Bend", vid: "PUVTGBARpoo", dur: 60, reps: "15 sec x3",
      desc: "Sit and reach forward. Flexion-based stretch that opens posterior spinal canal.",
      syms: ["Claudication", "Walking limitation", "Buttock pain"],
      g: { j: "hp", mn: 80, mx: 120, sp: 0.4, tl: 12 }
    }
  ],
  "Spondylolisthesis": [
    {
      name: "Pelvic Tilt", vid: "ZIQjHtghzqw", dur: 60, reps: "10 reps",
      desc: "Core stability exercise. Avoids extension which worsens spondylolisthesis slip.",
      syms: ["Standing pain", "Back pain", "Tight hamstrings"],
      g: { j: "sp", mn: -10, mx: 15, sp: 0.4, tl: 12 }
    },
    {
      name: "Knee to Chest", vid: "Yd9wY25koVk", dur: 60, reps: "15 sec x3",
      desc: "Pull knee to chest. Flexion reduces stress on slipped vertebra.",
      syms: ["Bending backward pain", "Leg pain", "Stiffness"],
      g: { j: "kn", mn: 80, mx: 130, sp: 0.4, tl: 12 }
    },
    {
      name: "Hamstring Stretch", vid: "Il1L75v6gq0", dur: 60, reps: "15 sec x3",
      desc: "Hamstring stretch. Tight hamstrings increase spondylolisthesis symptoms — must stretch regularly.",
      syms: ["Tight hamstrings", "Hip tightness", "Back-leg pain"],
      g: { j: "kn", mn: 140, mx: 170, sp: 0.4, tl: 12 }
    }
  ],

  /* ─── FOOT PAIN ─── */
  "Plantar Fasciitis": [
    {
      name: "Calf Stretch", vid: "mDxFZDA7Uq0", dur: 60, reps: "15 sec x3",
      desc: "Lean on wall, heel flat on floor. Stretches gastrocnemius and plantar fascia morning and evening.",
      syms: ["Heel pain morning", "First step pain", "Long standing pain"],
      g: { j: "ank", mn: -20, mx: 25, sp: 0.4, tl: 10 }
    },
    {
      name: "Plantar Fascia Stretch", vid: "rlAjIXb-8BM", dur: 60, reps: "15 sec x3",
      desc: "Pull toes toward shin to stretch the plantar fascia directly. Most effective morning exercise.",
      syms: ["Heel pain", "Foot tightness", "Morning first steps"],
      g: { j: "toe", mn: 0, mx: 35, sp: 0.4, tl: 12 }
    },
    {
      name: "Heel Raises", vid: "5nc36z_Zt-Q", dur: 60, reps: "10 reps",
      desc: "Rise onto toes slowly. Strengthens calf-Achilles-plantar fascia chain.",
      syms: ["Arch weakness", "Foot pain after standing", "Tightness"],
      g: { j: "hp_s", mn: 0, mx: 35, sp: 0.5, tl: 12 }
    }
  ],
  "Achilles Tendinitis": [
    {
      name: "Calf Stretch", vid: "mDxFZDA7Uq0", dur: 60, reps: "15 sec x3",
      desc: "Classic calf stretch. Reduces Achilles tendon load and improves flexibility.",
      syms: ["Back of heel pain", "Morning stiffness", "Walking pain"],
      g: { j: "ank", mn: -20, mx: 25, sp: 0.4, tl: 10 }
    },
    {
      name: "Heel Drops (Eccentric)", vid: "5nc36z_Zt-Q", dur: 60, reps: "10 reps",
      desc: "Lower heel below step slowly. Eccentric calf loading is the gold standard for Achilles tendinitis.",
      syms: ["Tendon pain", "Running pain", "Morning heel pain"],
      g: { j: "ank", mn: -20, mx: 5, sp: 0.4, tl: 10 }
    },
    {
      name: "Ankle Circles", vid: "mzTQGYGI0Ng", dur: 45, reps: "10 reps each direction",
      desc: "Maintain ankle mobility during Achilles tendinitis recovery.",
      syms: ["Stiffness", "Limited motion", "Tendon tightness"],
      g: { j: "ank", mn: -20, mx: 30, sp: 0.5, tl: 12 }
    }
  ]
};

const IC = {
  "Shoulder Pain": ["Frozen Shoulder", "Calcific Tendinopathy", "Shoulder Osteoarthritis", "Rotator Cuff-Related Pain", "AC Joint Disorder"],
  "Neck Pain": ["Muscle Strain", "Cervical Spondylosis", "Cervical Stenosis", "Whiplash"],
  "Ankle/Foot Pain": ["Ankle Sprain", "Achilles Tendinopathy", "Ankle Osteoarthritis", "Gout"],
  "Leg Pain": ["Muscle Strain (Leg)", "Shin Splints", "Patellofemoral Pain (Leg)", "Sciatica"],
  "Back Pain": ["Muscle Strain / Ligament Sprain", "Herniated Disc", "Spinal Stenosis", "Spondylolisthesis"],
  "Foot Pain": ["Plantar Fasciitis", "Achilles Tendinitis"],
  "Knee Pain": ["Patellofemoral Pain", "Meniscus Tear", "IT Band Syndrome", "Osteoarthritis"],
  "Hip Pain": ["Hip Flexor Strain", "Bursitis", "Hip Impingement"],
  "Elbow/Wrist Pain": ["Tennis Elbow", "Golfer's Elbow", "Carpal Tunnel", "De Quervain's"]
};
const FB = [
  { name: "Gentle Range of Motion", vid: "2MJGg-dUKh0", dur: 60, reps: "10 reps", desc: "Slow movement through pain-free range. Safe for any injury.", syms: ["General stiffness"], g: { j: "sp", mn: -5, mx: 15, sp: 0.4, tl: 18 } },
  { name: "Deep Breathing", vid: "0Ua9bOsZTYg", dur: 60, reps: "10 deep breaths", desc: "Diaphragmatic breathing for pain management and relaxation.", syms: ["Pain management"], g: { j: "sp", mn: -3, mx: 10, sp: 0.3, tl: 18 } }
];

/* helper used by all pages */
function getExs(cause) { return DB[cause] || FB; }
