import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Configure marked with syntax highlighting
marked.use(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		},
	})
);

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	content?: string;
}

interface FrontmatterResult {
	metadata: Omit<BlogPost, 'slug' | 'content'>;
	content: string;
}

@Injectable({
	providedIn: 'root',
})
export class BlogService {
	private http = inject(HttpClient);

	// List of blog slugs - add new posts here
	private readonly blogSlugs = ['test-blog'];

	private parseFrontmatter(markdown: string): FrontmatterResult {
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
		const match = markdown.match(frontmatterRegex);

		if (!match) {
			return {
				metadata: { title: 'Untitled', date: '', summary: '', tags: [] },
				content: markdown,
			};
		}

		const [, frontmatterStr, content] = match;
		const metadata: Record<string, unknown> = {};

		// Parse YAML-like frontmatter
		frontmatterStr.split('\n').forEach((line) => {
			const colonIndex = line.indexOf(':');
			if (colonIndex === -1) return;

			const key = line.slice(0, colonIndex).trim();
			let value = line.slice(colonIndex + 1).trim();

			// Remove quotes if present
			if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
				value = value.slice(1, -1);
			}

			// Parse array syntax [item1, item2]
			if (value.startsWith('[') && value.endsWith(']')) {
				const arrayContent = value.slice(1, -1);
				metadata[key] = arrayContent.split(',').map((item) => item.trim().replace(/^["']|["']$/g, ''));
			} else {
				metadata[key] = value;
			}
		});

		return {
			metadata: {
				title: (metadata['title'] as string) || 'Untitled',
				date: (metadata['date'] as string) || '',
				summary: (metadata['summary'] as string) || '',
				tags: (metadata['tags'] as string[]) || [],
			},
			content: content.trim(),
		};
	}

	getBlogList(): Observable<BlogPost[]> {
		const requests = this.blogSlugs.map((slug) =>
			this.http.get(`blogs/${slug}.md`, { responseType: 'text' }).pipe(
				map((markdown) => {
					const { metadata } = this.parseFrontmatter(markdown);
					return { slug, ...metadata } as BlogPost;
				}),
				catchError(() => of(null))
			)
		);

		return forkJoin(requests).pipe(
			map((posts) => posts.filter((post): post is BlogPost => post !== null)),
			map((posts) => posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
		);
	}

	getBlogContent(slug: string): Observable<{ post: BlogPost; html: string } | null> {
		return this.http.get(`blogs/${slug}.md`, { responseType: 'text' }).pipe(
			map((markdown) => {
				const { metadata, content } = this.parseFrontmatter(markdown);
				return {
					post: { slug, ...metadata },
					html: marked.parse(content) as string,
				};
			}),
			catchError(() => of(null))
		);
	}
}
