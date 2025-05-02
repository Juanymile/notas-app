<template>
  <div class="container">
    <h2>Notas</h2>

    <ul class="nota-list">
      <li v-for="nota in notas" :key="nota.id" class="nota-item">
        <strong>{{ nota.titulo }}</strong>: {{ nota.contenido }}
      </li>
    </ul>

    <h3>Agregar Nota</h3>
    <form @submit.prevent="submitNota" class="nota-form">
      <input
        v-model="newNota.titulo"
        placeholder="Título"
        required
        class="input"
      />
      <textarea
        v-model="newNota.contenido"
        placeholder="Contenido"
        required
        class="textarea"
      ></textarea>
      <button type="submit" class="button">Guardar</button>
    </form>
  </div>
</template>

<script>
import { getNotas, createNota } from '../services/notaService';

export default {
  data() {
    return {
      notas: [],
      newNota: {
        titulo: '',
        contenido: ''
      }
    };
  },
  mounted() {
    this.fetchNotas();
  },
  methods: {
    fetchNotas() {
      getNotas()
        .then(response => {
          this.notas = response.data;
        })
        .catch(error => {
          console.error('Error fetching notas:', error);
        });
    },
    submitNota() {
      if (!this.newNota.titulo || !this.newNota.contenido) return;

      createNota(this.newNota)
        .then(response => {
          this.notas.push(response.data);
          this.newNota.titulo = '';
          this.newNota.contenido = '';
        })
        .catch(error => {
          console.error('Error creating nota:', error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

h2,
h3 {
  color: #333;
}

.nota-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.nota-item {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.nota-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input,
.textarea {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.button {
  width: 100px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #1b5e20;
}
</style>
