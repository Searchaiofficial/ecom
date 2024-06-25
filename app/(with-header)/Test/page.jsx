import React from 'react';
import Card from '../../../components/Rank/Card';

const dummyData = [
    {
        title: 'Chest of drawers',
        items: [
            { name: 'MALM', price: '¥699.00', image: 'images/temp.svg' },
            { name: 'MALM', price: '¥299.00', image: 'images/temp.svg' },
            { name: 'KULLEN', price: '¥199.00', image: 'images/temp.svg' }
        ],
        colors: { header: '#7c6e65', rank: '#f5c518' }
    },
    {
        title: 'Clothes Storage Box',
        items: [
            { name: 'PÄRKLA', price: '¥9.99', image: 'images/temp.svg' },
            { name: 'SKUBB', price: '¥29.99', image: 'images/temp.svg' },
            { name: 'BRUKSVARA', price: '¥14.99', image: 'images/temp.svg' }
        ],
        colors: { header: '#848c71', rank: '#f5c518' }
    },
    {
        title: 'Sheets & Fitted Sheets',
        items: [
            { name: 'DVALA', price: '¥99.99', image: 'images/temp.svg' },
            { name: 'DVALA', price: '¥79.99', image: 'images/temp.svg' },
            { name: 'BRUKSVARA', price: '¥39.99', image: 'images/temp.svg' }
        ],
        colors: { header: '#7c6e65', rank: '#f5c518' }
    }
];

const HomePage = () => {
    return (
        <div className="flex flex-wrap pt-40">
            {dummyData.map((data, index) => (
                <Card key={index} title={data.title} items={data.items} colors={data.colors} />
            ))}
        </div>
    );
};

export default HomePage;
