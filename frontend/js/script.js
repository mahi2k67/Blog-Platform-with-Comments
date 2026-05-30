const API = "http://localhost:5000/api";

async function register() {

    const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const data = await response.json();

    alert(data.message);
}

async function login() {

    const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const data = await response.json();

    localStorage.setItem("token", data.token);

    alert("Login Successful");
}

async function createPost() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        })
    });

    const data = await response.json();

    alert("Post Created");
}

async function getPosts() {

    const response = await fetch(`${API}/posts`);

    const posts = await response.json();

    let output = "";

    posts.forEach(post => {
        output += `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <hr>
        `;
    });

    document.getElementById("posts").innerHTML = output;
}