

document.addEventListener("DOMContentLoaded", function () {
    const cityButtons = document.querySelectorAll(".city-btn");
    const communityCards = document.querySelectorAll(".community-card");

    cityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCity = button.getAttribute("data-city");

            // Update button styles
            cityButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Show/hide community cards
            communityCards.forEach(card => {
                card.style.display =
                    selectedCity === "all" || card.getAttribute("data-city") === selectedCity
                        ? "block"
                        : "none";
            });
        });
    });
});

