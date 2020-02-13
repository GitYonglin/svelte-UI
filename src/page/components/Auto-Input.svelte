<script lang="ts">
  import { createSysId } from "../../model/element-id.model";
  import Input from "./Input.svelte";

  export let value: string | number = "autoInput";
  export let size: "large" | "small" | "default" = "default";
  /** 下拉框数据 */
  export let list = ['1', '22', '222',
  ...[...Array(100)].map(_=> '2'),
  '2','2','2','2','2','2','2','2','2','22','2','2','2','2','77','88','99','2','22','2','2','2','2'];
  /** 过滤下拉框显示数据 */
  let showList = [...list];
  /** 下拉框显示状态 */
  let showAuto = false;
  /** 下拉框高度 */
  let autoHeight = 0;
  /** 键盘选择下拉的第几个元素 */
  let hoverIndex = 0;
  /** 组件id*/
  let iid = createSysId();

  /** 获取焦点 */
  function onFocus() {
    showAuto = true;
    hoverIndex = 0;
    document.onkeydown = keyboardMonitor;
  }
  /** 失去焦点*/
  function onBlur() {
    showAuto = false;
    document.onkeydown = null;
  }
  /** 输入监听 */
  function onInput() {
    showAuto = true;
    showList = list.filter(f => f.indexOf(value) != -1);
    setTimeout(() => {
      setAutoHeight();
    }, 1);
  }
  /** 显示隐藏动画 */
  function twirl(node, params) {
    setAutoHeight();
    return {
      duration: params.duration || 200,
      css: t => `height: ${autoHeight * t}px;`;
    };
  }
  /** 处理ul容器高度 */
  function setAutoHeight() {
    try {
      let h = document.getElementById(iid).scrollHeight;
      // console.log(h);
      if (h > 300) {
        autoHeight = 300;
      } else {
        autoHeight = 'auto';
      }
    } catch (error) {

    }
  }

  /** 键盘监听 */
  function keyboardMonitor() {
    switch (event.keyCode) {
      case 40: // ↑
        if (showList.length > hoverIndex) {
          hoverIndex ++;
        } else if (showList.length === hoverIndex) {
          hoverIndex = 1;
        }
        break;
      case 38: // ↓
        if (hoverIndex > 0) {
          hoverIndex --;
        }
        if (hoverIndex === 0 && showList.length > 0) {
          hoverIndex = showList.length;
        }
        break;
      case 13; // 回车键
        if (hoverIndex > 0) {
          value = showList[hoverIndex - 1];
          showAuto = false;
        }
      default:
        break;
    }
    // 处理滚动条位置
    if (event.keyCode === 40 || event.keyCode === 38) {
      let li = document.getElementById(`${iid}${hoverIndex}`);
      const scrollTop = li.offsetTop + li.scrollHeight - autoHeight;
      if (scrollTop > 0) {
        document.getElementById(iid).scrollTop = scrollTop;
      }
      if (scrollTop < 0) {
        document.getElementById(iid).scrollTop = 0;
      }
    }
  }
</script>

<style lang="scss">

</style>
<div class="auto-container {showAuto ? 'show' : ''}">
  <div>
    <Input type="text" bind:value class={size} {onFocus} {onBlur} {onInput} />
  </div>
  {#if showAuto}
    <ul transition:twirl id={iid}
      style="{autoHeight >= 300 ? `overflow-y: auto; height: ${autoHeight}px;`  : `height: ${autoHeight}`}">
      <!-- <li>{autoHeight}</li> -->
      {#each showList as item, i}
        <li class="{item === value ? 'active' : ''} {hoverIndex === i + 1 ? 'hover' : ''}"
          id={`${iid}${i + 1}`}
          on:click={() => value = item}>{item}-{i+1}</li>
      {/each}
    </ul>
  {/if}
</div>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
<h1>123</h1>
