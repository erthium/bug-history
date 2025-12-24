import { Injectable, signal, effect } from '@angular/core';

export interface Theme {
	name: string;
	label: string;
	colors: {
		bgPrimary: string;
		bgSecondary: string;
		bgTertiary: string;
		bgHover: string;
		textPrimary: string;
		textSecondary: string;
		textMuted: string;
		accentPrimary: string;
		accentSecondary: string;
		accentGlow: string;
		borderSubtle: string;
		borderDefault: string;
		codeBg: string;
		codeBorder: string;
		// Syntax highlighting
		hljsKeyword: string;
		hljsString: string;
		hljsNumber: string;
		hljsFunction: string;
		hljsComment: string;
		hljsVariable: string;
		hljsType: string;
		hljsOperator: string;
	};
}

export const themes: Theme[] = [
	{
		name: 'cyberpunk',
		label: 'Cyberpunk',
		colors: {
			bgPrimary: '#0a0a0f',
			bgSecondary: '#12121a',
			bgTertiary: '#1a1a25',
			bgHover: '#252532',
			textPrimary: '#e0e0ff',
			textSecondary: '#a0a0cc',
			textMuted: '#606088',
			accentPrimary: '#ff2a6d',
			accentSecondary: '#ff5a8d',
			accentGlow: 'rgba(255, 42, 109, 0.2)',
			borderSubtle: '#2a2a3a',
			borderDefault: '#3a3a4f',
			codeBg: '#0f0f16',
			codeBorder: '#2a2a3a',
			hljsKeyword: '#ff2a6d',
			hljsString: '#05ffa1',
			hljsNumber: '#fffb96',
			hljsFunction: '#00d4ff',
			hljsComment: '#606088',
			hljsVariable: '#ff9500',
			hljsType: '#f0f',
			hljsOperator: '#ff2a6d',
		},
	},
	{
		name: 'ocean',
		label: 'Ocean',
		colors: {
			bgPrimary: '#0a1628',
			bgSecondary: '#0f1f35',
			bgTertiary: '#162a46',
			bgHover: '#1e3654',
			textPrimary: '#e2e8f0',
			textSecondary: '#94a3b8',
			textMuted: '#64748b',
			accentPrimary: '#38bdf8',
			accentSecondary: '#7dd3fc',
			accentGlow: 'rgba(56, 189, 248, 0.15)',
			borderSubtle: '#1e3a5f',
			borderDefault: '#2d4a6f',
			codeBg: '#0c1a2e',
			codeBorder: '#1e3a5f',
			hljsKeyword: '#7dd3fc',
			hljsString: '#86efac',
			hljsNumber: '#fcd34d',
			hljsFunction: '#38bdf8',
			hljsComment: '#64748b',
			hljsVariable: '#f0abfc',
			hljsType: '#fbbf24',
			hljsOperator: '#22d3ee',
		},
	},
	{
		name: 'forest',
		label: 'Forest',
		colors: {
			bgPrimary: '#0a120a',
			bgSecondary: '#111c11',
			bgTertiary: '#1a281a',
			bgHover: '#243424',
			textPrimary: '#e5ebe5',
			textSecondary: '#9cb09c',
			textMuted: '#5f7a5f',
			accentPrimary: '#4ade80',
			accentSecondary: '#86efac',
			accentGlow: 'rgba(74, 222, 128, 0.15)',
			borderSubtle: '#1f3d1f',
			borderDefault: '#2d522d',
			codeBg: '#0d160d',
			codeBorder: '#1f3d1f',
			hljsKeyword: '#86efac',
			hljsString: '#fde047',
			hljsNumber: '#fdba74',
			hljsFunction: '#4ade80',
			hljsComment: '#5f7a5f',
			hljsVariable: '#f9a8d4',
			hljsType: '#fbbf24',
			hljsOperator: '#67e8f9',
		},
	},
	{
		name: 'purple-haze',
		label: 'Purple Haze',
		colors: {
			bgPrimary: '#120b1a',
			bgSecondary: '#1a1025',
			bgTertiary: '#241632',
			bgHover: '#2f1d40',
			textPrimary: '#ede5f5',
			textSecondary: '#b8a3cc',
			textMuted: '#7a5f99',
			accentPrimary: '#c084fc',
			accentSecondary: '#d8b4fe',
			accentGlow: 'rgba(192, 132, 252, 0.15)',
			borderSubtle: '#2d1f45',
			borderDefault: '#3d2960',
			codeBg: '#150d1e',
			codeBorder: '#2d1f45',
			hljsKeyword: '#f0abfc',
			hljsString: '#86efac',
			hljsNumber: '#fdba74',
			hljsFunction: '#c084fc',
			hljsComment: '#7a5f99',
			hljsVariable: '#fb7185',
			hljsType: '#fbbf24',
			hljsOperator: '#22d3ee',
		},
	},
	{
		name: 'rose',
		label: 'Rose',
		colors: {
			bgPrimary: '#1a0a10',
			bgSecondary: '#25101a',
			bgTertiary: '#321825',
			bgHover: '#3f1f30',
			textPrimary: '#f5e5ea',
			textSecondary: '#cca3b3',
			textMuted: '#995f75',
			accentPrimary: '#fb7185',
			accentSecondary: '#fda4af',
			accentGlow: 'rgba(251, 113, 133, 0.15)',
			borderSubtle: '#45202d',
			borderDefault: '#5a2a3d',
			codeBg: '#1e0c14',
			codeBorder: '#45202d',
			hljsKeyword: '#fda4af',
			hljsString: '#86efac',
			hljsNumber: '#fcd34d',
			hljsFunction: '#fb7185',
			hljsComment: '#995f75',
			hljsVariable: '#c4b5fd',
			hljsType: '#fbbf24',
			hljsOperator: '#67e8f9',
		},
	},
	{
		name: 'amber',
		label: 'Amber',
		colors: {
			bgPrimary: '#1a1408',
			bgSecondary: '#251e0c',
			bgTertiary: '#322812',
			bgHover: '#3f3218',
			textPrimary: '#f5f0e5',
			textSecondary: '#ccc0a3',
			textMuted: '#998a5f',
			accentPrimary: '#fbbf24',
			accentSecondary: '#fcd34d',
			accentGlow: 'rgba(251, 191, 36, 0.15)',
			borderSubtle: '#453d20',
			borderDefault: '#5a4f2a',
			codeBg: '#1e180c',
			codeBorder: '#453d20',
			hljsKeyword: '#fcd34d',
			hljsString: '#86efac',
			hljsNumber: '#fdba74',
			hljsFunction: '#fbbf24',
			hljsComment: '#998a5f',
			hljsVariable: '#f9a8d4',
			hljsType: '#fb923c',
			hljsOperator: '#67e8f9',
		},
	},
	{
		name: 'nord',
		label: 'Nord',
		colors: {
			bgPrimary: '#2e3440',
			bgSecondary: '#3b4252',
			bgTertiary: '#434c5e',
			bgHover: '#4c566a',
			textPrimary: '#eceff4',
			textSecondary: '#d8dee9',
			textMuted: '#9ba3b0',
			accentPrimary: '#88c0d0',
			accentSecondary: '#8fbcbb',
			accentGlow: 'rgba(136, 192, 208, 0.15)',
			borderSubtle: '#4c566a',
			borderDefault: '#5e6779',
			codeBg: '#353c4a',
			codeBorder: '#4c566a',
			hljsKeyword: '#81a1c1',
			hljsString: '#a3be8c',
			hljsNumber: '#b48ead',
			hljsFunction: '#88c0d0',
			hljsComment: '#616e88',
			hljsVariable: '#bf616a',
			hljsType: '#ebcb8b',
			hljsOperator: '#81a1c1',
		},
	},
	{
		name: 'coffee',
		label: 'Coffee',
		colors: {
			bgPrimary: '#1c1614',
			bgSecondary: '#261e1a',
			bgTertiary: '#322822',
			bgHover: '#3e322a',
			textPrimary: '#f0e6dc',
			textSecondary: '#c4b5a5',
			textMuted: '#8a7a6a',
			accentPrimary: '#d4a574',
			accentSecondary: '#e0bb92',
			accentGlow: 'rgba(212, 165, 116, 0.15)',
			borderSubtle: '#3a2e26',
			borderDefault: '#4a3e34',
			codeBg: '#221a16',
			codeBorder: '#3a2e26',
			hljsKeyword: '#e0bb92',
			hljsString: '#a8d4a4',
			hljsNumber: '#f0b090',
			hljsFunction: '#d4a574',
			hljsComment: '#8a7a6a',
			hljsVariable: '#f0a0a0',
			hljsType: '#f0d090',
			hljsOperator: '#90c0d0',
		},
	},
];

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly STORAGE_KEY = 'bug-history-theme';

	currentTheme = signal<Theme>(this.loadTheme());

	constructor() {
		// Apply theme whenever it changes
		effect(() => {
			this.applyTheme(this.currentTheme());
		});
	}

	private loadTheme(): Theme {
		if (typeof localStorage !== 'undefined') {
			const savedTheme = localStorage.getItem(this.STORAGE_KEY);
			if (savedTheme) {
				const theme = themes.find((t) => t.name === savedTheme);
				if (theme) return theme;
			}
		}
		return themes[0]; // Default to midnight
	}

	setTheme(themeName: string): void {
		const theme = themes.find((t) => t.name === themeName);
		if (theme) {
			this.currentTheme.set(theme);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(this.STORAGE_KEY, themeName);
			}
		}
	}

	private applyTheme(theme: Theme): void {
		const root = document.documentElement;
		root.style.setProperty('--bg-primary', theme.colors.bgPrimary);
		root.style.setProperty('--bg-secondary', theme.colors.bgSecondary);
		root.style.setProperty('--bg-tertiary', theme.colors.bgTertiary);
		root.style.setProperty('--bg-hover', theme.colors.bgHover);
		root.style.setProperty('--text-primary', theme.colors.textPrimary);
		root.style.setProperty('--text-secondary', theme.colors.textSecondary);
		root.style.setProperty('--text-muted', theme.colors.textMuted);
		root.style.setProperty('--accent-primary', theme.colors.accentPrimary);
		root.style.setProperty('--accent-secondary', theme.colors.accentSecondary);
		root.style.setProperty('--accent-glow', theme.colors.accentGlow);
		root.style.setProperty('--border-subtle', theme.colors.borderSubtle);
		root.style.setProperty('--border-default', theme.colors.borderDefault);
		root.style.setProperty('--code-bg', theme.colors.codeBg);
		root.style.setProperty('--code-border', theme.colors.codeBorder);
		// Syntax highlighting
		root.style.setProperty('--hljs-keyword', theme.colors.hljsKeyword);
		root.style.setProperty('--hljs-string', theme.colors.hljsString);
		root.style.setProperty('--hljs-number', theme.colors.hljsNumber);
		root.style.setProperty('--hljs-function', theme.colors.hljsFunction);
		root.style.setProperty('--hljs-comment', theme.colors.hljsComment);
		root.style.setProperty('--hljs-variable', theme.colors.hljsVariable);
		root.style.setProperty('--hljs-type', theme.colors.hljsType);
		root.style.setProperty('--hljs-operator', theme.colors.hljsOperator);
	}

	getThemes(): Theme[] {
		return themes;
	}
}
