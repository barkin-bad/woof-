const voidCursor = document.getElementById('voidCursor');

let visible = false;

window.addEventListener('mousemove', (e) => {
    voidCursor.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    if (!visible) {
        visible = true;
        voidCursor.classList.add('visible');
    }
});

document.addEventListener('mouseleave', () => {
    visible = false;
    voidCursor.classList.remove('visible');
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button')) voidCursor.classList.add('hover');
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button')) voidCursor.classList.remove('hover');
});
