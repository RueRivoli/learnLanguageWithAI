<script setup lang="ts">
import {
  ArrowLeftCircleIcon,
  Bars3Icon,
  ChartBarIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
  DocumentIcon,
  ListBulletIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import {
  Dialog,
  DialogOverlay,
  TransitionRoot,
  TransitionChild,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/vue";

const client = useSupabaseClient();
const router = useRouter();

const handleSignOut = async () => {
  console.log("handleSignOut");
  const { error } = await client.auth.signOut();
  if (error) return;
  router.push("/");
};

const sideBarOpened = ref(false);
</script>

<template>
  <div class="min-h-screen flex bg-gray-200">
    <!-- Mobile NavBar -->
    <TransitionRoot :show="sideBarOpened">
      <Dialog
        as="div"
        class="fixed inset-0 z-40"
        @close="sideBarOpened = false"
      >
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-200 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-200 transform"
          leave-from="translate-x-0"
          leave-to=" -translate-x-full"
        >
          <div
            class="md:hidden z-10 h-full flex flex-col w-64 bg-gray-200 border-r border-gray-200"
          >
            <button
              class="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="button"
              value="closeSideBar"
              @click="sideBarOpened = false"
            >
              <XMarkIcon
                class="h-5 w-5 text-purple-400 group-hover:text-blue-600"
              />
            </button>
            <div class="pt-8 pb-4 px-6 text-gray-800 font-bold logo">
              <NuxtLink to="/">
                <span class="ml-2">
                  <span class="text-indigo-400 dark:text-white">Gramm</span>IA
                </span>
              </NuxtLink>
            </div>
            <div class="overflow-y-auto flex-1">
              <div class="mt-10 mb-10">
                <h3
                  class="mx-6 mb-2 text-xs text-gray-800 uppercase tracking-widest font-bold"
                >
                  My learnings
                </h3>
                <div class="px-1">
                  <NuxtLink
                    class="flex items-center px-6 py-2.5 text-indigo-600 group-hover:text-indigo-800 group"
                    to="/learning/new-lesson"
                  >
                    <PlusIcon
                      class="h-5 w-5 text-indigo-600 group-hover:text-indigo-800"
                    />
                    <span class="ml-2">New Lesson</span>
                  </NuxtLink>
                </div>
                <div class="px-1">
                  <NuxtLink
                    class="flex items-center px-6 py-2.5 text-indigo-600 group-hover:text-indigo-800 group"
                    to="/learning/lessons"
                  >
                    <DocumentIcon
                      class="h-5 w-5 text-indigo-600 group-hover:text-indigo-800"
                    />
                    <span class="ml-2">My lessons</span>
                  </NuxtLink>
                </div>
                <div class="px-1">
                  <NuxtLink
                    class="flex items-center px-6 py-2.5 text-indigo-600 group-hover:text-indigo-800 group"
                    to="/learning/my-grammar"
                  >
                    <Cog8ToothIcon
                      class="h-5 w-5 text-indigo-600 group-hover:text-indigo-800"
                    />
                    <span class="ml-2">My grammar</span>
                  </NuxtLink>
                </div>
                <div class="px-1">
                  <NuxtLink
                    class="flex items-center px-6 py-2.5 text-indigo-600 group-hover:text-indigo-800 group"
                    to="/learning/my-conjugation"
                  >
                    <ListBulletIcon
                      class="h-5 w-5 text-indigo-600 group-hover:text-indigo-800"
                    />
                    <span class="ml-2">My conjugation</span>
                  </NuxtLink>
                </div>
              </div>
              <div>
                <h3
                  class="mx-6 mb-2 text-xs text-gray-800 uppercase tracking-widest font-bold"
                >
                  My dashboard
                </h3>
              </div>

              <div class="px-1">
                <NuxtLink
                  class="flex items-center px-6 py-2.5 text-indigo-600 group-hover:text-indigo-800 group"
                  to="/learning/my-dashboard"
                >
                  <ChartBarIcon
                    class="h-5 w-5 text-indigo-600 group-hover:text-indigo-800"
                  />
                  <span class="ml-2">Progress</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-50" />
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
  <!-- Menu Icon opening the navbar for mobile views -->
  <div :open="!sideBarOpened" class="flex flex-col w-full md:hidden">
    <button
      class="flex-shrink-0 flex items-center justify-center px-2 py-2 w-10 h-10 rounded-full hover:ring-2 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      @click="sideBarOpened = true"
    >
      <Bars3Icon
        class="h-6 w-6 text-gray-400 text-indigo-600 group-hover:text-indigo-8000"
      />
    </button>
  </div>

  <!-- Desktop NavBar -->
  <div
    class="hidden md:block h-full w-72 flex-col justify-between bg-slate-100 dark:bg-indigo-800 border-r border-gray-200 dark:border-indigo-800"
    style="display: flex"
  >
    <div class="py-6 px-8 text-xl text-gray-800 dark:text-white logo">
      <NuxtLink to="/">
        <span class="ml-2">
          <span class="font-bold text-indigo-400 dark:text-white">Gramm</span>IA
        </span>
      </NuxtLink>
    </div>

    <div>
      <div class="px-4">
        <h3
          class="mx-6 mb-2 text-xs text-gray-800 dark:text-black uppercase tracking-widest font-bold"
        >
          My learnings
        </h3>
      </div>
      <div class="px-4">
        <NuxtLink
          class="flex items-center px-6 py-2 group hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
          to="/learning/newlesson"
        >
          <PlusIcon
            class="h-5 w-5 font-semibold text-stone-700 dark:text-white group-hover:text-white"
          />
          <span
            class="text-stone-700 dark:text-white font-semibold group-hover:text-white ml-2"
            >New Story</span
          >
        </NuxtLink>
      </div>
      <div class="px-4">
        <NuxtLink
          class="flex items-center px-6 py-2 group hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
          to="/learning/lessons"
        >
          <DocumentIcon
            class="h-5 w-5 font-semibold text-stone-700 dark:text-white group-hover:text-white"
          />
          <span
            class="text-stone-700 dark:text-white font-semibold group-hover:text-white ml-2"
            >Lessons</span
          >
        </NuxtLink>
      </div>

      <div class="px-4">
        <NuxtLink
          class="flex items-center px-6 py-2 group hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
          to="/learning/mygrammar"
        >
          <Cog8ToothIcon
            class="h-5 w-5 font-semibold dark:text-white text-stone-700 group-hover:text-white"
          />
          <span
            class="font-semibold ml-2 dark:text-white text-stone-700 group-hover:text-white"
            >Grammar</span
          >
        </NuxtLink>
      </div>
      <!-- <div class="px-4">
        <NuxtLink
          class="flex items-center px-6 py-2 group hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
          to="/learning/myconjugation"
        >
          <ListBulletIcon
            class="h-5 w-5 font-semibold dark:text-white text-stone-700 group-hover:text-white"
          />
          <span
            class="font-semibold ml-2 dark:text-white text-stone-700 group-hover:text-white"
            >Conjugation</span
          >
        </NuxtLink>
      </div> -->
    </div>

    <div>
      <div class="px-4">
        <h3
          class="mx-6 mb-2 text-xs text-gray-800 dark:text-black uppercase tracking-widest font-bold"
        >
          My dashboard
        </h3>
      </div>
      <div class="px-4">
        <NuxtLink
          class="flex items-center px-6 py-2 group hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
          to="/learning/dashboard"
        >
          <ChartBarIcon
            class="h-5 w-5 font-semibold text-stone-700 dark:text-white group-hover:text-white"
          />
          <span
            class="font-semibold ml-2 text-stone-700 dark:text-white group-hover:text-white"
            >Progress</span
          >
        </NuxtLink>
      </div>
    </div>
    <div class="h-50" />
    <div class="cursor-pointer relative focus:outline-hidden">
      <Menu v-slot="{ open }">
        <MenuButton>
          <div
            class="flex items-center px-4 py-2 cursor-pointer bg-slate-100 focus:outline-hidden hover:outline-none"
          >
            <!-- TODO: if user upload img
            <div class="avatar m-auto">
              <div class="h-10 w-10 rounded-full">
                <img
                  src="img"
                />
              </div>
            </div> -->
            <div class="avatar">
              <div class="avatar avatar-placeholder">
                <div
                  class="bg-indigo-600 text-neutral-content w-10 h-10 rounded-full"
                >
                  <span class="text-xl">SD</span>
                </div>
              </div>
            </div>
            <div
              class="font-bold ml-4 text-indigo-600 dark:text-white grow flex flex-col"
            >
              <div class="text-base">Sylvie Dur.</div>
              <div class="text-xs font-semibold text-gray-600">
                sylviedura@gmail.com
              </div>
            </div>
            <div class="ml-4">
              <ChevronUpIcon
                v-if="!open"
                class="h-4 w-4 text-md font-bold text-indigo-600 dark:text-white group-hover:text-white"
              />
              <ChevronDownIcon
                v-else
                class="h-4 w-4 font-bold text-indigo-600 dark:text-white group-hover:text-white"
              />
            </div>
          </div>
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute bg-slate-100 mt-2 p-2 w-64 bottom-full mb-2 mr-2 origin-bottom-right right-0 divide-y divide-gray-100 rounded-b-2xl rounded-t-2xl shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <!-- Use the `active` state to conditionally style the active item. -->
            <MenuItem
              key="home"
              v-slot="{ active }"
              class="bg-slate-100 rounded-lg ui-active:text-white ui-not-active:text-black"
              as="template"
            >
              <NuxtLink
                class="flex items-center p-3 group hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
                to="/account/settings"
              >
                <Cog6ToothIcon
                  class="h-5 w-5 font-bold text-stone-700 dark:text-white group-hover:text-white"
                  :class="{
                    'text-white': active,
                    'bg-slate-100 dark:bg-indigo-600  text-black': !active,
                  }"
                />
                <span
                  class="font-bold ml-2 text-stone-700 dark:text-white group-hover:text-white"
                  >Settings</span
                >
              </NuxtLink>
            </MenuItem>
            <MenuItem
              key="home"
              v-slot="{ active }"
              class="bg-slate-100 rounded-lg ui-active:text-white ui-not-active:text-black"
              as="template"
            >
              <button
                class="flex items-center w-full p-3 group cursor-pointer hover:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-600"
                @click.prevent="handleSignOut"
              >
                <ArrowLeftCircleIcon
                  class="h-5 w-5 font-bold text-stone-700 dark:text-white group-hover:text-white"
                  :class="{
                    ' text-white': active,
                    'bg-slate-100 dark:bg-indigo-600  text-black': !active,
                  }"
                />
                <span
                  class="font-bold ml-2 text-stone-700 dark:text-white group-hover:text-white"
                  >Log out</span
                >
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: "Tagesschrift", system-ui;
  font-weight: 400;
  font-style: normal;
}
.button {
  width: 100%;
}
/* font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif; */
</style>
