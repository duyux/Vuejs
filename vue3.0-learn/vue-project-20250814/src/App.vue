<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import { reactive } from "vue";
import { nextTick } from "vue";
import BlogPost from "./BlogPost.vue";

const rawHtml = ref("<h1>This is a raw HTML string</h1>");
const dynamicId = ref("my-id");

const objectOfAttrs = {
  id: "container",
  class: "wrapper",
  style: "background-color: red;",
};

const seen = ref(true);

const url = ref("https://www.baidu.com");

const doSomething = () => {
  console.log("Doing something...");
  alert("Done!");
};

//ref count
const count = ref(0);
console.log(count);
console.log(count.value);

count.value++;
console.log(count.value);

const increment = () => {
  count.value++;
};

async function increment2() {
  count.value++;
  await nextTick();
  //现在DOM已经更新了
}

const mystate = reactive({ count: 0 });

//计算属性学习
const author = reactive({
  name: "John Doe",
  books: [
    "Vue2 - Advanced Guide",
    "Vue3 - Up and Running",
    "Vue4 - The Mystery",
  ],
});

//一个计算属性ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});

//class和style绑定
const isActive = ref(true);
const hasError = ref(false);

const classObject = reactive({
  active: true,
  "text-danger": false,
});

const activeClass = ref("active");
const errorClass = ref("text-danger");

const styleObject = reactive({
  color: "red",
  fontSize: "20px",
});

const awesome = ref(true);
const ok = ref(true);

const items = ref([{ message: "Foo" }, { message: "Bar" }]);

const myObject = reactive({
  title: "How to do lists in Vue",
  author: "John Doe",
  publishedAt: "2024-06-01",
});

const numbers = ref([1, 2, 3, 4, 5]);
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0);
});

const name = ref("Vue.js");
function greet(event) {
  alert(`Hello,${name.value}!`);
  if (event) {
    alert(event.target.tagName);
  }
}

const message = ref("Hello Vue 3!");

//watch
const question = ref("yes");
const answer = ref("Questions usually contain a question mark.😉");
const loading = ref(false);

//可以直接侦听一个ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes("?")) {
    answer.value = "Thinking...";
    loading.value = true;
    try {
      const res = await fetch("https://yesno.wtf/api");
      const data = await response.json();
      answer.value = data.answer;
    } catch (error) {
      answer.value = "Error!Could not reach the API. " + error;
    } finally {
      loading.value = false;
    }
  }
});

const myinput = useTemplateRef("my-input");

onMounted(() => {
  myinput.value.focus;
});

const posts = ref([
  { id: 1, title: "My journey with Vue" },
  { id: 2, title: "Learning Vue Composition API" },
  { id: 3, title: "Building a Vue App" },
]);

const postFontSize = ref(1.0);
</script>

<template>
  <div>
    <h1>You did it!</h1>
    <p>Using text interpolation:{{ rawHtml }}</p>
    <p>Using v-html directive:<span v-html="rawHtml"></span></p>
    <div :id="dynamicId">abc</div>

    <div v-bind="objectOfAttrs">test</div>

    <p v-if="seen">Now you see me</p>
    <a :href="url"></a>

    <a @click="doSomething">doSomething</a>
    <p><button @click="increment">click me</button>:{{ count }}</p>
    <button @click="mystate.count++">{{ mystate.count }}</button>

    <p>Has published books:</p>
    <span>{{ author.books.length > 0 ? "Yes" : "No" }}</span>
    <span>{{ publishedBooksMessage }}</span>

    <div class="static" :class="{ active: isActive, 'text-danger': hasError }">
      class and style学习
    </div>
    <div class="static" :class="classObject">class and style学习2</div>

    <div :class="[activeClass, errorClass]">class and style学习3</div>

    <div :style="styleObject">style</div>

    <button @click="awesome = !awesome">Toggler</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>

    <h1 v-show="ok">Hello!</h1>

    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item.message }}</li>
    </ul>

    <ul>
      <li v-for="value in myObject" :key="value">{{ value }}</li>
    </ul>

    <span v-for="n in 5" :key="n">{{ n }}</span>

    <ul>
      <li v-for="n in evenNumbers" :key="n">{{ n }}</li>
    </ul>

    <button @click="greet">Greet</button>

    <p>Message is:{{ message }}</p>
    <input v-model="message" placeholder="edit me" />

    <p>Ask a yes/no question:</p>
    <input v-model="question" :disabled="loading" />
    <p>{{ answer }}</p>

    <input ref="my-input" />
    <div :style="{ fontSize: postFontSize + 'em' }">
      <!-- <button @click="postFontSize += 0.1">addFontSize</button> -->
      <BlogPost
        ref="blog-post-1"
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        @enlarge-text="postFontSize += 0.1"
      />
    </div>
  </div>
</template>

<style scoped>
a {
  color: blue;
  text-decoration: none;
}

a:hover {
  color: red;
}
</style>
