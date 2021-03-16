<template>
  <div class="signup">
      <h2>Inscription</h2>
        <section id="formulaire" class="text-center text-white mt-5">
          <form class="col-6 m-auto">
              <div class="form-row">
                  <div class="form-group col-6">
                      <label for="inputPrenom"></label>
                      <input type="text" class="form" placeholder="prenom" id="inputPrenom">
                  </div>
                  <div class="form-group col-6">
                      <label for="inputNom"></label>
                      <input type="text" class="form" id="inputNom" placeholder="Nom">
                  </div>
              </div>
              <div id="email" class="form-group">
                  <label for="inputEmail"></label>
                  <input type="email" class="form" id="inputEmail" placeholder="adresse@mail.com">
              </div>
              <div id="pseudo" class="form-group">
                <label for="inputPseudo"></label>
                <input type="text" class="form" id="inputPseudo" placeholder="Pseudo">
            </div>
            <div id="password" class="form-group">
              <label for="inputPassword"></label>
              <input type="password" class="form" id="inputPassword" placeholder="Mot de passe">
          </div>
              <button id="envoyer" type="button" class="btn btn-primary">S'INSCRIRE</button>
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
           this.sendInscription = {nom : this.nom, prenom : this.prenom, email : this.email, password : this.password, genre: this.genre}
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
      .post('http://localhost:3000/api/auth'+url, objetSend, {
        headers:{
          "Content-Type": "application/json",
        }
      })
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

  }