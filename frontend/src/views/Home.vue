<template>
  <h1>{{ sousTitre }}</h1>

  <div class="corps">
      <div class="case">
        <textarea id="uploadPublication" v-model="titlePublication" placeholder="Titre"></textarea>
        <textarea id="uploadPublication" v-model="textPublication"></textarea>
        <input type="submit" name="" value="Publier" @click="envoiPublication">
        <hr class="case1Hr">
      </div>

      <div class="case casePublication" v-for="publication in publications" :key="publication">
        <h2>{{ publication.title }} {{ publication.content }}</h2>
        <hr class="case1Hr">
        <p>{{ publication.content }}</p>
      </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
      loading: true,
			sousTitre: "Fil d'actualité",
      title: null,
      content: null,
      textPublication : "",
      titlePublication : "",
      
    }
  },
  beforeMount() {
    if(this.$store.state.connexion == true){
      document.getElementById("conteneur").style.marginLeft = "60px";
    }else{
      this.$router.push({ name: 'Auth' });
    }

  },
  mounted() { // Requete pour récupérer toutes les publications
    axios
      .get('http://localhost:3000/post' , {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.publications = response.data;
        console.log(this.publications[1].posts);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });
  },
  methods:{
    envoiPublication(){ // Récupère les données de la nouvelle publication créée, et les envoie par une requete post
      if (this.textPublication != "") {

        let formData = new FormData();
        formData.append('userId', this.$store.state.userId);
        formData.append('title', this.titlePublication);
        formData.append('content', this.textPublication);
        axios
        .post('http://localhost:3000/post',formData, {
          headers:{
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

      }else{
        alert("Cette publication est vide !");
      }
    }
  },
}
</script>

<style scoped>
h1 {
  color: white;
  text-align: center;
}

</style>