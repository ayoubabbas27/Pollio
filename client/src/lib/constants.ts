export const LANDING_PAGE_NAV_LINKS = [
    { href: '#about', key: 'about' , label: 'About' },
    { href: '#features', key: 'features' , label: 'Features' },
    { href: '#how_it_works', key: 'how_it_works' , label: 'How it works' },
    { href: '#contact_us', key: 'contact_us' , label: 'Contact Us' },
];

export const DASH_NAV_LINKS = [
    { href: '/dash', key: 'dashboard' , label: 'Dashboard' },
    { href: '/dash/my_polls', key: 'my_polls' , label: 'My Polls' },
];

export const FOOTER_LINKS = [
    {
        title: 'Learn More',
        links: [
            'About Pollio',
            'Press Releases',
            'Environment',
            'Jobs',
            'Privacy Policy',
            'Contact Us'
        ]
    },
    {
        title: 'Products',
        links: [
            'New Features',
            'Best practices',
            'Tutorials'
        ]
    },
];

export const FOOTER_CONTACT_INFO = {
    title: 'Contact Us',
    links: [
        { label: 'Admin Officer', value: '123-456-7890' , icon: '/icons/email.svg'},
        { label: 'Email Officer', value: 'pollio@emailofficer.com' , icon: '/icons/phone.svg'}
    ]
};

export const SOCIALS = {
    title: 'Social',
    links: [
        '/icons/facebook.svg',
        '/icons/instagram.svg',
        '/icons/twitter.svg',
        '/icons/youtube.svg',
    ]
}
