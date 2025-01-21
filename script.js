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
      activeCategory: null,
      current: "home",
      rcategory: null,
      rtitle: null,
      rimage: null,
      rnotes: null,
      ringredients: null,
      rinstructions: null,
      select: "",
    };
  },
  async created() {
    void this.loadRecipes();
  },
  methods: {
    async loadRecipes() {
      try {
        const res = await fetch("./recipes.json");
        const data = await res.json();
        this.original = data.recipes;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
    selectCategory(cat) {
      this.current = "category";
      this.recipes = this.original.filter((o) => o.category === cat);
    },
    toggle(cat, index) {
      if (this.activeCategory != null) {
        this.categories[this.activeCategory].toggle = null;
      }
      cat.toggle = index;
      this.activeCategory = index;
      this.selectCategory(cat.name);
    },
    home() {
      this.current = "home";
      if (this.activeCategory != null) {
        this.categories[this.activeCategory].toggle = null;
        this.activeCategory = null;
      }
    },
    showRecipe(recipe) {
      this.current = "recipe";
      this.rcategory = recipe.category;
      this.rtitle = recipe.title;
      this.rimage = recipe.image;
      this.rnotes = recipe.notes;
      this.ringredients = recipe.ingredients;
      this.rinstructions = recipe.instructions;
    }
  }
}).mount("#app");
