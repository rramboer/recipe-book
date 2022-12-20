Vue.createApp({
    data() {
        return {
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
                    image: "category_images/blueberry_muffin.png",
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
                    image: "category_images/steak_chili.png",
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
            original: [],
            recipes: [],
            darkmode: false,
            setup: false,
            current: "home",
        };
    },
    methods: {
        selectCategory(cat) {
            this.current = "category";
            this.current = "category";
            if (!this.setup) {
                fetch("./recipes.json")
                    .then((res) => res.json())
                    .then((res) => {
                        this.original = res.recipes;
                        this.recipes = this.original.filter(
                            (o) => o.category === cat
                        );
                        this.setup = true;
                    });
            }
            else {
                this.recipes = [];
                this.recipes = this.original.filter((o) => o.category === cat);
            }
        },
        toggle(cat, index) {
            if (this.active != null) {
                this.categories[this.active].toggle = null;
            }
            cat.toggle = index;
            this.selectCategory(cat.name);
            this.active = index;
        },
        darkMode() {
            if ($("body").hasClass("dark")) {
                $("body").removeClass("dark");
                $(".dark").css("color", "black");
                this.darkmode = false;
            } else {
                $("body").addClass("dark");
                $(".dark").css("color", "white");
                this.darkmode = true;
            }
        },
        home() {
            this.current = "home";
            this.categories[this.active].toggle = null;
            this.categories[this.active].toggle = null;
        }
    }
}).mount("#app");
