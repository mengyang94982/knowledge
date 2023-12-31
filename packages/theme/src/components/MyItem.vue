<template>
  <a
    class="blog-item"
    :href="withBase(route)"
  >
    <i
      v-if="!!pin"
      class="pin"
    ></i>
    <!-- 标题 -->
    <p
      v-if="inMobile"
      class="title"
    >
      {{ title }}
    </p>
    <div class="info-container">
      <!-- 左侧信息 -->
      <div class="info-part">
        <!-- 标题 -->
        <p
          v-if="!inMobile"
          class="title"
        >
          {{ title }}
        </p>
        <!-- 简短介绍 -->
        <p
          v-if="!descriptionHTML && !!description"
          class="description"
        >
          {{ description }}
        </p>
        <template v-if="descriptionHTML">
          <div
            class="description-html"
            v-html="descriptionHTML"
          ></div>
        </template>
        <!-- 底部补充信息 -->
        <div
          v-if="!inMobile"
          class="badge-list"
        >
          <span
            v-if="author"
            class="split"
          >
            {{ author }}
          </span>
          <span class="split">{{ showTime }}</span>
          <span class="split">{{ type }}</span>
          <span
            v-if="tag?.length"
            class="split"
          >
            {{ tag.join(' . ') }}
          </span>
        </div>
      </div>
      <!-- 右侧封面图 -->
      <div
        v-if="cover"
        class="cover-img"
        :style="`background-image:url(${cover});`"
      ></div>
    </div>
    <!-- 底部补充描述 -->
    <div
      v-if="inMobile"
      class="badge-list"
    >
      <span
        v-if="author"
        class="split"
      >
        {{ author }}
      </span>
      <span class="split">{{ showTime }}</span>
      <span class="split">{{ type }}</span>
      <span
        v-if="tag?.length"
        class="split"
      >
        {{ tag.join(' · ') }}
      </span>
    </div>
  </a>
</template>

<script setup>
import { withBase } from 'vitepress'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import { formatBlogShowDate } from '@dylanjs/utils'

const props = defineProps({
  route: {
    type: String
  },
  title: {
    type: String
  },
  date: {
    type: String || Date
  },
  sticky: {
    type: Number
  },
  description: {
    type: String
  },
  descriptionHTML: {
    type: String
  },
  tag: {
    type: Array
  },
  author: {
    type: String
  },
  cover: {
    type: String || Boolean
  },
  pin: {
    type: Number
  },
  type: {
    type: String
  }
})
const { width } = useWindowSize()
const inMobile = computed(() => width.value <= 500)
const showTime = computed(() => {
  return formatBlogShowDate(props.date)
})

// function isWrappedWithPreventDefault(element: HTMLElement) {
//   let parent = element.parentElement

//   while (parent) {
//     if (parent.hasAttribute('preventDefault')) {
//       return true
//     }
//     parent = parent.parentElement
//   }

//   return false
// }
</script>

<style scoped lang="scss">
.blog-item .pin {
  position: absolute;
  overflow: hidden;
  width: 30px;
  height: 30px;
  top: -4px;
  left: -4px;
  opacity: 0.5;
}

.blog-item:hover .pin {
  opacity: 1;
}

.blog-item .pin::before {
  content: '';
  position: absolute;
  width: 120%;
  height: 30px;
  background-image: linear-gradient(45deg, var(--blog-theme-color), var(--blog-theme-color));
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
}

.blog-item {
  position: relative;
  margin: 0 auto 20px;
  padding: 16px 20px;
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: rgba(var(--bg-gradient));
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
}

.info-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.info-part {
  flex: 1;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  color: var(--description-font-color);
  font-size: 14px;
  margin-bottom: 8px;
  // 多行换行
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.description-html {
  font-size: 14px;
}

.badge-list {
  font-size: 13px;
  color: var(--badge-font-color);
  margin-top: 8px;

  .split:not(:last-child) {
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 8px;
      margin: 0 10px;
      background-color: #4e5969;
    }
  }
}

.cover-img {
  width: 150px;
  height: 64px;
  margin-left: 24px;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-size: 150px 64px;
}

@media screen and (max-width: 500px) {
  .cover-img {
    width: 75px;
    height: 32px;
    background-size: 75px 32px;
  }
}
</style>
