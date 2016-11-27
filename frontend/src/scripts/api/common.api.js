const applyLoadingStrip = () => {
  let loadingStrip = document.querySelector('.loading-strip');
  loadingStrip.style.animation = 'strip-progress .8s';
  setTimeout(() => loadingStrip.style.animation = '', 800);
};

export {
  applyLoadingStrip
}