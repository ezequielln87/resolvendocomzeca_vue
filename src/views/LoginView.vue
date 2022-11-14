<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="email" label="Email"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="senha"
                    label="Senha"
                    type="password"
                    v-on:keyup.enter="submit"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="blue darken-1" text @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    submit() {
      this.$http.post("token/", {
        username: this.email,
        password: this.senha,
      }).then((response) => {
        if (response.status != 200) {
          return;
        }
        // console.log(response.data);
        let token = response.data.access;
        console.log(token);
        this.$http.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem("authtoken", token);
        this.$store.dispatch("setUser", { token: token });
        // console.log(this.$store.getters.getAccess);
        this.$router.push({ name: "clienteslist" });
      });
   
    },
    ...mapActions(["login"]),
    
  },
};
</script>

<style>
</style>