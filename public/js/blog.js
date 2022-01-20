const newFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#blog-title").value.trim();
  const body = document.querySelector("#blog-body").value.trim();
  if (title && body) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to create blog");
    }
  }
};
// need to fix update logic here

const updButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const title = document.querySelector("#blog-title").value.trim();
    const body = document.querySelector("#blog-body").value.trim();
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, body, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to UPDATE blog");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to delete blog");
    }
  }
};

document
  .querySelector(".new-blog-form")
  ?.addEventListener("submit", newFormHandler);
document
  .querySelector(".upd-blog-form")
  ?.addEventListener("submit", updButtonHandler);
document
  .querySelectorAll(".blog-delete")
  .forEach((elements) => elements?.addEventListener("click", delButtonHandler));
