document.addEventListener('DOMContentLoaded', function() {
  function checkDropdownAndScreenSize() {
      console.log('Checking dropdown and screen size');

      var dropdown = document.querySelector('.dropdown-toggle');
      var isDropdownOpen = dropdown && dropdown.classList.contains('show');
      console.log('Dropdown open:', isDropdownOpen);

      var isScreenSmall = window.matchMedia('(max-width: 991px)').matches;
      console.log('Screen small:', isScreenSmall);

      var container = document.querySelector('.container-fluid');

      if (isDropdownOpen && isScreenSmall) {
          if (container) {
              container.classList.add('dropdown-open');
              console.log('Padding applied to container');
          }
      } else {
          if (container) {
              container.classList.remove('dropdown-open');
              console.log('Padding removed from container');
          }
      }
  }

  function debounce(func, wait) {
      let timeout;
      return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
      };
  }

  const debouncedCheck = debounce(checkDropdownAndScreenSize, 200);

  checkDropdownAndScreenSize();

  window.addEventListener('resize', debouncedCheck);
  window.addEventListener('orientationchange', debouncedCheck);

  document.addEventListener('click', function(event) {
      if (event.target.matches('.dropdown-toggle')) {
          setTimeout(debouncedCheck, 0);
      }
  });
});
