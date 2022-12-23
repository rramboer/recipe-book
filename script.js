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
          darkmode: true,
          setup: false,
          current: "home",
          rcategory: null,
          rtitle: null,
          rimage: null,
          rnotes: null,
          ringredients: null,
          rinstructions: null,
          select:""
        };
    },
    methods: {
        selectCategory(cat) {
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
            this.active = index;
            this.selectCategory(cat.name);
        },
        darkMode() {
            if (this.darkmode) {
                $("body").removeClass("dark");
                $("#back button").removeClass("btn-light");
                $("#back button").addClass("btn-dark");
                this.darkmode = false;
            } else {
                $("body").addClass("dark");
                $("#back button").removeClass("btn-dark");
                $("#back button").addClass("btn-light");
                this.darkmode = true;
            }
            console.log(this.darkmode);
        },
        home() {
            this.current = "home";
            this.categories[this.active].toggle = null;
            this.active = null;
        },
        averageColor(imageElement) {
            // Create the canvas element
            var canvas
                = document.createElement('canvas'),
 
                // Get the 2D context of the canvas
                context
                    = canvas.getContext &&
                    canvas.getContext('2d'),
                imgData, width, height,
                length,
 
                // Define variables for storing
                // the individual red, blue and
                // green colors
                rgb = { r: 0, g: 0, b: 0 },
 
                // Define variable for the
                // total number of colors
                count = 0;
 
            // Set the height and width equal
            // to that of the canvas and the image
            height = canvas.height =
                imageElement.naturalHeight ||
                imageElement.offsetHeight ||
                imageElement.height;
            width = canvas.width =
                imageElement.naturalWidth ||
                imageElement.offsetWidth ||
                imageElement.width;
 
            // Draw the image to the canvas
            context.drawImage(imageElement, 0, 0);
 
            // Get the data of the image
            imgData = context.getImageData(
                        0, 0, width, height);
 
            // Get the length of image data object
            length = imgData.data.length;
 
            for (var i = 0; i < length; i += 4) {
 
                // Sum all values of red colour
                rgb.r += imgData.data[i];
 
                // Sum all values of green colour
                rgb.g += imgData.data[i + 1];
 
                // Sum all values of blue colour
                rgb.b += imgData.data[i + 2];
 
                // Increment the total number of
                // values of rgb colours
                count++;
            }
 
            // Find the average of red
           rgb.r
                = Math.floor(rgb.r / count);
 
            // Find the average of green
            rgb.g
                = Math.floor(rgb.g / count);
 
            // Find the average of blue
            rgb.b
                = Math.floor(rgb.b / count);
            
            this.select =
                    "rgb(" +
                    rgb.r +
                    "," +
                    rgb.g +
                    "," +
                    rgb.b +
                    ")";
            $("#rec-title").css("color", this.select);
            $("#ingredients").css("color", this.select);
            $("#instructions").css("color", this.select);
        },

        showRecipe(recipe) {
          this.current = "recipe";
          this.rcategory = recipe.category;
          this.rtitle = recipe.title;
          this.rimage = recipe.image;
          this.rnotes = recipe.notes;
          this.ringredients = recipe.ingredients;
          this.rinstructions = recipe.instructions;

          // Function to set the
          // color of the texts as
          // calculated average color of image
          const img = new Image(); // Create new img element
          img.addEventListener(
            "load",
              () => {
                this.selectColor = this.averageColor(img);
            },
            false
          );
            img.src = this.rimage; // Set source path
        },

        backToRecipe() {
            this.current = "category";
        }
    }
}).mount("#app");