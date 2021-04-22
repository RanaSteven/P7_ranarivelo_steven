<template>
  <div class="corps">
    <h1>{{ sousTitre }}</h1>
    <div class="case" v-for="moderatePublication in moderatePublications" :key="moderatePublication">
      <div class="marginInput">
        <p class="labelPubli">{{ moderatePublication.content }}</p>
        <div class="conteneurImg" v-for="images in JSON.parse(moderatePublication.urls_images)" :key="images">
          <img :src="images">
        </div>
        <input type="submit" class="inputValidePost" value="Valider la publication" @click="validePost(moderatePublication.idPosts)">
        <input type="submit" class="inputUnvalidePost" value="Supprimer la publication" @click="deletePost(moderatePublication.idPosts)">
      </div>
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
    },)
    .catch(function (error) {
      console.log(error);
    });
  },

  methods:{
    validePost(publicationId) {
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
      });
    },

    deletePost(publicationId) {
      this.idPublication = publicationId;
      axios.delete('http://localhost:3000/admin/deletePost/' + this.idPublication, {
        headers:{
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(
        alert("Publication supprimée !"),
        setTimeout(() => {  window.location.reload() }, 1000),
      )
      .catch(function (error) {
        console.log(error);
      });
    }
  },
}
</script>