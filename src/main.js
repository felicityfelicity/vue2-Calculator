// vue应用入口
import Vue from "vue";
import Calculator from "./Calculator.vue";

new Vue({
  el: "#calculator", // 确保 index.html 里有 <div id="calculator"></div>
  render: (h) => h(Calculator),
});
