'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, Sparkles } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'AI Business Plans', href: '#features' },
			{ title: 'Market Analysis', href: '#features' },
			{ title: 'Financial Modeling', href: '#features' },
			{ title: 'AI Advisor', href: '#advisor' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
			{ title: 'Contact', href: '/contact' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Help Center', href: '/help' },
			{ title: 'Templates', href: '/templates' },
			{ title: 'API Docs', href: '/docs' },
		],
	},
	{
		label: 'Connect',
		links: [
			{ title: 'Twitter', href: '#', icon: TwitterIcon },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
			{ title: 'YouTube', href: '#', icon: YoutubeIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full bg-[#080808] border-t border-white/[0.08] px-6 py-12 lg:py-16">
			<div className="absolute top-0 left-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-1/2 -translate-y-1/2" />

			<div className="max-w-6xl mx-auto">
				<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-12">
					<AnimatedContainer className="space-y-4">
						<div className="flex items-center gap-2">
							<Sparkles className="size-8 text-white" />
							<span className="text-xl font-bold text-white">Business Copilot</span>
						</div>
						<p className="text-white/60 text-sm max-w-xs">
							AI-powered business planning tools that help entrepreneurs build successful companies faster.
						</p>
						<p className="text-white/40 text-xs pt-4">
							© {new Date().getFullYear()} Business Copilot. All rights reserved.
						</p>
					</AnimatedContainer>

					<div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
						{footerLinks.map((section, index) => (
							<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
								<div className="space-y-4">
									<h3 className="text-sm font-semibold text-white">{section.label}</h3>
									<ul className="space-y-3">
										{section.links.map((link) => (
											<li key={link.title}>
												<a
													href={link.href}
													className="text-white/60 hover:text-white inline-flex items-center text-sm transition-colors duration-200"
												>
													{link.icon && <link.icon className="me-2 size-4" />}
													{link.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						))}
					</div>
				</div>

				<AnimatedContainer delay={0.5} className="mt-12 pt-8 border-t border-white/[0.08]">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-6">
							<span className="text-white/40 text-xs">Made with AI for entrepreneurs</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-white/40 text-xs">Follow us:</span>
							<div className="flex items-center gap-3">
								{footerLinks[3].links.map((social) => (
									<a
										key={social.title}
										href={social.href}
										className="text-white/40 hover:text-white transition-colors duration-200"
										aria-label={social.title}
									>
										{social.icon && <social.icon className="size-4" />}
									</a>
								))}
							</div>
						</div>
					</div>
				</AnimatedContainer>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}