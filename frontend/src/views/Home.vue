<template>
  <div class="corps">
    <div class="case">
      <textarea class="uploadContent" v-model="contentPublication" placeholder="Que voulez-vous dire ?"></textarea>
      <input type="submit" class="inputPost" value="Publier" @click="envoiPost">
    </div>
    <h1>{{ sousTitre }}</h1>
    <div class="case" v-for="publication in publications" :key="publication">
      <p class="labelPubli">{{ publication.content }}</p>
      <p class="labelComm">commentaires :</p>
      <div class="boxComments">
      <p>{{ publication.comment1 }}</p>
      <p>{{ publication.comment2 }}</p>
      </div>
      <textarea class="uploadComment" v-model="contentComment" placeholder="Commentaire"></textarea>
      <input type="submit" class="inputComment" value="Commenter" @click="envoiComment">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
      publications: null,
			sousTitre: "Fil d'actualité",
      titlePublication: "",
      contentPublication: "",
      contentComment: "",
      content: null,
    }
  },
  beforeMount() {
    if(this.$store.state.connexion == true){
      console.log(this.$store.state.token);
      document.getElementById("conteneur").style.marginTop ="100px";
    }else{
      this.$router.push({ name: 'Auth' });
    }
  },

  mounted() { // Requete pour récupérer toutes les publications
    axios.get('http://localhost:3000/post', {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.publications = response.data.elements;
        console.log(response.data);
      },
      console.log("Requête envoyée !"),)
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });
  },

  methods:{
    envoiPost() {
      if (this.contentPublication != ""){
        axios.post('http://localhost:3000/post/createPost', {
            content: this.contentPublication,
            Utilisateurs_id: this.$store.state.userId
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json",
          }
        })
        .then(
          alert("Publication envoyée !"),
          setTimeout(() => {  window.location.reload() }, 1000),
        )
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        alert("La publication est vide !");
      }
    },

    envoiComment() {
      if (this.contentComment != ""){

        axios.post('http://localhost:3000/comment/createComment', {
            contents: this.contentComment,
            Utilisateurs_id: this.$store.state.userId,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json",
          }
        })
        .then(
          alert("Commentaire envoyé !"),
          //setTimeout(() => {  window.location.reload() }, 1000),
        )
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        alert("La publication est vide !");
      }
    },
  },
} 
</script>

<style scoped>
h1 {
  color: white;
  text-align: center;
}

</style>