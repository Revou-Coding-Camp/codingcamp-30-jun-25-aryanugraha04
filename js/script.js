document.addEventListener('DOMContentLoaded', function() {

  // --- Page Navigation ---
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  // Function to handle navigation clicks
  function handleNavClick(event) {
      event.preventDefault();
      const navLink = event.currentTarget;
      const targetId = navLink.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      // Determine which main page to show. 'message-us' is on the 'home' page.
      let pageIdToShow = targetId;
      if (targetId === 'message-us') {
          pageIdToShow = 'home';
      }

      // Show the correct page and hide others.
      pages.forEach(page => {
          page.classList.toggle('active', page.id === pageIdToShow);
      });

      // Update the active class on the navigation links.
      navLinks.forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');

      // Scroll to the target element if it exists.
      if (targetElement) {
          // Use smooth scroll for better user experience.
          targetElement.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile menu after a link is clicked.
      if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.toggle('active');
      }
  }

  navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
  });

  // --- Mobile Menu Toggle ---
  navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
  });


  // --- Welcome Message ---
  function setWelcomeName() {
      const userName = prompt("Please enter your name:", "Guest");
      const welcomeText = document.getElementById('welcome-text');
      if (userName) {
          welcomeText.textContent = `Hi ${userName}, Welcome To Website`;
      }
  }
  setWelcomeName();


  // --- Form Validation and Submission ---
  const contactForm = document.getElementById('contact-form');
  const currentTimeSpan = document.getElementById('current-time');

  // Function to set current time
  function setCurrentTime() {
      const now = new Date();
      currentTimeSpan.textContent = now.toLocaleString('en-GB', { timeZone: 'UTC' });
  }
  setCurrentTime();
  setInterval(setCurrentTime, 1000); // Update time every second

  contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      // Get form values
      const name = document.getElementById('name').value.trim();
      const dob = document.getElementById('dob').value;
      const gender = document.querySelector('input[name="gender"]:checked');
      const message = document.getElementById('message').value.trim();

      // Simple Validation
      if (!name || !dob || !gender || !message) {
          alert('Please fill out all fields.');
          return;
      }

      // Display submitted values
      document.getElementById('output-name').textContent = name;
      document.getElementById('output-dob').textContent = dob;
      document.getElementById('output-gender').textContent = gender.value;
      document.getElementById('output-message').textContent = message;

      // Optionally, reset the form
      contactForm.reset();
  });

  // --- Set initial page based on hash or default to home ---
  const initialHash = window.location.hash;
  const targetLink = document.querySelector(`.nav-link[href="${initialHash || '#home'}"]`);
  if (targetLink) {
      targetLink.click();
  }
});