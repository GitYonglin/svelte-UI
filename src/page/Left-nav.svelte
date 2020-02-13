<script>
  import { menus, showName } from "../store/stores.js";

  let the_menus;
  menus.subscribe(val => {
    the_menus = val;
  });

  let the_showName;
  showName.subscribe(val => {
    the_showName = val;
  });

  function switchPage(name) {
    showName.update(p => name);
  }
</script>

<style lang="scss">
  @import "../css/theme.scss";
  ul {
    li {
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      border-bottom: 1px solid $pc-theme-border;
      font-size: 24px;
      &.active {
        background-color: $pc-theme-primary;
        color: white;
      }
    }
  }
</style>

<nav>
  <ul>
    {#each the_menus as name}
      <li
        class={the_showName === name ? 'active' : ''}
        on:click={() => switchPage(name)}>
        {name}
      </li>
    {/each}
  </ul>
</nav>
