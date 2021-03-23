<template>
  <div class="menuList">
    <ul class="menuSettings">
      <li class="onglet" id="changeProfile" @click="changeFenetreModif">Informations générales | Mot de passe/Supprimer compte</li>
    </ul>
  </div>

    <div class="box" v-if="fenetreModif == 0" key="modifProfil">
      <h2>Informations générales</h2>
      <form name="modifProfilForm">
        <div class="inputBox">
          <input type="text" v-model="prenom" id="prenom"> Steven
          <label>Prénom</label>
        </div>
        <div class="inputBox">
          <input type="text" v-model="nom" id="nom">
          <label>Nom</label>
        </div>
        <div class="inputBox">
          <input type="text" v-model="pseudo" id="pseudo">
          <label>Pseudo</label>
        </div>
        <input type="submit" name="" value="Valider" @click="recuperationModifProfilForm">
      </form>
    </div>
    
    <div class="box" v-else key="modifPassword">
      <h2>Nouveau mot de passe</h2>
      <form name="modifPasswordForm">
        <div class="inputBox">
          <input type="password" v-model="password" id="password">
          <label>Nouveau mot de passe</label>
        </div>
      <input type="submit" name="" value="Valider" @click="recuperationModifPasswordForm">
      </form>
    </div>

    <div class="box" key="deleteUser">
      <h2>Supprimer le compte</h2>
      <form name="deleteUserForm">
        <div class="inputBox">
          <input id="deleteUser" type="submit" value="Supprimer" @click="deleteUser">
          <label style="color:red;">Cette action est irreversible.</label>
        </div>
      </form>
    </div>
</template>

<style scoped>

.menuList{
  margin-top:100px;
  margin-x:auto;
}

.menuSettings{
  color: white;
  list-style: none;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.menuSettings li{
  display:inline-block;
  margin: auto 5px;
  transition: .5s;
}

.menuSettings .onglet:hover{
  color: rgb(230, 20, 0);
  cursor: pointer;
}

.box{
  margin: 50px auto;
  width: 90%;
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-family: 'Open Sans', sans-serif;
}

@media screen and (max-width: 640px) {
  .box {
    width: 100%;
    font-size:13px
  }
}

.box h2{
  margin: 0 0 30px;
  padding: 0;
  color: #ffffff;
  text-align: center;
  font-family: 'Poppins', sans-serif;
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

.box .inputBox input:focus ~ label{
  left: 0;
  color: rgb(230, 230, 0);
  font-size: 12px;
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

.inputDelete{
  text-align: center;
}

#deleteUser{
  width: 120px;
  margin-top: 70px;
  background-color: red;
}

.supprCompteTitre{
  background-color: #000;
  box-shadow: black 0px 0px 5px;
  padding: 5px;
} 
</style>

<script>
import axios from 'axios'

export default {
  name: 'Settings',
  data() {
    return {
      loading: true,
      fenetreModif: 0,

      nom: "",
      prenom: "",
      pseudo: "",
      password: "",

      nomValide: false,
      prenomValide: false,
      pseudoValide: false,
      passwordValide: false,

      sendModifProfil: {},
      sendModifPassword: {},
    }
  },
  beforeMount() {
    if(this.$store.state.connexion == true){
      document.getElementById("conteneur").style.margin = "auto";
    }else{
      this.$router.push({ name: 'Auth' });
    }
  },
  
  methods: {
    changeFenetreModif(){ // Switcher de formulaire de modification
      if (this.fenetreModif == 0) {
        this.fenetreModif = 1;

      } else {
        this.fenetreModif = 0;
      }
    },
    recuperationModifProfilForm(){ // On récupère les informations du profil et on vérifie qu'elles sont conformes
      if (this.nom && this.prenom && this.pseudo) {

        if (/^([a-zA-Z]){2,15}$/.test(this.prenom)) {
          this.prenomValide = true;
        }else{
          document.getElementById("prenom").setCustomValidity("Champ invalide");
          this.prenomValide = false;
        }

        if (/^([a-zA-Z]){2,15}$/.test(this.nom)) {
          this.nomValide = true;
        }else{
          document.getElementById("nom").setCustomValidity("Champ invalide");
          this.nomValide = false;
        }

        if (/^([a-zA-Z]){2,15}$/.test(this.pseudo)) {
          this.pseudoValide = true;
        }else{
          document.getElementById("pseudo").setCustomValidity("Champ invalide");
          this.pseudoValide = false;
        }
         
        if(this.prenomValide && this.nomValide && this.pseudoValide){
          this.sendModifProfil = {prenom : this.prenom, nom : this.nom, pseudo : this.pseud}
          this.envoiModifProfil();
        }       
      }
    },

    recuperationModifPasswordForm(){ // On récupère le nouveau mdp et on vérifie qu'il soit conforme
      if (this.password) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
           this.passwordValide = true;
        }else{
           document.getElementById("password").setCustomValidity("Votre mot de passe doit comporter au moins huit caractères, une lettre et un chiffre");
           this.passwordValide = false;
        }

        if(this.passwordValide){
          this.sendModifPassword = {password: this.password}
          this.envoiModifPassword();
        }       
         
      }
    },

    envoiModifProfil(){
      if (this.prenom != "" && this.nom != "" && this.pseudo != ""){
        axios
        .put("http://localhost:3000/user/modifyProfile/" + this.$store.state.userId, {
          prenom: this.prenom,
          nom: this.nom,
          pseudo: this.pseudo,
        },
        {  
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json",
          }
        })
        .then(
          alert("Modifications sauvegardées !"),
          window.location.reload(),
        )
        .catch(function (error) {
          console.log(error); 
        });
      }
      else{
        alert("Un des éléments n'a pas été renseigné !");
      }
    },

    envoiModifPassword(){ // Envoi des modifications du mdp via une requete PUT

      axios
      .put("http://localhost:3000/user/modifyPassword/" + this.$store.state.userId, {
        password: this.password,
      },
      {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(
        alert("Modification du mot de passe effectuée !"),
        window.location.reload()
      )
      .catch(function (error) {
        console.log(error); 
      });
    },


    deleteUser(){ // Supression d'un utilisateur via une requete DELETE
      console.log(this.$store.state.userId)
      axios
      .delete('http://localhost:3000/user/delete/' + this.$store.state.userId, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          "Content-Type": "application/json",
        }
      })
      .then(
        alert("Compte supprimée"),
        this.$router.push({ name: 'Auth' })
      )
      .catch(function (error) {
        console.log(error);
      });
    },
  },
  
}
</script>