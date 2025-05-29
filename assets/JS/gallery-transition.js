const track = document.querySelector('.gallery-track');
const items = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex = 0;

function updateGallery() {
    const half = Math.floor(items.length / 2);
    const reorderedItems = [
        ...items.slice(currentIndex, items.length),
        ...items.slice(0, currentIndex)
    ];

    track.innerHTML = '';
    reorderedItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === half) {
            item.classList.add('active');
        }
        track.appendChild(item);
    });

    const trackRect = track.getBoundingClientRect();
    const activeItemRect = reorderedItems[half].getBoundingClientRect();
    const offset = (trackRect.width / 2) - (activeItemRect.width / 2) - (activeItemRect.left - trackRect.left);

    track.style.transform = `translateX(${offset}px)`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    updateGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateGallery();
}

document.querySelector('.gallery-control.next').addEventListener('click', nextImage);
document.querySelector('.gallery-control.prev').addEventListener('click', prevImage);

updateGallery();
