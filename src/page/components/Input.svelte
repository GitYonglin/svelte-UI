<script lang="ts">
  export let value: string | number = "123456";
  export let size: "large" | "small" | "default" = "default";
  export let onFocus: any = null;
  export let onBlur: any = null;
  export let onInput: any = null;
</script>

<style lang="scss">

</style>

<div class="input-container">
  <slot name="suffix" />
  <input
    type="text"
    bind:value
    class={size}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput} />
  <slot name="prefix" />
</div>
