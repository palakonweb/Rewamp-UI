import React, { useState } from 'react';
import { DiagonalCardStack } from './DiagonalCardStack';
import skyCurtain from '../../assets/cards/sky-curtain.webp';
import airplaneSunset from '../../assets/cards/airplane-sunset.webp';
import rainbowHill from '../../assets/cards/rainbow-hill.webp';
import trainWindow from '../../assets/cards/train-window.webp';
import kangarooPlanet from '../../assets/cards/kangaroo-planet.webp';

export default function DiagonalCardStackShowcase() {
  const [isStacked, setIsStacked] = useState(false);
  const [autoPlay] = useState(true);
  const [speed] = useState(1.0);

  const cardsData = [
    { id: '1', title: 'Stack 01', brand: 'rico.', badge: '01', image: skyCurtain },
    { id: '2', title: 'Stack 02', brand: 'rico.', badge: '02', image: airplaneSunset },
    { id: '3', title: 'Stack 03', brand: 'rico.', badge: '03', image: rainbowHill },
    { id: '4', title: 'Stack 04', brand: 'rico.', badge: '04', image: trainWindow },
    { id: '5', title: 'Stack 05', brand: 'rico.', badge: '05', image: kangarooPlanet },
    { id: '6', title: 'Stack 06', brand: 'rico.', badge: '06', image: skyCurtain },
    { id: '7', title: 'Stack 07', brand: 'rico.', badge: '07', image: airplaneSunset },
    { id: '8', title: 'Stack 08', brand: 'rico.', badge: '08', image: rainbowHill },
    { id: '9', title: 'Stack 09', brand: 'rico.', badge: '09', image: trainWindow },
    { id: '10', title: 'Stack 10', brand: 'rico.', badge: '10', image: kangarooPlanet },
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
