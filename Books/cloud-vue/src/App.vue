<script setup>
import { onMounted, ref } from 'vue';
import { query, collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore"
import db from '@/firebase/init.js'

const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const newFlower = ref(
  {
    name: "",
    symbolism: "",
    imageUrl: ""
  }
);
const deleteFlowerName = ref("");
const flowerList = ref([]);

onMounted(() => {
  getSavedFlowers();
});

//Create
async function createFlower() {
  const docRef = doc(db, 'flowers', newFlower.value.name);
  await setDoc(docRef, newFlower.value);

  showCreateModal.value = false;
  newFlower.value.name = "";
  newFlower.value.symbolism = "";
  newFlower.value.imageUrl = "";

  getSavedFlowers();
}

//Delete
async function deleteFlower() {
  if (!!deleteFlowerName.value) {
    await deleteDoc(doc(db, 'flowers', deleteFlowerName.value));
    showDeleteModal = false;
    deleteFlowerName.value = "";
    getSavedFlowers();
  }
}

//Read
async function getSavedFlowers() {
  const colRef = collection(db, 'flowers');
  const flowerQuery = await getDocs(query(colRef));

  flowerList.value = [];
  flowerQuery.forEach((doc) => {
    flowerList.value.push(doc.data());
  })
}

</script>

<template>
  <header>
    <h1 class="title">⚘ Flowers ⚘</h1>
  </header>
  <main>
    <section class="flower-list">
      <h3>My Favourite Flowers</h3>
      <div class="flower-card-container">
        <div class="flower-card" v-for="flower in flowerList">
          <div class="flower-title-container">
            <h5 class="flower-title">{{ flower.name }}</h5>
            <div class="flower-symbolism"><i>{{ flower.symbolism }}</i></div>
          </div>
          <img class="flower-image" :src="flower.imageUrl"/>
        </div>
      </div>
      <button 
        v-if="!showCreateModal && !showDeleteModal"
        @click="showCreateModal = true"
      >
        New Entry
      </button>
      <button
        class="cancel"
        v-if="!showCreateModal && !showDeleteModal"
        @click="showDeleteModal = true"
      >
        Delete Entry
      </button>
    </section>

    <section class="new-flower" v-if="showCreateModal">
      <div>
        <label>Flower Name:</label>
        <input v-model="newFlower.name"/>
      </div>
      <div>
        <label>Symbolism:</label>
        <input v-model="newFlower.symbolism"/>
      </div>
      <div>
        <label>Image Url:</label>
        <input v-model="newFlower.imageUrl"/>
      </div>
      <button @click="createFlower()">Save</button>
      <button class="cancel" @click="showCreateModal = false">Cancel</button>
    </section>

    <section class="delete-flower" v-if="showDeleteModal">
      <select v-model="deleteFlowerName">
        <option v-for="flower in flowerList" :key="flower.id" :value="flower.name">
          {{ flower.name }}
        </option>
      </select>
      <button @click="deleteFlower()">Delete</button>
      <button class="cancel"   @click="showDeleteModal = false">Cancel</button>
    </section>
  </main>
</template>