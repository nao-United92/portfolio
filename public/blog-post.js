document.addEventListener('DOMContentLoaded', () => {
  const blogPostContainer = document.getElementById('blog-post-container');
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'), 10);

  // Find the blog post with the matching ID
  const post = blogPosts.find((p) => p.id === postId);

  if (post) {
    // Set the document title
    document.title = `${post.title} ~ Naoya Yamasaki Portfolio`;

    // Create the blog post content
    const postContent = `
      <h1 class="text-4xl font-bold mb-4">${post.title}</h1>
      <p class="text-gray-400 mb-8">${post.date}</p>
      ${
        post.thumbnailUrl
          ? `<img src="${post.thumbnailUrl}" alt="${post.title}" class="w-full h-auto rounded-lg mb-8">`
          : ''
      }
      <div class="prose prose-invert max-w-none">
        ${marked.marked(post.content)}
      </div>
      <a href="blog.html" class="inline-flex items-center justify-center w-10 h-10 mt-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors" aria-label="Back to Blog">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
    `;

    blogPostContainer.innerHTML = postContent;
  } else {
    blogPostContainer.innerHTML = '<p>Post not found.</p>';
  }
});
