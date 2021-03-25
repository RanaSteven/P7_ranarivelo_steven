<template>
    <div class="corps">
        <h1>{{ sousTitre }}</h1>
        <div class="case" v-for="moderatePublication in moderatePublications" :key="moderatePublication">
            <p class="labelPubli">{{ moderatePublication.content }}</p>
            <input type="submit" class="inputValidePost" value="Valider" @click="validePost(moderatePublication.idPosts)">
        </div>
    </div>
</template>

<style>
    h1{
        color: white;
        text-align: center;
        margin-top:15%;
    }
</style>

<script>
import axios from 'axios'

export default {
    name: 'adminHome',
    data() {
        return {
            sousTitre: "Publications des utilisateurs non médérées",
            moderatePublications: [],
            idPublication: null,
            publicationStatut_moderation: this.moderatePublications,
        }
    },
    beforeMount() {
        if(this.$store.state.connexionAdmin == false){
            this.$router.push({ name: 'Auth' });
        }
    },
    mounted() {
        axios.get('http://localhost:3000/admin', {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.moderatePublications = response.data;
        console.log(response.data);
      },
      console.log("Requête envoyée !"),)
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });
    },
    methods:{
        validePost(publicationId){
            this.idPublication = publicationId;
            axios.put('http://localhost:3000/admin/validePost/' + this.idPublication, {
          headers:{
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