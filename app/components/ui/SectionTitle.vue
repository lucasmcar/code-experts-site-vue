<template>
  <div
    class="section-title"
    :class="{
      'section-title--center': center,
    }"
  >
    <span v-if="eyebrow" class="section-title__eyebrow">
      {{ eyebrow }}
    </span>

    <h2>
      {{ title }}
    </h2>

    <p v-if="description">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: null,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: null,
  },

  center: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.section-title {
  max-width: 700px;
  margin-bottom: 50px;
}

.section-title--center {
  margin-inline: auto;
  text-align: center;
}

.section-title__eyebrow {
  display: block;
  margin-bottom: 12px;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.section-title h2 {
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.section-title p {
  margin-top: 18px;

  color: var(--color-text-secondary);

  font-size: 17px;
}
</style>
