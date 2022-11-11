

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="display-1 font-weight-bold mb-3">Clientes</h1>
      </v-col>
      <v-col>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo Cliente
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline"></span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="clientes.nome"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="clientes.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="clientes.telefone"
                      label="Telefone"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn> -->
              <!-- <v-btn color="blue darken-1" text @click="salvarCliente">Salvar</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="clientes"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Recargar </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// clientes api get
import axios from "axios";
// nome, cpf, email, telefone

export default {
  name: "ClientesList",
  data: () => ({
    dialog: false,
    clientes: [],
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "nome",
      },
      { text: "CPF", value: "cpf" },
      { text: "Email", value: "email" },
      { text: "Telefone", value: "telefone" },
      { text: "Ações", value: "actions", sortable: false },
    ],
  }),
  created() {
    this.getClientes();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Item" : "Editando Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  
  methods: {
    getClientes() {
      this.$http.get("clientelist/").then((response) => {
        this.clientes = response.data;
      });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
  //actions
  editItem(item) {
    alert("Edit " + item.nome);
  },
  deleteItem(item) {
    alert("Delete " + item.nome);
  },
  //buttons
  novoCliente() {
    this.dialog = true;
  },

  eliminarCliente(id) {
    console.log(id);
    axios
      .delete(`http://127.0.0.1:8000/api/clientedelete/${id}`)
      .then((res) => {
        console.log(res);
        this.getClientes();
      });
    console.log("aham");
  },

  initialize() {
    this.getClientes();
  },
};
</script>
