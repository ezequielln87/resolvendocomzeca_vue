<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <!-- image avatar -->
              <v-row>
                <v-col cols="12">
                  <!-- input file avatar variavel  -->

                  <!-- image avatar selected-->
                  <v-row>
                    <v-col cols="5">
                      Imagem:
                      <v-img
                        :src="avatarImage"
                        max-width="100%"
                        max-height="100%"
                        contain
                      ></v-img>
                      <v-file-input
                        v-model="files"
                        color="deep-purple accent-4"
                        counter
                        label="File input"
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </v-col>
                    <v-col cols="7">
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.username"
                              label="Usuário"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.first_name"
                              label="Nome"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.last_name"
                              label="Último Nome"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.email"
                              label="Email"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-row>
                              <v-checkbox
                                v-model="perfil.is_superuser"
                                disabled
                                label="Administrador"
                              ></v-checkbox>
                              
                              <v-checkbox
                                v-model="perfil.is_staff"
                                disabled
                                label="Membro"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="perfil.is_active"
                                disabled
                                label="Ativo"
                              >
                              </v-checkbox>
                            </v-row>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.date_joined"
                              label="Data de Cadastro"
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field
                              v-model="perfil.last_login"
                              label="Último Login"
                              readonly
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  props: {},
  user: {
    id: 0,
    user: "",
    avatar: null,
  },
  name: "PerfilView",
  data() {
    return {
      files: [],
      perfil: {
        id: 1,
        is_superuser: true,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: false,
        is_active: false,
        date_joined: "",
        last_login: "",
      },
    };
  },

  methods: {
    async getPerfil() {
      try {
        this.user = await this.$store.getters.getUser.user.user_id;
        let response = await this.$http.get("user/detail/" + this.user + "/");
        this.perfil = response.data;
        Vue.use(require("vue-moment"));
        this.perfil.date_joined = this.$moment(this.perfil.date_joined).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        this.perfil.last_login = this.$moment(this.perfil.last_login).format(
          "DD/MM/YYYY HH:mm:ss"
        );
      } catch (error) {
        //redirect
        this.$router.push({ name: "login" });
      }
    },
    async getUser() {
      try {
        let idUser = await this.$store.getters.getUser.user.user_id;
        let response = await this.$http.get("user/image/" + idUser + "/");
        this.$store.commit("setUser", response.data);

        this.avatar = response.data.avatar;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getPerfil();
  },
  mounted() {
    this.getPerfil();
  },
  computed: {
    avatarImage() {
      this.getUser();
      return this.avatar === null ? 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png' : this.avatar;
    },
  },
};
</script>

<style>
</style>