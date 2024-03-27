app.component("product-details", {
  //creation du composant en Kebab-Case, nom du fichier en CamelCase
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  /*html*/
  template: `<ul>
<li v-for="detail in details">{{ detail }}</li>
</ul>`,
});
