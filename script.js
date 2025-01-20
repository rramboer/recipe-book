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
      firstLoad: true,
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
  methods: {
    async selectCategory(cat) {
      this.current = "category";
      if (this.firstLoad) {
        try {
          const res = await fetch("./recipes.json");
          const data = await res.json();
          this.original = data.recipes;
          this.recipes = this.original.filter(
            (o) => o.category === cat
          );
          this.firstLoad = false;
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      } else {
        this.recipes = [];
        this.recipes = this.original.filter((o) => o.category === cat);
      }
    },
    toggle(cat, index) {
      if (this.active != null) {
        this.categories[this.active].toggle = null;
      }
      cat.toggle = index;
      this.active = index;
      this.selectCategory(cat.name);
    },
    home() {
      this.current = "home";
      this.categories[this.active].toggle = null;
      this.active = null;
    },
    averageColor(imageElement) {
      let canvas = document.createElement('canvas');

      const ctx = canvas.getContext && canvas.getContext('2d');
      const rgb = { r: 0, g: 0, b: 0 };
      let count = 0;

      let height = canvas.height = imageElement.naturalHeight || imageElement.offsetHeight || imageElement.height;
      let width = canvas.width = imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;

      ctx.drawImage(imageElement, 0, 0);

      let imgData = ctx.getImageData(0, 0, width, height);

      let length = imgData.data.length;

      for (let i = 0; i < length; i += 4) {
        rgb.r += imgData.data[i];
        rgb.g += imgData.data[i + 1];
        rgb.b += imgData.data[i + 2];
        count++;
      }

      const avgColor = `rgb( ${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;

      document.querySelectorAll('#app h1').forEach(el => el.style.color = avgColor);
    },

    showRecipe(recipe) {
      this.current = "recipe";
      this.rcategory = recipe.category;
      this.rtitle = recipe.title;
      this.rimage = recipe.image;
      this.rnotes = recipe.notes;
      this.ringredients = recipe.ingredients;
      this.rinstructions = recipe.instructions;

      const img = new Image();
      img.addEventListener("load", () => {
        this.selectColor = this.averageColor(img);
      }, false);
      img.src = this.rimage;
    },

    backToRecipe() {
      this.current = "category";
    }
  }
}).mount("#app");