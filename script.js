Vue.createApp({
    data() {
        return {
            recipes: [
                {
                    title: "Avocado Toast",
                    image: "images/temp1.jpeg",
                },
                {
                    title: "Chocolate Chip Pancakes",
                    image: "images/temp2.png",
                },
                {
                    title: "Avocado Toast",
                    image: "images/temp3.jpeg",
                },
                {
                    title: "Avocado Toast",
                    image: "images/temp3.jpeg",
                },
            ],
            categories: [
                {
                    name: "Entrées",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Appetizers",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Breakfast",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Desserts",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Soup & Sauces",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Crockpot",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Drinks",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
                {
                    name: "Miscellaneous",
                    image: "category_images/placeholder.png",
                    toggle: null,
                },
            ],
        };
    }
}).mount("#app");

let darkModeFlag = false; // false = light mode, true = dark mode

function toggleDarkMode() {
    var element = document.body;
    if (darkModeFlag) { // if currently is dark mode, switch to light mode
        element.classList.remove("dark-mode");
        darkModeFlag = false;
    }
    else { // if currently is light mode, switch to dark mode
        element.classList.add("dark-mode");
        darkModeFlag = true;
    }
}