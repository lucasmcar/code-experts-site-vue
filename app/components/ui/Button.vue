<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :class="['button', `button--${variant}`, `button--${size}`]"
  >
    <span>
      <slot />
    </span>

    <span v-if="arrow" class="button__arrow"> → </span>
  </component>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: null,
  },

  variant: {
    type: String,
    default: 'primary',
  },

  size: {
    type: String,
    default: 'medium',
  },

  arrow: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String,
    default: 'button',
  },
})
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border: 1px solid transparent;
  border-radius: var(--radius-md);

  font-weight: 600;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button--primary {
  background: var(--color-primary);
  color: white;
}

.button--primary:hover {
  background: var(--color-primary-dark);
}

.button--outline {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.button--outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.button--small {
  min-height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.button--medium {
  min-height: 48px;
  padding: 0 22px;
  font-size: 15px;
}

.button--large {
  min-height: 56px;
  padding: 0 28px;
  font-size: 16px;
}

.button__arrow {
  font-size: 18px;
}
</style>
