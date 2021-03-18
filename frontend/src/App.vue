<template>
  <header>
    <div id="nav" v-if="$store.state.connexion == true">
      <ul>
        <li>
          <a href="#Home">
            <span class="iconLogo"><img src="./assets/logo.png" alt=""></span>
            <span class="titleLogo">Groupomania</span>
          </a>
        </li>

        <li>
          <router-link to="/home">
            <span class="title">Accueil</span>
          </router-link>
        </li>

        <li>
          <div id="search">
            <input class="inputSearch" type="search" placeholder="Rechercher un utilisateur" @keyup.enter="checkResearch" v-model="userSearch">
          </div>
        </li>

        <li>
          <router-link :to="'/user/' + this.$store.state.userId">
            <span class="title">Profil</span>
          </router-link>
        </li>

        <li>
          <router-link to="/settings">
            <span class="title">Paramètres</span>
          </router-link>
        </li>

        <li>
          <router-link to="/auth">
            <span class="title">Déconnexion</span>
          </router-link>
        </li>
      </ul>
    </div>
  </header>

  <fingerprint-spinner v-if="this.chargement == false"
    :animation-duration="1500"
    :size="64"
    color="#ff1d5e"
  />
    
  <div id="conteneur">
    <!--<transition appear name="fade" mode="out-in">-->
      <router-view/>
    <!--</transition>-->
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

body{
  margin: 0;
  padding: 0;
  background-color: #303030;
}

header{
  min-height: 1px;
}

/* Style du menu Nav ---------------------------------------*/

#nav{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position:fixed;
  width: 60px;
  height:100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 0.5s;
  overflow: hidden;
  z-index: 10;
}

#nav:hover, .navActive{
  width: 300px!important;
}

#nav ul{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  color: #ffffff;
}

#nav ul li{
  position:relative;
  width: 100%;
  list-style: none;
}

#nav ul li a, #search{
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #ffffff;
}

#nav ul li a:hover, #search:hover{
  color: rgb(255, 106, 0);
}

#nav ul li a .icon, #search .icon{
  position: relative;
  display: block;
  min-width: 40px;
  height: 60px;
  line-height: 60px;
  margin-left: -19px;
}

#nav ul li a .iconLogo{
  position: relative;
  display: block;
  min-width: 40px;
  height: 60px;
  line-height: 60px;
  margin-left: -19px;
}

#nav ul li a .iconProfil{
  position: relative;
  display: block;
  min-width: 40px;
  line-height: 60px;
  margin-left: -19px;
}

#nav ul li a .iconLogo img{
  width: 35px;
  margin-left: -10px;
}

#nav ul li a .iconProfil img{
  width: 30px;
  height: 30px;
  margin-left: -7px;
  border:solid white 1px;
  border-radius: 100px;
  vertical-align: middle;
}

#nav ul li a .title{
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}

.inputSearch{
  padding: 0 10px;
  height: 30px;
  margin-top: 15px;
  text-align: start;
  border: none;
  border-radius: 50px;
  width: 58%;
  color: #ffffff;
  background-color:#494949;
}

#nav ul li a .titleLogo{
  position: relative;
  font-size: 30px;
  white-space: nowrap;
}

#nav a.router-link-exact-active{
  color: rgb(255, 110, 5);
}

#toggleMenu{
  position: fixed;
  top: 65px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 2;
}

/* Styles généraux ---------------------------------------*/

.fade-enter-active{
  animation: fade 0.7s;
}

.fade-leave-active {
  animation: fade 0.7s reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
  }100% {
    opacity: 1;
  }
}

.corps{
  margin: 50px auto 0 auto;
  width: 80%;
}

.corps .case{
  background-color:#494949;
  margin: auto;
  border-radius: 10px;
  width: 70%;
}

@media screen and (max-width: 640px) {
  .corps {
    width:100%;
  }

  .corps .case{
    width:90%;
  }
}

.corps .case #uploadPublication{
  background-color:#777777;
  padding: 10px;
  width: 60%;
  margin: 12px;
  height: 60px;
  border: none;
  border-radius: 15px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: white;
}

.casePublication .uploadComments{
  background-color:#777777;
  padding: 10px;
  width: 70%;
  margin: 12px;
  height: 25px;
  border: none;
  border-radius: 15px;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: white;
}


.case1Hr{
  height: 1px;
  background-color:#777777;
  border: none;
  width: 90%;
}


#preview{
  width: 100%;
  text-align: center;
}

.casePublication{
  color: white;
  font-family: 'Open Sans', sans-serif;
  padding-top: 5px;
  padding-bottom: 15px;
  margin: 20px auto!important;
}

.casePublication > h2, p{
  margin-left: 15px;
  margin-right: 15px;
}

.casePublication .datePublication{
  font-size: 13px;
}

.conteneurVFor{
  text-align: center;
}

.boxComm{
  margin: 25px;
  padding: 2px;
  background-color: rgb(0, 0, 0);
  border-radius: 18px;
}

.identiteComm{
  font-size: 14px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

/* Style de la gallerie --------------------------------------------*/

.containerGalery{
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.9);
}

.containerGalery img{
  width: 20%!important;
  overflow: auto;
  margin: 7% auto;
}

@media screen and (max-width: 640px) {
  .containerGalery img{
  width: 70%!important;
  }
}

.closebtn {
  color: #ffffff;
  float: right;
  margin-right: 15px;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
}

#imgtext {
  position: absolute;
  color: white;
  left: 10%;
  right: 10%;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
}
</style>

<script>
import { FingerprintSpinner } from 'epic-spinners'

export default {
  components: {FingerprintSpinner},
  name:'App',
  data() {
    return {
      chargement: false,
      userSearch: null,
      identite: this.$store.state.prenom + " " + this.$store.state.nom,
    }
  },
  mounted(){
    this.chargement = true;
  },
  methods: {
    checkResearch(){ // Recherche d'utilisateur
      this.$router.push({name: 'Search', params: { id: this.userSearch }});
      this.userSearch = null;      
    },
  }
}
</script>
