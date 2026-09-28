// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import { ref, computed } from 'vue';

export function use${NAME_PASCAL_CASE}() {
  const data = ref<any | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const hasData = computed(() => data.value !== null);

  async function execute() {
    isLoading.value = true;
    error.value = null;
    try {
      // Async state fetch or logic
      data.value = {};
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      isLoading.value = false;
    }
  }

  function reset() {
    data.value = null;
    error.value = null;
    isLoading.value = false;
  }

  return {
    data,
    isLoading,
    error,
    hasData,
    execute,
    reset,
  };
}

export default use${NAME_PASCAL_CASE};
