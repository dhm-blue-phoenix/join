document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    navInit();
  }, 1000);
});

function navInit() {
  const lastActiveBtn = localStorage.getItem('activeNavBtn');
  setActiveButton(lastActiveBtn);
  loadBtns();
};

const setActiveButton = (id) => {
  document.getElementById(id)?.classList.add('active');
};

const loadBtns = () => {
  loadBtnsForProfile();
  loadBtnsForNavBar();
};

const loadBtnsForProfile = () => {
  const btns = document.querySelectorAll('.profile-btns');
  btns.forEach((btn) => {
    const element = document.getElementById(btn.getAttribute('id'));
    element.removeEventListener('click', () => profileEventHandler);
    element.addEventListener('click', (event) => { profileEventHandler(event) });
  });
};

const loadBtnsForNavBar = () => {
  const btns = document.querySelectorAll('.navBar-btns');
  btns.forEach((btn) => {
    const element = document.getElementById(btn.getAttribute('id'));
    element.removeEventListener('click', () => navEventHandler);
    element.addEventListener('click', (event) => { navEventHandler(event) });
  });
};

const profileEventHandler = (event) => {
  const btn = event.currentTarget;
  const btnHref = btn.getAttribute('data-href');
  const btnId = btn.getAttribute('data-id');
  loadNextPage(btnId, btnHref);
};

const navEventHandler = (event) => {
  const btn = event.currentTarget;
  const btnHref = btn.getAttribute('data-href');
  loadNextPage(btn.id, btnHref);
};

const loadNextPage = (btnId, page) => {
  removeLastActiveBtn();
  setActiveButton(btnId);
  const lastActiveBtn = localStorage.getItem('activeNavBtn');
  localStorage.setItem('lastActiveNavBtn', lastActiveBtn);
  localStorage.setItem('activeNavBtn', btnId);
  window.location.href = page;
};

const removeLastActiveBtn = () => {
  const lastActiveBtn = localStorage.getItem('activeNavBtn');
  document.getElementById(lastActiveBtn)?.classList.remove('active');
};

function backToPreviousPage() {
  const lastActiveBtn = localStorage.getItem('lastActiveNavBtn');
  const btns = document.querySelectorAll('.navBar-btns');
  btns.forEach(btn => {
    if (btn.id === lastActiveBtn) {
      const path = btn.getAttribute('data-href');
      loadNextPage(lastActiveBtn, path);
    };
  });
};