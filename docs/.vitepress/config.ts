import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 vite NPM template',
  description: 'Vitepress documentation example for vue3-Parallax repository',
  lang: 'en-US',
  base: '/vue3-Parallax/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.webp',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/joaquinabenza/vue3-Parallax' }],
  },
})
