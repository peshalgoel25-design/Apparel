
import { MultilingualText } from '../types.ts';
import { apparelFormTranslations } from './translations.ts';

// Local Assets
import tradImg from '../assets/apparels/traditional.png';
import modImg from '../assets/apparels/modern.png';
import aspImg from '../assets/apparels/aspirational.png';
import comImg from '../assets/apparels/comfort.png';
import boldImg from '../assets/apparels/bold.png';

export const apparelPsychographicOptions: { id: string; imageUrl: string; title: MultilingualText; }[] = [
    {
        id: 'traditional',
        imageUrl: tradImg,
        title: apparelFormTranslations.section3.psychographicOptions.traditional,
    },
    {
        id: 'modern',
        imageUrl: modImg,
        title: apparelFormTranslations.section3.psychographicOptions.modern,
    },
    {
        id: 'aspirational',
        imageUrl: aspImg,
        title: apparelFormTranslations.section3.psychographicOptions.aspirational,
    },
    {
        id: 'comfort',
        imageUrl: comImg,
        title: apparelFormTranslations.section3.psychographicOptions.comfort,
    },
    {
        id: 'bold',
        imageUrl: boldImg,
        title: apparelFormTranslations.section3.psychographicOptions.bold,
    },
];
