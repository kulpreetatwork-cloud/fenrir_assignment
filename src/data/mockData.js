export const orgInfo = {
    name: 'Project X',
    owner: 'Nammagiri',
    totalScans: 100,
    scheduled: 1000,
    rescans: 100,
    failedScans: 100,
    lastUpdated: '10 mins ago',
};

export const severityStats = [
    {
        label: 'Critical Severity',
        count: 86,
        change: '+2% increase than yesterday',
        trend: 'up',
        severity: 'critical',
    },
    {
        label: 'High Severity',
        count: 16,
        change: '+0.9% increase than yesterday',
        trend: 'up',
        severity: 'high',
    },
    {
        label: 'Medium Severity',
        count: 26,
        change: '-0.9% decrease than yesterday',
        trend: 'down',
        severity: 'medium',
    },
    {
        label: 'Low Severity',
        count: 16,
        change: '+0.9% increase than yesterday',
        trend: 'up',
        severity: 'low',
    },
];

export const scans = [
    {
        id: 'scan-001',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-002',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-003',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 25, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-004',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-005',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-006',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 25, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-007',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-008',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-009',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-010',
        name: 'IoT Devices',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 6, low: 1 },
        lastScan: '3d ago',
    },
    {
        id: 'scan-011',
        name: 'Temp Data',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 6, low: 1 },
        lastScan: '3d ago',
    },
    {
        id: 'scan-012',
        name: 'API Gateway',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 3, high: 8, medium: 15, low: 22 },
        lastScan: '2d ago',
    },
    {
        id: 'scan-013',
        name: 'Auth Services',
        type: 'Blackbox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 7, high: 14, medium: 9, low: 5 },
        lastScan: '1d ago',
    },
    {
        id: 'scan-014',
        name: 'Payment Module',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 10, high: 6, medium: 18, low: 11 },
        lastScan: '5h ago',
    },
    {
        id: 'scan-015',
        name: 'CDN Endpoints',
        type: 'Blackbox',
        status: 'Scheduled',
        progress: 0,
        vulnerabilities: {},
        lastScan: '—',
    },
];

export const scanDetail = {
    id: 'scan-001',
    name: 'Web App Servers',
    scanType: 'Grey Box',
    targets: 'google.com',
    startedAt: 'Nov 22, 09:00AM',
    credentials: '2 Active',
    files: 'Control.pdf',
    checklists: '40/350',
    progress: 0,
    currentStep: 0, // 0-based index: Spidering
    steps: ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'],
};

export const activityLogs = [
    {
        time: '09:00:00',
        text: "I'll begin a systematic penetration test on <url>helpdesk.democorp.com</url>. Let me start with reconnaissance and enumeration.",
    },
    {
        time: '09:01:00',
        text: 'Good! target is online. Now let me perform port scanning to identify running services.',
    },
    {
        time: '09:02:00',
        text: 'Excellent reconnaissance results:\n    - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.',
    },
    {
        time: '09:03:00',
        text: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: <code>"TODO: Delete the testing account (test:test)"</code>. Let me test this credential. The login redirects to <code>/password/test</code>. Let me follow that path and explore it.',
    },
    {
        time: '09:04:00',
        text: 'The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to <code>"#"</code> which means the current page. Let me try a different approach.',
    },
    {
        time: '09:05:00',
        text: 'It redirects back to /password/test. Let me check if there\'s an /api endpoint or look for other paths. Let me also try exploring with the <code>test:test</code> password directly on other endpoints.',
    },
    {
        time: '09:06:00',
        text: 'Great! I can access the dashboard using the <code>"X-UserId: 10032"</code> header. The dashboard shows "Welcome, John Doe". This suggests an <strong>**IDOR vulnerability**</strong> — I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...',
    },
    {
        time: '09:07:00',
        text: 'Found an admin panel at <url>/admin/settings</url>. The panel exposes database configuration and API keys in plain text. This is a critical information disclosure.',
    },
    {
        time: '09:08:00',
        text: 'Attempting SQL injection on the search endpoint <url>/api/search?q=</url>. Testing with basic payloads...',
    },
    {
        time: '09:09:00',
        text: "SQL injection confirmed! The endpoint is vulnerable to time-based blind SQL injection. I can extract database contents through this vector.",
    },
    {
        time: '09:10:00',
        text: 'Enumerating database tables: users, sessions, api_keys, audit_log, payment_info. The payment_info table contains unencrypted credit card data.',
    },
    {
        time: '09:11:00',
        text: 'Testing for authentication bypass on <url>/api/auth/login</url>. The API accepts empty password fields when specific headers are present.',
    },
    {
        time: '09:12:00',
        text: 'Rate limiting test: Sent 1000 requests in 60 seconds to <url>/api/auth/login</url>. No rate limiting detected — brute force attacks are feasible.',
    },
];

export const verificationLogs = [
    {
        time: '09:15:00',
        text: 'Starting verification loop #1: Re-testing SQL injection on <url>/api/search</url> with different payload variants.',
    },
    {
        time: '09:16:00',
        text: 'Verification confirmed: UNION-based injection also works. Extracted 3 additional table names.',
    },
    {
        time: '09:17:00',
        text: 'Verification loop #2: Confirming IDOR vulnerability on <url>/api/users/{id}/profile</url>. Successfully accessed 5 different user profiles.',
    },
    {
        time: '09:18:00',
        text: 'Cross-verifying authentication bypass: Testing with different user accounts and session tokens. Bypass confirmed on 3 out of 4 tested accounts.',
    },
    {
        time: '09:19:00',
        text: 'Verification loop #3: Testing rate limiting on additional endpoints. <url>/api/password/reset</url> also lacks rate limiting.',
    },
];

export const findings = [
    {
        id: 'finding-001',
        severity: 'critical',
        title: 'SQL Injection in Authentication Endpoint',
        endpoint: '/api/users/profile',
        description:
            'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
        timestamp: '10:45:23',
    },
    {
        id: 'finding-002',
        severity: 'high',
        title: 'Unauthorized Access to User Metadata',
        endpoint: '/api/auth/login',
        description:
            'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
        timestamp: '10:45:23',
    },
    {
        id: 'finding-003',
        severity: 'medium',
        title: 'Broken Authentication Rate Limiting',
        endpoint: '/api/search',
        description:
            'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
        timestamp: '10:45:23',
    },
    {
        id: 'finding-004',
        severity: 'critical',
        title: 'IDOR on User Profile Access',
        endpoint: '/api/users/{id}/profile',
        description:
            'Direct object references allow any authenticated user to access other users\' profile data by modifying the user ID parameter.',
        timestamp: '10:47:12',
    },
    {
        id: 'finding-005',
        severity: 'high',
        title: 'Admin Panel Information Disclosure',
        endpoint: '/admin/settings',
        description:
            'Admin configuration panel exposes database credentials and API keys in plain text without additional authentication.',
        timestamp: '10:48:30',
    },
];

export const scanStatusBar = {
    subAgents: 3,
    parallelExecutions: 2,
    operations: 47,
    findings: { critical: 2, high: 3, medium: 1, low: 0 },
};
