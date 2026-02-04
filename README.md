# Healthy For Life Recipe Book

A modern, responsive recipe book web app for browsing, searching, and cooking from a personal recipe collection.

**[View Live Site](https://rramboer.github.io/recipe-book/)**

## Features

- **Browse by Category** - Recipes organized into Entrées, Appetizers, Breakfast, Desserts, Soups & Sauces, Crockpot, Drinks, and more
- **Search** - Quickly find recipes by title, ingredients, or notes
- **Interactive Cooking Mode** - Check off ingredients and steps as you cook
- **Shareable Links** - Direct URLs to any recipe, category, or search
- **Print-Friendly** - Clean print layout for any recipe
- **Customizable Display** - Light/dark/system theme, adjustable text size, accent colors, card or list view

## Tech Stack

- [Vue.js 3](https://vuejs.org/) - Reactive UI framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- Vanilla CSS with custom properties
- No build step required; runs directly in the browser

## Getting Started

1. Clone the repository
2. Open `index.html` in a browser, or serve with any static file server
3. Edit `recipes.json` to add your own recipes

## Recipe Format

Recipes are stored in `recipes.json` with the following structure:

```json
{
  "title": "Recipe Name",
  "category": "Entrées",
  "image": "images/recipe.jpg",
  "notes": "Optional notes about the recipe",
  "ingredients": ["1 cup flour", "2 eggs"],
  "instructions": ["Step 1", "Step 2"]
}
```
