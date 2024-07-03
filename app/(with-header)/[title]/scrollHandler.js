// scrollHandler.js
export function handleScroll() {
    const cardElements = document.querySelectorAll(".fixed-card");

    cardElements.forEach(cardElement => {
        if (cardElement) {
            const scrollTop = window.scrollY;
            const viewportHeight = window.innerHeight;
            const contentHeight = document.body.clientHeight;
            const cardHeight = cardElement.offsetHeight;

            if (scrollTop > contentHeight - viewportHeight - cardHeight) {
                cardElement.style.transform = `translateY(-${viewportHeight - cardHeight}px)`;
                cardElement.style.position = "fixed";
            } else {
                cardElement.style.position = "static";
                cardElement.style.transform = "translateY(0)";
            }
        }
    });
}

export function initScrollListener(container) {
    if (container) {
        container.addEventListener("scroll", handleScroll);
    }
}

export function removeScrollListener(container) {
    if (container) {
        container.removeEventListener("scroll", handleScroll);
    }
}
