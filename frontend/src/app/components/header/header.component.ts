import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'app-header',
	imports: [RouterLink, ThemeSelectorComponent],
	template: `
		<header class="py-6 border-b border-border-subtle">
			<div class="max-w-4xl mx-auto px-6 flex items-center justify-between">
				<div class="flex items-center gap-4">
					<a routerLink="/" class="group flex items-center gap-3">
						<img src="terminal.svg" alt="Bug History" class="w-8 h-8" [style.filter]="iconFilter()" />
						<span class="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors"> Bug History </span>
					</a>
					<a
						href="https://github.com/erthium/bug-history"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-1.5 px-2 py-1 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
						title="View on GitHub"
					>
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
							/>
						</svg>
						<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
						</svg>
						<span class="text-xs font-medium">{{ stars() }}</span>
					</a>
				</div>
				<nav class="flex items-center gap-4">
					<a routerLink="/" class="text-sm text-text-secondary hover:text-text-primary transition-colors"> Home </a>
					<div class="w-px h-4 bg-border-subtle"></div>
					<app-theme-selector />
				</nav>
			</div>
		</header>
	`,
	styles: [],
})
export class HeaderComponent implements OnInit {
	private themeService = inject(ThemeService);
	private http = inject(HttpClient);

	stars = signal<string>('—');

	iconFilter = computed(() => {
		const theme = this.themeService.currentTheme();
		return theme.name === 'light' ? 'brightness(0)' : 'brightness(0) invert(1)';
	});

	ngOnInit() {
		this.http.get<{ stargazers_count: number }>('https://api.github.com/repos/erthium/bug-history').subscribe({
			next: (data) => {
				this.stars.set(data.stargazers_count.toString());
			},
			error: () => {
				this.stars.set('0');
			},
		});
	}
}
