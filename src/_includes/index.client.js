var theme = 'light';
var toggleSwitch = document.querySelector('.theme-switch');

function updateTheme() {
  document.documentElement.setAttribute('data-theme', theme);
  toggleSwitch.innerHTML =
    'Switch to ' + (theme == 'light' ? 'dark' : 'light') + ' theme';
}

function detectTheme() {
  //local storage is used to override OS theme settings
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') == 'dark') {
      theme = 'dark';
    }
  } else if (!window.matchMedia) {
    //matchMedia method not supported
    return false;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //OS theme setting detected as dark
    theme = 'dark';
  }

  updateTheme();
}

function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateTheme();
}

toggleSwitch.addEventListener('click', toggleTheme, false);
detectTheme();

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
