<script setup lang="ts">
const client = useSupabaseClient();

const handleSignOut = async () => {
  const { error } = await client.auth.signOut();
  window.location.href = window.location.origin;
};
</script>

<template>
  <div class="h-16 navbar shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a>My lessons</a></li>
          <li><a>My stats</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <span class="text-xl">Learn Language with AI</span>
    </div>
    <div class="navbar-end">
      <!-- notifications -->
      <button class="btn btn-ghost btn-circle mr-5">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item" />
        </div>
      </button>
      <!-- Avatar menu -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <!-- <span class="badge">New</span> -->
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
            <div @click="handleSignOut">Log Out</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
