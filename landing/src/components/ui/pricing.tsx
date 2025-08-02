'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { CheckCircleIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, Transition } from 'framer-motion';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

interface Plan {
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number;
	};
	features: {
		text: string;
		tooltip?: string;
	}[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
	plans: Plan[];
	heading: string;
	description?: string;
}

export function PricingSection({
	plans,
	heading,
	description,
	...props
}: PricingSectionProps) {
	const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
		'yearly',
	);

	return (
		<div
			className={cn(
				'flex w-full flex-col items-center justify-center space-y-5 p-4',
				props.className,
			)}
			{...props}
		>
			<div className="mx-auto max-w-xl space-y-2">
				<h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl text-white">
					{heading}
				</h2>
				{description && (
					<p className="text-white/60 text-center text-sm md:text-base">
						{description}
					</p>
				)}
			</div>
			<PricingFrequencyToggle
				frequency={frequency}
				setFrequency={setFrequency}
			/>
			<div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2 justify-items-center">
				{plans.map((plan) => (
					<PricingCard plan={plan} key={plan.name} frequency={frequency} />
				))}
			</div>
		</div>
	);
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
	frequency: FREQUENCY;
	setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
	frequency,
	setFrequency,
	...props
}: PricingFrequencyToggleProps) {
	return (
		<div
			className={cn(
				'bg-white/[0.08] mx-auto flex w-fit rounded-full border border-white/[0.15] p-1',
				props.className,
			)}
			{...props}
		>
			{frequencies.map((freq) => (
				<button
					key={freq}
					onClick={() => setFrequency(freq)}
					className={cn(
						"relative px-6 py-2 text-sm capitalize transition-colors duration-200",
						frequency === freq ? "text-black" : "text-white/70 hover:text-white"
					)}
				>
					<span className="relative z-10">{freq}</span>
					{frequency === freq && (
						<motion.span
							layoutId="frequency"
							transition={{ type: 'spring', duration: 0.4 }}
							className="bg-white absolute inset-0 z-0 rounded-full"
						/>
					)}
				</button>
			))}
		</div>
	);
}

type PricingCardProps = React.ComponentProps<'div'> & {
	plan: Plan;
	frequency?: FREQUENCY;
};

export function PricingCard({
	plan,
	className,
	frequency = frequencies[0],
	...props
}: PricingCardProps) {
	return (
		<div
			key={plan.name}
			className={cn(
				'relative flex w-full flex-col rounded-lg border bg-white/[0.02]',
				plan.highlighted 
					? 'border-white/[0.4] bg-white/[0.05] shadow-lg shadow-white/[0.1]' 
					: 'border-white/[0.1]',
				className,
			)}
			{...props}
		>

			<div
				className={cn(
					'bg-white/[0.02] rounded-t-lg border-b border-white/[0.1] p-4',
					plan.highlighted && 'bg-white/[0.05]',
				)}
			>
				<div className="flex items-center justify-between">
					<div className="text-lg font-medium text-white">{plan.name}</div>
					{frequency === 'yearly' && plan.price.monthly > 0 && (
						<p className="bg-white text-black flex items-center gap-1 rounded-md border border-white/20 px-2 py-0.5 text-xs font-medium">
							{Math.round(
								((plan.price.monthly - plan.price.yearly) / plan.price.monthly) * 100,
							)}
							% off
						</p>
					)}
				</div>
				<p className="text-white/60 text-sm font-normal">{plan.info}</p>
				<h3 className="mt-2 flex items-end gap-1">
					<span className="text-3xl font-bold text-white">
						${plan.price[frequency]}
					</span>
					<span className="text-white/60">
						/month
					</span>
				</h3>
				<p className="text-xs leading-5 text-white/50 mb-2">
					{plan.price[frequency] > 0 ? (frequency === 'monthly' ? "billed monthly" : "billed annually") : "forever"}
				</p>
			</div>
			<div
				className={cn(
					'text-white/70 space-y-4 px-4 py-6 text-sm',
					plan.highlighted && 'bg-white/[0.02]',
				)}
			>
				{plan.features.map((feature, index) => (
					<div key={index} className="flex items-center gap-2">
						<CheckCircleIcon className="text-green-400 h-4 w-4" />
						<p>{feature.text}</p>
					</div>
				))}
			</div>
			<div
				className={cn(
					'mt-auto w-full border-t border-white/[0.1] p-3',
					plan.highlighted && 'bg-white/[0.05]',
				)}
			>
				<Button
					className={cn(
						"w-full transition-colors duration-200",
						plan.highlighted 
							? "bg-white text-black hover:bg-white/90" 
							: "bg-white/[0.08] text-white border border-white/[0.15] hover:bg-white/[0.12] hover:border-white/[0.25]"
					)}
					variant="ghost"
					asChild
				>
					<Link href={plan.btn.href}>{plan.btn.text}</Link>
				</Button>
			</div>
		</div>
	);
}


