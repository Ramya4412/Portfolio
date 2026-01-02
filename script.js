/* TYPING EFFECT */
const text = [
    "Full Stack Developer",
    "Java & Python Enthusiast",
    "Building Modern Web Apps"
];

let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeEffect() {
    if (charIndex < text[index].length) {
        typingElement.textContent += text[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingElement.textContent = text[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        index = (index + 1) % text.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();

/* SKILL PROGRESS ANIMATION */
window.addEventListener("load", () => {
    document.querySelectorAll(".progress").forEach(bar => {
        bar.style.width = bar.dataset.progress + "%";
    });

    loadUsers();
});

/* BACKEND INTEGRATION */
const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

// ✅ Render backend URL
const API_BASE_URL = "https://portfolio-ramya.onrender.com";


if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, message })
        })
        .then(res => res.json())
        .then(data => {
            console.log("User submitted:", data);
            alert("Message sent successfully!");
            loadUsers();
        })
        .catch(err => console.error(err));

        form.reset();
    });
}

function loadUsers() {
    fetch(`${API_BASE_URL}/api/users`)
        .then(res => res.json())
        .then(users => {
            if (!userList) return;
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.email}`;
                userList.appendChild(li);
            });
        })
        .catch(err => console.error(err));
}
