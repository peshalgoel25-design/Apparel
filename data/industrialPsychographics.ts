
import { MultilingualText } from '../types.ts';
import { industrialFormTranslations } from './translations.ts';

// Local Assets
import tradManImg from '../assets/households/Traditional and Male Decision.png';
import tradEqualImg from '../assets/households/Traditional and Family Decision.png';
import modManImg from '../assets/households/Modern and Male Decision.png';
import modEqualImg from '../assets/households/Modern and Family Decision.png';

export const industrialPsychographicOptions: { id: string; imageUrl: string; title: MultilingualText; }[] = [
    {
        id: 'trad_man',
        imageUrl: tradManImg,
        title: industrialFormTranslations.section3.psychographicOptions.trad_man,
    },
    {
        id: 'trad_equal',
        imageUrl: tradEqualImg,
        title: industrialFormTranslations.section3.psychographicOptions.trad_equal,
    },
    {
        id: 'mod_man',
        imageUrl: modManImg,
        title: industrialFormTranslations.section3.psychographicOptions.mod_man,
    },
    {
        id: 'mod_equal',
        imageUrl: modEqualImg,
        title: industrialFormTranslations.section3.psychographicOptions.mod_equal,
    },
];
