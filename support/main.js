const app = Vue.createApp({
  data() {
    // elements de l'app
    return {
      cart: [], // Liste des produit dans le panier
      premium: true, // compte premium ou non
    };
  },
  methods: {
    // Methode qui ajout un ID de produit dans la liste Cart
    addProductToCart(id) {
      this.cart.push(id);
    },
    // Methode qui enlève un ID de produit depuis la liste Cart
    removeProductFromCart(id) {
      const index = this.cart.indexOf(id); // Crée une index de tout les ID equivalent à l'id en paramètre présent dans la liste Cart
      // Si il y a un moins une instance de l'ID dans la liste
      if (index >= 0) {
        this.cart.splice(index, 1); // enlève l'ID en question
      }
    },
  },
});
