<template>
    <div class="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
      <!-- Decorative arc at bottom -->
      <div class="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-auto"
        >
          <path
            d="M0,200 Q600,100 1200,200 L1200,200 L0,200 Z"
            fill="white"
            opacity="0.1"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between h-full p-12 text-white">
        <!-- Top: Logo and Branding -->
        <div class="flex items-center space-x-3">
          <img
            src="~/assets/logo/transparent/language-lab.png"
            alt="LinguaLab Logo"
            class="h-30 w-auto"
          />
        </div>

        <!-- Center: Main message -->
        <div class="max-w-lg">
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Welcome to <span class="text-neutral text-pretty">Tookan</span><span class="text-warning">AI</span>
            <br />
            The Language Learning Platform
          </h1>
          <p class="text-xl text-blue-100">
            Skyrocket Your Progress In Your Target Language
            <br />
            By Reading Stories On Your Very Specific Weaknesses
          </p>
        </div>

        <!-- Bottom: Decorative element -->
        <div class="flex items-center space-x-2 text-blue-200">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          <span class="text-sm">Start your language journey today</span>
        </div>
      </div>
    </div>
</template>
