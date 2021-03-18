<template>
  <div class="auth">

    <transition appear name="fade" mode="out-in">

    <div class="box" v-if="fenetreSignUp == 0" key="connexion">
      <h2>Connexion</h2>
      <form name="ConnexionForm" onsubmit="return false;">

        <div class="inputBox">
          <input type="email" v-model="authConnexion" id="authConnexion">
          <label>Email</label>
        </div>

        <div class="inputBox">
          <input type="password" v-model="passwordConnexion" id="passwordConnexion">
          <label>Mot de passe</label>
        </div>

        <input type="submit" name="" value="Valider" @click="recuperationChampFormConnexion">

      </form>

      <p class="formP">Pas encore inscrit ? Inscrivez vous en cliquant <span class="lienOrange" @click="changeFenetreSignUp">ici</span> !</p>
      
    </div>

    <div class="box" v-else key="inscription">
      <h2>Inscription</h2>
      <form name="inscriptionForm" onsubmit="return false;">

        <div class="inputBox">
          <input type="text" v-model="nom" id="nom">
          <label>Nom</label>
        </div>

        <div class="inputBox">
          <input type="text" v-model="prenom" id="prenom">
          <label>Prénom</label>
        </div>

        <div class="inputBox">
          <input type="email" v-model="email" id="email">
          <label>Email</label>
        </div>

        <div class="inputBox">
          <input type="text" v-model="pseudo" id="pseudo">
          <label>Pseudo</label>
        </div>

        <div class="inputBox">
          <input type="password" v-model="password" id="password">
          <label>Mot de passe</label>
        </div>

        <input type="submit" name="" value="Valider" @click="recuperationChampFormInscription">

      </form>

      <p class="formP">Déjà inscrit ? Connectez vous en cliquant <span class="lienOrange" @click="changeFenetreSignUp">ici</span> !</p>
      
    </div>

    </transition>

    <router-link to="/admin" class="adminLink">
      <span class="adminIcon"><i class="fa fa-user-cog"></i></span>
    </router-link>

  </div>
</template>

<style scoped>

body{
  background-color: #fff;
}

.auth{
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url('../assets/groupomania.png');
  background-repeat: no-repeat;
  background-position: center;
}

.box{
  position: absolute;
  margin-top: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  
}

.box h2{
  margin: 0 0 30px;
  padding: 0;
  color: #ffffff;
  text-align: center;
}

.box .inputBox{
  position: relative;
}

.box .inputBox input{
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #ffffff;
  outline: none;
  background: transparent;
}

.box .inputBox label{
  position: absolute;
  top:-27px;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #ffffff;
  pointer-events: none;
  transition: .5s;
}

.box .inputBox .menuGenre{
  transition: .5s;
  padding: 10px 20px;
  width: 100%;
  background: transparent;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #ffffff;
  outline: none;
  font-size: 16px;
  color: #ffffff;
}

.box .inputBox input:focus ~ label, .box .inputBox .menuGenre:focus ~ label{
  left: 0;
  color: rgb(255, 106, 0);
  font-size: 12px;
}

.box input[type="submit"]{
  background: transparent;
  border:none;
  outline:none;
  color: #000000;
  background: rgb(255, 106, 0);
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;
}

.box input[type="submit"]:hover{
  opacity: 0.7;
}

.box .formP{
  color: #ffffff;
  font-size: 12px;
}

.box .formP .lienOrange{
  color: rgb(255, 106, 0);
  cursor: pointer;
}

.adminLink{
  position: absolute;
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  top: 10px;
  left: 10px;
  transition: .3s;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border: #fff 2px solid;
  border-radius: 50%;
}

.adminLink:hover{
  color: rgb(255, 106, 0);
}

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

</style>

<script>

import axios from 'axios'

