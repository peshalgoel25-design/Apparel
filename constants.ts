/**
 * APP CONFIGURATION & SETTINGS
 * 
 * WHAT THIS FILE DOES:
 * - Contains the "Address Book" for the app (where to send data).
 * - Lists all the team members (Salespersons) and regions.
 * - Stores secret keys and fixed lists (like list of states).
 */

export const SAVED_WEBHOOK_URL_KEY = 'brandApp_savedWebhookUrl_prod';
export const SAVED_TEST_WEBHOOK_URL_KEY = 'brandApp_savedWebhookUrl_test';

export const PROD_WEBHOOK_URL = "https://mxvpeshal.app.n8n.cloud/webhook-test/QubeLearn";
export const TEST_WEBHOOK_URL = "https://mxvpeshal.app.n8n.cloud/webhook/QubeLearn";

export const WEBHOOK_ACTIONS = {
  GENERATE_DESCRIPTION: 'generate_description',
  SAVE_EDITS_POSITIONING: 'save_edits_positioning',
  GENERATE_PILLARS: 'generate_pillars',
  UPDATE_PILLAR: 'update_pillar',
  GENERATE_STORY: 'generate_story',
  UPDATE_STORY: 'update_story',
  SAVE_EDITS_STORY: 'save_edits_story',
  GENERATE_AD_IMAGES: 'generate_ad_images',
  GET_USERS: 'get_users',
  SEARCH_DISCUSSIONS: 'search_discussions',
  LOAD_DISCUSSION: 'load_discussion',
  GENERATE_WORLD: 'generate_world',
  GENERATE_WORLDS: 'generate_worlds',
  SAVE_SELECTED_PILLARS: 'save_pillars',
  SAVE_ENHANCED_POSITIONING: 'save_enhanced_positioning',
};

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || (process.env.GEMINI_API_KEY as string) || (process.env.API_KEY as string) || '';

export const REGIONS = [
  'North',
  'Delhi',
  'Karnataka',
  'Maharashtra',
  'Gujarat',
  'Tamil Nadu',
  'Kerala',
  'Andhra Pradesh',
  'Telangana',
  'Others'
] as const;

export type Region = typeof REGIONS[number];

export const REGION_SALESPERSONS: Record<Region, string[]> = {
  'North': [
    'Vishal Chaturvedi',
    'Shivam Khanna',
    'Manish Tiwary',
    'Jitendra Joshi'
  ],
  'Delhi': [
    'Mayank Sehgal',
    'Vishal Chaturvedi',
    'Harsh Chauhan',
    'Tejesh Garg',
    'Kavya Seth',
    'Rahul Bansal',
    'Geetanjali Dey'
  ],
  'Karnataka': [
    'Mayank Sehgal',
    'Hidayath Ulla Khan',
    'Ritesh Rajpal',
    'Mohammad Saquib',
    'Mohammad Zain',
    'Chethan Kishore M G',
    'Utapreksha Mahawar',
    'Karthik C'
  ],
  'Maharashtra': [
    'Iman Kalyan Raha',
    'Prasad Kulkarni',
    'Jai Ahuja',
    'Abhijit Ukey',
    'Siddhant Raina',
    'Akshata Salunkhe',
    'Kashyap Joshi',
    'Chaitanya Jadhav',
    'Keval Anil Mhatre',
    'Vipin Shukla'
  ],
  'Gujarat': [
    'Shaisang Maniar',
    'Divya Paryani',
    'Mrugitta Bhatt',
    'Rahul Pal'
  ],
  'Tamil Nadu': [
    'Srinivas Kandaswamy',
    'Ajantan Arul Pragasam',
    'Eswaran R',
    'Rajeshwaran N',
    'Iyappan Muthukutti',
    'Padmanathan Senthilelavan',
    'Manigandhan N',
    'Gokulakrishnan B',
    'Selvaraj T',
    'Rameshkumar',
    'Naganathan Chandran',
    'SyedKhaja A',
    'Sathishkumar Rangasamy',
    'Anuraag J Prakash'
  ],
  'Kerala': [
    'Manesh Mathew',
    'Akshay A',
    'Vibin Kumar K',
    'Don Mathew',
    'Anoop Paul',
    'Rahul Raj K',
    'Eappen K',
    'Abhinav K P',
    'Vipin',
    'Jijo Thankachan',
    'Akshay'
  ],
  'Andhra Pradesh': [
    'Ganesh Penneru',
    'Kandala Chaitanya Kumar',
    'Makke Narasimha Rao',
    'Katam Jambulaiah',
    'Ganesh Kumar Bera',
    'Rama Krishna Avala',
    'Nallamilli Venkata Reddy'
  ],
  'Telangana': [
    'Abhishek Goel',
    'Rajkumar Thathe',
    'Santosh Gumudavelly',
    'Anurag Verma',
    'Raja Satheesh',
    'Rohit Sharma'
  ],
  'Others': [
    'Krithika Narayanan',
    'Karthik C',
    'Akshay',
    'Sathishkumar Rangasamy',
    'Anuraag J Prakash',
    'Yogesh Kapil'
  ]
};

export const ACCESS_LEVELS = {
  FULL: 'full',           // Can see everything
  PILLAR_ONLY: 'pillar',  // Till Pillar stage (save pillars, no stories)
  WORLD_ONLY: 'world'     // Till World stage (save worlds, no pillars)
} as const;

export type AccessLevel = typeof ACCESS_LEVELS[keyof typeof ACCESS_LEVELS];

export const SALESPERSON_ACCESS: Record<string, AccessLevel> = {
  'Krithika Narayanan': ACCESS_LEVELS.FULL,
  'Yogesh Kapil': ACCESS_LEVELS.PILLAR_ONLY,
  'Mayank Sehgal': ACCESS_LEVELS.PILLAR_ONLY,
  'Vishal Chaturvedi': ACCESS_LEVELS.PILLAR_ONLY,
  'Iman Kalyan Raha': ACCESS_LEVELS.PILLAR_ONLY,
  'Prasad Kulkarni': ACCESS_LEVELS.PILLAR_ONLY,
  'Abhishek Goel': ACCESS_LEVELS.PILLAR_ONLY,
  'Srinivas Kandaswamy': ACCESS_LEVELS.PILLAR_ONLY,
  'Manesh Mathew': ACCESS_LEVELS.PILLAR_ONLY,
  'Shaisang Maniar': ACCESS_LEVELS.PILLAR_ONLY,
};

export const getUserAccessLevel = (name: string): AccessLevel => {
  if (SALESPERSON_ACCESS[name]) return SALESPERSON_ACCESS[name];
  return ACCESS_LEVELS.WORLD_ONLY;
};
