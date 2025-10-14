<script setup lang="ts">
import { CheckBadgeIcon as CheckBadgeIconSolid } from "@heroicons/vue/24/solid";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowUturnRightIcon,
  Bars3Icon,
  CheckBadgeIcon,
  ChevronDoubleLeftIcon,
  Cog6ToothIcon,
  LanguageIcon,
  XMarkIcon,
  ChartBarIcon,
  DocumentIcon,
  Square2StackIcon,
} from "@heroicons/vue/24/outline";
import {
  StarIcon,
} from "@heroicons/vue/24/solid";
import {
  Dialog,
  DialogOverlay,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const client = useSupabaseClient();
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();

const handleSignOut = async () => {
  const { error } = await client.auth.signOut();
  if (error) return;
  router.push("/");
};

const userPseudo = computed(() => userStore.$state.pseudo);
const userInitials = computed(() => userStore.$state.initials);
const sideBarOpened = ref(false);
const isSideBarMinifiedForDesktopVersion = ref(false);

const isActive = (path: string) => {
  return route.path.startsWith(path);
};
</script>

<template>
  <div class="min-h-screen flex">
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
            class="md:hidden z-10 max-h-screen h-full flex flex-col w-72 bg-white border-r border-gray-200 shadow-xl"
          >
            <div
              class="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <NuxtLink to="/" class="flex items-center">
                <img
                  alt="LinguaLab Logo"
                  class="h-8 w-auto"
                  src="~/assets/logo/transparent/black.png"
                >
              </NuxtLink>
              <button
                class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
                type="button"
                value="closeSideBar"
                @click="sideBarOpened = false"
              >
                <XMarkIcon class="h-5 w-5 text-neutral" />
              </button>
            </div>
            <div class="overflow-y-auto flex-1">
              <div class="p-4">
                <NuxtLink
                  class="flex items-center justify-center w-full px-4 py-3 mb-6 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-all duration-200 ease-in-out group shadow-lg shadow-orange-500/25"
                  to="/learning/new-lesson"
                >
                  <ArrowUturnRightIcon class="h-4 w-4 text-white" />
                  <span class="font-semibold text-white ml-2"
                    >Create Story</span
                  >
                </NuxtLink>

                <h3
                  class="mb-4 text-xs text-gray-800 uppercase tracking-widest font-bold"
                >
                  Learning
                </h3>
                <div class="space-y-1">
                  <NuxtLink
                    class="flex items-center w-full px-4 py-3.5 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer"
                    :class="{
                      'bg-indigo-50 rounded-lg': isActive(
                        '/learning/dashboard',
                      ),
                    }"
                    to="/learning/dashboard"
                    @click="sideBarOpened = false"
                  >
                    <ChartBarIcon
                      class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/dashboard'),
                      }"
                    />
                    <span
                      class="font-semibold ml-3 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/dashboard'),
                      }"
                      >Dashboard</span
                    >
                  </NuxtLink>

                  <NuxtLink
                    class="flex items-center w-full px-4 py-3.5 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer"
                    :class="{
                      'bg-indigo-50 rounded-lg': isActive('/learning/stories'),
                    }"
                    to="/learning/stories"
                    @click="sideBarOpened = false"
                  >
                    <DocumentIcon
                      class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/stories'),
                      }"
                    />
                    <span
                      class="font-semibold ml-3 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/stories'),
                      }"
                      >Stories</span
                    >
                  </NuxtLink>

                  <NuxtLink
                    class="flex items-center w-full px-4 py-3.5 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer"
                    :class="{
                      'bg-indigo-50 rounded-lg': isActive('/learning/grammar'),
                    }"
                    to="/learning/grammar"
                    @click="sideBarOpened = false"
                  >
                    <Square2StackIcon
                      class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/grammar'),
                      }"
                    />
                    <span
                      class="font-semibold ml-3 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/grammar'),
                      }"
                      >Modules</span
                    >
                  </NuxtLink>

                  <NuxtLink
                    class="flex items-center w-full px-4 py-3.5 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer"
                    :class="{
                      'bg-indigo-50 rounded-lg': isActive(
                        '/learning/vocabulary',
                      ),
                    }"
                    to="/learning/vocabulary"
                    @click="sideBarOpened = false"
                  >
                    <LanguageIcon
                      class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/vocabulary'),
                      }"
                    />
                    <span
                      class="font-semibold ml-3 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/learning/vocabulary'),
                      }"
                      >Vocabulary</span
                    >
                  </NuxtLink>
                </div>
              </div>

              <!-- User Menu Section for Mobile -->
              <div class="p-4 border-t border-gray-200">
                <div class="flex items-center mb-4">
                  <div class="avatar">
                    <div class="avatar avatar-placeholder">
                      <div
                        class="bg-indigo-600 text-neutral-content w-10 h-10 rounded-full"
                      >
                        <span class="text-xl">{{ userInitials }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="flex items-center">
                      <div class="font-semibold text-neutral">
                        {{ userPseudo }}
                      </div>
                      <div class="w-full flex items-center justify-end">
                        <StarIcon class="h-4 w-4 ml-2 text-indigo-600" />
                        <span class="text-primary">{{ userStore.$state.tokensAvailable }}</span>
                    </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-1">
                  <NuxtLink
                    class="flex items-center w-full px-4 py-3 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer"
                    :class="{
                      'bg-indigo-50 rounded-lg': isActive('/account/settings'),
                    }"
                    to="/account/settings"
                    @click="sideBarOpened = false"
                  >
                    <Cog6ToothIcon
                      class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/account/settings'),
                      }"
                    />
                    <span
                      class="font-semibold ml-3 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      :class="{
                        'text-indigo-600': isActive('/account/settings'),
                      }"
                      >Settings</span
                    >
                  </NuxtLink>

                  <button
                    class="flex items-center w-full px-4 py-3 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer"
                    @click="handleSignOut"
                  >
                    <ArrowLeftStartOnRectangleIcon
                      class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                    />
                    <span
                      class="font-semibold ml-3 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
                      >Log out</span
                    >
                  </button>
                </div>
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
          <DialogOverlay class="fixed inset-0 bg-opacity-50" />
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
  <!-- Menu Icon opening the navbar for mobile views -->
  <div :open="!sideBarOpened" class="md:hidden">
    <button
      class="flex-shrink-0 flex items-center justify-center px-2 py-2 w-10 h-10 rounded-full hover:ring-2 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      @click="sideBarOpened = true"
    >
      <Bars3Icon
        class="h-6 w-6 text-indigo-600 group-hover:text-indigo-8000"
      />
    </button>
  </div>

  <!-- Desktop NavBar -->
  <div
    class="h-full hidden md:flex flex-col justify-between bg-white border-r border-primary/20 transition-all duration-300 ease-in-out"
    :class="{
      'w-20': isSideBarMinifiedForDesktopVersion,
      'w-72': !isSideBarMinifiedForDesktopVersion,
    }"
  >
    <div class="flex flex-col items-center py-6 px-4 text-xl text-neutral logo">
      <div
        class="w-full flex justify-end mb-4 cursor-pointer hover:text-indigo-600 transition-colors duration-200"
        @click="
          isSideBarMinifiedForDesktopVersion =
            !isSideBarMinifiedForDesktopVersion
        "
      >
        <ChevronDoubleLeftIcon
          class="h-5 w-5 text-neutral"
          :class="{
            'transform rotate-180': isSideBarMinifiedForDesktopVersion,
          }"
        />
      </div>
      <NuxtLink to="/" class="flex justify-center">
        <img
          v-if="!isSideBarMinifiedForDesktopVersion"
          alt="LinguaLab Logo"
          class="h-15 w-auto m-auto"
          src="~/assets/logo/transparent/black.png"
        />
        <img
          v-else
          alt="LinguaLab Logo"
          class="h-8 w-auto"
          src="~/assets/logo/transparent/black.png"
        >
      </NuxtLink>
    </div>

    <div class="flex-1">
      <div class="px-4">
        <NuxtLink
          class="btn btn-warning btn-sm mx-6 group"
          to="/learning/lessons/new-lesson"
        >
          <ArrowUturnRightIcon
            class="h-4 w-4 text-neutral group-hover:text-neutral"
          />
          <span
            v-if="!isSideBarMinifiedForDesktopVersion"
            class="font-semibold text-neutral ml-2"
            >Create Story</span
          >
        </NuxtLink>
      </div>

      <div class="px-4">
        <h3
          v-if="!isSideBarMinifiedForDesktopVersion"
          class="mx-6 mt-4 mb-2 text-xs text-gray-800 dark:text-black uppercase tracking-widest font-bold"
        >
          Learning
        </h3>
        <div class="space-y-1">
          <NuxtLink
            class="flex items-center py-2 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50"
            :class="{
              'bg-indigo-50 rounded-lg': isActive('/learning/dashboard'),
              'px-2 justify-center': isSideBarMinifiedForDesktopVersion,
              'px-6': !isSideBarMinifiedForDesktopVersion,
            }"
            to="/learning/dashboard"
          >
            <ChartBarIcon
              class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/dashboard'),
              }"
            />
            <span
              v-if="!isSideBarMinifiedForDesktopVersion"
              class="font-semibold ml-2 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/dashboard'),
              }"
              >Dashboard</span
            >
          </NuxtLink>

          <NuxtLink
            class="flex items-center py-2 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50"
            :class="{
              'bg-indigo-50 rounded-lg': isActive('/learning/stories'),
              'px-2 justify-center': isSideBarMinifiedForDesktopVersion,
              'px-6': !isSideBarMinifiedForDesktopVersion,
            }"
            to="/learning/stories"
          >
            <DocumentIcon
              class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/stories'),
              }"
            />
            <span
              v-if="!isSideBarMinifiedForDesktopVersion"
              class="font-semibold ml-2 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/stories'),
              }"
              >Stories</span
            >
          </NuxtLink>

          <NuxtLink
            class="flex items-center py-2 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50"
            :class="{
              'bg-indigo-50 rounded-lg': isActive('/learning/modules'),
              'px-2 justify-center': isSideBarMinifiedForDesktopVersion,
              'px-6': !isSideBarMinifiedForDesktopVersion,
            }"
            to="/learning/modules"
          >
            <Square2StackIcon
              class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/modules'),
              }"
            />
            <span
              v-if="!isSideBarMinifiedForDesktopVersion"
              class="font-semibold ml-2 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/modules'),
              }"
              >Modules</span
            >
          </NuxtLink>

          <NuxtLink
            class="flex items-center py-2 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50"
            :class="{
              'bg-indigo-50 rounded-lg': isActive('/learning/vocabulary'),
              'px-2 justify-center': isSideBarMinifiedForDesktopVersion,
              'px-6': !isSideBarMinifiedForDesktopVersion,
            }"
            to="/learning/vocabulary"
          >
            <LanguageIcon
              class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/vocabulary'),
              }"
            />
            <span
              v-if="!isSideBarMinifiedForDesktopVersion"
              class="font-semibold ml-2 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
              :class="{
                'text-indigo-600': isActive('/learning/vocabulary'),
              }"
              >Vocabulary</span
            >
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- User Menu Section -->
    <div class="p-4 border-t border-gray-200">
      <div
        class="flex items-center"
        :class="{ 'justify-center': isSideBarMinifiedForDesktopVersion }"
      >
        <div class="avatar">
          <div class="avatar avatar-placeholder">
            <div
              class="bg-indigo-600 text-neutral-content w-10 h-10 rounded-full"
            >
              <span class="text-xl">{{ userInitials }}</span>
            </div>
          </div>
        </div>
        <div v-if="!isSideBarMinifiedForDesktopVersion" class="ml-3">
          <div class="flex items-center">
            <div class="font-semibold text-neutral">{{ userPseudo }}</div>
            <div class="w-full flex items-center justify-end">
              <StarIcon class="h-4 w-4 text-indigo-600" />
              <span class="text-primary font-bold">{{ userStore.$state.tokensAvailable }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 space-y-1">
        <NuxtLink
          class="flex items-center py-2.5 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50"
          :class="{
            'bg-indigo-50 rounded-lg': isActive('/account/settings'),
            'px-2 justify-center': isSideBarMinifiedForDesktopVersion,
            'px-4': !isSideBarMinifiedForDesktopVersion,
          }"
          to="/account/settings"
        >
          <Cog6ToothIcon
            class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
            :class="{
              'text-indigo-600': isActive('/account/settings'),
            }"
          />
          <span
            v-if="!isSideBarMinifiedForDesktopVersion"
            class="font-semibold ml-2 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
            :class="{
              'text-indigo-600': isActive('/account/settings'),
            }"
            >Settings</span
          >
        </NuxtLink>

        <button
          class="flex items-center cursor-pointer w-full py-2.5 group transition-all duration-200 ease-in-out hover:rounded-lg hover:bg-indigo-50"
          :class="{
            'px-2 justify-center': isSideBarMinifiedForDesktopVersion,
            'px-4': !isSideBarMinifiedForDesktopVersion,
          }"
          @click="handleSignOut"
        >
          <ArrowLeftStartOnRectangleIcon
            class="h-5 w-5 font-semibold text-neutral transition-colors duration-200 group-hover:text-indigo-600"
          />
          <span
            v-if="!isSideBarMinifiedForDesktopVersion"
            class="font-semibold ml-2 text-neutral transition-colors duration-200 group-hover:text-indigo-600"
            >Log out</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .button {
  width: 100%;
} */
</style>
