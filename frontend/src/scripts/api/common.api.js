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

export {
  applyLoadingStrip,
  setUserServiceHeigth,
  setUserActionComponentHeigth
}