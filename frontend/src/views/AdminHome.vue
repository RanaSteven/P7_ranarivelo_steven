<template>
    <h1> Administrateur Page</h1>
        <div class="corps">
            <h1>{{ sousTitre }}</h1>
            <input type="submit" class="inputValidePost" value="Recuperer Posts" @click="recuperationPostNonModeres">
            <div class="case" v-for="moderatePublication in moderatePublications" :key="moderatePublication">
                <p class="labelPubli">{{ moderatePublication.content}}</p>
                <input type="submit" class="inputValidePost" value="Valider" @click="validePost">
            </div>
        </div>
</template>

<style>
    h1{
        color: white;
        text-align: center;
    }
</style>

<script>
import axios from 'axios'

export default {
    name: 'adminHome',
    data() {
        return {
            sousTitre: "Publications non médérées des utilisateurs",
            moderatePublications: null,
            publications: null,
        }
    },
    beforeMount() {
        if(this.$store.state.connexionAdmin == false){
            this.$router.push({ name: 'Auth' });
        }
    },
  methods:{
      recuperationPostNonModeres(){
        axios.get('http://localhost:3000/post/admin', {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.moderatePublications = response.data;
        console.log(response);
      },
      console.log("Requête envoyée !"),)
      .catch(function (error) {
        console.log(error);
        console.log('erreur');
      });
      },
      validePost(){

      }
  },
}
</script>