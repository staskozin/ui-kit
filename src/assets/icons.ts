const Icons = {
  calendar: '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.83 3.33H4.17c-.92 0-1.67.75-1.67 1.67v11.67c0 .92.75 1.66 1.67 1.66h11.66c.92 0 1.67-.74 1.67-1.66V5c0-.92-.75-1.67-1.67-1.67m-2.5-1.66V5M6.67 1.67V5M2.5 8.33h15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  paperclip: '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="m17.8666 9.2084-7.6584 7.6583a5.0026 5.0026 0 0 1-8.5402-3.5375c0-1.3268.527-2.5993 1.4653-3.5375l7.6583-7.6583A3.3352 3.3352 0 1 1 15.5082 6.85l-7.6666 7.6583a1.6674 1.6674 0 0 1-2.8468-1.1791c0-.4423.1757-.8665.4885-1.1792l7.0749-7.0666" stroke="currentColor" stroke-width="1.6667" stroke-linecap="round" stroke-linejoin="round"/></svg>',
} as const;

export type IconName = keyof typeof Icons;

export default Icons;
