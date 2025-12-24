import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { switchMap } from 'rxjs';

@Component({
	selector: 'app-blog',
	imports: [RouterLink],
	template: `
		<div class="max-w-4xl mx-auto px-6 py-12">
			<!-- Back Link -->
			<a routerLink="/" class="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-8">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to posts
			</a>

			@if (loading()) {
				<div class="text-text-muted">Loading...</div>
			} @else if (post()) {
				<!-- Post Header -->
				<header class="mb-10">
					<h1 class="text-3xl font-bold text-text-primary mb-4">
						{{ post()!.title }}
					</h1>
					<div class="flex items-center gap-4 text-sm text-text-muted">
						<time>{{ post()!.date }}</time>
						<span class="w-1 h-1 rounded-full bg-text-muted"></span>
						<div class="flex items-center gap-2">
							@for (tag of post()!.tags; track tag) {
								<span class="px-2 py-1 text-xs rounded bg-bg-tertiary">
									{{ tag }}
								</span>
							}
						</div>
					</div>
				</header>

				<!-- Post Content -->
				<article class="markdown-content" [innerHTML]="content()"></article>

				<!-- Navigation -->
				<div class="mt-16 pt-8 border-t border-border-subtle">
					<a routerLink="/" class="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						Read more posts
					</a>
				</div>
			} @else {
				<div class="text-text-muted">
					<h2 class="text-xl font-semibold text-text-primary mb-2">Post not found</h2>
					<p>The blog post you're looking for doesn't exist.</p>
					<a routerLink="/" class="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors mt-4"> Go back home </a>
				</div>
			}
		</div>
	`,
	styles: [],
})
export class BlogComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private blogService = inject(BlogService);

	post = signal<BlogPost | undefined>(undefined);
	content = signal('');
	loading = signal(true);

	ngOnInit() {
		this.route.params.pipe(switchMap((params) => this.blogService.getBlogContent(params['slug']))).subscribe((result) => {
			if (result) {
				this.post.set(result.post);
				this.content.set(result.html);
			}
			this.loading.set(false);
		});
	}
}
