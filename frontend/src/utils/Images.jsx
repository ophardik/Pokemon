// // Helper function to fetch and map images from a folder
// const fetchImages = (context) => {
//     const images = {};
//     const cache = {};
//     const icons={};
//     // Import all images from the context
//     function importAll(r) {
//       r.keys().forEach((key) => (cache[key] = r(key)));
//     }
//     importAll(context);
  
//     // Process the cache to extract image names and paths
//     Object.entries(cache).forEach((module) => {
//       const [key, value] = module;
//       // Remove "./" from the beginning and the file extension from the end
//       const imageName = key.replace("./", "").replace(/\.[^/.]+$/, "");
//       images[imageName] = value.default || value; // Use .default for ES modules
//     });
  
//     return images;
//   };
  
//   // Fetch images from the shiny and default folders
//   export const images = fetchImages(
//     require.context("../Components/Updated Image/assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/)
//   );
//   export const icons=fetchImages(
//     require.context("../Components/Updated Image/assets/types")
//   )
//   export const defaultImages = fetchImages(
//     require.context("../Components/Updated Image/assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/)
//   );
// Helper function to fetch and map images from a folder
const fetchImages = (context) => {
  const images = {};
  const cache = {};

  function importAll(r) {
      r.keys().forEach((key) => (cache[key] = r(key)));
  }
  importAll(context);

  Object.entries(cache).forEach(([key, value]) => {
      const imageName = key.replace("./", "").replace(/\.[^/.]+$/, "");
      images[imageName] = value.default || value;
  });

  return images;
};

// Fetch Pokémon images
export const images = fetchImages(
  require.context("../Components/Updated Image/assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/)
);

// Fetch Pokémon default images
export const defaultImages = fetchImages(
  require.context("../Components/Updated Image/assets/pokemons/default", false, /\.(png|jpe?g|svg)$/)
);

// Fetch Type Icons
export const typeIcons = fetchImages(
  require.context("../Components/Updated Image/assets/types", false, /\.(png|jpe?g|svg)$/)
);
