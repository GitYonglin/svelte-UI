<script>
  import Input from "./components/Input.svelte";

  let value = "";
  let error = true;
</script>

<style lang="scss">
  @import "../css/theme.scss";
</style>

<Input size="large">
  <span slot="suffix">Hello</span>
  <span slot="prefix">prefix</span>
</Input>
<br />
<Input>
  <span slot="suffix">Hello</span>
</Input>
<br />
<Input size="small">
  <span slot="prefix">prefix</span>
</Input>
<br />

<div class="group-input">
  <Input>
    <span slot="suffix">Hello</span>
    <span slot="prefix">prefix</span>
  </Input>
  <Input />
  <Input />
  <Input>
    <span slot="suffix">Hello</span>
    <span slot="prefix">prefix</span>
  </Input>
  <Input>
    <span slot="suffix">Hello</span>
    <span slot="prefix">prefix</span>
  </Input>
  <Input />
</div>
