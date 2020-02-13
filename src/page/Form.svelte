<script>
  import Input from "./components/Input.svelte";
  import FormItem from "./components/Form-Item.svelte";

  let value = "";
  let error = true;
</script>

<style lang="scss">
  @import "../css/theme.scss";
</style>

<form>
  <FormItem title="名字" titleWidth="150px">
    <Input size="large" />
  </FormItem>
  <FormItem error="显示错误" showError={false}>
    <Input />
  </FormItem>
  <FormItem error="显示错误">
    <Input />
  </FormItem>
</form>
