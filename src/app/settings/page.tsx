'use client';

import { useState, useEffect } from 'react';
import {
    Settings, Users, Shield, Bell, Database, Save, CheckCircle2, Power,
    CreditCard, Globe, Key, Webhook, Mail, Plus, Trash2, Sun, Moon, Monitor,
    Book, FileCode, ExternalLink, HelpCircle, FileText, PlayCircle // Added icons
} from 'lucide-react';
import ExplainerVideo from '@/components/onboarding/ExplainerVideo';

// --- Types ---
interface CountryConfig {
    code: string;
    name: string;
    currency: string;
    countryLimit: number; // Max total payout/cap for the country market
    promoLimit: number;   // Max cap for a single promotion
}

// --- Mock Data ---
const USERS = [
    { id: 1, name: 'Admin User', role: 'Super Admin', email: 'admin@betika.com', status: 'Active' },
    { id: 2, name: 'Sarah K.', role: 'CRM Manager', email: 'sarah.k@betika.com', status: 'Active' },
    { id: 3, name: 'David O.', role: 'Analyst', email: 'david.o@betika.com', status: 'Inactive' },
];

const INTEGRATIONS = [
    { id: 'twilio', name: 'Twilio SMS', status: 'connected', icon: 'T' },
    { id: 'sendgrid', name: 'SendGrid Email', status: 'connected', icon: 'S' },
    { id: 'segment', name: 'Segment.io', status: 'disconnected', icon: 'Io' },
];

