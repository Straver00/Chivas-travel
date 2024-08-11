window.addEventListener('scroll', function() {
    const textElement = document.getElementById('scroll-text');
    const scrollPosition = window.scrollY;
  
    // Example: Change color based on scroll position
    if (scrollPosition > 100) {
      textElement.style.color = '#ffaa55'; // Change to the new color
    } else {
      textElement.style.color = '#ffffff'; // Revert to the original color
    }
  });
  