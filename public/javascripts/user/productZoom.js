const imageContainer = document.querySelector('.card');
const zoomContainer = document.querySelector('.product-image-zoom');
const zoomContainerWidth = zoomContainer.offsetWidth;
const zoomContainerHeight = zoomContainer.offsetHeight;

imageContainer.addEventListener('mousemove', (event) => {
  const { left, top, width, height } = imageContainer.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  const centerX = width / 2;
  const centerY = height / 2;
  const scaleX = zoomContainerWidth / width;
  const scaleY = zoomContainerHeight / height;
  const offsetX = (zoomContainerWidth / 2) - x * scaleX;
  const offsetY = (zoomContainerHeight / 2) - y * scaleY;
  const invertX = x > centerX ? -1 : 1;
  const invertY = y > centerY ? -1 : 1;
  const zoomFactor = 1.6; 

  zoomContainer.style.display = 'block';
  zoomContainer.style.backgroundImage = `url(${event.target.src})`;
  zoomContainer.style.backgroundPosition = `${invertX * (x - centerX)}px ${invertY * (y - centerY)}px`;
  zoomContainer.style.backgroundSize = `${width * zoomFactor}px ${height * zoomFactor}px`;
  zoomContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  zoomContainer.style.top = `${top - zoomContainerHeight - 10}px`;
  zoomContainer.style.left = `${left + width / 2 - zoomContainerWidth / 2}px`;
});

imageContainer.addEventListener('mouseleave', () => {
  zoomContainer.style.display = 'none';
});
