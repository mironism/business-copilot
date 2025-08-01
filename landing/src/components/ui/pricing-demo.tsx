import React from 'react';
import { PricingSection } from '@/components/ui/pricing';

export default function PricingDemo() {
	return (
		<div className="bg-[#080808] min-h-screen flex items-center justify-center py-12">
			<PricingSection
				plans={PLANS}
				heading="Simple, Transparent Pricing"
				description="Choose the plan that works for you. All plans include access to our AI-powered business planning tools and dedicated support."
			/>
		</div>
	);
}

const PLANS = [
	{
		id: 'free',
		name: 'Free',
		info: 'Perfect for trying out our platform',
		price: {
			monthly: 0,
			yearly: 0,
		},
		features: [
			{ text: '1 business plan project' },
			{ text: 'Light business plan creation' },
			{ text: 'Basic market analysis' },
			{
				text: 'PDF export',
				tooltip: 'Export your business plan as PDF document',
			},
			{
				text: 'Community support',
				tooltip: 'Get help from our community forum',
			},
		],
		btn: {
			text: 'Start Free',
			href: '/sign-up',
		},
	},
	{
		highlighted: true,
		id: 'starter',
		name: 'Starter',
		info: 'For entrepreneurs and small businesses',
		price: {
			monthly: 12,
			yearly: 9,
		},
		features: [
			{ text: 'Up to 5 simultaneous projects' },
			{ text: 'Advanced market analysis' },
			{ text: 'PDF & multiple format export' },
			{
				text: 'AI advisor chat',
				tooltip: 'Real-time chat with AI business advisor',
			},
			{
				text: 'Priority support',
				tooltip: 'Get priority email and chat support',
			},
			{
				text: 'Financial modeling',
				tooltip: 'Advanced financial projections and modeling tools',
			},
		],
		btn: {
			text: 'Get Started',
			href: '/sign-up',
		},
	},
	{
		name: 'Pro',
		info: 'For scaling businesses and teams',
		price: {
			monthly: 39,
			yearly: 29,
		},
		features: [
			{ text: 'Unlimited projects' },
			{ text: 'Full-context AI chat co-pilot' },
			{ text: 'Live market data integration' },
			{
				text: 'Advanced analytics',
				tooltip: 'Comprehensive business intelligence and reporting',
			},
			{
				text: 'Priority support',
				tooltip: 'Get 24/7 priority support with dedicated success manager',
			},
			{
				text: 'Team collaboration',
				tooltip: 'Advanced team features and workflow management',
			},
			{
				text: 'Custom integrations',
				tooltip: 'Connect with your existing business tools and workflows',
			},
		],
		btn: {
			text: 'Contact Sales',
			href: '/contact',
		},
	},
];

export { PricingDemo };