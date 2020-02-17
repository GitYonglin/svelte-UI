<script lang="ts">
  export let value: string | number = "123456";
  export let size: "large" | "small" | "default" = "default";
</script>

<style lang="scss">

</style>

<div class="input-container">
  <slot name="suffix" />
  <input type="text" bind:value class={size} on:focus on:blur on:input />
  <slot name="prefix" />
</div>
