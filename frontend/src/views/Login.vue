<template>
      <div class="login">
      <h2>Identification</h2>
        <section id="formulaire" class="text-center text-white mt-5">
          <form class="col-3 m-auto">
              <div id="auth">
                  <label for="inputIdentifiant"></label>
                  <input type="text" id="authConnexion" class="form" placeholder="Adresse email / Pseudo">
              </div>
              <div id="email">
                <label for="inputPassword"></label>
                <input type="password" id="passwordConnexion" class="form" placeholder="Mot de passe">
            </div>
              <input type="submit" name="" value="SE CONNECTER" @click="sendFormConnexion">
          </form>
        </section>
      </div>
</template>

<style>
  .form{
  background-color: #FEFBC5;
  border-radius: 5px; 
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      authConnexion: null,
      passwordConnexion: null,
      authValideConnexion: false,
      passwordValideConnexion: false,

      sendConnexion: {},
    }
  },
  methods: { 
  sendFormConnexion(){ // Vérification des données du formulaire de connexion
      if (this.authConnexion && this.passwordConnexion){
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.authConnexion)) {
          this.authValideConnexion = true;
        }else{
          document.getElementById("authConnexion").setCustomValidity("Champ invalide");
          this.authValideConnexion = false;
        }
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.passwordConnexion)) {
          this.passwordValideConnexion = true;
        }else{
          document.getElementById("passwordConnexion").setCustomValidity("Votre mot de passe doit comporter au moins huit caractères, une lettre majuscule et minscule et un chiffre");
          this.passwordValideConnexion = false;
        }
      }

      if (!this.autlConnexion) {
        document.getElementById("authConnexion").setAttribute("required", "");
      }
      if (!this.passwordConnexion) {
        document.getElementById("passwordConnexion").setAttribute("required", "");
      }

      if(this.authValideConnexion && this.passwordValideConnexion){
        this.sendConnexion = {auth : this.authConnexion, password : this.passwordConnexion}
        this.envoiFormAuthentification(this.sendConnexion, '/#login/home');
      }
    },

    envoiFormAuthentification(objetSend, url){ // Requète pour la connexion ou l'inscription de l'utilisateur en fonction des données envoyées
      axios
      .post('http://localhost:3000/auth/login'+url, objetSend, {
        headers:{
          "Content-Type": "application/json",
        }
      })
    }
  }
}
</script>

.then(response => {
        if (response.data.statut == "error" || response.data.statut =="inconnu"|| response.data.statut =="pwdInvalide") {
          alert(response.data.message);          
        }else if(response.data.statut == "OK"){
          alert(response.data.message);
          this.fenetreSignUp = 0;
        }else if(response.data.statut == "profilValide"){ // Les variables dans le store sont modifiées 
          this.$store.commit('MUTATION_USERID', response.data.userId);
          this.$store.commit('MUTATION_TOKEN', response.data.token);
          this.$store.commit('MUTATION_CONNEXION', true);
          this.$store.commit('MUTATION_NOM', response.data.nom);
          this.$store.commit('MUTATION_PRENOM', response.data.prenom);
          this.$store.commit('MUTATION_URL_PHOTO_PROFIL', response.data.urlPhotoProfil);
          this.$router.push({ name: 'Home' });

          //console.log(this.$store.state.userID +": "+ this.$store.state.token)
        }else{
          throw new Error("Valeurs non reconnues");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }