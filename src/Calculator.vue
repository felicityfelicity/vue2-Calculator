<template>
  <!-- HTML 结构 -->
  <div id="calculator">
    <!-- 所有内容包装在一个根目录中 -->
    <header>
      <h1>Calculator</h1>
      <span class="author">BY</span>
    </header>

    <section class="calculator">
      <calculator-content></calculator-content>
      <!-- 使用子组件 -->
      <!-- 这是一个自定义组件标签 -->
      <!-- Vue 会自动将其替换为 CalculatorContent.vue 的内容 -->
      <!-- 组件名从 CalculatorContent 自动转换为 calculator-content -->
    </section>
  </div>
</template>
<script>
// JavaScript 逻辑
//  导入子组件
import CalculatorContent from "./components/CalculatorContent.vue";
// 导出组件配置
export default {
  name: "calculator", // 组件名称（用于调试和全局注册）

  components: {
    // 注册子组件
    // 语法：{ ComponentName }
    // 等价于：{ ComponentName: ComponentName }
    CalculatorContent,
  },
};
</script>
<style>
/* CSS 样式 */
/* 导入谷歌字体 */
@import url("https://fonts.googleapis.com/css?family=Pacifico");

html {
  font-size: 62.5%;
  /* 设置基础字体大小 = 10px */
  /* 这样 1rem = 10px，方便计算 */
  /* 例如：1.8rem = 18px */
}

body {
  background-color: #f4f1f1;
}

header {
  font-size: 1.8rem;
  font-family: "Pacifico", cursive;
}

header .author {
  font-size: 1.5rem;
}

/* header .author a{
    text-decoration: none;
} */

header,
.calculator {
  margin: 2.5rem auto;
  text-align: center;
}

.calculator {
  border: 0.8rem solid #f67373;
  width: 34rem;
  height: 40rem;
  background-color: #f28080;
  font-size: 1.6rem;
  border-radius: 1rem;
  box-shadow: 1rem 1rem 0.5rem #ccc;
}
</style>
