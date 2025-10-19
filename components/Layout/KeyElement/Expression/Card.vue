<script setup lang="ts">
import { BookOpenIcon, LanguageIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
  defineProps<{
    title: string | null;
    description: string | null;
    backgroundClasses?: string | null;
  }>(),
  {
    title: null,
    description: null,
    backgroundClasses: null,
  },
);

// black stunning color
// <div class="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-lg flex items-center justify-center mr-5 shadow-md">


</script>

<template>
   <div :class="[props.backgroundClasses ? `group relative overflow-hidden rounded-md shadow-md p-4 ${props.backgroundClasses}` : 'group relative bg-gradient-to-br from-purple-100/90 via-purple-50/95 to-pink-100/80 rounded-md shadow-md p-4 hover:border-purple-400/80 transition-all duration-300']">
        <div class="wrapper-header">
            <div class="wrapper-title">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg flex items-center justify-center mr-5 shadow-lg">
                    <LanguageIcon class="h-6 w-6 text-white" />
                </div>
                  <div>
                    <h3 class="text-2xl font-light text-gray-900 mb-1"> {{props.title}}</h3>
                    <p class="text-gray-500 text-sm font-light"> {{props.description}}</p>
                  </div>
                </div>
            <slot name="top-right-corner"></slot>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<style>
.wrapper-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 
    0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.wrapper-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%); */

    
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.wrapper-card {
    padding: 1rem;
}

.words-wrapper-bg {
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
  border: 1px solid #dbeafe;
}

.wrapper-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.wrapper-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 1.1rem;
}
.blue-bg{
    background: #3b82f6;
}  

</style>