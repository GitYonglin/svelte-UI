<script lang="ts">
  import { onMount } from "svelte";
  import { menus, showName } from "./store/stores";

  import Header from "./page/Header.svelte";
  import LeftNav from "./page/Left-nav.svelte";

  import Input from "./page/Input.svelte";
  import Form from "./page/Form.svelte";
  import AutoInput from "./page/AutoInput.svelte";

  let component = {
    Input,
    Form,
    AutoInput
  };

  let the_name;
  showName.subscribe(val => {
    the_name = val;
  });
  onMount(() => {
    let keys: Array<string> = [];
    for (const key in component) {
      keys.push(key);
    }
    menus.update(n => keys);
  });
</script>

<style lang="scss">
  @import "./css/theme.scss";

  main {
    display: flex;
    flex-direction: column;
    height: 100%;
    .container {
      display: flex;
      flex: 1;
      nav {
        width: 200px;
        border-right: 1px solid $pc-theme-border;
      }
      .content {
        flex: 1;
        margin: 5px;
      }
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <header>
    <Header />
  </header>
  <div class="container">
    <nav>
      <LeftNav />
    </nav>
    <div class="content">
      <svelte:component this={component[the_name]} />
    </div>
  </div>
</main>
