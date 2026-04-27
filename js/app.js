/* ---------- LOGIN CHECK ---------- */
function requireLogin() {
  const u = JSON.parse(localStorage.getItem('pu') || 'null');
  if (!u) {
    window.location.href = '/pages/login.html';
    return null;
  }
  return u;
}

/* ---------- SIGNUP ---------- */
async function signupUser() {
  const data = {
    username: document.getElementById("un").value,
    email: document.getElementById("em").value,
    password: document.getElementById("pw").value,
    first_name: document.getElementById("fn").value,
    last_name: document.getElementById("ln").value,
    phone: document.getElementById("ph").value
  };

  const res = await fetch("/api/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (res.ok) {
    alert("Signup successful ✅");
    window.location.href = "/pages/login.html";
  } else {
    alert(result.error);
  }
}

/* ---------- LOGIN ---------- */
async function loginUser() {
  const identifier = document.getElementById("li-id").value;
  const password = document.getElementById("li-pw").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ identifier, password })
  });

  const user = await res.json();

  if (res.ok) {
    localStorage.setItem("pu", JSON.stringify(user));
    alert("Login successful ✅");
    window.location.href = "/pages/dashboard.html";
  } else {
    alert(user.error);
  }
}

/* ---------- SAVE PROFILE ---------- */
async function saveProfile() {
  const user = JSON.parse(localStorage.getItem("pu"));

  if (!user) {
    alert("Login first");
    return;
  }

  const data = {
    user_id: user.id,
    age: document.getElementById("pr-age").value,
    weight_kg: document.getElementById("pr-wt").value,
    injury_area: document.getElementById("pr-inj").value,
    cause: document.getElementById("pr-caus").value,
    difficulty: "Easy"
  };

  const res = await fetch("/api/profile", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (res.ok) {
    alert("Profile saved ✅");
  } else {
    alert(result.error);
  }
}

/* ---------- TOAST ---------- */
function showToast(msg) {
  alert(msg);
}