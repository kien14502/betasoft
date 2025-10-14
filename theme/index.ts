// theme.ts
import { theme as antdTheme, ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1f387d',
    // Header tokens
  },
  components: {
    Layout: {
      bodyBg: '#F2F4F8',
      headerBg: '#F2F4F8',
      headerColor: '#000000',
    },
  },
};

// export const darkTheme: ThemeConfig = {
//   algorithm: antdTheme.darkAlgorithm,
//   token: {
//     colorPrimary: "#722ed1",
//   },
//   components: {
//     Layout: {
//       headerBg: "#141414",
//       headerColor: "#fff",
//     },
//   },
// };
