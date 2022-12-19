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
                    image: "category_images/green_chicken.jpg",
                    toggle: null,
                },
                {
                    name: "Appetizers",
                    image: "category_images/garlic_rosemary.jpg",
                    toggle: null,
                },
                {
                    name: "Breakfast",
                    image: "category_images/breakfast_bowl.png",
                    toggle: null,
                },
                {
                    name: "Desserts",
                    image: "category_images/oreo_cookies.jpg",
                    toggle: null,
                },
                {
                    name: "Soup & Sauces",
                    image: "category_images/broccoli_fennel_soup.jpg",
                    toggle: null,
                },
                {
                    name: "Crockpot",
                    image: "category_images/meatloaf.jpg",
                    toggle: null,
                },
                {
                    name: "Drinks",
                    image: "category_images/mango_mint.jpg",
                    toggle: null,
                },
                {
                    name: "Miscellaneous",
                    image: "category_images/paleo_bread.jpg",
                    toggle: null,
                },
            ],
        };
    }
}).mount("#app");

let darkModeFlag = false; // false = light mode, true = dark mode

function toggleDarkMode() {
    let root = document.documentElement;
    if (darkModeFlag) { // if currently is dark mode, switch to light mode
        root.style.setProperty(); // TODO: do this a bunch of times
        darkModeFlag = false;
    }
    else { // if currently is light mode, switch to dark mode
        root.style.setProperty();
        darkModeFlag = true;
    }
}
