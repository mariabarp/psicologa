const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

const slug = getQueryParam('slug');
const postImage = document.getElementById('post-image');
const postDate = document.getElementById('post-date');
const postTitle = document.getElementById('post-title');
const postText = document.getElementById('post-text');

fetch('assets/blog-db.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erro ao carregar posts.');
    }
    return response.json();
  })
  .then((posts) => {
    const post = posts.find((item) => item.slug === slug);
    if (!post) {
      postTitle.textContent = 'Post não encontrado';
      postText.textContent = 'O post solicitado não foi encontrado. Volte ao blog para ver os outros conteúdos.';
      return;
    }

    postImage.src = post.image || 'assets/capa1.png';
    postImage.alt = post.title;
    postDate.textContent = new Date(post.date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    postTitle.textContent = post.title;
    postText.innerHTML = post.text.replace(/\n\n/g, '<br><br>');
  })
  .catch(() => {
    postTitle.textContent = 'Erro ao carregar o post';
    postText.textContent = 'Não foi possível carregar o conteúdo do post. Tente novamente mais tarde.';
  });

document.getElementById('year').textContent = new Date().getFullYear();
