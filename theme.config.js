import { useConfig } from 'nextra-theme-docs'

export default {
  logo: <span style={{ fontWeight: "bold" }}>System-Design</span>,
  Layout: "default",
  project: {
    link: 'https://github.com/ch-shubham/system-design'
  },
  docsRepositoryBase: "https://github.com/ch-shubham/system-design",
  sidebar: {
    defaultMenuCollapseLevel: 0, // Collapse all levels including the first
  },
  footer: {
    content: "System Design is a project by Shubham Chaudhary",
  },
  head: () => {
    const { frontMatter } = useConfig()
    return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={frontMatter.title || 'System Design Made Easy'} />
      <meta
        property="og:description"
        content="Learn System Design in a fun way"
        key={"description"}
      />
    </>
  )},
  banner:{
    dismissible: false,
    content: "This is under development. This will be made open source soon. Stay tuned! 🚀",
  },
  // gitTimestamp: false //  uncomment to disable LastUpdated timestamp
}