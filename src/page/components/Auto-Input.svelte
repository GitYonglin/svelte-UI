<script context="module">
  export let keyboard;
  export let winSetUlPlace;
  export let count = 0;
  export let elmH;
  export let clickTarget;

  export function keyboardManage(event) {
    keyboard(event);
  }
  export function winClick(event) {
    if (winSetUlPlace) {
      console.log("winclick", event.target.getBoundingClientRect());

      const h =
        elmH +
        event.target.getBoundingClientRect().y +
        event.target.offsetHeight;
      winSetUlPlace(window.innerHeight - h < 0);
      winSetUlPlace = null;
    }
  }
</script>

<script lang="ts">
  import { createSysId } from "../../model/element-id.model";
  import Input from "./Input.svelte";

  export let value = "";
  export let size: "large" | "small" | "default" = "default";
  /** 下拉框数据 */
  export let list = [
    ...[...Array(5)].map((m, i) => `1-${i}`),
    ...[...Array(10)].map((m, i) => `2-${i}`),
    ...[...Array(20)].map((m, i) => `3-${i}`),
    ...[...Array(30)].map((m, i) => `4-${i}`)
  ];
  count = count > 1e60 ? 0 : count;
  /** 没有数据说明 */
  export let enptyList = "";
  export let maxHeight = 300;
  export let fixed = false;
  let oldValue = null;
  /** 过滤下拉框显示数据 */
  let showList = [...list];
  /** 下拉框显示状态 */
  let showAuto = false;
  /** 下拉框高度 */
  let autoHeight = 0;
  /** 键盘选择下拉的第几个元素 */
  let hoverIndex = 0;
  /** 组件id*/
  // let iid = createSysId();
  let iid = `ai${++count}`;
  /** 隐藏延时 */
  let delayT = null;
  /** 显示层级 */
  let zi = "";
  /** ul dom */
  let ulDom;
  let ulPlace = false;
  let status;

  /** 获取焦点 */
  function onFocus() {
    oldValue = value;
    onInput(value);
  }
  /** 失去焦点*/
  function onBlur() {
    hieedeAuto();
    console.log("onBlur-", iid);
  }
  /** 隐藏下拉框 */
  function hieedeAuto() {
    // clearDelayT();
    zi = "z-index: 2;";
    delayT = setTimeout(() => {
      zi = "";
      delayT = null;
      showAuto = false;
    }, 100);
  }
  /** 显示下拉框 */
  function showAutoF(i = 0) {
    ulPlace = false;
    keyboard = keyboardMonitor;
    winSetUlPlace = setUlPlace;
    showAuto = true;

    hoverIndex = i;
    zi = "z-index: 10;";
    clearDelayT();
  }
  /** 取消隐藏下拉框定时 */
  function clearDelayT() {
    if (delayT) {
      clearTimeout(delayT);
      delayT = null;
    }
  }
  /** 输入监听 */
  function onInput(V) {
    showAutoF(0);
    showList = list.filter(f => f.indexOf(V) != -1);
  }

  /** 键盘监听 */
  function keyboardMonitor(event) {
    if (!showAuto) {
      onInput(value);
      return;
    }
    switch (event.keyCode) {
      case 40: // ↓
        if (showList.length > hoverIndex) {
          hoverIndex++;
        } else if (showList.length === hoverIndex) {
          hoverIndex = 1;
        }
        break;
      case 38: // ↑
        if (hoverIndex > 0) {
          hoverIndex--;
        }
        if (hoverIndex === 0 && showList.length > 0) {
          hoverIndex = showList.length;
        }
        break;
      case 13: // 回车键
        if (hoverIndex > 0) {
          value = showList[hoverIndex - 1];
        }
        oldValue = value;
        hieedeAuto();
      case 27: // ESC键
      case 9: // TAB键
        hieedeAuto();
      default:
        break;
    }
    // 处理滚动条位置
    if (event.keyCode === 40 || event.keyCode === 38) {
      let li = document.getElementById(`${iid}${hoverIndex}`);
      let scrollTop = 0;
      if (event.keyCode === 40) {
        scrollTop =
          li.offsetTop + li.scrollHeight - ulDom.scrollTop - autoHeight;
        if (scrollTop > 0) {
          ulDom.scrollTop = ulDom.scrollTop + scrollTop;
        } else if (scrollTop < -autoHeight) {
          ulDom.scrollTop = 0;
        }
      }
      if (event.keyCode === 38) {
        scrollTop = ulDom.scrollTop - li.offsetTop;
        if (scrollTop > 0) {
          ulDom.scrollTop = ulDom.scrollTop - scrollTop;
        } else if (scrollTop < -autoHeight) {
          ulDom.scrollTop = li.offsetTop;
        }
      }
    }
  }
  /** 点击选择项 */
  function selectClick(item) {
    hieedeAuto();
    value = item;
    console.log("click", item, value);
  }
  /** 显示隐藏动画 */
  function twirl(node, params) {
    const elm = node.getBoundingClientRect();
    const y = window.innerHeight - elm.bottom;
    ulPlace = y < 0;
    console.log("twirl", showAuto ulPlace);
    // node.style.height = `${autoHeight}px;`;

    return {
      duration: params.duration || 100,
      css: t => {
        if (ulPlace) {
          return `height: ${autoHeight * t}px; top: -${(autoHeight - 2) * t};`;
          } else {
          return `height: ${autoHeight * t}px;`;
        }
      }
    };
  }
  /** 动画开始 */
  function introend(s) {
    console.log(s, autoHeight);
    elmH = autoHeight;
  }
  /** 下拉框位置处理 */
  function setUlPlace(b) {
    console.log(b);
    ulPlace = b;
  }
</script>

<style lang="scss">

</style>

<h1>{ulPlace}</h1>
<svelte:window on:keydown={keyboardManage} />
<div class="auto-container {fixed & showAuto ? 'popup-fixed' : 'relative'}" style={zi}>
  <!-- <div class="shade" on:click={hieedeAuto} /> -->
  <div>
    <Input
      type="text"
      bind:value
      class={size}
      on:focus={onFocus}
      on:blur={onBlur}
      on:input={event => onInput(event.target.value)} />
  </div>
  {#if showAuto}
    <ul
      style="max-height: {maxHeight}px; top: -{ulPlace && !fixed ? `${maxHeight - 2}` : 'auto'}px;"
      class:top={ulPlace}
      transition:twirl
      bind:this={ulDom}
      bind:offsetHeight={autoHeight}>
      {#each showList as item, i (i)}
        <li
          class:active={item === value}
          class:hover={hoverIndex === i + 1}
          id={`${iid}${i + 1}`}
          on:click={() => selectClick(item)}>
          <slot name="item" {item}>{item}-{i + 1}</slot>
        </li>
      {:else}
        {#if enptyList}
          <li class="not">{enptyList}</li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<!-- <ul>
  {#each list.filter(f => f.indexOf(value) != -1) as item, i (i)}
    <li animate:flip
    in:receive="{{key: i}}"
    out:send="{{key: i}}" style="background-color: #ccc;">{item}-{i + 1}</li>
  {/each}
</ul> -->
