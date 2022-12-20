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
      original: [],
      recipes: [],
      darkmode: false,
      setup: false,
      current: "home",
    };
  },
    methods: {
        selectCategory(cat) {
            if (!this.setup) {
                this.current = "category";
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
            this.recipes = [];
            this.recipes = this.original.filter((o) => o.category === cat);
            console.log(this.recipes);
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
        }     
    }
}).mount("#app");
