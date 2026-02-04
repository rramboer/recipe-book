Vue.createApp({
  data() {
    return {
      categories: [
        { name: "Entrées", image: "images/category_images/green_chicken.jpg", toggle: null },
        { name: "Appetizers", image: "images/category_images/garlic_rosemary.jpg", toggle: null },
        { name: "Breakfast", image: "images/category_images/blueberry_muffin.png", toggle: null },
        { name: "Desserts", image: "images/category_images/oreo_cookies.jpg", toggle: null },
        { name: "Soup & Sauces", image: "images/category_images/broccoli_fennel_soup.jpg", toggle: null },
        { name: "Crockpot", image: "images/category_images/steak_chili.png", toggle: null },
        { name: "Drinks", image: "images/category_images/mango_mint.jpg", toggle: null },
        { name: "Miscellaneous", image: "images/category_images/paleo_bread.jpg", toggle: null },
      ],
      original: [],
      recipes: [],
      activeCategory: null,
      current: "home",
      rtitle: null,
      rimage: null,
      rnotes: null,
      ringredients: null,
      rinstructions: null,
      searchQuery: "",
      showSearch: false,
      showSettings: false,
      theme: "system",
      textSize: 16,
      compactCards: false,
      viewMode: "card",
      accentColor: "blue",
      scrolled: false,
      interactiveMode: false,
      hidePrintButton: false,
      hideShareButton: false,
      checkedIngredients: [],
      checkedSteps: [],
      hasInternalNav: false,
    };
  },
  async created() {
    this.loadSettings();
    this.applyTheme();
    this.applyTextSize();
    this.applyAccentColor();
    this._mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this._mediaQuery.addEventListener("change", () => {
      if (this.theme === "system") {
        this.applyTheme();
        this.applyAccentColor();
      }
    });
    await this.loadRecipes();
    this.navigateToHash();
    window.addEventListener("hashchange", () => this.navigateToHash());
  },
  mounted() {
    lucide.createIcons();
    this._onScroll = () => { this.scrolled = window.scrollY > 40; };
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._measureHeader = () => {
      const h = document.querySelector(".site-header");
      if (h) document.documentElement.style.setProperty("--header-h", h.offsetHeight + "px");
    };
    this._measureHeader();
    window.addEventListener("resize", this._measureHeader, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._measureHeader);
  },
  updated() {
    lucide.createIcons();
  },
  methods: {
    // ---- Settings ----
    loadSettings() {
      try {
        const saved = localStorage.getItem("hfl-settings");
        if (!saved) return;
        const s = JSON.parse(saved);
        if (s.theme) this.theme = s.theme;
        if (s.textSize) this.textSize = s.textSize;
        if (s.compactCards !== undefined) this.compactCards = s.compactCards;
        if (s.viewMode) this.viewMode = s.viewMode;
        if (s.accentColor) this.accentColor = s.accentColor;
        if (s.interactiveMode !== undefined) this.interactiveMode = s.interactiveMode;
        if (s.hidePrintButton !== undefined) this.hidePrintButton = s.hidePrintButton;
        if (s.hideShareButton !== undefined) this.hideShareButton = s.hideShareButton;
      } catch (e) { /* ignore corrupt data */ }
    },
    saveSettings() {
      localStorage.setItem("hfl-settings", JSON.stringify({
        theme: this.theme,
        textSize: this.textSize,
        compactCards: this.compactCards,
        viewMode: this.viewMode,
        accentColor: this.accentColor,
        interactiveMode: this.interactiveMode,
        hidePrintButton: this.hidePrintButton,
        hideShareButton: this.hideShareButton,
      }));
    },
    setTheme(t) {
      this.theme = t;
      this.applyTheme();
      this.applyAccentColor();
      this.saveSettings();
    },
    applyTheme() {
      let resolved = this.theme;
      if (resolved === "system") {
        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      document.documentElement.setAttribute("data-theme", resolved);
    },
    setTextSize(size) {
      this.textSize = parseInt(size);
      this.applyTextSize();
      this.saveSettings();
    },
    applyTextSize() {
      document.documentElement.style.setProperty("--text-size", this.textSize + "px");
    },
    setAccentColor(color) {
      this.accentColor = color;
      this.applyAccentColor();
      this.saveSettings();
    },
    applyAccentColor() {
      const colors = {
        blue: {
          pill: "#3d437c",
          light: { accent: "#3d437c", hover: "#333869", light: "rgba(61, 67, 124, 0.1)" },
          dark: { accent: "#5c64a8", hover: "#4a5194", light: "rgba(92, 100, 168, 0.12)" },
        },
        green: {
          pill: "#74B944",
          light: { accent: "#74B944", hover: "#65a33b", light: "rgba(116, 185, 68, 0.1)" },
          dark: { accent: "#8BC963", hover: "#74B944", light: "rgba(139, 201, 99, 0.12)" },
        },
      };
      const theme = this.theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : this.theme;
      const colorSet = colors[this.accentColor] || colors.blue;
      const c = colorSet[theme];
      document.documentElement.style.setProperty("--accent", c.accent);
      document.documentElement.style.setProperty("--accent-hover", c.hover);
      document.documentElement.style.setProperty("--accent-light", c.light);
      document.documentElement.style.setProperty("--bg-pill-active", colorSet.pill);
    },
    toggleCompact() {
      this.compactCards = !this.compactCards;
      this.saveSettings();
    },
    setViewMode(mode) {
      this.viewMode = mode;
      this.saveSettings();
    },
    toggleInteractiveMode() {
      this.interactiveMode = !this.interactiveMode;
      this.saveSettings();
    },
    toggleHidePrintButton() {
      this.hidePrintButton = !this.hidePrintButton;
      this.saveSettings();
    },
    toggleHideShareButton() {
      this.hideShareButton = !this.hideShareButton;
      this.saveSettings();
    },
    toggleIngredient(index) {
      if (this.checkedIngredients.includes(index)) {
        this.checkedIngredients = this.checkedIngredients.filter(i => i !== index);
      } else {
        this.checkedIngredients = [...this.checkedIngredients, index];
      }
    },
    toggleStep(index) {
      if (this.checkedSteps.includes(index)) {
        this.checkedSteps = this.checkedSteps.filter(i => i !== index);
      } else {
        this.checkedSteps = [...this.checkedSteps, index];
      }
    },
    clearChecked() {
      this.checkedIngredients = [];
      this.checkedSteps = [];
    },
    realIngredients(recipe) {
      if (!recipe.ingredients) return [];
      return recipe.ingredients.filter((ing) => !ing.trim().endsWith(":"));
    },
    cleanIngredientName(ing) {
      const idx = ing.indexOf(" - ");
      let name = idx !== -1 ? ing.substring(idx + 3) : ing;
      name = name.replace(/\([^)]*\)/g, "");
      name = name.split(",")[0];
      name = name.replace(/\s+/g, " ").trim();
      return name;
    },
    uniqueIngredientNames(recipe) {
      const seen = new Set();
      const names = [];
      for (const ing of this.realIngredients(recipe)) {
        const name = this.cleanIngredientName(ing).toLowerCase();
        if (name && !seen.has(name)) {
          seen.add(name);
          names.push(this.cleanIngredientName(ing));
        }
      }
      return names;
    },
    getIngredientNames(recipe, max) {
      return this.uniqueIngredientNames(recipe).slice(0, max);
    },

    // ---- Data ----
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

    // ---- Routing ----
    navigateToHash() {
      const hash = window.location.hash.slice(1);
      if (!hash || hash === "/") {
        this.homeNoHash();
        return;
      }
      const parts = hash.split("/").filter(Boolean);
      if (parts[0] === "recipe" && parts[1]) {
        const slug = parts[1];
        const recipe = this.original.find((r) => this.slugify(r.title) === slug);
        if (recipe) {
          this.showRecipeNoHash(recipe);
          return;
        }
      }
      if (parts[0] === "search" && parts[1]) {
        const query = decodeURIComponent(parts[1]);
        this.searchQuery = query;
        this.showSearch = true;
        this.searchNoHash();
        return;
      }
      const slug = parts[0];
      const index = this.categories.findIndex((c) => this.slugify(c.name) === slug);
      if (index !== -1) {
        this.toggleNoHash(this.categories[index], index);
        return;
      }
      this.homeNoHash();
    },

    // ---- Navigation ----
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
      this.hasInternalNav = true;
      this.toggleNoHash(cat, index);
      window.location.hash = "#/" + this.slugify(cat.name);
      window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
    },
    showRecipeNoHash(recipe) {
      this.current = "recipe";
      this.rtitle = recipe.title;
      this.rimage = recipe.image;
      this.rnotes = recipe.notes;
      this.ringredients = recipe.ingredients;
      this.rinstructions = recipe.instructions;
      this.clearChecked();
    },
    showRecipe(recipe) {
      this.hasInternalNav = true;
      this.showRecipeNoHash(recipe);
      window.location.hash = "#/recipe/" + this.slugify(recipe.title);
      window.scrollTo(0, 0);
    },
    goBack() {
      if (this.hasInternalNav) {
        window.history.back();
      } else {
        // Direct link - go to home instead
        this.current = 'home';
        window.location.hash = '';
      }
    },
    printRecipe() {
      window.print();
    },
    async shareRecipe() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.showCopiedToast();
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.showCopiedToast();
      }
    },
    showCopiedToast() {
      const toast = document.createElement("div");
      toast.className = "copy-toast";
      toast.innerHTML = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Link copied!';
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("show"), 10);
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    },

    // ---- Search ----
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
      const seen = new Set();
      this.recipes = this.original.filter((r) => {
        if (seen.has(r.title)) return false;
        const matches = r.title.toLowerCase().includes(q) ||
          (r.ingredients && r.ingredients.some((ing) => ing.toLowerCase().includes(q)));
        if (matches) seen.add(r.title);
        return matches;
      });
      this.current = "search";
    },
    search() {
      this.hasInternalNav = true;
      this.searchNoHash();
      if (this.searchQuery.trim()) {
        window.location.hash = "#/search/" + encodeURIComponent(this.searchQuery.trim());
      } else {
        window.location.hash = "#/";
      }
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.$nextTick(() => {
          if (this.$refs.searchInput) this.$refs.searchInput.focus();
        });
      } else {
        this.searchQuery = "";
        this.search();
      }
    },
  },
}).mount("#app");
