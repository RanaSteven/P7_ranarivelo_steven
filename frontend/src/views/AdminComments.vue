<template>
  <div class="corps">
    <h1>{{ sousTitre }}</h1>
    <div class="case" v-for="publication in publications" :key="publication">
      <div>
      <p class="labelComm">{{ publication.contents }}</p>
      <input type="submit" class="inputValidePost" id="validComm" value="Valider le commentaire" @click="valideComment(publication.idComments)">
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
	data() {
        return {
        publications: null,
        sousTitre: "Commentaires non modérées",
        idComment: null,
        }
    },
  beforeMount() {
    if(this.$store.state.connexionAdmin == true){
      console.log(this.$store.state.token);
      document.getElementById("conteneur").style.marginTop ="100px";
    }else{
      this.$router.push({ name: 'Auth' });
    }
  },

  mounted() { // Requete pour récupérer une publication
    axios.get('http://localhost:3000/comment',{
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.publications = response.data;
        console.log(response.data);
      },
      console.log("Requête récupération des commentaires non modérés envoyée!"),)
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });
  },
  methods:{
    valideComment(commentId){
      this.idComment = commentId;
      axios.put('http://localhost:3000/admin/valideComment/' + this.idComment, {
        headers: {
        'Authorization': 'Bearer ' + this.$store.state.token,
        "Content-Type": "application/json",
        }
      })
      .then(
        alert("Publication validée !"),
        setTimeout(() => {  window.location.reload() }, 1000),
      )
      .catch(function (error) {
        console.log(error);
        console.log('Erreur lors de la requête !');
      });
        }
    }
} 
</script>