const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const AVAILABLE_COUNTRIES = [
    { code: 'AF', name: 'Afghanistan', currency: 'AFN' },
    { code: 'AL', name: 'Albania', currency: 'ALL' },
    { code: 'DZ', name: 'Algeria', currency: 'DZD' },
    { code: 'AD', name: 'Andorra', currency: 'EUR' },
    { code: 'AO', name: 'Angola', currency: 'AOA' },
    { code: 'AG', name: 'Antigua and Barbuda', currency: 'XCD' },
    { code: 'AR', name: 'Argentina', currency: 'ARS' },
    { code: 'AM', name: 'Armenia', currency: 'AMD' },
    { code: 'AU', name: 'Australia', currency: 'AUD' },
    { code: 'AT', name: 'Austria', currency: 'EUR' },
    { code: 'AZ', name: 'Azerbaijan', currency: 'AZN' },
    { code: 'BS', name: 'Bahamas', currency: 'BSD' },
    { code: 'BH', name: 'Bahrain', currency: 'BHD' },
    { code: 'BD', name: 'Bangladesh', currency: 'BDT' },
    { code: 'BB', name: 'Barbados', currency: 'BBD' },
    { code: 'BY', name: 'Belarus', currency: 'BYN' },
    { code: 'BE', name: 'Belgium', currency: 'EUR' },
    { code: 'BZ', name: 'Belize', currency: 'BZD' },
    { code: 'BJ', name: 'Benin', currency: 'XOF' },
    { code: 'BT', name: 'Bhutan', currency: 'BTN' },
    { code: 'BO', name: 'Bolivia', currency: 'BOB' },
    { code: 'BA', name: 'Bosnia and Herzegovina', currency: 'BAM' },
    { code: 'BW', name: 'Botswana', currency: 'BWP' },
    { code: 'BR', name: 'Brazil', currency: 'BRL' },
    { code: 'BN', name: 'Brunei', currency: 'BND' },
    { code: 'BG', name: 'Bulgaria', currency: 'BGN' },
    { code: 'BF', name: 'Burkina Faso', currency: 'XOF' },
    { code: 'BI', name: 'Burundi', currency: 'BIF' },
    { code: 'CV', name: 'Cabo Verde', currency: 'CVE' },
    { code: 'KH', name: 'Cambodia', currency: 'KHR' },
    { code: 'CM', name: 'Cameroon', currency: 'XAF' },
    { code: 'CA', name: 'Canada', currency: 'CAD' },
    { code: 'CF', name: 'Central African Republic', currency: 'XAF' },
    { code: 'TD', name: 'Chad', currency: 'XAF' },
    { code: 'CL', name: 'Chile', currency: 'CLP' },
    { code: 'CN', name: 'China', currency: 'CNY' },
    { code: 'CO', name: 'Colombia', currency: 'COP' },
    { code: 'KM', name: 'Comoros', currency: 'KMF' },
    { code: 'CD', name: 'Congo (DRC)', currency: 'CDF' },
    { code: 'CG', name: 'Congo (Republic)', currency: 'XAF' },
    { code: 'CR', name: 'Costa Rica', currency: 'CRC' },
    { code: 'HR', name: 'Croatia', currency: 'EUR' },
    { code: 'CU', name: 'Cuba', currency: 'CUP' },
    { code: 'CY', name: 'Cyprus', currency: 'EUR' },
    { code: 'CZ', name: 'Czech Republic', currency: 'CZK' },
    { code: 'DK', name: 'Denmark', currency: 'DKK' },
    { code: 'DJ', name: 'Djibouti', currency: 'DJF' },
    { code: 'DM', name: 'Dominica', currency: 'XCD' },
    { code: 'DO', name: 'Dominican Republic', currency: 'DOP' },
    { code: 'EC', name: 'Ecuador', currency: 'USD' },
    { code: 'EG', name: 'Egypt', currency: 'EGP' },
    { code: 'SV', name: 'El Salvador', currency: 'USD' },
    { code: 'GQ', name: 'Equatorial Guinea', currency: 'XAF' },
    { code: 'ER', name: 'Eritrea', currency: 'ERN' },
    { code: 'EE', name: 'Estonia', currency: 'EUR' },
    { code: 'SZ', name: 'Eswatini', currency: 'SZL' },
    { code: 'ET', name: 'Ethiopia', currency: 'ETB' },
    { code: 'FJ', name: 'Fiji', currency: 'FJD' },
    { code: 'FI', name: 'Finland', currency: 'EUR' },
    { code: 'FR', name: 'France', currency: 'EUR' },
    { code: 'GA', name: 'Gabon', currency: 'XAF' },
    { code: 'GM', name: 'Gambia', currency: 'GMD' },
    { code: 'GE', name: 'Georgia', currency: 'GEL' },
    { code: 'DE', name: 'Germany', currency: 'EUR' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' },
    { code: 'GR', name: 'Greece', currency: 'EUR' },
    { code: 'GD', name: 'Grenada', currency: 'XCD' },
    { code: 'GT', name: 'Guatemala', currency: 'GTQ' },
    { code: 'GN', name: 'Guinea', currency: 'GNF' },
    { code: 'GW', name: 'Guinea-Bissau', currency: 'XOF' },
    { code: 'GY', name: 'Guyana', currency: 'GYD' },
    { code: 'HT', name: 'Haiti', currency: 'HTG' },
    { code: 'HN', name: 'Honduras', currency: 'HNL' },
    { code: 'HU', name: 'Hungary', currency: 'HUF' },
    { code: 'IS', name: 'Iceland', currency: 'ISK' },
    { code: 'IN', name: 'India', currency: 'INR' },
    { code: 'ID', name: 'Indonesia', currency: 'IDR' },
    { code: 'IR', name: 'Iran', currency: 'IRR' },
    { code: 'IQ', name: 'Iraq', currency: 'IQD' },
    { code: 'IE', name: 'Ireland', currency: 'EUR' },
    { code: 'IL', name: 'Israel', currency: 'ILS' },
    { code: 'IT', name: 'Italy', currency: 'EUR' },
    { code: 'JM', name: 'Jamaica', currency: 'JMD' },
    { code: 'JP', name: 'Japan', currency: 'JPY' },
    { code: 'JO', name: 'Jordan', currency: 'JOD' },
    { code: 'KZ', name: 'Kazakhstan', currency: 'KZT' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'KI', name: 'Kiribati', currency: 'AUD' },
    { code: 'KP', name: 'North Korea', currency: 'KPW' },
    { code: 'KR', name: 'South Korea', currency: 'KRW' },
    { code: 'KW', name: 'Kuwait', currency: 'KWD' },
    { code: 'KG', name: 'Kyrgyzstan', currency: 'KGS' },
    { code: 'LA', name: 'Laos', currency: 'LAK' },
    { code: 'LV', name: 'Latvia', currency: 'EUR' },
    { code: 'LB', name: 'Lebanon', currency: 'LBP' },
    { code: 'LS', name: 'Lesotho', currency: 'LSL' },
    { code: 'LR', name: 'Liberia', currency: 'LRD' },
    { code: 'LY', name: 'Libya', currency: 'LYD' },
    { code: 'LI', name: 'Liechtenstein', currency: 'CHF' },
    { code: 'LT', name: 'Lithuania', currency: 'EUR' },
    { code: 'LU', name: 'Luxembourg', currency: 'EUR' },
    { code: 'MG', name: 'Madagascar', currency: 'MGA' },
    { code: 'MW', name: 'Malawi', currency: 'MWK' },
    { code: 'MY', name: 'Malaysia', currency: 'MYR' },
    { code: 'MV', name: 'Maldives', currency: 'MVR' },
    { code: 'ML', name: 'Mali', currency: 'XOF' },
    { code: 'MT', name: 'Malta', currency: 'EUR' },
    { code: 'MH', name: 'Marshall Islands', currency: 'USD' },
    { code: 'MR', name: 'Mauritania', currency: 'MRU' },
    { code: 'MU', name: 'Mauritius', currency: 'MUR' },
    { code: 'MX', name: 'Mexico', currency: 'MXN' },
    { code: 'FM', name: 'Micronesia', currency: 'USD' },
    { code: 'MD', name: 'Moldova', currency: 'MDL' },
    { code: 'MC', name: 'Monaco', currency: 'EUR' },
    { code: 'MN', name: 'Mongolia', currency: 'MNT' },
    { code: 'ME', name: 'Montenegro', currency: 'EUR' },
    { code: 'MA', name: 'Morocco', currency: 'MAD' },
    { code: 'MZ', name: 'Mozambique', currency: 'MZN' },
    { code: 'MM', name: 'Myanmar', currency: 'MMK' },
    { code: 'NA', name: 'Namibia', currency: 'NAD' },
    { code: 'NR', name: 'Nauru', currency: 'AUD' },
    { code: 'NP', name: 'Nepal', currency: 'NPR' },
    { code: 'NL', name: 'Netherlands', currency: 'EUR' },
    { code: 'NZ', name: 'New Zealand', currency: 'NZD' },
    { code: 'NI', name: 'Nicaragua', currency: 'NIO' },
    { code: 'NE', name: 'Niger', currency: 'XOF' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'MK', name: 'North Macedonia', currency: 'MKD' },
    { code: 'NO', name: 'Norway', currency: 'NOK' },
    { code: 'OM', name: 'Oman', currency: 'OMR' },
    { code: 'PK', name: 'Pakistan', currency: 'PKR' },
    { code: 'PW', name: 'Palau', currency: 'USD' },
    { code: 'PA', name: 'Panama', currency: 'PAB' },
    { code: 'PG', name: 'Papua New Guinea', currency: 'PGK' },
    { code: 'PY', name: 'Paraguay', currency: 'PYG' },
    { code: 'PE', name: 'Peru', currency: 'PEN' },
    { code: 'PH', name: 'Philippines', currency: 'PHP' },
    { code: 'PL', name: 'Poland', currency: 'PLN' },
    { code: 'PT', name: 'Portugal', currency: 'EUR' },
    { code: 'QA', name: 'Qatar', currency: 'QAR' },
    { code: 'RO', name: 'Romania', currency: 'RON' },
    { code: 'RU', name: 'Russia', currency: 'RUB' },
    { code: 'RW', name: 'Rwanda', currency: 'RWF' },
    { code: 'KN', name: 'Saint Kitts and Nevis', currency: 'XCD' },
    { code: 'LC', name: 'Saint Lucia', currency: 'XCD' },
    { code: 'VC', name: 'Saint Vincent', currency: 'XCD' },
    { code: 'WS', name: 'Samoa', currency: 'WST' },
    { code: 'SM', name: 'San Marino', currency: 'EUR' },
    { code: 'ST', name: 'Sao Tome and Principe', currency: 'STN' },
    { code: 'SA', name: 'Saudi Arabia', currency: 'SAR' },
    { code: 'SN', name: 'Senegal', currency: 'XOF' },
    { code: 'RS', name: 'Serbia', currency: 'RSD' },
    { code: 'SC', name: 'Seychelles', currency: 'SCR' },
    { code: 'SL', name: 'Sierra Leone', currency: 'SLE' },
    { code: 'SG', name: 'Singapore', currency: 'SGD' },
    { code: 'SK', name: 'Slovakia', currency: 'EUR' },
    { code: 'SI', name: 'Slovenia', currency: 'EUR' },
    { code: 'SB', name: 'Solomon Islands', currency: 'SBD' },
    { code: 'SO', name: 'Somalia', currency: 'SOS' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'SS', name: 'South Sudan', currency: 'SSP' },
    { code: 'ES', name: 'Spain', currency: 'EUR' },
    { code: 'LK', name: 'Sri Lanka', currency: 'LKR' },
    { code: 'SD', name: 'Sudan', currency: 'SDG' },
    { code: 'SR', name: 'Suriname', currency: 'SRD' },
    { code: 'SE', name: 'Sweden', currency: 'SEK' },
    { code: 'CH', name: 'Switzerland', currency: 'CHF' },
    { code: 'SY', name: 'Syria', currency: 'SYP' },
    { code: 'TW', name: 'Taiwan', currency: 'TWD' },
    { code: 'TJ', name: 'Tajikistan', currency: 'TJS' },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS' },
    { code: 'TH', name: 'Thailand', currency: 'THB' },
    { code: 'TL', name: 'Timor-Leste', currency: 'USD' },
    { code: 'TG', name: 'Togo', currency: 'XOF' },
    { code: 'TO', name: 'Tonga', currency: 'TOP' },
    { code: 'TT', name: 'Trinidad and Tobago', currency: 'TTD' },
    { code: 'TN', name: 'Tunisia', currency: 'TND' },
    { code: 'TR', name: 'Turkey', currency: 'TRY' },
    { code: 'TM', name: 'Turkmenistan', currency: 'TMT' },
    { code: 'TV', name: 'Tuvalu', currency: 'AUD' },
    { code: 'UG', name: 'Uganda', currency: 'UGX' },
    { code: 'UA', name: 'Ukraine', currency: 'UAH' },
    { code: 'AE', name: 'United Arab Emirates', currency: 'AED' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'US', name: 'United States', currency: 'USD' },
    { code: 'UY', name: 'Uruguay', currency: 'UYU' },
    { code: 'UZ', name: 'Uzbekistan', currency: 'UZS' },
    { code: 'VU', name: 'Vanuatu', currency: 'VUV' },
    { code: 'VE', name: 'Venezuela', currency: 'VES' },
    { code: 'VN', name: 'Vietnam', currency: 'VND' },
    { code: 'YE', name: 'Yemen', currency: 'YER' },
    { code: 'ZM', name: 'Zambia', currency: 'ZMW' },
    { code: 'ZW', name: 'Zimbabwe', currency: 'ZWL' }
];

const DEFAULT_COUNTRIES: CountryConfig[] = [
    { code: 'KE', name: 'Kenya', currency: 'KES', countryLimit: 10000000, promoLimit: 100000 },
    { code: 'GH', name: 'Ghana', currency: 'GHS', countryLimit: 800000, promoLimit: 8000 },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS', countryLimit: 15000000, promoLimit: 150000 },
    { code: 'UG', name: 'Uganda', currency: 'UGX', countryLimit: 25000000, promoLimit: 250000 },
    { code: 'ET', name: 'Ethiopia', currency: 'ETB', countryLimit: 300000, promoLimit: 3000 },
    { code: 'NG', name: 'Nigeria', currency: 'NGN', countryLimit: 5000000, promoLimit: 50000 },
    { code: 'ZM', name: 'Zambia', currency: 'ZMW', countryLimit: 100000, promoLimit: 1000 },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [docTab, setDocTab] = useState('manual'); // manual | technical
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [showVideo, setShowVideo] = useState(false);

    // Theme State
    const [theme, setTheme] = useState('dark');

    // Countries State
    const [countries, setCountries] = useState<CountryConfig[]>(DEFAULT_COUNTRIES);
    const [newCountry, setNewCountry] = useState<Partial<CountryConfig>>({ countryLimit: 0, promoLimit: 0 });
    const [isAdding, setIsAdding] = useState(false);

    // Users State
    const [users, setUsers] = useState(USERS);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer', password: '' });

    // Initial Load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);

            const savedCountries = localStorage.getItem('settings_countries');
            if (savedCountries) {
                try {
                    const parsed = JSON.parse(savedCountries);
                    if (Array.isArray(parsed) && parsed.length > 0) setCountries(parsed);
                } catch (e) { }
            }

            const savedUsers = localStorage.getItem('settings_users');
            if (savedUsers) {
                try {
                    const parsed = JSON.parse(savedUsers);
                    if (Array.isArray(parsed) && parsed.length > 0) setUsers(parsed);
                } catch (e) { }
            }
        }
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        // Persist Settings
        localStorage.setItem('settings_countries', JSON.stringify(countries));
        localStorage.setItem('settings_users', JSON.stringify(users));
        localStorage.setItem('theme', theme);

        setTimeout(() => {
            setIsSaving(false);
            setSuccessMsg('Settings updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        }, 800);
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.password) {
            const userToAdd = {
                id: Date.now(),
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: 'Active',
                password: newUser.password // In a real app, never store plain text!
            };
            const updatedUsers = [...users, userToAdd];
            setUsers(updatedUsers);
            localStorage.setItem('settings_users', JSON.stringify(updatedUsers));
            setNewUser({ name: '', email: '', role: 'Viewer', password: '' });
            setIsAddingUser(false);
            setSuccessMsg('User added successfully');
            setTimeout(() => setSuccessMsg(''), 3000);
        }
    };

    const handleThemeChange = (t: string) => {
        setTheme(t);
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t); // Instant save for theme
    };

    const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = e.target.value;
        const countryData = AVAILABLE_COUNTRIES.find(c => c.code === selectedCode);

        if (countryData) {
            setNewCountry({
                ...newCountry,
                code: countryData.code,
                name: countryData.name,
                currency: countryData.currency
            });
        } else {
            setNewCountry({ ...newCountry, code: '', name: '', currency: '' });
        }
    };

    const handleAddCountry = () => {
        if (newCountry.code && newCountry.name && newCountry.currency) {
            setCountries([...countries, {
                code: newCountry.code.toUpperCase(),
                name: newCountry.name,
                currency: newCountry.currency.toUpperCase(),
                countryLimit: Number(newCountry.countryLimit) || 0,
                promoLimit: Number(newCountry.promoLimit) || 0
            }]);
            setNewCountry({ countryLimit: 0, promoLimit: 0, code: '', name: '', currency: '' });
            setIsAdding(false);
        }
    };

    const handleDeleteCountry = (code: string) => {
        if (confirm(`Are you sure you want to remove ${code}?`)) {
            setCountries(countries.filter(c => c.code !== code));
        }
    };

    const updateCountry = (code: string, field: keyof CountryConfig, value: any) => {
        setCountries(countries.map(c => c.code === code ? { ...c, [field]: value } : c));
    };

    return (
        <div className="settings-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">System Settings</h1>
                    <p className="page-subtitle">Manage platform configurations, countries, and users.</p>
                </div>
            </div>

            {successMsg && (
                <div className="success-toast">
                    <CheckCircle2 size={16} /> {successMsg}
                </div>
            )}

            <div className="settings-layout">
                {/* Sidebar Navigation */}
                <div className="settings-nav glass-panel">
                    <button
                        className={`nav-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <Settings size={18} /> General
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'countries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('countries')}
                    >
                        <Globe size={18} /> Countries & Limits
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users size={18} /> Users & Roles
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'integrations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('integrations')}
                    >
                        <Webhook size={18} /> Integrations
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Bell size={18} /> Notifications
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'documentation' ? 'active' : ''}`}
                        onClick={() => setActiveTab('documentation')}
                    >
                        <Book size={18} /> Documentation
                    </button>
                </div>

                {/* Content Area */}
                <div className="settings-content glass-panel">

                    {/* --- GENERAL TAB --- */}
                    {activeTab === 'general' && (
                        <div className="tab-pane">
                            <h3>General Configuration</h3>

                            <div className="form-group mb-8">
                                <label>Appearance Theme</label>
                                <div className="theme-options">
                                    <button
                                        className={`theme-card ${theme === 'light' ? 'active' : ''}`}
                                        onClick={() => handleThemeChange('light')}
                                    >
                                        <Sun size={24} />
                                        <span>Light Mode</span>
                                    </button>
                                    <button
                                        className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => handleThemeChange('dark')}
                                    >
                                        <Moon size={24} />
                                        <span>Dark Mode</span>
                                    </button>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Platform Name</label>
                                    <input type="text" defaultValue="Betika Promotions Platform" />
                                </div>
                                <div className="form-group">
                                    <label>Default Currency</label>
                                    <select defaultValue="EUR">
                                        <option value="EUR">EUR (€)</option>
                                        <option value="USD">USD ($)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- COUNTRIES TAB --- */}
                    {activeTab === 'countries' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h3>Country Management</h3>
                                <button className="btn-secondary" onClick={() => setIsAdding(!isAdding)}>
                                    <Plus size={14} /> Add Country
                                </button>
                            </div>

                            {isAdding && (
                                <div className="add-country-form glass-card">
                                    <h4>Add New Country</h4>
                                    <div className="add-grid">
                                        {/* Progressive Dropdown */}
                                        <div className="form-group-flat">
                                            <select
                                                value={newCountry.code || ''}
                                                onChange={handleCountrySelect}
                                                className="full-select"
                                            >
                                                <option value="" disabled>Select Country...</option>
                                                {AVAILABLE_COUNTRIES.filter(ac => !countries.some(c => c.code === ac.code)).map(c => (
                                                    <option key={c.code} value={c.code}>
                                                        {getFlagEmoji(c.code)} {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Auto-populated Read-Only Fields */}
                                        <input
                                            placeholder="Code"
                                            value={newCountry.code || ''}
                                            readOnly
                                            className="input-readonly"
                                        />
                                        <input
                                            placeholder="Currency"
                                            value={newCountry.currency || ''}
                                            readOnly
                                            className="input-readonly"
                                        />

                                        {/* Editable Limits */}
                                        <input
                                            type="number"
                                            placeholder="Country Limit"
                                            value={newCountry.countryLimit || ''}
                                            onChange={e => setNewCountry({ ...newCountry, countryLimit: Number(e.target.value) })}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Promo Limit"
                                            value={newCountry.promoLimit || ''}
                                            onChange={e => setNewCountry({ ...newCountry, promoLimit: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn-cancel" onClick={() => setIsAdding(false)}>Cancel</button>
                                        <button className="btn-confirm" onClick={handleAddCountry} disabled={!newCountry.code}>Add Country</button>
                                    </div>
                                </div>
                            )}

                            <div className="countries-list">
                                <div className="list-header">
                                    <span>Country</span>
                                    <span>Code</span>
                                    <span>Currency</span>
                                    <span className="text-right">Market Cap</span>
                                    <span className="text-right">Promo Cap</span>
                                    <span>Actions</span>
                                </div>
                                {countries.map(country => (
                                    <div key={country.code} className="country-row key-row">
                                        <div className="font-medium">
                                            <span style={{ marginRight: '8px' }}>{getFlagEmoji(country.code)}</span>
                                            {country.name}
                                        </div>
                                        <div className="badge-code">{country.code}</div>
                                        <div className="text-muted">{country.currency}</div>
                                        <div className="text-right">
                                            <input
                                                type="number"
                                                className="inline-input"
                                                value={country.countryLimit}
                                                onChange={(e) => updateCountry(country.code, 'countryLimit', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="text-right">
                                            <input
                                                type="number"
                                                className="inline-input"
                                                value={country.promoLimit}
                                                onChange={(e) => updateCountry(country.code, 'promoLimit', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button className="btn-icon danger" onClick={() => handleDeleteCountry(country.code)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- USERS TAB --- */}
                    {activeTab === 'users' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h3>User Management</h3>
                                <button className="btn-secondary" onClick={() => setIsAddingUser(!isAddingUser)}>
                                    <Plus size={14} /> Add User
                                </button>
                            </div>

                            {isAddingUser && (
                                <div className="add-country-form glass-card" style={{ marginBottom: 24 }}>
                                    <h4>Add New User</h4>
                                    <div className="add-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                                        <input
                                            placeholder="Full Name"
                                            value={newUser.name}
                                            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                        />
                                        <input
                                            placeholder="Email Address"
                                            value={newUser.email}
                                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                        <select
                                            value={newUser.role}
                                            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                            className="full-select"
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Viewer">Viewer</option>
                                            <option value="Analyst">Analyst</option>
                                        </select>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={newUser.password}
                                            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn-cancel" onClick={() => setIsAddingUser(false)}>Cancel</button>
                                        <button className="btn-confirm" onClick={handleAddUser} disabled={!newUser.name || !newUser.email || !newUser.password}>Create User</button>
                                    </div>
                                </div>
                            )}

                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="font-medium">{user.name}</td>
                                            <td><span className="role-badge">{user.role}</span></td>
                                            <td className="text-secondary">{user.email}</td>
                                            <td>
                                                <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                                                {user.status}
                                            </td>
                                            <td>
                                                <button className="icon-btn"><Settings size={14} /></button>
                                                <button
                                                    className="icon-btn danger"
                                                    onClick={() => {
                                                        if (confirm('Delete user?')) {
                                                            const updated = users.filter(u => u.id !== user.id);
                                                            setUsers(updated);
                                                            localStorage.setItem('settings_users', JSON.stringify(updated));
                                                            setSuccessMsg('User deleted');
                                                            setTimeout(() => setSuccessMsg(''), 3000);
                                                        }
                                                    }}
                                                    style={{ marginLeft: 8 }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* --- INTEGRATIONS TAB --- */}
                    {activeTab === 'integrations' && (
                        <div className="tab-pane">
                            <h3>External Services</h3>
                            <div className="integrations-list">
                                {INTEGRATIONS.map(int => (
                                    <div key={int.id} className="integration-card">
                                        <div className="int-icon">{int.icon}</div>
                                        <div className="int-info">
                                            <h4>{int.name}</h4>
                                            <p className="status">
                                                <span className={`dot ${int.status}`}></span>
                                                {int.status === 'connected' ? 'Active Connection' : 'Not Configured'}
                                            </p>
                                        </div>
                                        <div className="int-actions">
                                            <button className="btn-configure">Configure</button>
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={int.status === 'connected'} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- NOTIFICATIONS TAB --- */}
                    {activeTab === 'notifications' && (
                        <div className="tab-pane">
                            <h3>Alert Preferences</h3>
                            <div className="notif-group">
                                <div className="notif-item">
                                    <div className="notif-info">
                                        <h4>Campaign Budget Warning</h4>
                                        <p>Notify when a campaign reaches 80% of budget.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- DOCUMENTATION TAB --- */}
                    {activeTab === 'documentation' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h3>System Documentation</h3>
                                <div className="doc-tabs">
                                    <button
                                        className="doc-tab-btn"
                                        onClick={() => setShowVideo(true)}
                                        style={{ marginRight: 12, color: '#eab308' }}
                                    >
                                        <PlayCircle size={14} /> About Platform
                                    </button>
                                    <button
                                        className="doc-tab-btn"
                                        onClick={() => window.dispatchEvent(new Event('restart-tour'))}
                                        style={{ marginRight: 12 }}
                                    >
                                        <CheckCircle2 size={14} /> Start Tour
                                    </button>
                                    <button
                                        className={`doc-tab-btn ${docTab === 'manual' ? 'active' : ''}`}
                                        onClick={() => setDocTab('manual')}
                                    >
                                        <Book size={14} /> User Manual
                                    </button>
                                    <button
                                        className={`doc-tab-btn ${docTab === 'technical' ? 'active' : ''}`}
                                        onClick={() => setDocTab('technical')}
                                    >
                                        <FileCode size={14} /> Technical Docs
                                    </button>
                                </div>
                            </div>

                            <div className="doc-content glass-card">
                                {docTab === 'manual' && (
                                    <div className="doc-section">
                                        <h4>Promo Wizard Guide</h4>
                                        <p>Learn how to create, configure, and launch promotions using the wizard.</p>

                                        <div className="doc-link-list">
                                            <a href="#" className="doc-link">
                                                <FileText size={16} />
                                                <div>
                                                    <span className="link-title">Getting Started with Campaigns</span>
                                                    <span className="link-desc">Basic concepts and navigating the dashboard.</span>
                                                </div>
                                                <ExternalLink size={14} className="ext-icon" />
                                            </a>
                                            <a href="#" className="doc-link">
                                                <FileText size={16} />
                                                <div>
                                                    <span className="link-title">Configuring Eligibility Rules</span>
                                                    <span className="link-desc">How to set up complex segmentation logic.</span>
                                                </div>
                                                <ExternalLink size={14} className="ext-icon" />
                                            </a>
                                            <a href="#" className="doc-link">
                                                <FileText size={16} />
                                                <div>
                                                    <span className="link-title">Understanding Budget Limits</span>
                                                    <span className="link-desc">Setting caps for countries and individual promos.</span>
                                                </div>
                                                <ExternalLink size={14} className="ext-icon" />
                                            </a>
                                        </div>

                                        <div className="help-box">
                                            <HelpCircle size={18} />
                                            <p>Need more help? Contact support at <a href="mailto:support@betika.com">support@betika.com</a></p>
                                        </div>
                                    </div>
                                )}

                                {docTab === 'technical' && (
                                    <div className="doc-section">
                                        <h4>API & Integration Specs</h4>
                                        <p>Technical details for integrating third-party services and data feeds.</p>

                                        <div className="code-snippet">
                                            <div className="snippet-header">POST /api/v1/promotions/validate</div>
                                            <pre>{`
{
  "promo_id": "PRO-2024-001",
  "player_id": "user_12345",
  "stake_amount": 50.00,
  "currency": "KES"
}
                                            `}</pre>
                                        </div>

                                        <div className="doc-link-list">
                                            <a href="#" className="doc-link">
                                                <Webhook size={16} />
                                                <div>
                                                    <span className="link-title">Webhooks Documentation</span>
                                                    <span className="link-desc">Events and payload structures for real-time updates.</span>
                                                </div>
                                                <ExternalLink size={14} className="ext-icon" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- GLOBAL SAVE BUTTON (Moved to Bottom) --- */}
                    <div className="settings-footer">
                        <div className="footer-spacer"></div>
                        <button
                            className="btn-save"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                        </button>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .settings-container { max-width: 1200px; margin: 0 auto; padding: 24px; color: #fff; }
        .page-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 32px; }
        .page-title { font-size: 28px; font-weight: 700; margin: 0 0 8px 0; }
        .page-subtitle { color: var(--color-text-secondary); margin: 0; font-size: 14px; }
        
        .settings-footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: flex-end; }

        .btn-save { display: flex; align-items: center; gap: 8px; background: var(--color-betika-yellow); color: #000; border: none; padding: 10px 32px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 15px; }
        .btn-save:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(242, 214, 65, 0.2); }
        .btn-save:disabled { opacity: 0.6; cursor: wait; transform: none; }
        
        .success-toast { position: fixed; top: 24px; right: 24px; z-index: 1000; background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 12px 20px; border-radius: 8px; border: 1px solid rgba(74, 222, 128, 0.2); display: flex; align-items: center; gap: 8px; font-weight: 600; animation: slideIn 0.3s ease-out; backdrop-filter: blur(10px); }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        .settings-layout { display: grid; grid-template-columns: 240px 1fr; gap: 24px; align-items: start; }
        .glass-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; backdrop-filter: blur(10px); }
        
        .settings-nav { padding: 12px; display: flex; flex-direction: column; gap: 4px; }
        .nav-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 16px; background: transparent; border: none; color: var(--color-text-secondary); font-size: 14px; font-weight: 500; text-align: left; cursor: pointer; border-radius: 8px; transition: all 0.2s; }
        .nav-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-btn.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; }
        
        .settings-content { padding: 32px; min-height: 600px; display: flex; flex-direction: column; }
        .tab-pane { flex: 1; }
        .tab-pane h3 { margin: 0 0 24px 0; font-size: 18px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
        
        /* Theme Toggles */
        .theme-options { display: flex; gap: 16px; margin-top: 12px; }
        .theme-card { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; cursor: pointer; color: var(--color-text-secondary); transition: all 0.2s; }
        .theme-card:hover { background: rgba(255,255,255,0.06); }
        .theme-card.active { border-color: var(--color-betika-yellow); color: #fff; background: rgba(242, 214, 65, 0.1); }
        
        /* Countries Tab */
        .pane-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .btn-secondary { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        
        .countries-list { display: flex; flex-direction: column; gap: 8px; }
        .list-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 0.5fr; gap: 12px; font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); padding: 0 12px; margin-bottom: 8px; }
        .country-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 0.5fr; gap: 12px; align-items: center; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .country-row:hover { background: rgba(255,255,255,0.04); }
        
        .badge-code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 11px; font-family: monospace; width: fit-content; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .text-muted { color: var(--color-text-secondary); font-size: 12px; }
        
        .inline-input { background: transparent; border: 1px solid transparent; color: #fff; text-align: right; width: 100%; font-family: monospace; padding: 4px; border-radius: 4px; }
        .inline-input:hover, .inline-input:focus { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.2); outline: none; }
        
        .add-country-form { padding: 20px; background: rgba(30, 30, 40, 0.95); margin-bottom: 24px; border: 1px solid var(--color-betika-yellow); border-radius: 8px; }
        .add-grid { display: grid; grid-template-columns: 1.5fr 0.8fr 0.8fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        .add-grid input, .add-grid select { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 6px; color: #fff; width: 100%; }
        .add-grid select { cursor: pointer; }
        .add-grid .input-readonly { background: rgba(255,255,255,0.05); color: var(--color-text-secondary); cursor: not-allowed; border-color: transparent; }
        
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
        .btn-cancel { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
        .btn-confirm { background: var(--color-betika-yellow); color: #000; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .btn-icon.danger { color: #f87171; background: transparent; border: none; cursor: pointer; opacity: 0.7; }
        .btn-icon.danger:hover { opacity: 1; background: rgba(248, 113, 113, 0.1); border-radius: 4px; }
        
        /* Other Common Styles */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 8px; letter-spacing: 0.5px; }
        input[type="text"], select { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 10px 12px; border-radius: 6px; color: #fff; outline: none; font-size: 14px; }
        
        .users-table { width: 100%; border-collapse: collapse; }
        .users-table th { text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); }
        .users-table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
        .role-badge { background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .status-dot.active { background: #4ade80; }
        .status-dot.inactive { background: #94a3b8; }
        .icon-btn { background: transparent; border: none; color: var(--color-text-secondary); cursor: pointer; padding: 4px; }
        
        .integrations-list { display: grid; gap: 16px; }
        .integration-card { display: flex; align-items: center; gap: 16px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; }
        .int-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
        .int-info { flex: 1; }
        .int-info h4 { margin: 0 0 4px 0; font-size: 14px; }
        .int-info .status { font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 6px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; }
        .dot.connected { background: #4ade80; }
        .dot.disconnected { background: #f87171; }
        .int-actions { display: flex; align-items: center; gap: 16px; }
        .btn-configure { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; }
        
        .switch { position: relative; display: inline-block; width: 36px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 20px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #4ade80; }
        input:checked + .slider:before { transform: translateX(16px); }
        
        .notif-group { display: flex; flex-direction: column; gap: 16px; }
        .notif-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .notif-item:last-child { border-bottom: none; }
        .notif-info h4 { margin: 0 0 4px 0; font-size: 14px; }
        .notif-info p { margin: 0; font-size: 12px; color: var(--color-text-secondary); }

        /* Documentation Styles */
        .doc-tabs { display: flex; gap: 8px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 8px; }
        .doc-tab-btn { background: transparent; border: none; color: var(--color-text-secondary); padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 12px; transition: all 0.2s; }
        .doc-tab-btn.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; }
        .doc-tab-btn:hover:not(.active) { color: #fff; }

        .doc-content { padding: 24px; background: rgba(255,255,255,0.02); }
        .doc-section h4 { margin: 0 0 8px 0; color: #fff; font-size: 16px; }
        .doc-section p { color: var(--color-text-secondary); font-size: 13px; margin-bottom: 24px; line-height: 1.5; }

        .doc-link-list { display: grid; gap: 12px; margin-bottom: 24px; }
        .doc-link { display: flex; align-items: start; gap: 12px; padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.2s; }
        .doc-link:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); transform: translateY(-1px); }
        .link-title { display: block; font-weight: 600; font-size: 14px; margin-bottom: 2px; color: #fff; }
        .link-desc { display: block; font-size: 12px; color: var(--color-text-secondary); }
        .ext-icon { opacity: 0.5; margin-left: auto; }

        .help-box { background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); padding: 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px; color: var(--color-accent-cyan); font-size: 13px; }
        .help-box p { margin: 0; color: inherit; }
        .help-box a { color: #fff; text-decoration: underline; }

        .code-snippet { background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; margin-bottom: 24px; font-family: monospace; }
        .snippet-header { background: rgba(255,255,255,0.05); padding: 8px 16px; font-size: 11px; color: var(--color-text-secondary); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .code-snippet pre { margin: 0; padding: 16px; font-size: 12px; color: #a5b4fc; overflow-x: auto; }
      `}</style>
        </div>
    );
}
