function getPost() {
    let postId = document.getElementById("postId").value;
    if (postId >= 1 && postId <= 100) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Пост не знайдено.");
                }
                return response.json();
            })
            .then(data => {
                let post = `
						<h2>${data.title}</h2>
						<p>${data.body}</p>
						<button onclick="getComments(${data.id})">Коментарі</button>
					`;
                document.getElementById("post").innerHTML = post;
            })
            .catch(error => {
                document.getElementById("post").innerHTML = `<p>${error.message}</p>`;
                document.getElementById("comments").innerHTML = "";
            });
    } else {
        document.getElementById("post").innerHTML = "";
        document.getElementById("comments").innerHTML = "";
        alert("Помилка. Спробуйте ще раз!");
    }
}

function getComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Коментарі не знайдено.");
            }
            return response.json();
        })
        .then(data => {
            let comments = "<h3>Коментарі:</h3>";
            data.forEach(comment => {
                comments += `
						<div>
							<h4>${comment.name}</h4>
							<p>${comment.body}</p>
						</div>
					`;
            });
            document.getElementById("comments").innerHTML = comments;
        })
        .catch(error => {
            document.getElementById("comments").innerHTML = `<p>${error.message}</p>`;
        });
}