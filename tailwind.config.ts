import type { Config } from "tailwindcss";

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "#1a1a1a",
				secondary: "#2d2d2d",
				accent: "#ff4081",
			},
		},
	},
	plugins: [],
} satisfies Config;
