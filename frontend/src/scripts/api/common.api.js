const applyLoadingStrip = () => {
  let loadingStrip = document.querySelector('.loading-strip');
  loadingStrip.style.animation = 'strip-progress .8s';
  setTimeout(() => loadingStrip.style.animation = '', 800);
};

const setUserServiceHeigth = () => {
  let userServiceComponent = document.querySelectorAll('.container-user-page');
  let headerVK = document.querySelector('.header-vk').offsetHeight;
  let userPageHeigth = document.documentElement.clientHeight - headerVK - 25 + 'px';
  userServiceComponent.forEach((item) => {
    item.style.height = userPageHeigth;
  });
};

const setUserActionComponentHeigth = () => {
  let userActionComponent = document.querySelector('.container-user-action');
  let headerVK = document.querySelector('.header-vk').offsetHeight;
  let userPageHeigth = document.documentElement.clientHeight - headerVK - 25 + 'px';
  userActionComponent.style.height = userPageHeigth;
};

const setChatArticleHeight = () => {
  let articleChat = document.querySelector('.article-chat');
  let articleChatData = document.querySelector('.article-chat-data').offsetHeight;
  let articleChatTools = document.querySelector('.article-chat-tools').offsetHeight;
  let userActionComponent = document.querySelector('.container-user-action').offsetHeight;
  articleChat.style.height = userActionComponent - articleChatData - articleChatTools + 'px';
};

const cleareCreateChatFields = () => {
  document.querySelector('.input-create-chat-name').value = '';
  document.querySelector('.input-create-chat-url').value = '';
};

const showEmptyFields = (name, url) => {
  let inputName = document.querySelector('.input-create-chat-name');
  let inputURL = document.querySelector('.input-create-chat-url');
  let inputsCreateChat = document.querySelectorAll('.input-create-chat');
  if(name.length === 0 && url.length === 0) {
    inputsCreateChat.forEach(item => item.classList.add('empty-fields'));
  }
  else if(name.length === 0){
    inputName.classList.add('empty-fields');
  }
  else {
    inputURL.classList.add('empty-fields');
  }
};

const scrollDown = () => {
  let chatContainer = document.querySelector('.article-chat');
  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 100);
};

export {
  applyLoadingStrip,
  setUserServiceHeigth,
  setUserActionComponentHeigth,
  setChatArticleHeight,
  showEmptyFields,
  cleareCreateChatFields,
  scrollDown
}