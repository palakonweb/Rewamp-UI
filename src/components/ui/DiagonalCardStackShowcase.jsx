import React, { useState } from 'react';
import { DiagonalCardStack } from './DiagonalCardStack';

export default function DiagonalCardStackShowcase() {
  const [isStacked, setIsStacked] = useState(false);
  const [autoPlay] = useState(true);
  const [speed] = useState(1.0);

  const cardsData = [
    { id: '1', title: 'Stack 01', brand: 'rico.', badge: '01', image: '/cards/sky-curtain.png' },
    { id: '2', title: 'Stack 02', brand: 'rico.', badge: '02', image: '/cards/airplane-sunset.png' },
    { id: '3', title: 'Stack 03', brand: 'rico.', badge: '03', image: '/cards/rainbow-hill.png' },
    { id: '4', title: 'Stack 04', brand: 'rico.', badge: '04', image: '/cards/train-window.jpg' },
    { id: '5', title: 'Stack 05', brand: 'rico.', badge: '05', image: '/cards/kangaroo-planet.png' },
    { id: '6', title: 'Stack 06', brand: 'rico.', badge: '06', image: '/cards/sky-curtain.png' },
    { id: '7', title: 'Stack 07', brand: 'rico.', badge: '07', image: '/cards/airplane-sunset.png' },
    { id: '8', title: 'Stack 08', brand: 'rico.', badge: '08', image: '/cards/rainbow-hill.png' },
    { id: '9', title: 'Stack 09', brand: 'rico.', badge: '09', image: '/cards/train-window.jpg' },
    { id: '10', title: 'Stack 10', brand: 'rico.', badge: '10', image: '/cards/kangaroo-planet.png' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full relative overflow-hidden">
        <DiagonalCardStack
          cards={cardsData}
          isStacked={isStacked}
          autoPlay={autoPlay}
          speed={speed}
          onCardClick={() => setIsStacked(!isStacked)}
        />
      </div>
    </div>
  );
}
