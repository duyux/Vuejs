<script setup lang="ts">
import { ref,onMounted,h ,computed} from 'vue'
import { Table ,ColumnsType ,InputSearch} from 'ant-design-vue'

//模型参数准备
import { cos_sim, env, pipeline } from "@xenova/transformers";
env.remoteHost = "/models/";
const topK = 10;
const minScore = 0.6;
const pipe = pipeline("feature-extraction", "bge-base-zh-v1.5", {
  progress_callback: (d: any) => {
    //console.log(d);
  },
});

//向量数组构建
const buildVector = async () => {
  if (!items.value.length) return;
  const list = items.value;
  loading.value = true;
  vectors.length = list.length;
  await nextTick();
  const embedding = await pipe;
  const questions = list.map((item) => item.name);
  const output = (await embedding(questions, {
    pooling: "mean",
    normalize: true,
  })) as any;
  console.log(output);
  questions.forEach((q, i) => {
    vectors[i] = output[i];
  });
  loading.value = false;
};

//相似度计算
const embedding = await pipe;
  const [vector] = await embedding([e], {
    pooling: "mean",
    normalize: true,
  });
  if (!vectors.length) {
    await buildVector();
  }
  const scores = vectors.map((q, i) => {
    return {
      score: cos_sim(vector.data, vectors[i].data),
      index: i,
    };
  });

  //结果筛选
  scores.sort((a, b) => b.score - a.score);
  console.log(scores);
  result.value = scores
    .filter((e) => e.score > minScore)
    .slice(0, topK)
    .map((s) => items.value[s.index]);
  console.log(
    `搜索到${result.value.length}条记录:topK=${topK} minScore=${minScore}`
  );

defineProps<{ msg: string }>()

type RawInfo = {
  name: string;
  id: string;
};
const loading = ref(false);
const items = ref<RawInfo[]>([]);
onMounted(() => {
  fetch("data.json")
    .then((res) => res.json())
    .then((list) => (items.value = list));
});
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    customRender: (e: { index: number }) => {
      return h("span", {}, e.index + 1);
    },
    width: 84,
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  }
] as ColumnsType<any>;


  const searchKey = ref("");
const showItems = computed(() => {
  return searchKey.value ? result.value : items.value;
});
const search = async (e: string) => {
  searchKey.value = e || "";
  if (!e) {
    return;
  }
  console.log('e',e);
  // 待完成搜索
};

</script>

<template>
  <div>
    <InputSearch placeholder="请输入搜索内容" @search="search" />
    <Table :loading="loading" :dataSource="showItems" :columns="columns" />
    <Table :loading="loading" :dataSource="items" :columns="columns" />

</div>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
