<template>
  <div class="corps">
    <div class="case">
      <textarea class="uploadContent" v-model="contentPublication" placeholder="Que voulez-vous dire ?"></textarea>
      <input type="file" id="uploadImg" name="uploadImg" accept="image/png, image/jpeg, image/gif" placeholder="Photo">
      <div class="marginInput">
      <input type="submit" class="inputPost" value="Publier" @click="envoiPost">
      </div>
    </div>
    <h1>{{ sousTitre }}</h1>
    <div class="case" v-for="publication in publications" :key="publication">
      
      <p class="labelPubli">{{ publication.content}}</p>
      <div class="conteneurImg" v-for="images in JSON.parse(publication.urls_images)" :key="images">
        <img :src="images">
      </div>
      
      <p class="labelComm">commentaires :</p>
      <div class="boxComments">
        <p>{{ publication.comment1 }}</p>
        <p>{{ publication.comment2 }}</p>
      </div>
      <textarea class="uploadComments" v-model="contentComment" placeholder="Commentaire"></textarea>
      <div class="marginInput">
        <input class="inputComment" type="submit" value="Commenter" @click="envoiComment(publication.idPosts, publication.Utilisateurs_id)">
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
			sousTitre: "Fil d'actualité",
      contentPublication: "",
      contentComment: "",
      PostId: null,
      UtilisateurId: null,
      Id: null,

    }
  },
  beforeMount() {
    if(this.$store.state.connexion == true){
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
      },)
      .catch(function (error) {
        console.log(error);
      });
  },

  methods:{
    envoiPost() {
      if (this.contentPublication != ""){

        let input = document.getElementById("uploadImg");
        let file = input.files;

        let formData = new FormData();
        formData.append('Utilisateurs_id', this.$store.state.userId);
        formData.append('content', this.contentPublication);
        for (let i = 0; i < file.length; i++) {
          formData.append('image', file[i]);
        }

        axios.post('http://localhost:3000/post/createPost',formData,{
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

    envoiComment(postId, utilisateurId) {
      this.PostId = postId;
      this.UtilisateurId = utilisateurId;
      if (this.contentComment != ""){
        axios.post('http://localhost:3000/comment/createComment/'+ this.PostId +'/'+ this.UtilisateurId +'/'+ this.$store.state.userId, {
            Posts_idPosts: this.PostId,
            Posts_Utilisateurs_id: this.UtilisateurId,
            Utilisateurs_id: this.$store.state.userId,
            contents: this.contentComment,
            status_moderation: 0,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json",
          }
        })
        .then(
          alert("Commentaire envoyé !"),
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
  },
} 
</script>

<style scoped>
h1 {
  color: white;
  text-align: center;
}

</style>