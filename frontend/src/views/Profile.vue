<template>
  <div class="corps">
    <div class="case">
      <h1>{{ sousTitre }}</h1>
      <ul class="boxId" v-for="profile in profiles" :key="profile">
        <li>{{ profile.prenom }} {{ profile.nom }}</li>
        <li>{{ profile.email }}</li>
        <li>{{ profile.pseudo }}</li>
      </ul>
    </div>
    <h2>Liste de mes publications</h2>
    <div class="case" v-for="publication in publications" :key="publication">
      <p class="myPubli">{{ publication.content }}</p>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			sousTitre: "Profile",
      profiles: null,
      publications: null,
      contentComment: "",
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
    mounted() { // Requete pour récupérer le profil
    axios.get('http://localhost:3000/user/' + this.$store.state.userId, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(responseUser => {
        this.profiles = responseUser.data;
        console.log(responseUser);
      },
      console.log("Requête envoyée !"),)
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });
    
    axios.get('http://localhost:3000/post/'+ this.$store.state.userId, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.publications = response.data;
        console.log(response);
      },
      console.log("Requête envoyée !"),)
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });


  },
}
</script>

<style scoped>
h1, h2 {
  color: white;
  text-align: center;
}

.myPubli{
  color: white;
}

.boxId{
  color: white;
  list-style: none;
  font-size: 25px;
  padding-left: 0;
  text-align: center;
}

</style>