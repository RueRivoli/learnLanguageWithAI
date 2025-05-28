<template>
  <section class="max-w-md mx-auto mt-2 px-2 py-4 text-center">
    <!-- Users count -->
    <!-- <p class="text-gray-600 mb-4 font-semibold">
      Used by <span class="text-indigo-600">400 persons</span>
    </p> -->

    <!-- Avatar group -->
    <div class="flex justify-center -space-x-4 mb-6">
      <img
        v-for="(user, index) in users"
        :key="index"
        :src="user.avatar"
        :alt="user.name"
        class="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-md hover:z-10 transition-transform duration-200 hover:scale-110 cursor-pointer"
        :title="user.name"
      />
      <div
        class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold ring-2 ring-white shadow-md cursor-default"
        title="More users"
      >
        +{{ extraCount }}
      </div>
    </div>

    <!-- Star rating -->
    <div class="flex items-center justify-center space-x-2 mb-2">
      <div class="rating">
        <input
          type="radio"
          name="rating-4"
          class="mask mask-star-2 bg-green-500"
          aria-label="1 star"
          disabled
        />
        <input
          type="radio"
          name="rating-4"
          class="mask mask-star-2 bg-green-500"
          aria-label="2 star"
          disabled
        />
        <input
          type="radio"
          name="rating-4"
          class="mask mask-star-2 bg-green-500"
          aria-label="3 star"
          disabled
        />
        <input
          type="radio"
          name="rating-4"
          class="mask mask-star-2 bg-green-500"
          aria-label="4 star"
          disabled
        />
        <input
          type="radio"
          name="rating-4"
          class="mask mask-star-2 bg-green-500"
          aria-label="5 star"
          disabled
          checked="checked"
        />
      </div>
    </div>

    <!-- Number of reviews -->
    <p class="text-gray-500 text-sm">Based on {{ reviewsCount }} reviews</p>
  </section>
</template>

<script setup>
const users = [
  {
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Michael Smith",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const totalUsers = 400;
const displayedUsersCount = users.length;
const extraCount = totalUsers - displayedUsersCount;

const rating = 5;
const reviewsCount = 102;
</script>
