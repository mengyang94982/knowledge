import {Theme} from "../../composables/config";
import {glob} from "fast-glob";
import path from 'path'
import fs from 'fs'
import matter from "gray-matter";
import {getDefaultTitle, getFileBirthTime, getTextSummary} from "./index";

import {formatBlogDate} from '@dylanjs/utils'


export function getArticles(cfg?: Partial<Theme.BlogConfig>) {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || '.'
  const files = glob.sync(`${srcDir}/**/*.md`, {ignore: ['node_modules']})

  const data = files.map(v => {
    let route = v.replace('.md', '')

    if (route.startsWith('./')) {
      route.route.replace(new RegExp(
          `^\\.\\/${path
            .join(srcDir, '/')
            .replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`
        ),
        '')
    } else {
      route = route.replace(
        new RegExp(
          `^${path
            .join(srcDir, '/')
            .replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`
        ),
        ''
      )
    }
    const fileContent = fs.readFileSync(v, 'utf-8')
    const {data: frontmatter, excerpt} = matter(fileContent, {excerpt: true})

    const meta: Partial<Theme.PageMeta> = {
      ...frontmatter
    }

    if (!meta.title) {
      meta.title = getDefaultTitle(fileContent)
    }
    if (!meta.date) {
      meta.date = getFileBirthTime(v)
    } else {
      const timeZone = cfg?.timeZone ?? 8
      meta.date = formatBlogDate(
        new Date(`${new Date(meta.date).toUTCString()}+${timeZone}`)
      )
    }

    // 处理tags和categories,兼容历史文章
    meta.categories =
      typeof meta.categories === 'string'
        ? [meta.categories]
        : meta.categories
    meta.tags = typeof meta.tags === 'string' ? [meta.tags] : meta.tags
    meta.tag = [meta.tag || []]
      .flat()
      .concat([
        ...new Set([...(meta.categories || []), ...(meta.tags || [])])
      ])

    // 获得摘要信息
    const wordCount = 100
    meta.description =
      meta.description || getTextSummary(fileContent, wordCount)

    // 获取封面图
    meta.cover =
      meta.cover ??
      (fileContent.match(/[!]\[.*?\]\((https:\/\/.+)\)/)?.[1] || '')

    // 是否发布 默认发布
    if (meta.publish === false) {
      meta.hidden = true
      meta.recommend = false
    }

    return {
      route: `/${route}`,
      meta
    }
  }).filter((v) => v.meta.layout !== 'home')
  return data as Theme.PageData[]
}

export function patchVPThemeConfig(
  cfg?: Partial<Theme.BlogConfig>,
  vpThemeConfig: any = {}
) {
  // 添加 RSS icon
  const RSS = cfg?.RSS
  if (RSS && RSS.icon !== false) {
    vpThemeConfig.socialLinks = [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM112 416c-26.51 0-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48s-21.49 48-48 48zm157.533 0h-34.335c-6.011 0-11.051-4.636-11.442-10.634c-5.214-80.05-69.243-143.92-149.123-149.123c-5.997-.39-10.633-5.431-10.633-11.441v-34.335c0-6.535 5.468-11.777 11.994-11.425c110.546 5.974 198.997 94.536 204.964 204.964c.352 6.526-4.89 11.994-11.425 11.994zm103.027 0h-34.334c-6.161 0-11.175-4.882-11.427-11.038c-5.598-136.535-115.204-246.161-251.76-251.76C68.882 152.949 64 147.935 64 141.774V107.44c0-6.454 5.338-11.664 11.787-11.432c167.83 6.025 302.21 141.191 308.205 308.205c.232 6.449-4.978 11.787-11.432 11.787z" fill="currentColor"></path></svg>'
        },
        link: RSS?.url
      }
    ]
  }

  // 用于自定义sidebar卡片slot
  vpThemeConfig.sidebar = patchDefaultThemeSideBar(cfg)?.sidebar

  return vpThemeConfig
}

export function patchDefaultThemeSideBar(cfg?: Partial<Theme.BlogConfig>) {
  return cfg?.blog !== false && cfg?.recommend !== false
    ? {
      sidebar: [
        {
          text: '',
          items: []
        }
      ]
    }
    : undefined
}