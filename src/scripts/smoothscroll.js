function SmoothScroll(blockID) {
  const regex = /(\/?#?)/;
  const id = blockID.replace(regex, '');

  const destination = document.getElementById(id);

  if (destination) {
    destination.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  } else window.open(blockID, '_self');
}

const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const blockID = anchor.getAttribute('href');

    SmoothScroll(blockID);
  });
});
