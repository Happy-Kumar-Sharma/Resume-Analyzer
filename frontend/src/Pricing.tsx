import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const plans = [
	{
		name: 'Free',
		price: '$0',
		features: [
			'Basic resume analysis',
			'Skill extraction',
			'Limited AI suggestions',
			'Access to dashboard',
			'Community support',
		],
		color: '#7f5af0',
		highlight: false,
	},
	{
		name: 'Pro',
		price: '$9/mo',
		features: [
			'Everything in Free',
			'Unlimited resume uploads',
			'Full AI-powered enhancements',
			'Job match recommendations',
			'Priority support',
		],
		color: '#2cb67d',
		highlight: true,
	},
	{
		name: 'Enterprise',
		price: 'Contact Us',
		features: [
			'All Pro features',
			'Team analytics dashboard',
			'Custom integrations',
			'Dedicated account manager',
			'SLA & onboarding',
		],
		color: '#f5a524',
		highlight: false,
	},
];

const sidebarStyle: React.CSSProperties = {
	width: 220,
	background: 'linear-gradient(120deg, #7f5af0 0%, #2cb67d 100%)',
	color: '#fff',
	minHeight: '100vh',
	padding: '32px 0',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	boxShadow: '2px 0 16px rgba(127,90,240,0.08)',
	position: 'fixed',
	left: 0,
	top: 0,
	zIndex: 10,
};

const linkStyle: React.CSSProperties = {
	color: '#fff',
	textDecoration: 'none',
	fontWeight: 600,
	fontSize: 18,
	margin: '18px 0',
	padding: '8px 24px',
	borderRadius: 16,
	transition: 'background 0.2s, color 0.2s',
	display: 'block',
};

const Pricing: React.FC = () => {
	const [navOpen, setNavOpen] = useState(false);

	return (
		<>
			<nav className="dashboard-mobile-nav">
				<button
					className="dashboard-mobile-nav__toggle"
					aria-label="Open navigation menu"
					onClick={() => setNavOpen((open) => !open)}
				>
					<span className="dashboard-mobile-nav__icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</button>
				{navOpen && (
					<div className="dashboard-mobile-nav__links">
						<a href="/">Home</a>
			<a href="/dashboard">Dashboard</a>
			<a href="/analyze">Analyze</a>
			<a href="/qna-dashboard">Q&A Dashboard</a>
			<a href="/history">History</a>
			<a href="/settings">Settings</a>
			<a href="/blog">Blog</a>
			<a href="/faq">FAQ</a>
			<a href="/pricing">Pricing</a>
					</div>
				)}
			</nav>
			<div style={{ display: 'flex', minHeight: '100vh' }}>
				<aside style={sidebarStyle} className="dashboard-sidebar">
					<h2
						style={{
							fontWeight: 800,
							fontSize: 28,
							marginBottom: 32,
							letterSpacing: '-1px',
						}}
					>
						AI Resume Analyzer
					</h2>
		  <Link to="/dashboard" style={linkStyle}>
			Dashboard
		  </Link>
		  <Link to="/analyze" style={linkStyle}>
			Analyze
		  </Link>
		  <Link to="/qna-dashboard" style={linkStyle}>
			Q&A Dashboard
		  </Link>
		  <Link to="/history" style={linkStyle}>
			History
		  </Link>
		  <Link to="/settings" style={linkStyle}>
			Settings
		  </Link>
		  <Link to="/blog" style={linkStyle}>
			Blog
		  </Link>
		  <Link to="/faq" style={linkStyle}>
			FAQ
		  </Link>
		  <Link to="/pricing" style={linkStyle}>
			Pricing
		  </Link>
				</aside>
				<main style={{ marginLeft: 220, flex: 1, padding: '48px 32px' }} className="dashboard-main">
					<h1
						style={{
							fontSize: 38,
							fontWeight: 800,
							color: '#7f5af0',
							marginBottom: 16,
						}}
					>
						Pricing
					</h1>
					<p
						style={{
							color: '#444',
							fontSize: 20,
							marginBottom: 48,
						}}
					>
						Choose the plan that fits your career journey. No hidden fees, cancel
						anytime.
					</p>
					<div
						style={{
							display: 'flex',
							gap: 32,
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						{plans.map((plan) => (
							<div
								key={plan.name}
								style={{
									background: '#fff',
									borderRadius: 24,
									boxShadow: plan.highlight
										? '0 4px 24px #2cb67d22'
										: '0 2px 12px #7f5af022',
									border: plan.highlight
										? '2px solid #2cb67d'
										: '1.5px solid #e0d7f7',
									minWidth: 300,
									maxWidth: 340,
									flex: 1,
									padding: '40px 32px',
									margin: '0 0 24px 0',
									position: 'relative',
									zIndex: plan.highlight ? 2 : 1,
									transform: plan.highlight ? 'scale(1.05)' : 'none',
								}}
							>
								<h2
									style={{
										color: plan.color,
										fontWeight: 800,
										fontSize: 28,
										marginBottom: 8,
									}}
								>
									{plan.name}
								</h2>
								<div
									style={{
										fontSize: 32,
										fontWeight: 700,
										color: '#232046',
										marginBottom: 18,
									}}
								>
									{plan.price}
								</div>
								<ul
									style={{
										listStyle: 'none',
										padding: 0,
										margin: 0,
										marginBottom: 24,
									}}
								>
									{plan.features.map((f) => (
										<li
											key={f}
											style={{
												color: '#444',
												fontSize: 17,
												marginBottom: 10,
												display: 'flex',
												alignItems: 'center',
												gap: 8,
											}}
										>
											<span
												style={{
													color: plan.color,
													fontWeight: 700,
												}}
											>
												•
											</span>{' '}
											{f}
										</li>
									))}
								</ul>
								<button
									style={{
										background: plan.highlight
											? 'linear-gradient(90deg, #2cb67d 0%, #7f5af0 100%)'
											: '#e0d7f7',
										color: plan.highlight ? '#fff' : '#232046',
										fontWeight: 700,
										fontSize: 18,
										borderRadius: 12,
										padding: '12px 0',
										border: 'none',
										width: '100%',
										cursor: 'pointer',
										marginTop: 8,
										boxShadow: plan.highlight
											? '0 2px 8px #2cb67d33'
											: 'none',
										transition: 'all 0.2s',
									}}
								>
									{plan.highlight
										? 'Start Pro'
										: plan.name === 'Free'
										? 'Get Started'
										: 'Contact Sales'}
								</button>
							</div>
						))}
					</div>
				</main>
			</div>
		</>
	);
};

export default Pricing;
