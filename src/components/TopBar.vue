<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="dark" dark v-bind="attrs" v-on="on">
          Usuário
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 3" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }} </v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logOff">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",
  data: () => ({
    drawer: null,
  }),
  methods: {
    logOff() {
      this.$router.push("/login");
      localStorage.removeItem("authtoken");
      this.$store.dispatch("setUser", {});
    },
  },
};
</script>

<style>
</style>