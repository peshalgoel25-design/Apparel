
// Men
import menTraditionalImg from '../assets/psychographics/Men - Traditional.jpg';
import menAdventurousImg from '../assets/psychographics/Men - Adventurous.jpeg';
import menCorporateImg from '../assets/psychographics/Men - Corporate.jpg';
import menAchieverImg from '../assets/psychographics/Men - Achiever.jpeg';

// Women
import womenTraditionalImg from '../assets/psychographics/Women - Traditional.jpg';
import womenModernRootedImg from '../assets/psychographics/Women - Modern, yet rooted with family.png';
import womenModernHomemakerImg from '../assets/psychographics/Women - Modern homemaker with family.png';
import womenCorporateImg from '../assets/psychographics/Women - Corporate.jpeg';
import womenQualitySeekerImg from '../assets/psychographics/Women - Quality seeker.jpeg';

// Youth Boys
import youthBoysTraditionalImg from '../assets/psychographics/Youth Boys - Traditional.png';
import youthBoysAdventurousImg from '../assets/psychographics/Youth Boys - Adventurous.jpeg';
import youthBoysLeaderImg from '../assets/psychographics/Youth Boys - Leader of the pack.png';
import youthBoysAllRounderImg from '../assets/psychographics/Youth Boys - All-rounder.png';
import youthBoysBoyfriendImg from '../assets/psychographics/Youth Boys - Boyfriend.jpeg';
import youthBoysSocialImg from '../assets/psychographics/Youth Boys - Social, with friends.jpeg';

// Youth Girls
import youthGirlsTraditionalHomeImg from '../assets/psychographics/Youth Girls - Traditional at home.png';
import youthGirlsTraditionalFriendsImg from '../assets/psychographics/Youth Girls - Traditional with friends.png';
import youthGirlsModernImg from '../assets/psychographics/Youth Girls - Modern.png';
import youthGirlsModernBoyfriendImg from '../assets/psychographics/Youth Girls - Modern with boyfriend.png';
import youthGirlsAchieverImg from '../assets/psychographics/Youth Girls - Achiever.png';

// Kids
import kidsFriendsImg from '../assets/psychographics/Kids - Playing with firends.png';
import kidsSuperheroImg from '../assets/psychographics/Kids - Superhero.png';
import kidsAchieverImg from '../assets/psychographics/Kids - Smart achiever.png';
import kidsFamilyImg from '../assets/psychographics/Kids - With family.png';
import kidsLeaderImg from '../assets/psychographics/Kids - Leader of the pack.png';

export const psychographicOptions: { id: string; imageUrl: string; title: string; desc: string, category: string }[] = [
    // Men
    { id: 'men-traditional', imageUrl: menTraditionalImg, title: 'Men — Traditional', desc: 'Cultural roots, simplicity', category: 'men' },
    { id: 'men-rider', imageUrl: menAdventurousImg, title: 'Men — Adventurous', desc: 'Adventure, outdoors', category: 'men' },
    { id: 'men-professional', imageUrl: menCorporateImg, title: 'Men — Corporate', desc: 'Formal, corporate', category: 'men' },
    { id: 'men-achiever', imageUrl: menAchieverImg, title: 'Men — Achiever', desc: 'Success, recognition', category: 'men' },

    // Women
    { id: 'women-bride', imageUrl: womenTraditionalImg, title: 'Women — Full traditional with family', desc: 'Traditional attire, celebration', category: 'women' },
    { id: 'women-couple', imageUrl: womenModernRootedImg, title: 'Women — Modern, yet rooted with family', desc: 'Festivals, puja with family', category: 'women' },
    { id: 'women-family-group', imageUrl: womenModernHomemakerImg, title: 'Women — Modern homemaker with family', desc: 'Home manager, efficient', category: 'women' },
    { id: 'women-professional', imageUrl: womenCorporateImg, title: 'Women — Corporate', desc: 'Modern, workplace', category: 'women' },
    { id: 'women-shopper', imageUrl: womenQualitySeekerImg, title: 'Women — Quality seeker', desc: 'Lifestyle, modern conscious consumer', category: 'women' },

    // Youth (Boys)
    { id: 'youth-boys-home', imageUrl: youthBoysTraditionalImg, title: 'Youth (Boys) — Traditional', desc: 'Gaming, studying', category: 'youth_boys' },
    { id: 'youth-boys-studious', imageUrl: youthBoysAdventurousImg, title: 'Youth (Boys) — Adventurous', desc: 'Outdoors, sports, exploring', category: 'youth_boys' },
    { id: 'youth-boys-adventurous', imageUrl: youthBoysLeaderImg, title: 'Youth (Boys) — Leader of the pack', desc: 'Confident, popular', category: 'youth_boys' },
    { id: 'youth-boys-urban', imageUrl: youthBoysAllRounderImg, title: 'Youth (Boys) — All-rounder', desc: 'Balanced, achiever', category: 'youth_boys' },
    { id: 'youth-boys-social', imageUrl: youthBoysBoyfriendImg, title: 'Youth (Boys) — Boyfriend', desc: 'Cafés, casual outings, shared activities', category: 'youth_boys' },
    { id: 'youth-boys-sporty', imageUrl: youthBoysSocialImg, title: 'Youth (Boys) — Social, with friends', desc: 'Hangouts, fun', category: 'youth_boys' },

    // Youth (Girls)
    { id: 'youth-girls-home', imageUrl: youthGirlsTraditionalHomeImg, title: 'Youth (Girls) — Traditional at home', desc: 'Family-oriented', category: 'youth_girls' },
    { id: 'youth-girls-friends', imageUrl: youthGirlsTraditionalFriendsImg, title: 'Youth (Girls) — Traditional with friends', desc: 'Cultural activities, social', category: 'youth_girls' },
    { id: 'youth-girls-modern', imageUrl: youthGirlsModernImg, title: 'Youth (Girls) — Modern', desc: 'Social media, fashion', category: 'youth_girls' },
    { id: 'youth-girls-studious', imageUrl: youthGirlsModernBoyfriendImg, title: 'Youth (Girls) — Modern with boyfriend', desc: 'Going out, cinema', category: 'youth_girls' },
    { id: 'youth-girls-shopper', imageUrl: youthGirlsAchieverImg, title: 'Youth (Girls) — Achiever', desc: 'Academics/arts lead', category: 'youth_girls' },

    // Kids
    { id: 'kids-friends-group', imageUrl: kidsFriendsImg, title: 'Kids — Playing with friends', desc: 'Parks, games', category: 'kids' },
    { id: 'kids-superhero-dreamer', imageUrl: kidsSuperheroImg, title: 'Kids — Superhero', desc: 'Imagination, playful', category: 'kids' },
    { id: 'kids-young-achiever', imageUrl: kidsAchieverImg, title: 'Kids — Smart Achiever', desc: 'Curious, talented', category: 'kids' },
    { id: 'kids-with-parent', imageUrl: kidsFamilyImg, title: 'Kids — With Family', desc: 'Outings, rituals', category: 'kids' },
    { id: 'kids-siblings-group', imageUrl: kidsLeaderImg, title: 'Kids — Leader of the pack', desc: 'Initiates games', category: 'kids' }
];
