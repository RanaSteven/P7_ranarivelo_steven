<template>
<div class="admin">
    <router-link to="/auth">
      <span class="adminLien">Utilisateur</span>
    </router-link>
</div>

<div class="auth">
  <div class="box">
    <img class="imgTitle" src='../assets/groupomania.png'/>
      <h2>Connexion Administrateur</h2>
      <form name="ConnexionForm" onsubmit="return false;">

        <div class="inputBox">
          <input type="email" v-model="email" id="email">
          <label>Email</label>
        </div>

        <div class="inputBox">
          <input type="password" v-model="password" id="password">
          <label>Mot de passe</label>
        </div>

        <input type="submit" value="Valider" @click="submitAdmin">
      </form>
    </div>
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
  name: 'AdminLogin',
  data() {
    return {
      email: null,
      password: null,
      emailValideConnexion: false,
      passwordValideConnexion: false,
      sendConnexion: {},
    }
  },
  beforeMount(){ // Reset des variables dans le store
    this.$store.commit('MUTATION_CONNEXION', false);
    this.$store.commit('MUTATION_CONNEXION_ADMIN', false);
    this.$store.commit('MUTATION_USERID', null);
    this.$store.commit('MUTATION_TOKEN', null);
  },
  methods: {
    submitAdmin(){ // Vérification des données du formulaire
      if (this.email && this.password){
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          this.emailValideConnexion = true;
        }else{
          document.getElementById("email").setCustomValidity("Champ invalide");
          this.emailValideConnexion = false;
        }
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
          this.passwordValideConnexion = true;
        }else{
          document.getElementById("password").setCustomValidity("Votre mot de passe doit comporter au moins huit caractères, une lettre et un chiffre");
          this.passwordValideConnexion = false;
        }
      }

      if (!this.email) {
        document.getElementById("email").setAttribute("required", "");
      }
      if (!this.password) {
        document.getElementById("password").setAttribute("required", "");
      }

      if(this.emailValideConnexion && this.passwordValideConnexion){
        this.sendConnexion = {email : this.email, password : this.password}
        this.authAdmin(this.sendConnexion);
      }

    },
    authAdmin(objetSend){ // Requète pour la connexion de l'admin
      axios
      .post('http://localhost:3000/auth/loginAdmin', objetSend, {
        headers:{
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        if (response.data.status =="userInconnu" || response.data.status =="passwordInvalide") {
          alert(response.data.message);          
        }else if(response.data.status == "profilAutorise"){ // Les variables dans le store sont modifiées 
          this.$store.commit('MUTATION_USERID', response.data.userId);
          this.$store.commit('MUTATION_TOKEN', response.data.token);
          this.$store.commit('MUTATION_CONNEXION_ADMIN', true);
          this.$store.commit('MUTATION_NOM', response.data.nom);
          this.$store.commit('MUTATION_PRENOM', response.data.prenom);
          this.$router.push({ name: 'AdminHome' });
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