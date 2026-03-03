import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function LoginPage() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const errs = {};
        if (!formData.firstName.trim()) errs.firstName = 'First name is required';
        if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';
        if (!formData.password) errs.password = 'Password is required';
        else if (formData.password.length < 8) errs.password = 'Password must be 8+ characters';
        if (!formData.agreeTerms) errs.agreeTerms = 'You must agree to the terms';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setIsSubmitting(true);
        // Simulate API delay
        await new Promise(r => setTimeout(r, 1200));
        setIsSubmitting(false);
        navigate('/dashboard');
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const features = [
        'Effortlessly spider and map targets to uncover hidden security flaws',
        'Deliver high-quality, validated findings in hours, not weeks.',
        'Generate professional, enterprise-grade security reports automatically.',
    ];

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Theme toggle - floating */}
            <div className="absolute top-4 right-4 z-10">
                <ThemeToggle />
            </div>

            {/* Left Panel */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 relative overflow-hidden flex flex-col justify-center p-8 lg:p-16 min-h-[40vh] lg:min-h-screen"
            >
                {/* Dark gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
                    {/* Decorative blurred orbs */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-lg">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-12">
                        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">aps</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
                        Expert level Cybersecurity
                        <br />
                        in <span className="text-accent">hours</span> not weeks.
                    </h1>

                    {/* Features */}
                    <div className="mb-10">
                        <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">What&apos;s included</h3>
                        <ul className="space-y-3.5">
                            {features.map((feat, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.15 }}
                                    className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                                >
                                    <Check size={18} className="text-accent shrink-0 mt-0.5" />
                                    {feat}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Trustpilot */}
                    <div className="flex items-center gap-3">
                        <Star size={18} className="text-green-400 fill-green-400" />
                        <span className="text-green-400 text-sm font-semibold">Trustpilot</span>
                    </div>
                    <p className="text-white mt-1.5">
                        <span className="text-2xl font-bold">Rated 4.5/5.0</span>
                        <span className="text-gray-400 text-sm ml-2">(100k+ reviews)</span>
                    </p>
                </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-white dark:bg-surface-dark"
            >
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-surface-dark-secondary rounded-2xl p-8 lg:p-10 shadow-xl dark:shadow-2xl border border-surface-light-border dark:border-surface-dark-border">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                            Sign up
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                            Already have an account?{' '}
                            <button className="text-accent hover:text-accent-hover font-medium transition-colors">
                                Log in
                            </button>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {/* First Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="First name*"
                                    value={formData.firstName}
                                    onChange={e => handleChange('firstName', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-surface-dark-border'} bg-gray-50 dark:bg-surface-dark-tertiary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                                    aria-label="First name"
                                    aria-invalid={!!errors.firstName}
                                />
                                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Last name*"
                                    value={formData.lastName}
                                    onChange={e => handleChange('lastName', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-surface-dark-border'} bg-gray-50 dark:bg-surface-dark-tertiary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                                    aria-label="Last name"
                                    aria-invalid={!!errors.lastName}
                                />
                                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email address*"
                                    value={formData.email}
                                    onChange={e => handleChange('email', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-surface-dark-border'} bg-gray-50 dark:bg-surface-dark-tertiary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                                    aria-label="Email address"
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password (8+ characters)*"
                                    value={formData.password}
                                    onChange={e => handleChange('password', e.target.value)}
                                    className={`w-full px-4 py-3 pr-12 rounded-lg border ${errors.password ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-surface-dark-border'} bg-gray-50 dark:bg-surface-dark-tertiary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
                                    aria-label="Password"
                                    aria-invalid={!!errors.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="agree-terms"
                                    checked={formData.agreeTerms}
                                    onChange={e => handleChange('agreeTerms', e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                />
                                <label htmlFor="agree-terms" className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed cursor-pointer">
                                    I agree to Aps&apos;s{' '}
                                    <button type="button" className="text-accent hover:text-accent-hover font-medium">Terms & Conditions</button>{' '}
                                    and acknowledge the{' '}
                                    <button type="button" className="text-accent hover:text-accent-hover font-medium">Privacy Policy</button>
                                </label>
                            </div>
                            {errors.agreeTerms && <p className="text-xs text-red-500 -mt-2">{errors.agreeTerms}</p>}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-accent/25"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    'Create account'
                                )}
                            </button>
                        </form>

                        {/* Social Login Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-200 dark:bg-surface-dark-border" />
                            <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-surface-dark-border" />
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                className="flex items-center justify-center py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity"
                                aria-label="Sign up with Apple"
                                onClick={() => navigate('/dashboard')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                            </button>
                            <button
                                className="flex items-center justify-center py-3 rounded-lg bg-white dark:bg-surface-dark-tertiary border border-gray-200 dark:border-surface-dark-border text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-surface-dark-card transition-colors"
                                aria-label="Sign up with Google"
                                onClick={() => navigate('/dashboard')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </button>
                            <button
                                className="flex items-center justify-center py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                                aria-label="Sign up with Meta"
                                onClick={() => navigate('/dashboard')}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
