import { sysId } from "../store/stores";

export function createSysId() {
  let id;
  sysId.subscribe(val => {
    id = val;
  });
  sysId.update(u => ++u);
  return `sys${id}`;
}
