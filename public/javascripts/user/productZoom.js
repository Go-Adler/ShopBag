const imageContainer = document.querySelector('.card');
const zoomContainer = document.querySelector('.product-image-zoom');

imageContainer.addEventListener('mousemove', (event) => {
  const { left, top, width, height } = imageContainer.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  const scaleX = zoomContainer.offsetWidth / width;
  const scaleY = zoomContainer.offsetHeight / height;
  const offsetX = (zoomContainer.offsetWidth / 2) - x * scaleX;
  const offsetY = (zoomContainer.offsetHeight / 2) - y * scaleY;

  zoomContainer.style.display = 'block';
  zoomContainer.style.backgroundImage = `url(${event.target.src})`;
  zoomContainer.style.backgroundPosition = `${x}px ${y}px`;
  zoomContainer.style.backgroundSize = `${width}px ${height}px`;
  zoomContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

imageContainer.addEventListener('mouseleave', () => {
  zoomContainer.style.display = 'none';
});
