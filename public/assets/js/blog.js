
const params = new URLSearchParams(window.location.search);
const user_token = params.get("token");

let updatedId=0;
function fetchBlogs() {

    fetch("http://localhost:3001/api/blogs/by_token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
        })
        .then((res) => res.json())
        .then((blogs) => {
            const blogsContainerDiv = document.getElementById("blog-container");
            blogs.forEach((blog) => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <h3 class="card-title">${blog.title}</h3>
                    <p class="card-content">${blog.content}</p>
                    <small class="card-meta">Created on ${new Date(blog.createdOn).toLocaleString()}</small>
                    <div class="card-actions">
                        <button onClick="deleteBlog(${blog.id})">Delete</button>
                        <button onClick="openEditBlogPanel(${blog.id},'${blog.title}','${blog.content}')">Edit</button>
                    </div>
                `;
                blogsContainerDiv.appendChild(div);
            });
        });
}

function deleteBlog(blog_id) {
    fetch(`http://localhost:3001/api/blogs/${blog_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
        })
        .then((res) => res.json())
        .then(() => {
            alert("Blog deleted successfully");
            location.reload();
        });
}


function createBlog() {
    const title = document.getElementById("create-title").value;
    const content = document.getElementById("create-content").value;
    fetch("http://localhost:3001/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            body: JSON.stringify({
                title,
                content
            }),
        })
        .then((res) => res.json())
        .then(() => {
            alert("Blog created successfully");
            location.reload();
        
          });

}


function editBlog() {
    const title = document.getElementById("create-title").value;
    const content = document.getElementById("create-content").value;
    fetch(`http://localhost:3001/api/blogs/${updatedId}`, {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            body: JSON.stringify({
                title,
                content
            }),
        })
        .then((res) => res.json())
        .then(() => {
            alert("Blog Updated successfully");
            location.reload();
        
          });
}


function openCreateBlogPanel(){
    document.getElementById("create-new-blog-button").classList.add("hidden");
    document.getElementById("create-button").classList.remove("hidden");
    document.getElementById("create-blog-panel").classList.remove("hidden");
}

function openEditBlogPanel(blogId,blogTitle,blogContent){
    document.getElementById("create-new-blog-button").classList.add("hidden");
    document.getElementById("create-blog-panel").classList.remove("hidden");
    document.getElementById("edit-button").classList.remove("hidden");
    document.getElementById("create-title").value = blogTitle;
    document.getElementById("create-content").value = blogContent;
    updatedId = blogId;
}

function logout() {
    debugger
    fetch("http://localhost:3001/api/users/logout", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${user_token}`
        },
    }).then(() => {
       window.location.href = `./login.html`
    });
}

fetchBlogs()