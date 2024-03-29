import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import glob from 'fast-glob'
import matter from 'gray-matter'
import type { Theme } from '../../typings'
import { formatDate } from '../client'
import { getDefaultTitle, getFirstImagURLFromMD, getTextSummary } from './index'

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

// hack：RSS用
export const pageMap = new Map<string, string>()

export function getArticles(cfg?: Partial<Theme.BlogConfig>) {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || '.'
  const files = glob.sync(`${srcDir}/**/*.md`, { ignore: ['node_modules'] })

  // 文章数据
  const data = files
    .map(v => {
      let route = v
        // 处理文件后缀名
        .replace('.md', '')

      // 去除 srcDir 处理目录名
      if (route.startsWith('./')) {
        route = route.replace(
          new RegExp(`^\\.\\/${path.join(srcDir, '/').replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`),
          ''
        )
      } else {
        route = route.replace(
          new RegExp(`^${path.join(srcDir, '/').replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`),
          ''
        )
      }
      // hack：RSS使用
      pageMap.set(`/${route}`, v)

      const fileContent = fs.readFileSync(v, 'utf-8')
      const { data: frontmatter } = matter(fileContent, {
        excerpt: true
      })

      const meta: Partial<Theme.PageMeta> = {
        ...frontmatter
      }

      if (!meta.title) {
        meta.title = getDefaultTitle(fileContent)
      }
      if (!meta.date) {
        // meta.date = getFileBirthTime(v)
      } else {
        const timeZone = cfg?.timeZone ?? 8
        meta.date = formatDate(new Date(`${new Date(meta.date).toUTCString()}+${timeZone}`))
      }

      meta.tags = typeof meta.tags === 'string' ? [meta.tags] : meta.tags
      meta.tag = [meta.tag || []].flat().concat([...new Set([...(meta.tags || [])])])

      // 获取摘要信息
      const wordCount = 100
      meta.description ||= getTextSummary(fileContent, wordCount)

      // 获取封面图
      meta.cover ??= getFirstImagURLFromMD(fileContent, `/${route}`)

      // 是否发布 默认发布
      if (meta.publish === false) {
        meta.hidden = true
        meta.recommend = false
      }

      return {
        route: `/${route}`,
        meta
      }
    })
    .filter(v => v.meta.layout !== 'home')
  return data as Theme.PageData[]
}

// export function patchVOConfig(vpConfig: any, cfg?: Partial<Theme.BlogConfig>) {}

export function patchVPThemeConfig(cfg?: Partial<Theme.BlogConfig>, vpThemeConfig: any = {}) {
  vpThemeConfig.sidebar = patchDefaultThemeSideBar(cfg)?.sidebar
  return vpThemeConfig
}
