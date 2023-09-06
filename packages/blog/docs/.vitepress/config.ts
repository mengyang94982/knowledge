import { getThemeConfig, defineConfig } from "@dylanjs/vitepress-theme/node"


// https://vitepress.dev/reference/site-config

const blogTheme = getThemeConfig({
  author: "Dylan",
  comment: {
    repo: "ATQQ/sugar-blog",
    repoId: "MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk",
    category: "Announcements",
    categoryId: "DIC_kwDODmEcc84COVc6",
    inputPosition: "top",
  },
  popover: {
    title: "联系我",
    body: [
      { type: "text", content: "👇公众号👇---👇 微信 👇" },
      {
        type: "image",
        src: "https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210",
      },
      {
        type: "text",
        content: "欢迎大家私信交流",
      },
    ],
    duration: -1,
  },
  friend: [],
  search: false,
  recommend: {
    showSelf: true,
    nextText: "下一页",
    style: "sidebar",
  },
  authorList: [
    {
      nickname: "Dylan",
      url: "http://mengyang.online/",
      des: "你的指尖,拥有改变世界的力量",
    },
  ],
})

const extraHead: any =
  process.env.NODE_ENV === "production"
    ? [
        [
          "script",
          {
            charset: "UTF-8",
            id: "LA_COLLECT",
            src: "//sdk.51.la/js-sdk-pro.min.js",
          },
        ],
        [
          "script",
          {},
          'LA.init({id:"3FbAqLI3SfMDBcIj",ck:"3FbAqLI3SfMDBcIj"})',
        ],
      ]
    : []

export default defineConfig({
  extends: blogTheme,
  title: "前端成长之路",
  description:
    "Dylan的个人博客，记录随笔与学习笔记，大前端相关的知识，高频面试题，个人面经等",
  ignoreDeadLinks: true,
  lang: "zh-cn",
  vite: {
    server: {
      port: 3000,
      host: "0.0.0.0",
      open: true,
    },
  },
  lastUpdated: true,
  head: [
    [
      "meta",
      {
        name: "theme-color",
        content: "#ffffff",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/png",
      },
    ],
    [
      "link",
      {
        rel: "alternate icon",
        href: "/favicon.ico",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: "Dylan",
      },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/favicon.ico",
        color: "#ffffff",
      },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/favicon.ico",
        sizes: "180x180",
      },
    ],
    ...extraHead,
  ],
  themeConfig: {
    // search:{
    //
    // },
    lastUpdatedText: "上次更新于",
    footer: {},
    logo: "/logo.png",
    editLink:{
      pattern:
    },
    outline:{
      level:'deep',
      label:"目录"
    },
    outlineTitle: "目录",
    nav: [
      {
        text: "大前端",
        items: [
          {
            text: "HTML",
            link: "/大前端/html/",
          },
          {
            text: "CSS",
            link: "/大前端/css/",
          },
          {
            text: "JavaScript",
            link: "/大前端/JavaScript/",
          },
          {
            text:"NodeJS",
            link:"/大前端/node/"
          },
          {
            text: "NestJS",
            link: "/大前端/nest/",
          },
          {
            text: "vitepress",
            link: "/大前端/vitepress/",
          },
        ],
      },
      {
        text: "工程化",
        items: [
          {
            text: "vite",
            link: "/工程化/vite/",
          },
          {
            text: "Git",
            link: "/工程化/git/",
          },
          {
            text: "ESLint",
            link: "/工程化/eslint/",
          },
          {
            text:'软件',
            link:"/工程化/software/"
          }
        ],
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mengyang94982",
      },
    ],
  },
})