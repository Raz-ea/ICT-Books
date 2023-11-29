<script setup>
import { onMounted, ref } from 'vue';
import { query, collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore"
import db from '@/firebase/init.js'

const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const newBook = ref({
  title: "",
  author: "",
  imageUrl: ""
});
const deleteBookTitle = ref("");
const bookList = ref([]);

onMounted(() => {
  getSavedBooks();
});

// Create
async function createBook() {
  const docRef = doc(db, 'books', newBook.value.title);
  await setDoc(docRef, newBook.value);

  showCreateModal.value = false;
  newBook.value.title = "";
  newBook.value.author = "";
  newBook.value.imageUrl = "";

  getSavedBooks();
}

// Delete
async function deleteBook() {
  if (!!deleteBookTitle.value) {
    await deleteDoc(doc(db, 'books', deleteBookTitle.value));
    showDeleteModal.value = false;
    deleteBookTitle.value = "";
    getSavedBooks();
  }
}

// Read
async function getSavedBooks() {
  const colRef = collection(db, 'books');
  const bookQuery = await getDocs(query(colRef));

  bookList.value = [];
  bookQuery.forEach((doc) => {
    bookList.value.push(doc.data());
  })
}
</script>

<template>
  <header>
    <h1>Books</h1>
  </header>
  <main>
    <section class="book-list">
      <h3>Favourite Books</h3>
      <div class="action-buttons">
        <button 
          v-if="!showCreateModal && !showDeleteModal"
          @click="showCreateModal = true"
        >
          New Entry
        </button>
        <button 
          v-if="!showCreateModal && !showDeleteModal"
          @click="showDeleteModal = true"
        >
          Delete Entry
        </button>
      </div>
      <div class="book-card-container">
        <div class="book-card" v-for="book in bookList" :key="book.id">
          <div class="book-title-container">
            <h5 class="book-title">{{ book.title }}</h5>
            <div class="book-author"><i>{{ book.author }}</i></div>
          </div>
          <img class="book-image" :src="book.imageUrl" alt="Book cover"/>
        </div>
      </div>
    </section>

    <section class="new-book" v-if="showCreateModal">
      <div>
        <label>Book Title:</label>
        <input v-model="newBook.title"/>
      </div>
      <div>
        <label>Author:</label>
        <input v-model="newBook.author"/>
      </div>
      <div>
        <label>Image Url:</label>
        <input v-model="newBook.imageUrl"/>
      </div>
      <button @click="createBook()">Save</button>
      <button @click="showCreateModal = false">Cancel</button>
    </section>

    <section class="delete-book" v-if="showDeleteModal">
      <select v-model="deleteBookTitle">
        <option v-for="book in bookList" :key="book.id" :value="book.title">
          {{ book.title }}
        </option>
      </select>
      <button @click="deleteBook()">Delete</button>
      <button @click="showDeleteModal = false">Cancel</button>
    </section>
  </main>
</template>


