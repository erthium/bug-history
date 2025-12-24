import { Component, inject, signal, HostListener } from '@angular/core';
import { ThemeService, Theme, themes } from '../../services/theme.service';

@Component({
	selector: 'app-theme-selector',
	template: `
		<div class="relative">
			<button
				(click)="toggleDropdown()"
				class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-tertiary transition-colors"
			>
				<div class="w-3 h-3 rounded-full border border-border-default" [style.background-color]="currentTheme().colors.accentPrimary"></div>
				<span>{{ currentTheme().label }}</span>
				<svg class="w-3 h-3 transition-transform" [class.rotate-180]="isOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			@if (isOpen()) {
				<div class="absolute right-0 mt-2 w-44 py-1 bg-bg-secondary border border-border-default rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
					@for (theme of themes; track theme.name) {
						<button
							(click)="selectTheme(theme)"
							class="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-bg-tertiary transition-colors"
							[class.text-accent-primary]="theme.name === currentTheme().name"
							[class.text-text-secondary]="theme.name !== currentTheme().name"
						>
							<div
								class="w-3 h-3 rounded-full border shrink-0"
								[style.background-color]="theme.colors.accentPrimary"
								[style.border-color]="theme.colors.borderDefault"
							></div>
							<span>{{ theme.label }}</span>
							@if (theme.name === currentTheme().name) {
								<svg class="w-4 h-4 ml-auto shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
								</svg>
							}
						</button>
					}
				</div>
			}
		</div>
	`,
	styles: [],
})
export class ThemeSelectorComponent {
	private themeService = inject(ThemeService);

	themes = themes;
	currentTheme = this.themeService.currentTheme;
	isOpen = signal(false);

	toggleDropdown(): void {
		this.isOpen.update((v) => !v);
	}

	selectTheme(theme: Theme): void {
		this.themeService.setTheme(theme.name);
		this.isOpen.set(false);
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('app-theme-selector')) {
			this.isOpen.set(false);
		}
	}
}
