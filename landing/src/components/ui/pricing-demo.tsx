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
			{ text: '3 business plan projects' },
			{ text: 'Live business plan creation' },
			{ text: 'Basic market analysis' },
			{ text: 'PDF exports' },
			{ text: '10 AI business advisor credits' },
		],
		btn: {
			text: 'Start Free',
			href: '/sign-up',
		},
	},
	{
		highlighted: true,
		id: 'pro',
		name: 'Pro',
		info: 'For serious entrepreneurs and growing businesses',
		price: {
			monthly: 20,
			yearly: 15,
		},
		features: [
			{ text: 'Unlimited projects' },
			{ text: 'Full context AI chat co-pilot' },
			{ text: 'AI business advisor' },
			{ text: 'Live market data integration' },
			{ text: 'Advanced analytics' },
			{ text: 'Priority support' },
			{ text: 'PDF and multiple format exports' },
			{ text: 'Financial modeling' },
		],
		btn: {
			text: 'Get Started',
			href: '/sign-up',
		},
	},
];

export { PricingDemo };