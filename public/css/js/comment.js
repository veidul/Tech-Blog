const newFormHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#comment-body').value.trim();
  
    if (body) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({body}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
//   gonna need to change something in here

      if (response.ok) {
        document.location.replace('/comment');
      } else {
        alert('Failed to create comment');
      }
    }
  };

  const updButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'UPDATE',
      });
  
      if (response.ok) {
        document.location.replace('/comment');
      } else {
        alert('Failed to UPDATE comment');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/comment');
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
  