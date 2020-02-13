<script lang="ts">
  import { onMount } from "svelte";
  import { Guid } from "guid-typescript";
  import { createSysId } from "../../model/element-id.model";

  import Input from "./Input.svelte";
  /** 下边距 */
  export let mb: number = null;
  /** 标题名称 */
  export let title = "title名称";
  /** 显示错误说明 */
  export let showError = true;
  /** 是否有错误 */
  export let error = false;
  /** 标题宽度 */
  export let titleWidth = null;
  let titleHeight = "32px";
  let iid = createSysId();

  onMount(() => {
    const input = document.getElementById(iid);
    titleHeight = `${input.scrollHeight}px`;
  });
</script>

<style lang="scss">

</style>

<label style={mb ? 'margin-bottom: ' + mb : ''}>
  <span
    class="title"
    style="height: {titleHeight}; line-height: {titleHeight}; {titleWidth ? 'width: ' + titleWidth : ''}">
    {title}
  </span>
  <main class={error ? 'error' : ''}>
    <div class="input" id={iid}>
      <slot />
    </div>
    {#if showError}
      <span class="error" style="opacity: {error ? 1 : 0}">{error}</span>
    {/if}
  </main>
</label>
