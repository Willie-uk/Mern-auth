import React from "react";
import { Check, X } from "lucide-react";

interface PasswordCriteriaProps {
	password: string;
}

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({ password }) => {
	const criteria: { label: string; met: boolean }[] = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div className='mt-2 space-y-1'>
			{criteria.map((item) => (
				<div key={item.label} className='d-flex align-items-center text-xs'>
					{item.met ? (
						<Check style={{ width: '16px', color: '#007bff', marginRight: '8px' }} />
					) : (
						<X style={{ width: '16px', color: '#6c757d', marginRight: '8px' }} />
					)}
					<span style={{ color: item.met ? '#007bff' : '#6c757d' }}>{item.label}</span>
				</div>
			))}
		</div>
	);
};

interface PasswordStrengthMeterProps {
	password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
	const getStrength = (pass: string): number => {
		let strength = 0;
		if (pass.length >= 6) strength++;
		if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
		if (/\d/.test(pass)) strength++;
		if (/[^a-zA-Z\d]/.test(pass)) strength++;
		return strength;
	};

	const getColor = (strength: number): string => {
		if (strength === 0) return "#ff0018";
		if (strength === 1) return "#fd7e14";
		if (strength === 2) return "#ffc107";
		if (strength === 3) return "#28a745";
		return "#007666";
	};

	const getStrengthText = (strength: number): string => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

	const strength = getStrength(password);

	return (
		<div style={{ marginTop: '8px' }}>
			<div className='d-flex justify-content-between align-items-center mb-1'>
				<span style={{ fontSize: '12px', color: '#6c757d' }}>Password strength</span>
				<span style={{ fontSize: '12px', color: '#6c757d' }}>{getStrengthText(strength)}</span>
			</div>

			<div className='d-flex justify-content-between'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						style={{
							height: '4px',
							width: '24%',
							borderRadius: '0.25rem',
							backgroundColor: index < strength ? getColor(strength) : '#6c757d',
							transition: 'background-color 0.3s ease'
						}}
					/>
				))}
			</div>
			<PasswordCriteria password={password} />
		</div>
	);
};

export default PasswordStrengthMeter;
