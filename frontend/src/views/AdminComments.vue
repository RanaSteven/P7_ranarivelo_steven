<template>
  <div class="corps">
    <h1>{{ sousTitre }}</h1>
    <div class="case" v-for="publication in publications" :key="publication">
      <div class="marginInput">
      <p class="adminLabelComm">{{ publication.contents }}</p>
        <div class="marginInput">
        <input type="submit" class="inputValidePost" id="validComm" value="Valider le commentaire" @click="valideComment(publication.idComments)">
        <input type="submit" class="inputUnvalidePost" id="validComm" value="Valider le commentaire" @click="deleteComment(publication.idComments)">
        </div>
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
    },
    console.log("Requête récupération des commentaires non modérés envoyée!"),)
    .catch(function (error) {
      console.log(error);
    });
  },

  methods: {
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
      });
    }
  },
} 
</script>