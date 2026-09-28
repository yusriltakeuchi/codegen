<!-- Created on ${DAY}-${MONTH}-${YEAR} by ${USER} -->
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '${NAME_TITLE_CASE}',
});

const emit = defineEmits<{
  (e: 'click', payload: MouseEvent): void;
}>();

const isExpanded = ref<boolean>(false);

function toggle() {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="${NAME_KEBAB_CASE}-container" @click="emit('click', $event)">
    <header class="header">
      <h3 class="title">{{ props.title }}</h3>
      <button type="button" class="btn" @click.stop="toggle">
        {{ isExpanded ? 'Collapse' : 'Expand' }}
      </button>
    </header>
    <div v-if="isExpanded" class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.${NAME_KEBAB_CASE}-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  cursor: pointer;
}

.content {
  margin-top: 0.75rem;
}
</style>
