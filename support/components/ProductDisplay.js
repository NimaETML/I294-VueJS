app.component("product-display", {
  //creation du composant en Kebab-Case, nom du fichier en CamelCase
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
      <div class="product-image"
      :class="{ 'out-of-stock-img': !inStock }"> <!-- si des tirait (Kebab-case) alors single quote -->
      <img v-bind:src="image"> <!-- les v-bind: sont des liaison unidirectionnelle -->
      </div>
      <div class="product-info">
        <h1>{{ fullTitle }}</h1>
        <p v-if="inStock">In Stock</p>  <!-- Si le produit est en stock, alors afficher ce praragraph -->
        <p v-else>Out of Stock</p>      <!-- Sinon, afficher celui-ci -->

        <p>Shipping: {{ shippingPrice }}</p>
    
        <product-details :details="details"></product-details> <!-- Appel du component "ProductDetails" pour l'affichage des détails du produit -->

     <!-- cercle pour la couleur, appel la methode updateVariant quand la souris est au dessu de l'element--> 
    <div 
    v-for="(variant, index) in variants"
    :key="variant.id"
    @mouseover="updateVariant(index)"  
    class="color-circle"
    :style="{ backgroundColor: variant.color }"> <!-- backgroundColor n'a pas d'espace ou autre alors single quote pas necessaire -->
    </div>

    <!-- Bouton pour l'ajout de produit dans le panier -->
    <button 
    class="button"
    :class="{ disabledButton: !inStock }" 
    :disabled="!inStock" 
    v-on:click="addToCart"> 
    Add to Cart
  </button>

    <!-- Bouton pour l'elèvement de produit depuis le panier -->
    <button 
    class="button" 
    :class="{ disabledButton: !inStock }" 
    :disabled="!inStock"
    v-on:click="removeFromCart">
    Remove Cart
  </button>

  <review-list v-if="reviews.length" :reviews="reviews"></review-list>  <!-- instance de la liste des reviews, n'existe que si la liste "reviews" n'est pas vide -->
  <review-form @review-submitted="addReview"></review-form>             <!-- instance d'un formulaire listen au review-submitted, quand il se produit, déclanche la méthode "addReview" -->
  </div>
</div>
</div>`,
  data() {
    // elements du component ProductDisplay
    return {
      // Titre du produit
      title: "Socks",
      // Marque du produit
      brand: "Vue Mastery",
      // Variant séléctionné
      selectedVariant: 0,
      // Détails du produit
      details: ["50% cotton", "30% wool", "20% polyester"], // Différent variants du produit, chaqun a un ID, une couleur, une image et une quantité
      // Liste des information d'un review
      reviews: [],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 20,
        },
      ],
    };
  },
  // Méthodes
  methods: {
    // Ajout d'un produit à la liste Cart
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    // Elèvement d'un produit à la liste Cart
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    // Mis à jour du "Variant" d'un produit
    updateVariant(index) {
      this.selectedVariant = index;
    },
    // Ajoute une review dans la liste des reviews
    addReview(review) {
      this.reviews.push(review);
    },
  },
  // Option "computed" qui permet de calclter des propriété calculée, ces Options aggissent comme des méthodes, mais elles se mette à jour à chaque "render" (changement du DOM)
  computed: {
    // Calcule du titre du produit
    fullTitle() {
      return this.brand + " " + this.title;
    },
    // Calcule de l'image du produit par rapport au "variants" séléctionné
    image() {
      return this.variants[this.selectedVariant].image;
    },
    // Calcule pour savoir si le produit est en stock par rapport au "variants" séléctionné
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    // calcule le prix du shipping, si l'element premium est true, le shipping est offert
    shippingPrice() {
      if (this.premium) {
        return "free";
      }
      return 2.99;
    },
  },
});
