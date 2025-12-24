import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
	selector: 'app-home',
	imports: [RouterLink],
	template: `
		<div class="max-w-4xl mx-auto px-6 py-12">
			<!-- Hero Section -->
			<section class="mb-16">
				<h1 class="text-3xl font-bold text-text-primary mb-4">Bug History</h1>
				<p class="text-text-secondary text-lg leading-relaxed max-w-2xl">
					A collection of bugs, edge cases, and difficult situations I've encountered throughout my engineering journey. Documenting the problems so we don't
					repeat them.
				</p>
				<div class="mt-6 flex items-center gap-2 text-text-muted text-sm">
					<span>"Yes, I created a lie. But because you believed it, you found something true about yourself." — V</span>
				</div>
			</section>

			<!-- Blog Posts -->
			<section>
				<div class="flex items-center justify-between mb-8">
					<h2 class="text-xl font-semibold text-text-primary">Posts</h2>
					<span class="text-sm text-text-muted">{{ posts().length }} posts</span>
				</div>

				@if (loading()) {
					<div class="text-text-muted">Loading posts...</div>
				} @else if (posts().length === 0) {
					<div class="text-text-muted">No posts yet.</div>
				} @else {
					<div class="space-y-6">
						@for (post of posts(); track post.slug) {
							<article class="group p-6 rounded-lg bg-bg-secondary border border-border-subtle hover:border-border-default transition-all">
								<a [routerLink]="['/blog', post.slug]" class="block">
									<div class="flex items-start justify-between gap-4 mb-3">
										<h3 class="text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors">
											{{ post.title }}
										</h3>
										<div class="flex items-center gap-3 text-sm text-text-muted whitespace-nowrap">
											@if (hasViewCounts()) {
												<div class="flex items-center gap-1">
													<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
													<span>{{ getViewCount(post.slug) }}</span>
												</div>
											}
											<time>{{ post.date }}</time>
										</div>
									</div>
									<p class="text-text-secondary text-sm leading-relaxed mb-4">
										{{ post.summary }}
									</p>
									<div class="flex items-center gap-2">
										@for (tag of post.tags; track tag) {
											<span class="px-2 py-1 text-xs rounded bg-bg-tertiary text-text-muted">
												{{ tag }}
											</span>
										}
									</div>
								</a>
							</article>
						}
					</div>
				}
			</section>
		</div>
	`,
	styles: [],
})
export class HomeComponent implements OnInit {
	private blogService = inject(BlogService);

	posts = signal<BlogPost[]>([]);
	viewCounts = signal<Record<string, number> | null>(null);
	loading = signal(true);

	ngOnInit() {
		// Fetch posts and view counts in parallel
		this.blogService.getBlogList().subscribe((posts) => {
			this.posts.set(posts);
			this.loading.set(false);
		});

		this.blogService.getAllViewCounts().subscribe((counts) => {
			// Only set view counts if API responded successfully
			if (counts !== null) {
				this.viewCounts.set(counts);
			}
		});
	}

	getViewCount(slug: string): number | null {
		const counts = this.viewCounts();
		if (counts === null) return null;
		return counts[slug] ?? 0;
	}

	hasViewCounts(): boolean {
		return this.viewCounts() !== null;
	}
}
