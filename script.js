
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
          name: "Appetizers",
          toggle: 0,
        },
        {
          name: "Entrées",
          toggle: null,
        },
        {
          name: "Desserts",
          toggle: null,
        },
        {
          name: "Drinks",
          toggle: null,
        },
        {
          name: "Breakfast",
          toggle: null,
        },
        {
          name: "Soup & Sauces",
          toggle: null,
        },
        {
          name: "Crockpot",
          toggle: null,
        },
        {
          name: "Miscellaneous",
          toggle: null,
        },
      ],
    };
  }
}).mount("#app");
