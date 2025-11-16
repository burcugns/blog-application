
function openSignupForm() {
    if (document.getElementById("login-signup-a").innerText == "Sign Up") {
        document.getElementById("username-label").classList.remove("hidden");
        document.getElementById("username").classList.remove("hidden");
        document.getElementById("login-button").classList.add("hidden");
        document.getElementById("signup-button").classList.remove("hidden");
        document.getElementById("login-signup-a").innerText = "Log In";
    }
    else{
        document.getElementById("username-label").classList.add("hidden");
        document.getElementById("username").classList.add("hidden");
        document.getElementById("login-button").classList.remove("hidden");
        document.getElementById("signup-button").classList.add("hidden");
        document.getElementById("login-signup-a").innerText = "Sign Up";
    }
}

function register() {
    debugger
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    fetch("http://localhost:3001/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.errors) {
                alert(data.errors[0].message);
            } else {
                alert("User registered successfully");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function login() {
    debugger
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    fetch("http://localhost:3001/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("authToken", data.token);
                token = data.token;
            window.location.href = `./blog.html?token=${data.token}`

          
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}




