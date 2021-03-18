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
        <h2>{{ publication.title }}</h2>
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
      titlePublication: "",
      textPublication: "", 
    }
  },
  beforeMount() {
    if(this.$store.state.connexion == true){
      document.getElementById("conteneur").style.marginLeft = "60px";
      console.log(this.$store.state.token);
    }else{
      this.$router.push({ name: 'Auth' });
    }
  },
  
  methods:{
    
    envoiPublication(){ // Récupère les données de la nouvelle publication créée, et les envoie par une requete post
      if (this.textPublication && this.titlePublication != "") {

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
        )
        .catch(function (error) {
          console.log(error);
          console.log('erreur');
        });

      }else{
        alert("Il manque un titre ou un contenu à la publication !");
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