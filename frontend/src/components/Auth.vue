<template>
    <main class="auth">
      <div id="login">
        <nav class="row text-white text-center">
          <div class="col-12 text-end mb-3 shadow-lg">
            <div class="text-white font-weight-bold">Login</div>
          </div>
        </nav>
        <section id="formulaire" class="text-center text-white mt-5">
          <form class="col-3 m-auto">
              <div id="auth" class="form-group">
                  <label for="inputIdentifiant">Identifiant</label>
                  <input type="text" class="form-control" id="inputIdentifiant" placeholder="Adresse email / Pseudo">
              </div>
              <div id="email" class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="exemple@mail.com">
            </div>
              <!-- Boutton de connextion -->
              <button id="envoyer" type="button" class="btn btn-primary">SE CONNECTER</button>
          </form>
        </section>
      </div>

      <div id="signup"></div>
        <nav class="row text-white text-center">
          <div class="col-12 text-end mb-3 shadow-lg">
            <div class="text-white font-weight-bold">Signup</div>
          </div>
        </nav>
        <section id="formulaire" class="text-center text-white mt-5">
          <form class="col-6 m-auto">
              <div class="form-row">
                  <div class="form-group col-6">
                      <label for="inputPrenom">Prénom</label>
                      <input type="text" class="form-control" placeholder="prenom" id="inputPrenom">
                  </div>
                  <div class="form-group col-6">
                      <label for="inputNom">Nom</label>
                      <input type="text" class="form-control" id="inputNom" placeholder="Nom">
                  </div>
              </div>
              <div id="email" class="form-group">
                  <label for="inputEmail">Adresse email</label>
                  <input type="email" class="form-control" id="inputEmail" placeholder="exemple@mail.com">
              </div>
              <div id="pseudo" class="form-group">
                <label for="inputPseudo">Pseudo</label>
                <input type="text" class="form-control" id="inputPseudo" placeholder="Pseudo">
            </div>
            <div id="password" class="form-group">
              <label for="inputPassword">Mot de passe</label>
              <input type="text" class="form-control" id="inputPassword" placeholder="Mot de passe">
          </div>
              <!-- Boutton d'envoi du formulaire -->
              <button id="envoyer" type="button" class="btn btn-primary">S'INSCRIRE</button>
          </form>
        </section>
    </main>
</template>

<script>
export default {
	name: "Auth",
	props: ["titleApp"],
}
</script>