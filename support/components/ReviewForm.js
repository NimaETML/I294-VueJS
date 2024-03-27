app.component("review-form", {
  template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">  <!-- listen pour le submit, le ".prevent" empèche le reload de la page, qui est le comportement par défaut -->
    <h3>Leave a review</h3>
    <!-- champ de texte "imput" pour le nom du reviewer -->
    <label for="name">Name:</label>
    <input id="name" v-model="name">                        <!-- fait le lien avec le champ "name" dans data -->
    <!-- champ de texte pour ecriture d'une "review" -->
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>      <!-- fait le lien avec le champ "name" dans data -->
    <!-- select un "rating" parmis la liste d'options -->
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">            <!-- fait le lien avec le champ "rating" dans data, le ".number" précise que la valeur doit être un nombre -->
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    </select>
    <!-- select Yes ou No pour la question "Recommanderiez-vous ce produit ?" -->
    <label for="recommendation">Recommanderiez-vous ce produit ?</label>
    <select id="recommendation" v-model="recommendation">   <!-- fait le lien avec le champ "rating" dans data, le ".number" précise que la valeur doit être un nombre -->
    <option>Yes</option>
    <option>No</option>
    </select>
<!-- bouton pour soumettre le formulaire  -->
<input class="button" type="submit" value="Submit">
</form>`,
  // Valeurs stocker dans le formulaire (modele)
  data() {
    return {
      name: "",
      review: "",
      rating: null,
      recommendation: null,
    };
  },
  methods: {
    // Quand le formulaire est soumis:
    onSubmit() {
      // Verification très basique pour s'assurer que tout les champs ont des valeurs
      if (
        this.name === "" ||
        this.review === "" ||
        this.rating === null ||
        this.recommendation === null
      ) {
        // Si ce n'est pas le cas, affichage d'un message d'alert, et return rien afin de quitter la méthode
        alert("Review is incomplete. Please fill out every field.");
        return;
      }
      // Création d'une variable avec les information du formulaire
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommendation: this.recommendation,
      };
      // $emit permet d'envoyer l'information au parent, dans ce cas, le fait qu'une review à été soumis, les information du formulaire sont attaché sous "productReview"
      this.$emit("review-submitted", productReview);
      // les variables contenant les information du formulaire sont après supprimé
      this.name = "";
      this.review = "";
      this.rating = null;
      this.recommendation = null;
    },
  },
});
