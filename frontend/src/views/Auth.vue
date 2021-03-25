<template>
  <div v-if="fenetreSignUp == 0" class="admin">
    <router-link to="/admin">
      <span class="adminLien">Administrateur</span>
    </router-link>
  </div>
  <div class="auth">

    <transition appear name="fade" mode="out-in">

    <div class="box" v-if="fenetreSignUp == 0" key="connexion">
    <img class="imgTitle" src='../assets/groupomania.png'/>
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

        <div class="marginInput">
          <input type="submit" value="Valider" @click="recuperationChampFormConnexion">
        </div>

      </form>

      <p class="formLienAuth">Pas encore inscrit ? Inscrivez vous en cliquant <span class="lienRouge" @click="changeFenetreSignUp">ici</span> !</p>

    </div>
    

    <div class="box" v-else key="inscription">
      <img class="imgTitle" src='../assets/groupomania.png'/>
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

        <div class="marginInput">
          <input type="submit" value="Valider" @click="recuperationChampFormInscription">
        </div>
         
      </form>

      <p class="formLienAuth">Déjà inscrit ? Connectez vous en cliquant <span class="lienRouge" @click="changeFenetreSignUp">ici</span> !</p>
      
    </div>

    </transition>

  </div>
</template>

<style scoped>

body{
  background-color: #ffffff;
}

.imgTitle{
  position: relative;
  width:20%;
  item-align: center;
  margin: 15px;
  padding-left: 115px;
}

.admin{
    margin-left: 10px;
    margin-top: 40px;
    text-align: center;
    text-decoration: none;   
}

.adminLien{
  background-color: #000000;
  text-decoration: none;
  Padding: 10px;
  border-radius: 5px;
  color: white;
}

.auth{
  width: 100%;
  height: 100vh;
  margin:0;
  padding:0;
  font-family: sans-serif;
  background-position: center;
}

.box{
  position: absolute;
  margin-top: 30px;
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

.box input[type="submit"]{
  background: transparent;
  border:none;
  outline:none;
  color: #000000;
  background: rgb(230, 20, 0);
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;
}

.box input[type="submit"]:hover{
  opacity: 0.7;
}

.box .formLienAuth{
  color: #ffffff;
  font-size: 12px;
}

.box .formLienAuth .lienRouge{
  color: rgb(230, 20, 0);
  cursor: pointer;
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
      pseudoValide: true,
      passwordValide: false,

      sendInscription: {},
      sendConnexion: {},
    }
  },

  beforeMount(){ // Reset des variables dans le store
    this.$store.commit('MUTATION_CONNEXION', false);
    this.$store.commit('MUTATION_CONNEXION_ADMIN', false);
    this.$store.commit('MUTATION_USERID', null);
    this.$store.commit('MUTATION_TOKEN', null);
    document.getElementById("conteneur").style.marginLeft = "0";
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
           document.getElementById("nom").setCustomValidity("Champ nom invalide");
           this.nomValide = false;
         }

         if (/^([a-zA-Z]){2,15}$/.test(this.prenom)) {
           this.prenomValide = true;
         }else{
           document.getElementById("prenom").setCustomValidity("Champ prénom invalide");
           this.prenomValide = false;
         }

         if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
           this.emailValide = true;
         }else{
           document.getElementById("email").setCustomValidity("Champ email invalide");
           this.emailValide = false;
         }

         if (/^([a-zA-Z]){2,15}$/.test(this.pseudo)) {
           this.pseudoValide = true;
         }else{
           document.getElementById("pseudo").setCustomValidity("Champ pseudo invalide");
           this.pseudoValide = false;
         }

         if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
           this.passwordValide = true;
         }else{
           document.getElementById("password").setCustomValidity("Votre mot de passe doit comporter au moins huit caractères, une lettre et un chiffre");
           this.passwordValide = false;
         }
         
         if(this.nomValide && this.prenomValide && this.emailValide && this.passwordValide){
           this.sendInscription = {nom : this.nom, prenom : this.prenom, email : this.email, pseudo : this.pseudo, password : this.password}
           alert("Utilisateur créé !");
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
          window.location.reload();         
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
