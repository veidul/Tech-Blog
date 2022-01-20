const newCommentFormHandler = async (event) => {
  event.preventDefault();
  const body = document.querySelector("#comment-body").value.trim();

  if (body) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ body, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //   gonna need to change something in here

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to create comment");
    }
  }
};

const updCommentButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const body = document.querySelector("#comment-body").value.trim();
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ body, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to UPDATE comment");
    }
  }
};

const delCommentButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  ?.addEventListener("submit", newCommentFormHandler);

document
  .querySelectorAll(".comment-delete")
  .forEach((elements) =>
    elements?.addEventListener("click", delCommentButtonHandler)
  );

// $(".comment-delete").on('click', delCommentButtonHandler)

document
  .querySelector(".upd-comment-form")
  ?.addEventListener("submit", updCommentButtonHandler);