export default {
  name: 'Auth',
  data() {
    return {
      fenetreSignUp: 0,

      authConnexion: null,
      passwordConnexion: null,
      emailValideConnexion: false,
      passwordValideConnexion: false,

      nom: null,
      prenom: null,
      email: null,
      password: null,
      pseudo: null,
      nomValide: false,
      prenomValide: false,
      emailValide: false,
      passwordValide: false,

      sendInscription: {},
      sendConnexion: {},
    }
  },

  methods: {
    changeFenetreSignUp(){ // Switcher de formulaire entre l'inscription et la connexion
      if (this.fenetreSignUp == 0) {
        this.fenetreSignUp = 1;
      } else {
        this.fenetreSignUp = 0;
      }
    },
    recuperationChampFormConnexion(){ // Vérification des données du formulaire de connexion
      if (this.authConnexion && this.passwordConnexion){
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.authConnexion)) {
          this.emailValideConnexion = true;
        }else{
          document.getElementById("authConnexion").setCustomValidity("Champ invalide");
          this.emailValideConnexion = false;
        }
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.passwordConnexion)) {
          this.passwordValideConnexion = true;
        }else{
          document.getElementById("passwordConnexion").setCustomValidity("Votre mot de passe doit comporter au moins huit caractères, une lettre et un chiffre");
          this.passwordValideConnexion = false;
        }
      }

      if (!this.authConnexion) {
        document.getElementById("authConnexion").setAttribute("required", "");
      }
      if (!this.passwordConnexion) {
        document.getElementById("passwordConnexion").setAttribute("required", "");
      }

      if(this.emailValideConnexion && this.passwordValideConnexion){
        this.sendConnexion = {email : this.authConnexion, password : this.passwordConnexion}
        this.envoiFormAuthentification(this.sendConnexion, '/login');
      }
    },
    recuperationChampFormInscription(){ // Vérification des données du formulaire d'inscription
      if (this.nom && this.prenom && this.email && this.password) {

         if (/^([a-zA-Z]){2,15}$/.test(this.nom)) {
           this.nomValide = true;
         }else{
           document.getElementById("nom").setCustomValidity("Champ invalide");
           this.nomValide = false;
         }

         if (/^([a-zA-Z]){2,15}$/.test(this.prenom)) {
           this.prenomValide = true;
         }else{
           document.getElementById("prenom").setCustomValidity("Champ invalide");
           this.prenomValide = false;
         }

         if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
           this.emailValide = true;
         }else{
           document.getElementById("email").setCustomValidity("Champ invalide");
           this.emailValide = false;
         }

         if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
           this.passwordValide = true;
         }else{
           document.getElementById("password").setCustomValidity("Votre mot de passe doit comporter au moins huit caractères, une lettre et un chiffre");
           this.passwordValide = false;
         }
         
         if(this.nomValide && this.prenomValide && this.emailValide && this.passwordValide){
           this.sendInscription = {nom : this.nom, prenom : this.prenom, email : this.email, pseudo : this.pseudo, password : this.password}
           this.envoiFormAuthentification(this.sendInscription, '/signup');
          }
         
      }

      if (!this.nom) {
        document.getElementById("nom").setAttribute("required", "");
      }
      if (!this.prenom) {
        document.getElementById("prenom").setAttribute("required", "");
      }
      if (!this.email) {
        document.getElementById("email").setAttribute("required", "");
      }
      if (!this.password) {
        document.getElementById("password").setAttribute("required", "");
      }
      
    },

    envoiFormAuthentification(objetSend, url){ // Requète pour la connexion ou l'inscription de l'utilisateur en fonction des données envoyées
      axios
      .post('http://localhost:3000/auth'+url, objetSend, {
        headers:{
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        if (response.data.status =="userInconnu" || response.data.status =="passwordInvalide") {
          alert(response.data.message);          
        }else if(response.data.status == "OK"){
          alert(response.data.message);
          this.fenetreSignUp = 0;
        }else if(response.data.status == "profilAutorise"){ // Les variables dans le store sont modifiées 
          this.$store.commit('MUTATION_USERID', response.data.userId);
          this.$store.commit('MUTATION_TOKEN', response.data.token);
          this.$store.commit('MUTATION_CONNEXION', true);
          this.$store.commit('MUTATION_NOM', response.data.nom);
          this.$store.commit('MUTATION_PRENOM', response.data.prenom);
          this.$router.push({ name: 'Home' });

          console.log(this.$store.state.userId +": "+ this.$store.state.token)
        }else{
          throw new Error("Valeurs non reconnues");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

  },
}
</script>
