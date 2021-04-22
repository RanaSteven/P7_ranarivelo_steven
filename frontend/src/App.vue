<template>
  <header>
    <div id="nav" v-if="$store.state.connexion == true">
      <ul>
        <li>
          <a href="#Home">
            <span class="iconLogo"><img src="./assets/icon.png" alt=""></span>
            <span class="titleLogo">Groupomania</span>
          </a>
        </li>

        <li>
          <router-link to="/home">
            <span class="title">Accueil</span>
          </router-link>
        </li>

        <li>
          <router-link to="/profile">
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

    <div id="nav" v-if="$store.state.connexionAdmin == true">
      <ul>
       <li>
          <router-link to="/adminHome" class="enAttente">
            <span class="title">Publications (en attente)</span>
          </router-link>
        </li>
        <li>
          <router-link to="/adminComments" class="enAttente">
            <span class="title">Commentaires (en attente)</span>
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

  <div id="conteneur">
     <router-view/>
  </div>

</template>

<style>
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
  height: 80px;
  width:100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
}

#nav ul{
  position: relative;
  display: flex;
  top:0;
  left:0;
  width: 100%;
  text-decoration: none;
  color: #ffffff;
}

#nav ul li{
  list-style: none;
}

#nav ul li a{
  color: #ffffff;
  text-decoration: none;
}

#nav ul li a .iconLogo img{
  width: 40px;
  margin-left: -30px;
  margin-right: 5px;
}

#nav ul li a .title{
  position: relative;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}


#nav ul li a .titleLogo{
  position: relative;
  font-size: 30px;
  white-space: nowrap;
  color: rgb(250,20,0);
}

#nav a.router-link-exact-active{
  color: rgb(250, 20, 0);
}

/* Styles généraux ---------------------------------------*/
.corps{
  margin: 50px auto 0 auto;
  width: 80%;
}

.corps .case{
  background-color:#505050;
  margin: auto;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  width: 80%;
  margin-top: 30px;
}

.corps .labelPubli{
  color: white;
  font-size: 25px;
}

.labelComm{
  color: white;
  margin: 15px;
  text-decoration: underline;
}

.corps .adminLabelComm{
  color: white;
  margin: 15px;
}

.boxComments{
  border: none;
  background-color: #909090;
  border-radius: 5px;
  margin: 10px;
}

.conteneurImg{
  display: inline-block;
  width: 90%;
  margin: 20px;
}

.conteneurImg img{
  width: 100%;
}

@media screen and (max-width: 640px) {
  .corps {
    width:100%;
  }

  #nav ul li a .title{
    position: relative;
    padding: 0 10px;
    height: 30px;
    line-height: 60px;
    text-align: start;
    white-space: nowrap;
    font-size: 12px;
  }

  #nav ul li a .titleLogo{
    display: none;
  }

  #nav ul li a .iconLogo img{
    width: 25px;
    margin-top: 20px;
    margin-right: 5px;
  }

  .corps .case{
    width:90%;
  }
}

.corps .case .uploadContent{
  background-color:#909090;
  padding: 10px;
  width: 90%;
  margin: 0 0 0 10px;
  height: 60px;
  border: none;
  border-radius: 15px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: white;
}

.marginInput{
  margin: auto;
  text-align: center;
}

.inputValidePost{ 
  background-color: rgb(0,120,20);
  border: none;
  padding: 5px;
  margin: 0 5% 0;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  color: white;
}

.inputUnvalidePost{ 
  background-color: rgb(250,20,0);
  border: none;
  padding: 5px;
  margin: 0 5% 0;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  color: white;
}

.inputPost, .inputComment{ 
  background-color: rgb(250,20,0);
  border: none;
  padding: 5px;
  margin: 0 auto 0;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  color: white;
}

.case .uploadComments{ 
  border: none;
  padding: 10px;
  width: 90%;
  margin: 10px 0 0 10px;
  height: 15px;
  background-color: #909090;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  color: white;
}

.case1Hr{
  height: 2px;
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

</style>

<script>
export default {
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
