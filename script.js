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
      searchQuery: "",
    };
  },
  async created() {
    await this.loadRecipes();
    this.navigateToHash();
    window.addEventListener("hashchange", () => this.navigateToHash());
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
    slugify(text) {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    },
    navigateToHash() {
      const hash = window.location.hash.slice(1);
      if (!hash || hash === "/") {
        this.homeNoHash();
        return;
      }
      const parts = hash.split("/").filter(Boolean);
      if (parts[0] === "category" && parts[1]) {
        const slug = parts[1];
        const index = this.categories.findIndex(
          (c) => this.slugify(c.name) === slug
        );
        if (index !== -1) {
          this.toggleNoHash(this.categories[index], index);
          return;
        }
      }
      if (parts[0] === "recipe" && parts[1]) {
        const slug = parts[1];
        const recipe = this.original.find(
          (r) => this.slugify(r.title) === slug
        );
        if (recipe) {
          this.showRecipeNoHash(recipe);
          return;
        }
      }
      if (parts[0] === "search" && parts[1]) {
        const query = decodeURIComponent(parts[1]);
        this.searchQuery = query;
        this.searchNoHash();
        return;
      }
      this.homeNoHash();
    },
    selectCategory(cat) {
      this.current = "category";
      this.recipes = this.original.filter((o) => o.category === cat);
    },
    toggleNoHash(cat, index) {
      if (this.activeCategory != null) {
        this.categories[this.activeCategory].toggle = null;
      }
      cat.toggle = index;
      this.activeCategory = index;
      this.selectCategory(cat.name);
    },
    toggle(cat, index) {
      this.toggleNoHash(cat, index);
      window.location.hash = "#/category/" + this.slugify(cat.name);
    },
    homeNoHash() {
      this.current = "home";
      if (this.activeCategory != null) {
        this.categories[this.activeCategory].toggle = null;
        this.activeCategory = null;
      }
    },
    home() {
      this.homeNoHash();
      window.location.hash = "#/";
    },
    showRecipeNoHash(recipe) {
      this.current = "recipe";
      this.rcategory = recipe.category;
      this.rtitle = recipe.title;
      this.rimage = recipe.image;
      this.rnotes = recipe.notes;
      this.ringredients = recipe.ingredients;
      this.rinstructions = recipe.instructions;
    },
    showRecipe(recipe) {
      this.showRecipeNoHash(recipe);
      window.location.hash = "#/recipe/" + this.slugify(recipe.title);
    },
    searchNoHash() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) {
        this.homeNoHash();
        return;
      }
      if (this.activeCategory != null) {
        this.categories[this.activeCategory].toggle = null;
        this.activeCategory = null;
      }
      this.recipes = this.original.filter((r) => {
        if (r.title.toLowerCase().includes(q)) return true;
        if (r.ingredients && r.ingredients.some((ing) => ing.toLowerCase().includes(q))) return true;
        return false;
      });
      this.current = "search";
    },
    search() {
      this.searchNoHash();
      if (this.searchQuery.trim()) {
        window.location.hash = "#/search/" + encodeURIComponent(this.searchQuery.trim());
      }
    }
  }
}).mount("#app");
