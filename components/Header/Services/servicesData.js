const services = [
    {
        id: 'measuring',
        name: 'Measuring Service',
        description: 'Get precise measurements for your space.',
        details: [
            { title: 'Room Measuring', description: 'Detailed room measurement service.', image: '/images/room/bedroom.jpg', link: '#' },
            { title: 'Furniture Measuring', description: 'Accurate furniture measuring.', image: '/images/room/bathroom.jpg', link: '#' },
            { title: 'Custom Measuring', description: 'Tailored measuring solutions.', image: '/images/room/Laundry.jpg', link: '#' },
            { title: 'Accessory Measuring', description: 'Measure for accessories and fixtures.', image: '/images/room/livingroom.jpg', link: '#' }
        ]
    },
    {
        id: 'installation',
        name: 'Installation Service',
        description: 'Professional installation services for your convenience.',
        details: [
            { title: 'Floor Installation', description: 'Expert floor installation service.', image: '/images/room/bedroom.jpg', link: '/services/Installation' },
            { title: 'Curtains Installation', description: 'Professional curtain installation.', image: '/images/room/bathroom.jpg', link: '/services/Installation' },
            { title: 'Wallpaper Installation', description: 'Seamless wallpaper installation.', image: '/images/room/Laundry.jpg', link: '/services/Installation' },
            { title: 'Other Installations', description: 'Various other installation services.', image: '/images/room/livingroom.jpg', link: '/services/Installation' }
        ]
    },
    {
        id: 'planning',
        name: 'Planning Service',
        description: 'Plan your space with our expert tools.',
        details: [
            { title: 'Room Planning', description: 'Detailed room planning service.', image: '/images/room/bedroom.jpg', link: '/services/Plannin' },
            { title: 'Furniture Planning', description: 'Expert furniture placement planning.', image: '/images/room/bathroom.jpg', link: '/services/Plannin' },
            { title: 'Custom Planning', description: 'Personalized planning services.', image: '/images/room/Laundry.jpg', link: '/services/Plannin' },
            { title: 'Accessory Planning', description: 'Plan for accessories and fixtures.', image: '/images/room/livingroom.jpg', link: '/services/Plannin' }
        ]
    },
    {
        id: 'buyback',
        name: 'Buy Back Service',
        description: 'Sell back your old Ayatrio furniture easily.',
        details: [
            { title: 'Furniture Buy Back', description: 'Sell back your old furniture.', image: '/images/room/bedroom.jpg', link: '/services/BuyBack' },
            { title: 'Accessory Buy Back', description: 'Return old accessories.', image: '/images/room/bathroom.jpg', link: '/services/BuyBack' },
            { title: 'Appliance Buy Back', description: 'Return old appliances.', image: '/images/room/Laundry.jpg', link: '/services/BuyBack' },
            { title: 'Custom Buy Back', description: 'Custom buy back services.', image: '/images/room/livingroom.jpg', link: '/services/BuyBack' }
        ]
    },
    {
        id: 'clickcollect',
        name: 'Click and Collect Service',
        description: 'Order online and collect in store.',
        details: [
            { title: 'Furniture Collection', description: 'Collect your ordered furniture.', image: '/images/room/bedroom.jpg', link: '/services/ClickAndCollec' },
            { title: 'Accessory Collection', description: 'Collect your ordered accessories.', image: '/images/room/bathroom.jpg', link: '/services/ClickAndCollec' },
            { title: 'Appliance Collection', description: 'Collect your ordered appliances.', image: '/images/room/Laundry.jpg', link: '/services/ClickAndCollec' },
            { title: 'Custom Collection', description: 'Personalized collection service.', image: '/images/room/livingroom.jpg', link: '/services/ClickAndCollec' }
        ]
    },
    {
        id: 'finance',
        name: 'Finance Service',
        description: 'Flexible financing options for your purchases.',
        details: [
            { title: 'Furniture Financing', description: 'Finance your furniture purchases.', image: '/images/room/bedroom.jpg', link: '/services/Finance' },
            { title: 'Accessory Financing', description: 'Finance your accessories.', image: '/images/room/bathroom.jpg', link: '/services/Finance' },
            { title: 'Appliance Financing', description: 'Finance your appliances.', image: '/images/room/Laundry.jpg', link: '/services/Finance' },
            { title: 'Custom Financing', description: 'Personalized financing options.', image: '/images/room/livingroom.jpg', link: '/services/Finance' }
        ]
    },
    {
        id: 'trackorder',
        name: 'Track and Manage My Order',
        description: 'Keep track of your orders and manage them efficiently.',
        details: [
            { title: 'Track Orders', description: 'Track your orders in real-time.', image: '/images/room/bedroom.jpg', link: '/track-order' },
            { title: 'Manage Orders', description: 'Manage and modify your orders.', image: '/images/room/bathroom.jpg', link: '/track-order' },
        ]
    },
    {
        id: 'warranty',
        name: 'Warranty Service',
        description: 'Warranty services for your Ayatrio products.',
        details: [
            { title: 'Warranty Registration', description: 'Warranty for your furniture.', image: '/images/room/bedroom.jpg', link: '/warranty/registration' },
            { title: 'Warranty Claim', description: 'Warranty for your accessories.', image: '/images/room/bathroom.jpg', link: '/warranty/claim' },
        ]
    },
    {
        id: 'delivery',
        name: 'Delivery and Transport',
        description: 'Convenient delivery and transport services.',
        details: [
            { title: 'Delivery', description: 'Deliver your furniture.', image: '/images/room/bedroom.jpg', link: '#' },
            { title: 'Transport', description: 'Deliver your accessories.', image: '/images/room/bathroom.jpg', link: '#' },
        ]
    },
    {
        id: 'returns',
        name: 'Returns and Exchanges',
        description: 'Hassle-free returns and exchanges.',
        details: [
            { title: 'Return Furniture', description: 'Return your furniture.', image: '/images/room/bedroom.jpg', link: '#' },
            { title: 'Return Accessories', description: 'Return your accessories.', image: '/images/room/bathroom.jpg', link: '#' },
            { title: 'Return Appliances', description: 'Return your appliances.', image: '/images/room/Laundry.jpg', link: '#' },
            { title: 'Custom Returns', description: 'Tailored return solutions.', image: '/images/room/livingroom.jpg', link: '#' }
        ]
    }
];

export default services;