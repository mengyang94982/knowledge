<template>
  <div v-if="recommendList.length || empty" class="card recommend" data-pagefind-ignore="all">
    <div class="card-header">
      <span class="title" v-html="title"/>
      <ElButton v-if="showChangeBtn" size="small" type="primary" text @click="changePage">
        {{ nextText }}
      </ElButton>
    </div>
    <ol v-if="currentWikiData.length" class="recommend-container">
      <li v-for="(item,index) in currentWikiData" :key="item.route">
        <i class="num">{{ index + 1 }}</i>
        <div class="des">
          <ElLink type="info" class="title" :href="withBase(v.route)">
            {{
              item.meta.title
            }}
          </ElLink>
          <div class="suffix">
            <span class="tag">{{ formatShowDate(item.meta.date) }}</span>
          </div>
        </div>
      </li>
    </ol>
    <div v-else class="empty-text">
      {{ empty }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {withBase} from "vitepress";
import {formatShowDate} from "../../utils";
import {ElButton, ElLink} from 'element-plus'
import {useArticles, useBlogConfig} from "../../shared";
import {fireSVG} from "../../constants/svg";

const {hotArticle} = useBlogConfig()

const title = computed(() => hotArticle?.title || (`<span class="svg-icon">${fireSVG}</span>` + ' 精选文章'))
const nextText = computed(() => hotArticle?.nextText || '换一组')
const pageSize = computed(() => hotArticle?.pageSize || 9)
const empty = computed(() => hotArticle?.empty ?? '暂无热门内容')

const docs = useArticles()

const recommendList = computed(() => {
  const data = docs.value.filter(v => v.meta.sticky)
  data.sort((a, b) => b.meta.sticky! - a.meta.sticky!)
  return [...data]
})

const currentPage = ref(1)

function changePage() {
  const newIndex = currentPage.value % Math.ceil(recommendList.value.length / pageSize.value)
  currentPage.value = newIndex + 1
}

const currentWikiData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return recommendList.value.slice(startIndex, endIndex)
})
const showChangeBtn = computed(() => {
  return recommendList.value.length > pageSize.value
})
</script>


<style scoped lang="scss">
.card {
  position: relative;
  margin: 0 auto 10px;
  padding: 10px;
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: rgba(var(--bg-gradient));

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
}

.card-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
}

.recommend {
  flex-direction: column;
}

.recommend-container {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0 10px 0 0;
  width: 100%;

  li {
    display: flex;

    &:nth-child(1) .num {
      background-color: #f56c6c;
      color: #fff;
      font-size: 12px;
      border-radius: 8px 0;
    }

    &:nth-child(2) .num {
      background-color: #67c23a;
      color: #fff;
      font-size: 12px;
      border-radius: 0 8px 0 8px;
    }

    &:nth-child(3) .num {
      background-color: var(--vp-c-brand-2);
      color: #fff;
      font-size: 12px;
      border-radius: 6px;
    }

    .num {
      display: block;
      font-size: 14px;
      color: var(--description-font-color);
      font-weight: 600;
      margin: 6px 12px 10px 0;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
    }

    .des {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      font-size: 14px;
      color: var(--vp-c-text-1);
    }

    .suffix {
      font-size: 12px;
      color: var(--vp-c-text-2);
    }
  }
}

.empty-text {
  padding: 6px;
  font-size: 14px;
  text-align: center;
}
</style>