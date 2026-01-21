
import { MultilingualText } from '../types.ts';

export const addTranslations = (en: string, hi: string, ta: string, te: string, gu: string): MultilingualText => ({
  en,
  hi,
  ta,
  te,
  gu,
});

export const translations = {
  appTitle: addTranslations('SPARQ', 'SPARQ', 'SPARQ', 'SPARQ', 'SPARQ'),
  appSubtitle: addTranslations('', '', '', '', ''),
  fillSample: addTranslations('Fill with Sample Data', 'सैंपल डेटा से भरें', 'மாதிரி தரவுடன் நிரப்புக', 'నమూనా డేటాతో నింపండి', 'નમૂના ડેટાથી ભરો'),
  selectSamplePrompt: addTranslations('Select a sample brand to load...', 'लोड करने के लिए एक सैंपल ब्रांड चुनें...', 'ஏற்ற ஒரு மாதிரி பிராண்டைத் தேர்ந்தெடுக்கவும்...', 'లోడ్ చేయడానికి నమూనా బ్రాండ్‌ను ఎంచుకోండి...', 'લોડ કરવા માટે નમૂના બ્રાન્ડ પસંદ કરો...'),
  resetForm: addTranslations('Reset Form', 'फ़ॉर्म रीसेट करें', 'படிவத்தை மீட்டமை', 'ఫారమ్‌ను రీసెట్ చేయండి', 'ફોર્મ રીસેટ કરો'),
  loadPastResponses: addTranslations('Load Past Responses', 'पिछली प्रतिक्रियाएँ लोड करें', 'பழைய பதில்களை ஏற்றவும்', 'గత ప్రతిస్పందనలను లోడ్ చేయండి', 'ભૂતકાળના પ્રતિભાવો લોડ કરો'),
  selectCategory: addTranslations('Select Category', 'श्रेणी चुनें', 'வகையைத் தேர்ந்தெடுக்கவும்', 'వర్గాన్ని ఎంచుకోండి', 'શ્રેણી પસંદ કરો'),

  settings: {
    title: addTranslations('Settings', 'सेटिंग्स', 'அமைப்புகள்', 'సెట్టింగ్‌లు', 'સેટિંગ્સ'),
    imageBasedTitle: addTranslations('Image-Based Description', 'सिर्फ़ इमेज से विवरण', 'பட அடிப்படையிலான വിവരണം', 'చిత్ర-ఆధారిత వివరణ', 'છબી-આધારિત વર્ણન'),
    imageBasedHint: addTranslations('Enable this to use only images to generate the description. All other fields will be disabled.', 'केवल छवियों का उपयोग करके विवरण उत्पन्न करने के लिए इसे सक्षम करें। अन्य सभी फ़ील्ड अक्षम हो जाएंगे।', 'விளக்கத்தை உருவாக்க படங்களை மட்டும் பயன்படுத்த இதை இயக்கவும். மற்ற எல்லா புலங்களும் முடக்கப்படும்.', 'వివరణను రూపొందించడానికి చిత్రాలను మాత్రమే ఉపయోగించడానికి దీన్ని ప్రారంభించండి. అన్ని ఇతర ఫీల్డ్‌లు నిలిపివేయబడతాయి.', 'વર્ણન જનરેટ કરવા માટે ફક્ત છબીઓનો ઉપયોગ કરવા માટે આને સક્ષમ કરો. અન્ય તમામ ફીલ્ડ્સ અક્ષમ થઈ જશે.'),
    webhookEnv: addTranslations('Webhook Environment', 'वेबहुक एनवायरनमेंट', 'Webhook சூழல்', 'వెబ్‌హుక్ ఎన్విరాన్‌మెంట్', 'વેબહુക്ക് પર્યાવરણ'),
    production: addTranslations('Production', 'प्रोडक्शन', 'உற்பத்தி', 'ప్రొడక్షన్', 'ઉત્પાદન'),
    test: addTranslations('Test', 'टेस्ट', 'சோதனை', 'టెస్ట్', 'પરીક્ષણ'),
    clipDuration: addTranslations('Audio Clip Duration', 'ऑडियो क्लिप अवधि', 'ஆடியோ கிளிப் கால அளவு', 'ఆడియో క్లిప్ వ్యవధి', 'ઓડિયો ક્લિપ અવધિ'),
  },

  loadResponsesModal: {
    title: addTranslations('Load Past Responses', 'पिछली प्रतिक्रियाएँ लोड करें', 'பழைய பதில்களை ஏற்றவும்', 'గత ప్రతిస్పందనలను లోడ్ చేయండి', 'ભૂતકાળના પ્રતિભાવો લોડ કરો'),
    dateLabel: addTranslations('Date', 'तारीख', 'தேதி', 'తేదీ', 'તારીખ'),
    userLabel: addTranslations('User', 'उपयोगकर्ता', 'பயனர்', 'వినియోగదారు', 'વપરાશકર્તા'),
    stateLabel: addTranslations('State', 'राज्य', 'மாநிலம்', 'రాష్ట్రం', 'રાજ્ય'),
    cityLabel: addTranslations('City', 'शहर', 'நகரம்', 'నగరం', 'શહેર'),
    salespersonLabel: addTranslations('Salesperson', 'सेल्सपर्सन', 'விற்பனையாளர்', 'సేల్స్‌పర్సన్', 'સેલ્સપર્સન'),
    salespersonPlaceholder: addTranslations('Select a salesperson...', 'एक विक्रेता चुनें...', 'ஒரு விற்பனையாளரைத் தேர்ந்தெடுக்கவும்...', 'ఒక విక్రయదారుడిని ఎంచుకోండి...', 'સેલ્સપર્સન પસંદ કરો...'),
    regionLabel: addTranslations('Region', 'क्षेत्र', 'பிராந்தியம்', 'ప్రాంతం', 'ક્ષેત્ર'),
    regionPlaceholder: addTranslations('Select a region...', 'एक क्षेत्र चुनें...', 'ஒரு பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்...', 'ఒక ప్రాంతాన్ని ఎంచుకోండి...', 'એક ક્ષેત્ર પસંદ કરો...'),
    userPlaceholder: addTranslations('Type to search for a user...', 'उपयोगकर्ता खोजने के लिए टाइप करें...', 'பயனரைத் தேட தட்டச்சு செய்யவும்...', 'వినియోగదారు కోసం శోధించడానికి టైప్ చేయండి...', 'વપરાશકર્તા શોધવા માટે ટાઇપ કરો...'),
    findResponses: addTranslations('Find Responses', 'प्रतिक्रियाएँ खोजें', 'பதில்களைக் கண்டறியவும்', 'ప్రతిస్పందనలను కనుగొనండి', 'પ્રતિભાવો શોધો'),
    fetchingUsers: addTranslations('Fetching users...', 'उपयोगकर्ता लाए जा रहे हैं...', 'பயனர்களைப் பெறுகிறது...', 'వినియోగదారులను పొందుతోంది...', 'વપરાશકર્તાઓ લાવી રહ્યાં છે...'),
    fetchingResponses: addTranslations('Fetching your past responses...', 'आपकी पिछली प्रतिक्रियाएँ लाई जा रही हैं...', 'உங்கள் பழைய பதில்கள் பெறப்படுகின்றன...', 'మీ గత ప్రతిస్పందనలు పొందబడుతున్నాయి...', 'તમારા ભૂતકાળના પ્રતિભાવો લાવી રહ્યાં છે...'),
    noResponsesFound: addTranslations('No responses found for this date. Try another date.', 'इस तारीख के लिए कोई प्रतिक्रिया नहीं मिली। कोई और तारीख आज़माएँ।', 'இந்தத் தேதிக்கு பதில்கள் எதுவும் இல்லை. வேறு தேதியை முயற்சிக்கவும்.', 'ఈ తేదీకి ప్రతిస్పందనలు కనుగొనబడలేదు. మరో తేదీని ప్రయత్నించండి.', 'આ તારીખ માટે કોઈ પ્રતિસાદ મળ્યો નથી. બીજી તારીખ અજમાવો.'),
    useThisResponse: addTranslations('Use This Response', 'इस प्रतिक्रिया का उपयोग करें', 'இந்த பதிலை பயன்படுத்தவும்', 'ఈ ప్రతిస్పందనను ఉపయోగించండి', 'આ પ્રતિસાદનો ઉપયોગ કરો'),
    selectResponsePrompt: addTranslations('Select a response from the list below.', 'नीचे दी गई सूची से एक प्रतिक्रिया चुनें।', 'கீழே உள்ள பட்டியலிலிருந்து ஒரு பதிலை தேர்ந்தெடுக்கவும்.', 'క్రింది జాబితా నుండి ప్రతిస్పందనను ఎంచుకోండి.', 'નીચેની સૂચિમાંથી પ્રતિસાદ પસંદ કરો.'),
    loadedNotification: addTranslations('Loaded past response for', 'के लिए पिछली प्रतिक्रिया लोड की गई', '-க்கான பழைய பதில் ஏற்றப்பட்டது', 'కోసం గత ప్రతిస్పందన లోడ్ చేయబడింది', 'માટે ભૂતકાળનો પ્રતિભાવ લોડ થયો'),
    categoryLabel: addTranslations('Category', 'श्रेणी', 'வகை', 'వర్గం', 'શ્રેણી'),
    fmcgOption: addTranslations('FMCG', 'FMCG', 'FMCG', 'FMCG', 'FMCG'),
    industrialOption: addTranslations('Industrial Goods', 'औद्योगिक सामान', 'தொழில்துறை பொருட்கள்', 'పారిశ్రామిక వస్తువులు', 'ઔદ્યોગિક માલ'),
  },

  submitToWebhook: addTranslations('Generate Brand Description', 'ब्रांड विवरण बनाएँ', 'பிராண்ட் விளக்கத்தை உருவாக்கு', 'బ్రాండ్ వివరణను రూపొందించండి', 'બ્રાન્ડ વર્ણન જનરેટ કરો'),
  submitting: addTranslations('Submitting...', 'सबमिट हो रहा है...', 'சமர்ப்பிக்கிறது...', 'సమర్పిస్తోంది...', 'સબમિટ કરી રહ્યું છે...'),
  pleaseSelectSalesperson: addTranslations('Please select a salesperson before submitting.', 'सबमिट करने से पहले कृपया एक सेल्सपर्सन चुनें।', 'சமர்ப்பிக்கும் முன் ஒரு விற்பனையாளரைத் தேர்ந்தெடுக்கவும்.', 'సమర్పించే ముందు దయచేసి ఒక విక్రయదారుడిని ఎంచుకోండి.', 'સબમિટ કરતા પહેલા કૃપા કરીને સેલ્સપર્સન પસંદ કરો.'),
  pleaseSelectRegionAndSalesperson: addTranslations('Please select a region and salesperson to continue.', 'जारी रखने के लिए कृपया एक क्षेत्र और सेल्सपर्सन चुनें।', 'தொடர்வதற்கு ஒரு பிராந்தியத்தையும் விற்பனையாளரையும் தேர்ந்தெடுக்கவும்.', 'కొనసాగించడానికి దయచేసి ఒక ప్రాంతం మరియు విక్రయదారుడిని ఎంచుకోండి.', 'ચાલુ રાખવા માટે કૃપા કરીને એક ક્ષેત્ર અને સેલ્સપર્સન પસંદ કરો.'),
  regionLabel: addTranslations('Region', 'क्षेत्र', 'பிராந்தியம்', 'ప్రాంతం', 'ક્ષેત్ર'),
  salespersonLabel: addTranslations('Salesperson', 'सेल्सपर्सन', 'விற்பனையாளர்', 'సేల్స్‌పర్సన్', 'સેલ્સપર્સન'),
  selectRegionPlaceholder: addTranslations('Select a region...', 'एक क्षेत्र चुनें...', 'ஒரு பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்...', 'ఒక ప్రాంతాన్ని ఎంచుకోండి...', 'એક ક્ષેત્ર પસંદ કરો...'),
  selectSalespersonPlaceholder: addTranslations('Select a salesperson...', 'एक विक्रेता चुनें...', 'ஒரு விற்பனையாளரைத் தேர்ந்தெடுக்கவும்...', 'ఒక విక్రయదారుడిని ఎంచుకోండి...', 'સેલ્સપર્સન પસંદ કરો...'),
  errorTitle: addTranslations('Error', 'गड़बड़', 'பிழை', 'లోపం', 'ભૂલ'),
  generating: addTranslations('Generating...', 'बन रहा है...', 'உருவாக்குகிறது...', 'జనరేట్ చేస్తోంది...', 'જનરેટ કરી રહ્યું છે...'),
  pleaseFillQuestion1_2: addTranslations('Please fill the mandatory question 1.2 before submitting.', 'सबमिट करने से पहले कृपया अनिवार्य प्रश्न 1.2 भरें।', 'சமர்ப்பிக்கும் முன் கட்டாயக் கேள்வி 1.2-ஐ நிரப்பவும்.', 'సమర్పించే ముందు దయచేసి తప్పనిసరి ప్రశ్న 1.2ని పూరించండి.', 'સબમિટ કરતા પહેલા કૃપા કરીને ફરજિયાત પ્રશ્ન 1.2 ભરો.'),

  generateAdPillars: addTranslations('Generate Ad Pillars', 'विज्ञापन स्तंभ बनाएँ', 'விளம்பரத் தூண்களை உருவாக்கு', 'ప్రకటన స్తంభాలను రూపొందించండి', 'જાહેરાત પિલર્સ જનરેટ કરો'),
  generateStory: addTranslations('Generate Story', 'कहानी बनाएँ', 'கதையை உருவாக்கு', 'కథను రూపొందించండి', 'વાર્તા જનરેટ કરો'),
  generateSketch: addTranslations('Generate Sketch', 'स्केच बनाएं', 'ஸ்கெட்ச் உருவாக்கவும்', 'స్కెచ్ గీయండి', 'સ્કેચ જનરેટ કરો'),
  generateVisual: addTranslations('Generate Visual', 'विज़ुअल बनाएं', 'விஷுவல் உருவாக்கவும்', 'విజువల్ உరுவாக்கవுండి', 'વિઝ્યુઅલ જનરેટ કરો'),
  fetchMedia: addTranslations('Fetch Media', 'मीडिया प्राप्त करें', 'மீடியாவைப் பெறவும்', 'మీడియాను పొందండి', 'મીડિયા મેળવો'),
  generateAdImages: addTranslations('Generate Ad Images', 'विज्ञापन छवियाँ बनाएँ', 'விளம்பரப் படங்களை உருவாக்கு', 'ప్రకటన చిత్రాలను రూపొందించండి', 'જાહેરાત છબીઓ જનરેટ કરો'),

  footerText: addTranslations('Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting'),
  edit: addTranslations('Edit', 'एडिट करें', 'திருத்து', 'సవరించు', 'સંપાદિત કરો'),
  save: addTranslations('Save', 'सेव करें', 'சேமி', 'సేవ్ చేయి', 'સાચવો'),
  positioningStatementTitle: addTranslations('Brand Description', 'ब्रांड का विवरण', 'பிராண்ட் விளக்கம்', 'బ్రాండ్ వివరణ', 'બ્રાન્ડ વર્ણન'),

  webhookRequired: addTranslations('Webhook URL is required.', 'वेबहुक URL ज़रूरी है।', 'Webhook URL தேவை.', 'వెబ్‌హుక్ URL అవసరం.', 'વેબહુક્કું URL આવશ્યક છે.'),
  webhookInvalid: addTranslations('The active Webhook URL is invalid.', 'सक्रिय वेबहुк URL अमान्य है।', 'செயலில் உள்ள Webhook URL தவறானது.', 'క్రియాశీల వెబ్‌హుక్ URL చెల్లదు.', 'સક્રિય વેબહુക്ക് URL અમાન્ય છે.'),
  brandDescriptionSuggestionsTitle: addTranslations('Image based AI suggestions to enhance the Brand Description', 'ब्रांड विवरण को बेहतर बनाने के लिए इमेज आधारित AI सुझाव', 'பிராண்ட் விளக்கத்தை மேம்படுத்த பட அடிப்படையிலான AI பரிந்துரைகள்', 'బ్రాండ్ వివరణను మెరుగుపరచడానికి చిత్రం ఆధారిత AI సూచనలు', 'બ્રાન્ડ વર્ણનને વધારવા માટે છબી આધારિત AI સૂચનો'),
  fetchingSuggestions: addTranslations('Fetching suggestions...', 'सुझाव लाए जा रहे हैं...', 'பரிந்துரைகளைப் பெறுகிறது...', 'సూచనలను పొందుతోంది...', 'સૂચનો લાવી રહ્યાં છે...'),
  accept: addTranslations('Accept', 'स्वीकार करें', 'ஏற்கவும்', 'అంగీకరించు', 'સ્વીકારો'),
  accepted: addTranslations('Accepted', 'स्वीकृत', 'ஏற்றுக்கொள்ளப்பட்டது', 'అంగీకరించబడింది', 'સ્વીકૃત'),
  ignore: addTranslations('Ignore', 'अनदेखा करें', 'புறக்கணிக்கவும்', 'విస్మరించు', 'અવગણો'),
  undo: addTranslations('Undo', 'पूर्ववत् करें', 'செயல்தவிர்', 'చర్యరద్దుచెయ్యి', 'પૂર્વવત્ કરો'),
  acceptAll: addTranslations('Accept All', 'सभी स्वीकार करें', 'அனைத்தையும் ஏற்றுக்கொள்', 'అన్నీ ఆమోదించండి', 'બધા સ્વીકારો'),
  ignoreAll: addTranslations('Ignore All', 'सभी को अनदेखा करें', 'அனைத்தையும் புறக்கணி', 'అన్నీ విస్మరించండి', 'બધાને અવગણો'),
  previewUpdate: addTranslations('Preview Updated Description', 'अपडेटेड विवरण का प्रीव्यू देखें', 'புதுப்பிக்கப்பட்ட விளக்கத்தை முன்னோட்டமிடு', 'నవీకరించబడిన వివరణను ప్రివ్యూ చేయండి', 'અપડેટ થયેલ વર્ણનનું પૂર્વદર્શન કરો'),
  rewriting: addTranslations('Rewriting...', 'फिर से लिखा जा रहा है...', 'மீண்டும் எழுதுகிறது...', 'తిరిగి వ్రాస్తోంది...', 'ફરીથી લખી રહ્યું છે...'),
  originalDescription: addTranslations('Original Description', 'मूल विवरण', 'அசல் விளக்கம்', 'అసలు వివరణ', 'મૂળ વર્ણન'),
  revisedDescription: addTranslations('Revised Description', 'संशोधित विवरण', 'திருத்தப்பட்ட விளக்கம்', 'సవరించిన వివరణ', 'સુધારેલું વર્ણન'),
  useThis: addTranslations('Use This Version', 'इस संस्करण का उपयोग करें', 'இந்த பதிப்பைப் பயன்படுத்தவும்', 'ఈ సంస్కరణను ఉపయోగించండి', 'આ સંસ્કરણનો ઉપયોગ કરો'),
  cancel: addTranslations('Cancel', 'रद्द करें', 'ரத்துசெய்', 'రద్దు చేయి', 'રદ કરો'),
  close: addTranslations('Close', 'बंद करें', 'மூடு', 'మూసివేయి', 'બંધ કરો'),
  download: addTranslations('Download', 'डाउनलोड', 'பதிவிறக்கு', 'డౌన్‌లోడ్', 'ડાઉનલોડ કરો'),
  viewOriginal: addTranslations('View Original', 'मूल देखें', 'அசலைப் பார்க்கவும்', 'అసలైనది వీక్షించండి', 'મૂળ જુઓ'),
  originalVersion: addTranslations('Original Version', 'मूल संस्करण', 'அசல் பதிப்பு', 'అసలు వెర్షన్', 'મૂળ સંસ્કરણ'),
};

export const formTranslations = {
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొనండి...", "કૃપા કરીને સ્પષ્ટ કરો..."),
  audio: {
    title: addTranslations("Record Audio Notes", "ऑडियो नोट्स रिकॉर्ड करें", "ஆடியோ குறிப்புகளைப் பதிவுசெய்", "ఆడియో గమనికలను రికార్డ్ చేయండి", "ઓડિયો નોટ્સ રેકોર્ડ કરો"),
    context: addTranslations("Record audio clips to capture thoughts. You can transcribe them later to fill the form.", "विचारों को कैप्चर करने के लिए ऑडियो क्लिप रिकॉर्ड करें। आप बाद में फॉर्म भरने के लिए उन्हें ट्रांसक्रिप्ट कर सकते हैं।", "சிந்தனைகளைப் பிடிக்க ஆடியோ கிளிப்களைப் பதிவுசெய்யவும். படிவத்தை நிரப்ப அவற்றை பின்னர் படியெடுக்கலாம்.", "ఆలోచనలను సంగ్రహించడానికి ఆడియో క్లిప్‌లను రికార్డ్ చేయండి. ఫారమ్‌ను పూరించడానికి మీరు వాటిని తర్వాత లిప్యంతరీకరించవచ్చు.", "વિચારોને કેપ્ચર કરવા માટે ઓડિયો ક્લિપ્સ રેકોર્ડ કરો. તમે પછીથી ફોર્મ ભરવા માટે તેમનો ટ્રાન્સક્રિપ્ટ કરી શકો છો."),
    addNote: addTranslations("Start Recording", "रिकॉर्डिंग शुरू करें", "பதிவைத் தொடங்கு", "రికార్డింగ్ ప్రారంభించండి", "રેકોર્ડિંગ શરૂ કરો"),
    stopNote: addTranslations("Stop Recording", "रिकॉर्डिंग बंद करें", "பதிவை நிறுத்து", "రికార్డింగ్ ఆపు", "રેકોર્ડિંગ બંધ કરો"),
    play: addTranslations("Play", "चलाएं", "ப்ளே", "ప్లే", "પ્લે"),
    delete: addTranslations("Delete", "हटाएं", "நீக்கு", "తొలగించు", "કાઢી નાખો"),
    micSource: addTranslations("Mic Source:", "माइक स्रोत:", "மைக் ஆதாரம்:", "మైక్ మూలం:", "માઇક સ્રોત:"),
    status: {
      idle: addTranslations("Press 'Start Recording' to begin.", "शुरू करने के लिए 'रिकॉर्डिंग शुरू करें' दबाएं।", "தொடங்க 'பதிவைத் தொடங்கு' என்பதை அழுத்தவும்.", "ప్రారంభించడానికి 'రికార్డింగ్ ప్రారంభించు' నొక్కండి.", "'રેકોર્ડિંગ શરૂ કરો' દબાવો શરૂ કરવા માટે."),
      recording: addTranslations("Recording...", "रिकॉर्डिंग हो रही है...", "பதிவுசெய்கிறது...", "రికార్డింగ్ అవుతోంది...", "રેકોર્ડિંગ..."),
      processing: addTranslations("Processing audio...", "ऑडियो संसाधित हो रहा है...", "ஆடியோ செயலாக்கப்படுகிறது...", "ఆడియో ప్రాసెస్ చేయబడుతోంది...", "ઓડિયો પ્રોસેસ કરી રહ્યું છે..."),
      error: addTranslations("Mic blocked or not found. Please allow microphone access in your browser settings.", "माइक ब्लॉक है या नहीं मिला। कृपया अपनी ब्राउज़र सेटिंग में माइक्रोफ़ोन एक्सेस की अनुमति दें।", "மைக் தடுக்கப்பட்டது அல்லது கிடைக்கவில்லை. உங்கள் உலாவி அமைப்புகளில் மைக்ரோஃபோன் அணுகலை அனுமதிக்கவும்.", "మైక్ బ్లాక్ చేయబడింది లేదా కనుగొనబడలేదు. దయచేసి మీ బ్రాజర్ సెట్టింగులలో మైక్రోఫోన్ ప్రాప్యతను అనుమతించండి.", "માઇક બ્લોક થયેલ છે અથવા મળ્યું નથી. કૃપા કરીને તમારા બ્રાઉઝર સેટિંગ્સમાં માઇક્રોફોન ઍક્સેસને મંજૂરી આપો."),
    },
    transcriptTitle: addTranslations("Full Transcript", "पूर्ण प्रतिलेख", "முழுப் படியெடுத்தல்", "పూర్తి ట్రాన్స్క్రిప్ట్", "સંપૂર્ણ ટ્રાન્સક્રિપ્ટ"),
    transcriptExpand: addTranslations("View Full Transcript", "पूर्ण प्रतिलेख देखें", "முழுமையான படியெடுத்தலைக் காண்க", "పూర్తి ట్రాన్స్క్రిప్ట్ చూడండి", "સંપૂર્ણ ટ્રાન્સક્રિપ્ટ જુઓ"),
    transcriptModalTitle: addTranslations("Full Transcript", "पूर्ण प्रतिलेख", "முழுப் படியெடுத்தல்", "పూర్తి ట్రాన్స్క్రిప్ట్", "સંપૂર્ણ ટ્રાન્સક્રિપ્ટ"),
    transcriptClose: addTranslations("Close", "बंद करें", "மூடு", "మూసివేయి", "બંધ કરો"),
    clipsTitle: addTranslations("Audio Clips", "ऑडियो क्लिप", "ஆடியோ கிளிப்புகள்", "ఆడియో క్లిప్లు", "ઓડિયો ક્લિપ્સ"),
    transcribe: addTranslations("Transcribe", "प्रतिलेखित करें", "படியெடு", "లిప్యంతరీకరించు", "ટ્રાન્સક્રાઇબ કરો"),
    transcribing: addTranslations("Transcribing...", "प्रतिलेखित हो रहा है...", "படியெடுக்கிறது...", "లిప్యంతరీకరిస్తోంది...", "ટ્રાન્સક્રાઇબ કરી રહ્યું છે..."),
    analyse: addTranslations("Analyse Transcript", "प्रतिलेख का विश्लेषण करें", "படியெடுத்தலை பகுப்பாய்வு செய்", "ట్రాన్స్క్రిప్ట్ను విశ్లేషించండి", "ટ્રાન્સક્રિપ્ટનું વિશ્લેષણ કરો"),
    analysing: addTranslations("Analysing...", "विश्लेषण हो रहा है...", "பகுப்பாய்வு செய்கிறது...", "విశ్లేషిస్తోంది...", "વિશ્લેષણ કરી રહ્યું છે..."),
    copy: addTranslations("Copy", "कॉपी", "நகலெடு", "కాపీ", "કૉપિ કરો"),
    copied: addTranslations("Copied!", "कॉपी किया गया!", "நகலெடுக்கப்பட்டது!", "కాపీ చేయబడింది!", "કૉપિ થયું!"),
    download: addTranslations("Download", "डाउनलोड", "பதிவிறக்கு", "డౌన్లోడ్", "ડાઉનલોડ કરો"),
    downloadAll: addTranslations("Download All Clips", "सभी क्लिप डाउनलोड करें", "அனைத்து கிளிப்களையும் பதிவிறக்கு", "అన్ని క్లిప్‌లను డౌన్‌లోడ్ చేయండి", "બધી ક્લિપ્સ ડાઉનલોડ કરો"),
    suggestionTitle: addTranslations("AI Suggestion:", "एआई सुझाव:", "AI பரிந்துரை:", "AI సూచన:", "AI સૂચન:"),
    acceptSuggestion: addTranslations("Accept", "स्वीकार करें", "ஏற்கவும்", "అంగీకరించు", "સ્વીકારો"),
    retryFailed: addTranslations("Retry Failed", "विफल प्रयासों को पुनः प्रयास करें", "தோல்வியுற்றதை மீண்டும் முயற்சிக்கவும்", "విఫలమైన వాటిని మళ్ళీ ప్రయత్నించండి", "નિષ્ફળ પ્રયાસ ફરી કરો"),
  },
  salespersonSection: {
    title: addTranslations("To be filled by salesperson only (not asked to brand owner)", "केवल विक्रेता द्वारा भरा जाना है (ब्रांड मालिक से नहीं पूछा गया)", "விற்பனையாளரால் மட்டுமே நிரப்பப்பட வேண்டும் (பிராண்ட் உரிமையாளரிடம் கேட்கப்படவில்லை)", "విక్రయదారుడు మాత్రమే నింపాలి (బ్రాండ్ యజమానిని అడగలేదు)", "ફક્ત સેલ્સપર્સન દ્વારા ભરવામાં આવશે (બ્રાન્ડ માલિકને પૂછવામાં આવ્યું નથી)"),
    context: addTranslations("", "", "", "", ""),
    salesperson: addTranslations("Salesperson", "सेल्सपर्सन", "விற்பனையாளர்", "సేల్స్‌పర్సన్", "સેલ્સપર્સન"),
    customerID: addTranslations("Client Customer ID (Optional)", "क्लाइंट कस्टमर आईडी (वैकल्पिक)", "கிளையன்ட் வாடிக்கையாளர் ஐடி (விருப்பத்தேர்வு)", "క్లయింట్ కస్టమర్ ID (ఐచ్ఛికం)", "ક્લાયંટ ગ્રાહક ID (વૈકલ્પિક)"),
    customerIDPlaceholder: addTranslations("Enter Customer ID from ERP", "ERP से कस्टमर आईडी दर्ज करें", "ERP இலிருந்து வாடிக்கையாளர் ஐடியை உள்ளிடவும்", "ERP నుండి కస్టమర్ IDని నమోదు చేయండి", "ERP માંથી ગ્રાહક ID દાખલ કરો"),
  },
  section1: {
    title: addTranslations("Product Showcase", "प्रोडक्ट शोकेस", "தயாரிப்பு காட்சி", "ఉత్పత్తి ప్రదర్శన", "ઉત્પાદન પ્રદર્શન"),
    context: addTranslations("In case the brand has multiple products, tell us which one the advertising should showcase.", "यदि ब्रांड के कई उत्पाद हैं, तो हमें बताएं कि विज्ञापन में किसे प्रदर्शित किया जाना चाहिए।", "பிராண்டிற்கு பல தயாரிப்புகள் இருந்தால், விளம்பரம் எதைக் காண்பிக்க வேண்டும் என்பதை எங்களிடம் கூறுங்கள்.", "ఒకవేళ బ్రాండ్‌కు బహుళ ఉత్పలు ఉంటే, ప్రకటనలో దేనిని ప్రదర్శించాలో మాకు చెప్పండి.", "જો બ્રાન્ડ પાસે બહુવિધ ઉત્પાદનો હોય, તો અમને જણાવો કે જાહેરાતમાં કયું પ્રદર્શિત કરવું જોઈએ."),
    q1_1: {
      text: addTranslations("Can you tell us something about your brand and what are some things that make it special?", "क्या आप हमें अपने ब्रांड के बारे में कुछ बता सकते हैं और ऐसी कौन सी चीजें हैं जो इसे खास बनाती हैं?", "உங்கள் பிராண்டைப் பற்றியும் அதைச் சிறப்பிக்கும் சில விஷயங்களைப் பற்றியும் எங்களிடம் கூற முடியுமா?", "మీ బ్రాండ్ గురించి మరియు దానిని ప్రత్యేకంగా చేసే కొన్ని విషయాల గురించి మాకు చెప్పగలరా?", "તમે અમને તમારી બ્રાન્ડ વિશે કંઈક કહી શકો છો અને એવી કઈ વસ્તુઓ છે જે તેને વિશેષ બનાવે છે?"),
      placeholder: addTranslations("Write 2–3 concise lines about your brand's unique qualities, values, or heritage.", "अपने ब्रांड के अनूठे गुणों, मूल्यों या विरासत के बारे में 2-3 संक्षिप्त पंक्तियाँ लिखें।", "உங்கள் பிராண்டின் தனித்துவமான குணங்கள், மதிப்புகள் அல்லது பாரம்பரியம் பற்றி 2-3 சுருக்கமான வரிகளை எழுதுங்கள்.", "మీ బ్రాండ్ యొక్క ప్రత్యేక లక్షణాలు, విలువలు లేదా వారసత్వం గురించి 2-3 సంక్షిప్త పంక్తులు వ్రాయండి.", "તમારી બ્રાન્ડની અનન્ય ગુણવત્તા, મૂલ્યો અથવા વારસા વિશે 2-3 સંક્ષિપ્ત પંક્તિઓ લખો."),
    },
    q1_2: {
      text: addTranslations("Which brands do you have?", "आपके पास कौन से ब्रांड हैं?", "உங்களிடம் என்ன பிராண்டுகள் உள்ளன?", "మీ వద్ద ఏ బ్రాండ్లు ఉన్నాయి?", "તમારી પાસે કઈ બ્રાન્ડ્સ છે?"),
      placeholder: addTranslations("e.g., Mom's Traditional Pickles", "उदा., माँ के पारंपरिक अचार", "எ.கா., அம்மாவின் பாரம்பரிய ஊறுகாய்கள்", "ఉదా., అమ్మ సాంప్రదాయ పచ్చళ్ళు", "દા.ત., મમ્મીના પરંપરાગત અથાણાં"),
    },
    q1_3: {
      text: addTranslations("Which brand do you want to advertise? (Pick one)", "आप किस ब्रांड का विज्ञापन करना चाहते हैं?", "நீங்கள் எந்த பிராண்டை விளம்பரப்படுத்த விரும்புகிறீர்கள்?", "మీరు ఏ బ్రాండ్‌ను ప్రచారం చేయాలనుకుంటున్నంటున్నారు?", "તમે કઈ બ્રાન્ડની જાહેરાત કરવા માંગો છો? (એક પસંદ કરો)"),
      placeholder: addTranslations("e.g., Same as above", "उदा., ऊपर जैसा ही", "எ.கா., மேலே உள்ளதைப் போலவே", "ఉదా., పైన పేర్కొన్న విధంగానే", "દા.ત., ઉપર મુજબ"),
    },
    q1_4: {
      product: {
        text: addTranslations("Product name / category", "उत्पाद का नाम / श्रेणी", "தயாரிப்பு பெயர் / வகை", "ఉత్పత్తి పేరు / వర్గం", "ઉત્પાદનનું નામ / શ્રેણી"),
        placeholder: addTranslations("e.g., Authentic Mango Pickle 250g or just 'Pickles'", "उदा., ऑथेंटिक मैंगो पिकल 250g या सिर्फ 'अचार'", "எ.கா., உண்மையான மாங்காய் ஊறுகாய் 250g அல்லது 'ஊறுகாய்கள்'", "ఉదా., ప్రామాణిక మామిడి పచ్చడి 250g లేదా 'పచ్చళ్ళు'", "દા.ત., અસલી કેરીનું અથાણું 250g અથવા ફક્ત 'અથાણાં'"),
      },
      packForm: {
        text: addTranslations("Product Pack Form", "उत्पाद पैक प्रपत्र", "தயாரிப்பு பேக் படிவம்", "ఉత్పత్తి ప్యాక్ ఫారం", "ઉત્પાદન પેક ફોર્મ"),
        options: {
          "Can": addTranslations("Can", "कैन", "முடியும்", "డబ్బా", "કેન"),
          "Bottle": addTranslations("Bottle", "बोतल", "பாட்டில்", "బాటిల్", "બોટલ"),
          "Packet": addTranslations("Packet", "पैकेट", "பாக்கெட்", "ప్యాకెట్", "પેકેટ"),
          "Loose": addTranslations("Loose", "खुला", "தளர்வான", "వదులుగా", "છૂટક"),
          "Other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
        }
      },
      packImages: {
        title: addTranslations("Product Pack Images", "उत्पाद पैक छवियाँ", "தயாரிப்பு பேக் படங்கள்", "ఉత్పత్తి ప్యాక్ చిత్రాలు", "ઉત્પાદન પેક છબીઓ"),
      }
    },
  },
  section2: {
    title: addTranslations("Origin and Heritage", "उत्पत्ति और विरासत", "தோற்றம் மற்றும் பாரம்பரியம்", "మూలం & వారసత్వం", "મૂળ અને વારસો"),
    q2_1: {
      text: addTranslations("How old is the brand, and who started it?", "ब्रांड कितना पुराना है, और इसे किसने शुरू किया?", "பிராண்ட் எவ்வளவு பழமையானது, அதை ஆரம்பித்தவர் யார்?", "బ్రాండ్ ఎంత పాతది, మరియు దానిని ఎవరు ప్రారంభించారు?", "બ્રાન્ડ કેટલી જૂની છે, અને તેની શરૂઆત કોણે કરી?"),
      placeholder_founder: addTranslations("Founder's full name(s)", "संस्थापक का पूरा नाम", "நிறுவனர் முழு பெயர்(கள்)", "వ్యవస్థాపకుని పూర్తి పేరు(లు)", "સ્થાપકનું પૂરું નામ(ઓ)"),
      placeholder_year: addTranslations("YYYY", "YYYY", "YYYY", "YYYY", "YYYY"),
    },
    q2_1b: {
      text: addTranslations("Which regions is the brand primarily present in?", "ब्रांड मुख्य रूप से किन क्षेत्रों में मौजूद है?", "பிராண்ட் பிரதானமாக எந்தப் பகுதிகளில் உள்ளது?", "బ్రాండ్ ప్రధానంగా ఏ ప్రాంతాలలో ఉంది?", "બ્રાન્ડ મુખ્યત્વે કયા પ્રદેશોમાં હાજર છે?"),
      placeholder: addTranslations("e.g., South India, metro cities", "उदा., दक्षिण भारत, मेट्रो शहर", "எ.கா., தென்னிந்தியா, மெட்ரோ நகரங்கள்", "ఉదా., దక్షిణ భారతదేశం, మెట్రో నగరాలు", "દા.ત., દક્ષિણ ભારત, મેટ્રો શહેરો"),
    },
    q2_2: {
      text: addTranslations("What are some special aspects of your product?", "आपके उत्पाद के कुछ विशेष पहलू क्या हैं?", "உங்கள் தயாரிப்பின் சில சிறப்பு அம்சங்கள் யாவை?", "మీ ఉత్పత్తి యొక్క కొన్ని ప్రత్యేక అంశాలు ఏమిటి?", "તમારા ઉત્પાદનના કેટલાક વિશેષ પાસાઓ શું છે?"),
      look: addTranslations("Look / Shape", "दिखावट / आकार", "தோற்றம் / வடிவம்", "స్వరూపం / ఆకారం", "દેખાવ / આકાર"),
      feel: addTranslations("Feel / Texture", "अनुभव / बनावट", "உணர்வு / அமைப்பு", "అనుభూతి / ఆకృతి", "અનુભૂતિ / રચના"),
      smell: addTranslations("Smell / Aroma", "गंध / सुगंध", "வாசனை / நறுமணம்", "వాసన / సువాసన", "ગંધ / સુગંધ"),
      taste: addTranslations("Taste", "स्वाद", "சுவை", "రుచి", "સ્વાદ"),
      processes: addTranslations("Unique Processes", "अद्वितीय प्रक्रियाएं", "தனித்துவமான செயல்முறைகள்", "ప్రత్యేక ప్రక్రియలు", "અનન્ય પ્રક્રિયાઓ"),
      ingredients: addTranslations("Unique Ingredients", "अद्वितीय सामग्री", "தனித்துவமான பொருட்கள்", "ప్రత్యేక పదార్థాలు", "અનન્ય ઘટકો"),
      placeholder: addTranslations("Describe in 1-2 keywords", "1-2 कीवर्ड में वर्णन करें", "1-2 முக்கிய வார்த்தைகளில் விவரிக்கவும்", "1-2 కీలకపదాలలో వివరించండి", "1-2 કીવર્ડ્સમાં વર્ણન કરો"),
    },
    q2_3: {
      text: addTranslations("Any certifications that support the above aspects", "उपरोक्त पहलुओं का समर्थन करने वाला कोई प्रमाणन", "மேற்கண்ட அம்சங்களை ஆதரிக்கும் ஏதேனும் சான்றிதழ்கள்", "పై అంశాలకు మద్దతు ఇచ్చే ఏవైనా ధృవపత్రాలు", "ઉપરોક્ત પાસાઓને સમર્થન આપતા કોઈપણ પ્રમાણપત્રો"),
      placeholder: addTranslations("e.g., 100% natural, untouched by human hand, 99% protection.", "उदा., 100% प्राकृतिक, मानव हाथ से अछूता, 99% सुरक्षा।", "எ.கா., 100% இயற்கை, மனித கை படாதது, 99% பாதுகாப்பு.", "ఉదా., 100% సహజమైనది, మానవ స్పర్శ లేనిది, 99% రక్షణ.", "દા.ત., 100% કુદરતી, માનવ હાથથી અસ્પૃશ્ય, 99% રક્ષણ."),
    },
    q2_5: {
      text: addTranslations("What is the consumer problem / issue you're trying to solve with your brand?", "आप अपने ब्रांड के साथ उपभोक्ता की किस समस्या/मुद्दे को हल करने का प्रयास कर रहे हैं?", "உங்கள் பிராண்டு மூலம் நீங்கள் தீர்க்க முயற்சிக்கும் நுகர்வோர் சிக்கல் / பிரச்சினை என்ன?", "మీ బ్రాండ్‌తో మీరు ఏ వినియోగదారు సమస్య / సమస్యను పరిష్కరించడానికి ప్రయత్నిస్తున్నారు?", "તમે તમારી બ્રાન્ડ સાથે ગ્રાહકની કઈ સમસ્યા/મુદ્દો હલ કરવાનો પ્રયાસ કરી રહ્યા છો?"),
      placeholder: addTranslations("Describe the core problem or need your brand addresses for the consumer.", "उपभोक्ता के लिए आपके ब्रांड द्वारा संबोधित मुख्य समस्या या आवश्यकता का वर्णन करें।", "உங்கள் பிராண்ட் நுகர்வோருக்காக நிவர்த்தி செய்யும் முக்கிய சிக்கல் அல்லது தேவையை விவரிக்கவும்.", "మీ బ్రాండ్ వినియోగదారు కోసం పరిష్కరించే ప్రధాన సమస్య లేదా అవసరాన్ని వివరించండి.", "તમારી બ્રાન્ડ ગ્રાહક માટે જે મુખ્ય સમસ્યા અથવા જરૂરિયાતને સંબોધે છે તેનું વર્ણન કરો."),
    },
  },
  section3: {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    context: addTranslations("Who is the primary customer (buyer) and who is the primary consumer (user)? They could be the same.", "प्राथमिक ग्राहक (खरीदार) कौन है और प्राथमिक उपभोक्ता (उपयोगकर्ता) कौन है? वे समान हो सकते हैं।", "முதன்மை வாடிக்கையாளர் (வாங்குபவர்) யார் மற்றும் முதன்மை நுகர்வோர் (பயனர்) யார்? அவர்கள் ஒரே மாதிரியாக இருக்கலாம்.", "ప్రాథమిక కస్టమర్ (కొనుగోలుదారు) ఎవరు మరియు ప్రాథమిక వినియోగదారు (వాడుకరి) ఎవరు? వారు ఒకేలా ఉండవచ్చు.", "પ્રાથમિક ગ્રાહક (ખરીદનાર) કોણ છે અને પ્રાથમિક ઉપભોક્તા (વપરાશકર્તા) કોણ છે? તેઓ સમાન હોઈ શકે છે."),
    q3_1A: {
      text: addTranslations("Primary consumer (person who uses)", "प्राथमिक उपभोक्ता (जो व्यक्ति उपयोग करता है)", "முதன்மை நுகர்வோர் (பயன்படுத்தும் நபர்)", "ప్రాథమిక వినియోగదారు (ఉపయోగించే వ్యక్తి)", "પ્રાથમિક ઉપભોક્તા (જે વ્યક્તિ ઉપયોગ કરે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ઉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
    },
    q3_1B: {
      text: addTranslations("Primary customer (person who buys)", "प्राथमिक ग्राहक (जो व्यक्ति खरीदता है)", "முதன்மை வாடிக்கையாளர் (வாங்கும் நபர்)", "ప్రాథమిక కస్టమర్ (కొనుగోలు చేసే వ్యక్తి)", "પ્રાથમિક ગ્રાહક (જે વ્યક્તિ ખરીદે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ઉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
      income: addTranslations("Income", "आय", "வருமானம்", "ఆదాయం", "આવક"),
      geography: addTranslations("Geography", "भूगोल", "புவியியல்", "భౌగోళికం", "ભૂગોળ"),
    },
    consumerAgeOptions: {
      "Babies < 5": addTranslations("Babies < 5", "बच्चे < 5", "குழந்தைகள் < 5", "శిశువులు < 5", "બાળકો < 5"),
      "Kids 6-14": addTranslations("Kids 6–14", "बच्चे 6–14", "குழந்தைகள் 6–14", "పిల్లలు 6–14", "બાળકો 6–14"),
      "15-25": addTranslations("15–25", "15–25", "15–25", "15–25", "15–25"),
      "26-35": addTranslations("26–35", "26–35", "26–35", "26–35", "26–35"),
      "36-50": addTranslations("36–50", "36–50", "36–50", "36–50", "36–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    customerAgeOptions: {
      "Kids 6-14": addTranslations("Kids 6–14", "बच्चे 6–14", "குழந்தைகள் 6–14", "పిల్లలు 6–14", "બાળકો 6–14"),
      "15-25": addTranslations("15–25", "15–25", "15–25", "15–25", "15–25"),
      "26-35": addTranslations("26–35", "26–35", "26–35", "26–35", "26–35"),
      "36-50": addTranslations("36–50", "36–50", "36–50", "36–50", "36–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    genderOptions: {
      "Men": addTranslations("Men", "पुरुष", "ஆண்கள்", "పురుషులు", "પુરુષો"),
      "Women": addTranslations("Women", "महिलाएं", "பெண்கள்", "మహిళలు", "મહિલાઓ"),
      "Men and Women": addTranslations("Men and Women", "पुरुष और महिलाएं", "ஆண்கள் மற்றும் பெண்கள்", "పురుషులు మరియు మహిళలు", "પુરુષો અને મહિલાઓ"),
    },
    incomeOptions: {
      "Lower": addTranslations("Lower", "निम्न", "குறைந்த", "తక్కువ", "નીચું"),
      "Lower middle": addTranslations("Lower middle", "निम्न मध्य", "குறைந்த நடுத்தர", "దిగువ మధ్యతరగతి", "નીચું મધ્યમ"),
      "Upper Middle": addTranslations("Upper Middle", "उच्च मध्य", "உயர் நடுத்தர", "ఎగువ మధ్యతరగతి", "ઉચ્ચ મધ્યમ"),
      "HNI": addTranslations("HNI", "HNI", "HNI", "HNI", "HNI"),
    },
    geoOptions: {
      "Big Cities": addTranslations("Big Cities", "बड़े शहर", "பெரிய நகரங்கள்", "పెద్ద నగరాలు", "મોટા શહેરો"),
      "Smaller towns": addTranslations("Smaller towns", "छोटे शहर", "சிறிய நகரங்கள்", "చిన్న పట్టణాలు", "નાના શહેરો"),
      "Rural": addTranslations("Rural", "ग्रामीण", "கிராமப்புற", "గ్రామీణ", "ગ્રામીણ"),
      "All": addTranslations("All", "सभी", "அனைத்தும்", "అన్నీ", "બધા"),
    },
    q3_2: {
      text: addTranslations("What does their typical lifestyle and beliefs look like? (select up to 2 options)", "उनकी सामान्य जीवनशैली और विश्वास कैसे दिखते हैं? (अधिकतम 2 विकल्प चुनें)", "அவர்களின் பொதுவான வாழ்க்கை முறை மற்றும் நம்பிக்கைகள் எப்படி இருக்கும்? (அதிகபட்சம் 2 விருப்பங்களைத் தேர்ந்தெடுக்கவும்)", "వారి సాధారణ జీవనశైలి మరియు నమ్మకాలు ఎలా ఉంటాయి? (గరిష్టంగా 2 ఎంపికలను ఎంచుకోండి)", "તેમની સામાન્ય જીવનશૈલી અને માન્યતાઓ કેવી દેખાય છે? (2 વિકલ્પો સુધી પસંદ કરો)"),
      category_men: addTranslations("Men (26+)", "पुरुष (26+)", "ஆண்கள் (26+)", "పురుషులు (26+)", "પુરુષો (26+)"),
      category_women: addTranslations("Women (26+)", "महिलाएं (26+)", "பெண்கள் (26+)", "మహిళలు (26+)", "મહિલાઓ (26+)"),
      category_youth_boys: addTranslations("Youth Boy (15–25)", "युवा लड़का (15–25)", "இளைஞர் (சிறுவன்) (15–25)", "యువత (అబ్బాయి) (15–25)", "યુવક (15–25)"),
      category_youth_girls: addTranslations("Youth Girl (15–25)", "युवा लड़की (15–25)", "இளைஞர் (சிறுமி) (15–25)", "యువత (అమ్మాయి) (15–25)", "યુવતી (15–25)"),
      category_kids: addTranslations("Kids (0–14)", "बच्चे (0–14)", "குழந்தைகள் (0–14)", "పిల్లలు (0–14)", "બાળકો (0–14)"),
    },
  },
  section4: {
    title: addTranslations("Brand Usage", "ब्रांड का उपयोग", "பிராண்ட் பயன்பாடு", "బ్రాండ్ వాడకం", "બ્રાન્ડ વપરાશ"),
    q4_1: {
      text: addTranslations("When and how do consumers use your product?", "उपभोक्ता आपके उत्पाद का कब और कैसे उपयोग करते हैं?", "நுகர்வோர் உங்கள் தயாரிப்பை எப்போது, ​​எப்படிப் பயன்படுத்துகிறார்கள்?", "వినియోగదారులు మీ ఉత్పత్తిని ఎప్పుడు మరియు ఎలా ఉపయోగిస్తారు?", "ગ્રાહકો તમારા ઉત્પાદનનો ક્યારે અને કેવી રીતે ઉપયોગ કરે છે?"),
      placeholder: addTranslations("Describe the usage occasion, frequency, and method.", "उपयोग के अवसर, आवृत्ति और विधि का वर्णन करें।", "பயன்படுத்தும் சந்தர்ப்பம், அதிர்வெண் மற்றும் முறையை விவரிக்கவும்.", "వినియోగ సందర్భం, ఫ్రీక్వెన్సీ మరియు పద్ధతిని వివరించండి.", "વપરાશના પ્રસંગ, આવર્તન અને પદ્ધતિનું વર્ણન કરો."),
    }
  },
  section5: {
    title: addTranslations("Benefit and Experience", "लाभ और अनुभव", "பயன் மற்றும் அனுபவம்", "ప్రయోజనం & అనుభవం", "લાભ અને અનુભવ"),
    q5_1: {
      text: addTranslations("What are the benefits your brand offers?", "आपका ब्रांड कौन से लाभ प्रदान करता है?", "உங்கள் பிராண்ட் வழங்கும் நன்மைகள் என்ன?", "మీ బ్రాండ్ అందించే ప్రయోజనాలు ఏమిటి?", "તમારી બ્રાન્ડ કયા લાભો પ્રદાન કરે છે?"),
      placeholder_nonfood: addTranslations("e.g., Removes tough stains, gives shiny hair, etc.", "उदा., कड़े दाग हटाता है, चमकदार बाल देता है, आदि।", "எ.கா., கடினமான கறைகளை நீக்குகிறது, பளளளப்பான முடியை அளிக்கிறது, போன்றவை.", "ఉదా., కఠినమైన మరకలను తొలగిస్తుంది, మెరిసే జుట్టును ఇస్తుంది, మొదలైనవి.", "દા.ત., કઠિન ડાઘ દૂર કરે છે, ચમકતા વાળ આપે છે, વગેરે."),
      placeholder_food: addTranslations("e.g., Provides energy, tastes great, etc.", "उदा., ऊर्जा प्रदान करता है, स्वाद में बढ़िया है, आदि।", "எ.கா., ஆற்றலை வழங்குகிறது, சுவையாக இருக்கிறது, போன்றவை.", "ఉదా., శక్తిని అందిస్తుంది, గొప్ప రుచిని ఇస్తుంది, మొదలైనవి.", "દા.ત., ઊર્જા પૂરી પાડે છે, સ્વાદિષ્ટ છે, વગેરે."),
    },
    q5_2: {
      text: addTranslations("Which of these benefits are different from your competitors?", "इनमें से कौन से लाभ आपके प्रतिस्पर्धियों से अलग हैं?", "இந்த நன்மைகளில் எது உங்கள் போட்டியாளர்களிடமிருந்து வேறுபட்டது?", "ఈ ప్రయోజనాలలో ఏది మీ పోటీదారుల నుండి భిన్నంగా ఉంటుంది?", "આમાંના કયા લાભો તમારા સ્પર્ધકોથી અલગ છે?"),
      placeholder: addTranslations("Describe what makes your benefit superior or different.", "वर्णन करें कि आपका लाभ बेहतर या अलग क्या बनाता है।", "உங்கள் நன்மையை உயர்ந்ததாக அல்லது வித்தியாசமாக மாற்றுவதை விவரிக்கவும்.", "మీ ప్రయోజనాన్ని ఉన్నతంగా లేదా భిన్నంగా మార్చేది ఏమిటో వివరించండి.", "તમારા લાભને શ્રેષ્ઠ અથવા અલગ શું બનાવે છે તેનું વર્ણન કરો."),
    },
    q5_3: {
      text: addTranslations("How does the consumer feel after using your brand?", "आपके ब्रांड का उपयोग करने के बाद उपभोक्ता को कैसा महसूस होता है?", "உங்கள் பிராண்டைப் பயன்படுத்திய பிறகு நுகர்வோர் எப்படி உணருகிறார்கள்?", "మీ బ్రాండ్‌ను ఉపయోగించిన తర్వాత వినియోగదారు ఎలా భావిస్తారు?", "તમારી બ્રાન્ડનો ઉપયોગ કર્યા પછી ગ્રાહકને કેવું લાગે છે?"),
      placeholder: addTranslations("Describe the emotional outcome or feeling, e.g., 'I feel confident', 'I feel cared for'.", "भावनात्मक परिणाम या भावना का वर्णन करें, उदा., 'मुझे आत्मविश्वास महसूस होता है', 'मुझे देखभाल महसूस होती है'।", "உணர்ச்சிவசமான விளைவு அல்லது உணர்வை விவரிக்கவும், எ.கா., 'நான் நம்பிக்கையுடன் உணர்கிறேன்', 'நான் கவனிக்கப்பட்டதாக உணர்கிறேன்'.", "భావోద్వేగ ఫలితం లేదా అనుభూతిని వివరించండి, ఉదా., 'నాకు నమ్మకంగా ఉంది', 'నేను శ్రద్ధ తీసుకున్నట్లు భావిస్తున్నాను'.", "ભાવનાત્મક પરિણામ અથવા લાગણીનું વર્ણન કરો, દા.ત., 'મને આત્મવિશ્વાસ અનુભવાય છે', 'મને સંભાળ અનુભવાય છે'."),
      suggestions_nonfood: {
        activeEnergetic: addTranslations("I feel active and energetic", "मैं सक्रिय और ऊर्जावान महसूस करता हूँ", "நான் சுறுசுறுப்பாகவும் ஆற்றலுடனும் உணர்கிறேன்", "నేను చురుకుగా మరియు శక్తివంతంగా ఉన్నాను", "હું સક્રિય અને ઊર્જાવાન અનુભવું છું"),
        beautifulAdmired: addTranslations("I feel more beautiful and admired by all", "I feel more beautiful and admired by all", "I feel more beautiful and admired by all", "I feel more beautiful and admired by all", "હું વધુ સુંદર અને સૌ દ્વારા પ્રશંસિત અનુભવું છું"),
        confidentSocial: addTranslations("I now have the confidence to socialise", "I now have the confidence to socialise", "I now have the confidence to socialise", "I now have the confidence to socialise", "હવે મને સામાજિક થવાનો આત્મવિશ્વાસ છે"),
        best: addTranslations("Everyone thinks I'm the best", "Everyone thinks I'm the best", "Everyone thinks I'm the best", "Everyone thinks I'm the best", "દરેક જણ વિચારે છે કે હું શ્રેષ્ઠ છું"),
        loved: addTranslations("I get more love from family and friends", "I get more love from family and friends", "I get more love from family and friends", "I get more love from family and friends", "મને પરિવાર અને મિત્રો તરફથી વધુ પ્રેમ મળે છે"),
        elevated: addTranslations("I feel elevated", "I feel elevated", "I feel elevated", "I feel elevated", "હું ઉન્નત અનુભવું છું"),
        premiumWorld: addTranslations("I belong to a more premium world", "I belong to a more premium world", "I belong to a more premium world", "I belong to a more premium world", "હું વધુ પ્રીમિયમ દુનિયાનો છું"),
        smartChoice: addTranslations("I have made a smart choice", "I have made a smart choice", "I have made a smart choice", "I have made a smart choice", "મેં એક સ્માર્ટ પસંદગી કરી છે"),
      },
      suggestions_food: {
        activeEnergetic: addTranslations("I feel active and energetic", "मैं सक्रिय और ऊर्जावान महसूस करता हूँ", "நான் சுறுசுறுப்பாகவும் ஆற்றலுடனும் உணர்கிறேன்", "నేను చురుకుగా మరియు శక్తివంతంగా ఉన్నాను", "હું સક્રિય અને ઊર્જાવાન અનુભવું છું"),
        elevated: addTranslations("I feel elevated", "I feel elevated", "I feel elevated", "I feel elevated", "હું ઉન્નત અનુભવું છું"),
        healthy: addTranslations("I feel healthy", "मैं स्वस्थ महसूस करता हूँ", "நான் ஆரோக்கியமாக உணர்கிறேன்", "నేను ఆరోగ్యంగా ఉన్నాను", "હું સ્વસ્થ અનુભવું છું"),
        smartChoice: addTranslations("I have made a smart choice", "I have made a smart choice", "I have made a smart choice", "I have made a smart choice", "મેં એક સ્માર્ટ પસંદગી કરી છે"),
        premiumWorld: addTranslations("I belong to a more premium world", "I belong to a more premium world", "I belong to a more premium world", "I belong to a more premium world", "હું વધુ પ્રીમિયમ દુનિયાનો છું"),
        loved: addTranslations("I get more love from my family and friends", "I get more love from family and friends", "I get more love from family and friends", "I get more love from family and friends", "મને મારા પરિવાર અને મિત્રો તરફથી વધુ પ્રેમ મળે છે"),
      }
    },
  },
  section6: {
    title: addTranslations("Competition", "प्रतियोगिता", "போட்டி", "పోటీ", "સ્પર્ધા"),
    q6_1: {
      text: addTranslations("Who are your primary competitors?", "आपके प्राथमिक प्रतियोगी कौन हैं?", "உங்கள் முதன்மை போட்டியாளர்கள் யார்?", "మీ ప్రాథమిక పోటీదారులు ఎవరు?", "તમારા પ્રાથમિક સ્પર્ધકો કોણ છે?"),
      placeholder: addTranslations("List 2-3 main competitor brands.", "2-3 मुख्य प्रतियोगी ब्रांडों की सूची बनाएं।", "2-3 முக்கிய போட்டியாளர் பிராண்டுகளை பட்டியலிடுங்கள்.", "2-3 ప్రధాన పోటీదారు బ్రాండ్‌లను జాబితా చేయండి.", "2-3 મુખ્ય સ્પર્ધક બ્રાન્ડ્સની સૂચિ બનાવો."),
    }
  },
  section7: {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కావలసిన అవగాహన & ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાત ઉદ્દેશ્યો"),
    q7_1: {
      text: addTranslations("Imagery - How you would like your consumers to view the brand?", "इमेजरी - आप अपने उपभोक्ताओं को ब्रांड को कैसे देखना चाहेंगे?", "பிம்பம் - உங்கள் நுகர்வோர் பிராண்டை எப்படிப் பார்க்க வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", "చిత్రణ - మీ వినియోగదారులు బ్రాండ్‌ను ఎలా చూడాలని మీరు కోరుకుంటున్నారు?", "ઇમેજરી - તમે તમારા ગ્રાહકોને બ્રાન્ડને કેવી રીતે જોવા માંગો છો?"),
      category_tone: addTranslations("Category 1 — Tone (Select 1)", "श्रेणी 1 — टोन (1 चुनें)", "வகை 1 — டோன் (1ஐத் தேர்ந்தெடுக்கவும்)", "వర్గం 1 — టోన్ (1ని ఎంచుకోండి)", "શ્રેણી 1 — ટોન (1 પસંદ કરો)"),
      options_tone: {
        "Youthful": addTranslations("Youthful", "युवा", "இளமை", "యువతరం", "યુવાન"),
        "Mature": addTranslations("Mature", "परिपक्व", "முதிர்ந்த", "పరిపక్వ", "પરિપક્વ"),
        "Light-hearted": addTranslations("Light-hearted", "हल्के-फुल्के", "இலகுவான", "తేలికైన", "હળવા દિલનું"),
        "Serious": addTranslations("Serious", "गभीर", "தீவிரமான", "తీవ్రమైన", "ગંભીર"),
      },
      category_world: addTranslations("Category 2 — Brand World (Select 1)", "श्रेणी 2 — ब्रांड की दुनिया (1 चुनें)", "வகை 2 — பிராண்ட் உலகம் (1ஐத் தேர்ந்தெடுக்கவும்)", "వర్గం 2 — బ్రాండ్ ప్రపంచం (1ని ఎంచుకోండి)", "શ્રેણી 2 — બ્રાન્ડ વર્લ્ડ (1 પસંદ કરો)"),
      options_world: {
        "Premium": addTranslations("Premium", "प्रीमियम", "பிரீமியம்", "ప్రీమియం", "પ્રીમિયમ"),
        "Luxury": addTranslations("Luxury", "लक्ज़री", "ஆடம்பர", "విలాసవంతమైన", "લક્ઝરી"),
        "MassPopular": addTranslations("Mass / Popular", "मास / लोकप्रिय", "மாஸ் / பிரபலமான", "మాస్ / ప్రసిద్ధ", "માસ / લોકપ્રિય"),
        "Desi": addTranslations("Desi", "देसी", "தேசி", "దేశీ", "દેશી"),
        "International": addTranslations("International", "अंतर्राष्ट्रीय", "சர்வதேச", "అంతర్జాతీయ", "આંતરરાષ્ટ્રીય"),
      },
      category_attributes: addTranslations("Category 3 — Attributes (Select up to 2)", "श्रेणी 3 — गुण (2 तक चुनें)", "வகை 3 — பண்புகள் (2 வரை தேர்ந்தெடுக்கவும்)", "వర్గం 3 — లక్షణాలు (2 వరకు ఎంచుకోండి)", "શ્રેણી 3 — ગુણધર્મો (2 સુધી પસંદ કરો)"),
      options_attributes: {
        "High Performance": addTranslations("High Performance", "उच्च प्रदर्शन", "உயர் செயல்திறன்", "అధిక పనితీరు", "ઉચ્ચ પ્રદર્શન"),
        "Natural": addTranslations("Natural", "प्राकृतिक", "இயற்கையான", "సహజమైన", "કુદરતી"),
        "Scientific": addTranslations("Scientific", "वैज्ञानिक", "அறிவியல்", "శాస్త్రీయ", "વૈજ્ઞાનિક"),
        "Other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_2: {
      text: addTranslations("If the brand were a person, how do you think the consumer will view this person?", "यदि ब्रांड एक व्यक्ति होता, तो आपको क्या लगता है कि उपभोक्ता इस व्यक्ति को कैसे देखेगा?", "பிராண்ட் ஒரு நபராக இருந்தால், நுகர்வோர் இந்த நபரை எப்படிப் பார்ப்பார்கள் என்று நினைக்கிறீர்கள்?", "బ్రాండ్ ఒక వ్యక్తి అయితే, వినియోగదారు ఈ వ్యక్తిని ఎలా చూస్తారని మీరు అనుకుంటున్నారు?", "જો બ્રાન્ડ એક વ્યક્તિ હોત, તો તમને શું લાગે છે કે ગ્રાહક આ વ્યક્તિને કેવી રીતે જોશે?"),
      options: {
        "friend": addTranslations("Friend", "दोस्त", "நண்பர்", "స్నేహితుడు", "મિત્ર"),
        "expert": addTranslations("Expert", "विशेषज्ञ", "நிபுணர்", "నిపుణుడు", "નિષ્ણાત"),
        "family_elder": addTranslations("Family Elder", "परिवार का बड़ा", "குடும்ப பெரியவர்", "కుటుంబ పెద్ద", "પરિવારના વડીલ"),
        "spouse": addTranslations("Spouse", "पति/पत्नी", "வாழ்க்கைத் துணை", "జీవిత భాగస్వామి", "જીવનસાથી"),
        "mother": addTranslations("Mother", "माँ", "தாய்", "తల్లి", "માતા"),
        "celebrity": addTranslations("Celebrity", "सेलिब्रिटी", "பிரபலம்", "ప్రముఖులు", "સેલિબ્રિટી"),
        "child": addTranslations("Child", "बच्चा", "குழந்தை", "పిల్లవాడు", "બાળક"),
        "youngster": addTranslations("Youngster", "युवा", "இளைஞர்", "యువకుడు", "યુવાન"),
        "mentor": addTranslations("Mentor", "गुरु", "ஆலோசகர்", "గురువు", "માર્ગદર્શક"),
        "royalty": addTranslations("Royalty", "राजसी", "ராயல்டி", "రాయల్టీ", "રોયલ્ટી"),
        "Other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_4: {
      text: addTranslations("Advertising: What is the objective behind creating this ad?", "विज्ञापन: इस विज्ञापन को बनाने के पीछे क्या उद्देश्य है?", "விளம்பரம்: இந்த விளம்பரத்தை உருவாக்குவதன் நோக்கம் என்ன?", "ప్రకటన: ఈ ప్రకటనను రూపొందించడం వెనుక ఉన్న లక్ష్యం ఏమిటి?", "જાહેરાત: આ જાહેરાત બનાવવા પાછળનો ઉદ્દેશ્ય શું છે?"),
      options: {
        "Awareness": addTranslations("Awareness (make my brand top of mind)", "जागरूकता (मेरे ब्रांड को शीर्ष पर लाना)", "விழிப்புணர்வு (என் பிராண்டை மனதில் முதன்மையாக வைப்பது)", "అవగాహన (నా బ్రాండ్‌ను అగ్రస్థానంలో ఉంచడం)", "જાગૃતિ (મારી બ્રાન્ડને ટોચ પર રાખો)"),
        "Emotions/Image": addTranslations("Emotions/Image (convey my brand story)", "भावनाएं/छवि (मेरी ब्रांड कहानी बताना)", "உணர்வுகள்/படம் (என் பிராண்ட் கதையை வெளிப்படுத்துதல்)", "భావోద్వేగాలు/చిత్రం (నా బ్రాండ్ కథను తెలియజేయడం)", "લાગણીઓ/છબી (મારી બ્રાન્ડની વાર્તા જણાવો)"),
        "NewLaunch": addTranslations("New launch (make people aware of my new product)", "नया लॉन्च (लोगों को मेरे नए उत्पाद के बारे में जागरूक करना)", "புதிய வெளியீடு (என் புதிய தயாரிப்பு பற்றி மக்களுக்கு தெரியப்படுத்துதல்)", "కొత్త ప్రయోగం (నా కొత్త ఉత్పత్తి గురించి ప్రజలకు తెలియజేయడం)", "નવી લોન્ચ (મારા નવા ઉત્પાદન વિશે લોકોને જાગૃત કરો)"),
        "Offers": addTranslations("Offers", "ऑफ़र", "சலுகைகள்", "ఆఫర్లు", "ઓફર્સ"),
        "FestivalGrowth": addTranslations("Festival growth", "त्योहारों में वृद्धि", "பண்டிகை வளர்ச்சி", "పండుగ వృద్ధి", "તહેવાર વૃદ્ધિ"),
        "Other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_4_details_placeholders: {
      "Awareness": addTranslations("e.g., Target new user segment", "उदा., नए उपयोगकर्ता खंड को लक्षित करें", "எ.கா., புதிய பயனர் பிரிவை இலக்கு வைக்கவும்", "ఉదా., కొత్త వినియోగదారు విభాగాన్ని లక్ష్యం చేసుకోండి", "દા.ત., નવા વપરાશકર્તા સેગમેન્ટને લક્ષ્ય બનાવો"),
      "Emotions/Image": addTranslations("e.g., Showcase brand story through family moments", "उदा., पारिवारिक क्षणों के माध्यम से ब्रांड की कहानी दिखाएं", "எ.கா., குடும்பத் தருணங்கள் மூலம் பிராண்ட் கதையைக் காட்சிப்படுத்தவும்", "ఉదా., కుటుంబ క్షణాల ద్వారా బ్రాండ్ కథను ప్రదర్శించండి", "દા.ત., પારિવારિક ક્ષણો દ્વારા બ્રાન્ડ વાર્તા પ્રદર્શિત કરો"),
      "NewLaunch": addTranslations("e.g., Highlight the new 'extra fresh' ingredient", "उदा., नई 'अतिरिक्त ताज़ा' सामग्री को हाइलाइट करें", "எ.கா., புதிய 'கூடுதல் புத்துணர்ச்சி' மூலப்பொருளை முன்னிலைப்படுத்தவும்", "ఉదా., కొత్త 'అదనపు తాజా' పదార్ధాన్ని హైలైట్ చేయండి", "દા.ત., નવા 'વધારાના તાજા' ઘટકને હાઇલાઇટ કરો"),
      "Offers": addTranslations("e.g., Communicate 'Buy 1 Get 1 Free'", "उदा., '1 खरीदें 1 मुफ्त पाएं' का संचार करें", "எ.கா., '1 வாங்கினால் 1 இலவசம்' என்பதைத் தெரிவிக்கவும்", "ఉదా., '1 కొనండి 1 ఉచితం' అని తెలియజేయండి", "દા.ત., '1 ખરીદો 1 મફત મેળવો' નો સંચાર કરો"),
      "FestivalGrowth": addTranslations("e.g., Position as a Diwali gifting option", "उदा., दिवाली उपहार विकल्प के रूप में स्थिति", "எ.கா., தீபாவளிப் பரிசு விருப்பமாக நிலைநிறுத்தவும்", "ఉదా., దీపావళి బహుమతి ఎంపికగా ఉంచండి", "દા.ત., દિવાળી ભેટ વિકલ્પ તરીકે સ્થાન આપો"),
      "Other": addTranslations("Please specify your other objective...", "कृपया अपना अन्य उद्देश्य निर्दिष्ट करें...", "உங்கள் மற்ற நோக்கத்தைக் குறிப்பிடவும்...", "దయచేసి మీ ఇతర లక్ష్యాన్ని పేర్కొనండి...", "કૃપા કરીને તમારો અન્ય ઉદ્દેશ્ય સ્પષ્ટ કરો..."),
    },
    q7_5: {
      text: addTranslations("Advertising: Is there 1 or 2 main things that you would like to focus on in the ad?", "विज्ञापन: क्या 1 या 2 मुख्य चीजें हैं जिन पर आप विज्ञापन में ध्यान केंद्रित करना चाहेंगे?", "விளம்பரம்: விளம்பரத்தில் நீங்கள் கவனம் செலுத்த விரும்பும் 1 அல்லது 2 முக்கிய விஷயங்கள் உள்ளதா?", "ప్రకటన: ప్రకటనలో మీరు దృష్టి పెట్టాలనుకుంటున్న 1 లేదా 2 ప్రధాన విషయాలు ఉన్నాయా?", "જાહેરાત: શું 1 અથવા 2 મુખ્ય વસ્તુઓ છે જેના પર તમે જાહેરાતમાં ધ્યાન કેન્દ્રિત કરવા માંગો છો?"),
      hint: addTranslations("Select in order of priority", "प्राथमिकता के क्रम में चुनें", "முன்னுரிமை வரிசையில் தேர்ந்தெடுக்கவும்", "ప్రాధాన్యత క్రమంలో ఎంచుకోండి", "પ્રાથમિકતાના ક્રમમાં પસંદ કરો"),
      priority: addTranslations("Priority:", "प्राथमिकता:", "முன்னுரிமை:", "ప్రాధాన్యత:", "પ્રાથમિકતા:"),
      options: {
        "BrandHeritage": addTranslations("Brand heritage", "ब्रांड विरासत", "பிராண்ட் பாரம்பரியம்", "బ్రాండ్ వారసత్వం", "બ્રાન્ડ વારસો"),
        "NameShapeLogoTagline": addTranslations("Name/shape/logo/tagline", "नाम/आकार/लोगो/टैगलाइन", "பெயர்/வடிவம்/லோகோ/கோஷம்", "పేరు/ఆకారం/లోగో/ట్యాగ్‌లైన్", "નામ/આકાર/લોગો/ટેગલાઇન"),
        "ProductBenefit": addTranslations("Product benefit", "उत्पाद लाभ", "தயாரிப்பு நன்மை", "ఉత్పత్తి ప్రయోజనం", "ઉત્પાદન લાભ"),
        "Emotions": addTranslations("Emotions", "भावनाएं", "உணர்வுகள்", "భావోద్వేగాలు", "લાગણીઓ"),
        "UniqueDifferentiator": addTranslations("Unique differentiator", "अद्वितीय विभेदक", "தனித்துவமான வேறுபடுத்தி", "ప్రత్యేకమైన భేదం", "અનન્ય વિભેદક"),
        "Other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_5_details_placeholders: {
      "BrandHeritage": addTranslations("e.g., Showcase our 50-year history...", "उदा., हमारे 50 साल के इतिहास को दिखाएं...", "எ.கா., எங்கள் 50 ஆண்டு கால வரலாற்றைக் காட்சிப்படுத்தவும்...", "ఉదా., మా 50 ఏళ్ల చరిత్రను ప్రదర్శించండి...", "દા.ત., અમારા 50-વર્ષના ઇતિહાસનું પ્રદર્શન કરો..."),
      "NameShapeLogoTagline": addTranslations("e.g., Make our new logo memorable...", "उदा., हमारे नए लोगो को यादगार बनाएं...", "எ.கா., எங்கள் புதிய சின்னத்தை மறக்கமுடியாததாக ஆக்குங்கள்...", "ఉదా., మా కొత్త లోగోను గుర్తుండిపోయేలా చేయండి...", "દા.ત., અમારા નવા લોગોને યાદગાર બનાવો..."),
      "ProductBenefit": addTranslations("e.g., Emphasize 'removes stains in 1 wash'...", "उदा., '1 धुलाई में दाग हटाता है' पर जोर दें...", "எ.கா., '1 சலவையில் கறைகளை நீக்குகிறது' என்பதை வலியுறுத்துங்கள்...", "ఉదా., '1 వాష్‌లో మరకలను తొలగిస్తుంది' అని నొక్కి చెప్పండి...", "દા.ત., '1 ધોવાણમાં ડાઘ દૂર કરે છે' પર ભાર મૂકો..."),
      "Emotions": addTranslations("e.g., Create a feeling of warmth and family...", "उदा., गर्मजोशी और परिवार की भावना पैदा करें...", "எ.கா., அரவணைப்பு மற்றும் குடும்ப உணர்வை உருவாக்குங்கள்...", "ఉదా., వెచ్చదనం మరియు కుటుంబ భావనను సృష్టించండి...", "દા.ત., હૂંફ અને પરિવારની લાગણી બનાવો..."),
      "UniqueDifferentiator": addTranslations("e.g., Highlight our triangular shape and crunch...", "उदा., हमारे त्रिकोणीय आकार और कुरकुरेपन को हाइलाइट करें...", "எ.கா., எங்கள் முக்கோண வடிவம் மற்றும் மொறுமொறுப்பை முன்னிலைப்படுத்தவும்...", "ఉదా., మా త్రిభుజాకార ఆకారం మరియు కరకరలాడటాన్ని హైలైట్ చేయండి...", "દા.ત., અમારા ત્રિકોણાકાર આકાર અને ક્રન્ચને હાઇલાઇટ કરો..."),
      "Other": addTranslations("Please specify what you want to focus on...", "कृपया निर्दिष्ट करें कि आप किस पर ध्यान केंद्रित करना चाहते हैं...", "நீங்கள் எதில் கவனம் செலுத்த விரும்புகிறீர்கள் என்பதைக் குறிப்பிடவும்...", "దయచేసి మీరు దేనిపై దృష్టి పెట్టాలనుకుంటున్నారో పేర్కొనండి...", "કૃપા કરીને સ્પષ્ટ કરો કે તમે શેના પર ધ્યાન કેન્દ્રિત કરવા માંગો છો..."),
    },
  },
};

export const apparelFormTranslations = {
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొనండి...", "કૃપા કરીને સ્પષ્ટ કરો..."),
  audio: { ...formTranslations.audio },
  salespersonSection: { ...formTranslations.salespersonSection },
  section1: {
    title: addTranslations("Product Showcase", "उत्पाद प्रदर्शन", "தயாரிப்பு காட்சி", "ఉత్పత్తి ప్రదర్శన", "ઉત્પાદન ప్రદર્શન"),
    q1_1: {
      text: addTranslations("Tell us something about your brand’s fashion philosophy.", "हमें अपने ब्रांड के फैशन दर्शन के बारे में कुछ बताएं।", "உங்கள் பிராண்டின் ஃபேஷன் தத்துவத்தைப் பற்றி எங்களிடம் கூறுங்கள்.", "మీ బ్రాండ్ యొక్క ఫ్యాషన్ ఫిలాసఫీ గురించి మాకు ఏదైనా చెప్పండి.", "તમારી બ્રાન્ડની ફેશન ફિલોસોફી વિશે અમને કંઈક કહો."),
      hint: addTranslations("Write 2–3 concise lines about your brand’s style, inspiration, and unique aesthetic.", "अपने ब्रांड की शैली, प्रेरणा और अद्वितीय सौंदर्य के बारे में 2-3 संक्षिप्त पंक्तियाँ लिखें।", "உங்கள் பிராண்டின் பாணி, உத்வேகம் மற்றும் தனித்துவமான அழகியல் பற்றி 2-3 சுருக்கமான வரிகளை எழுதுங்கள்.", "మీ బ్రాండ్ శైలి, ప్రేరణ మరియు ప్రత్యేకమైన సౌందర్యం గురించి 2-3 సంక్షిప్త పంక్తులు వ్రాయండి.", "તમારી બ્રાન્ડના શૈલી, પ્રેરણા અને અનન્ય સૌંદર્ય શાસ્ત્ર વિશે 2-3 સંક્ષિપ્ત પંક્તિઓ લખો."),
      placeholder: addTranslations("e.g., We create gender-neutral, sustainable streetwear inspired by urban architecture.", "उदा., हम शहरी वास्तुकला से प्रेरित जेंडर-न्यूट्रल, टिकाऊ स्ट्रीटवियर बनाते हैं।", "எ.கா., நகர்ப்புற கட்டிடக்கலையால் ஈர்க்கப்பட்ட பாலின-நடுநிலை, நிலையான தெரு ஆடைகளை நாங்கள் உருவாக்குகிறோம்.", "ఉదా., మేము పట్టణ వాస్తుశిల్పం నుండి ప్రేరణ పొందిన జెండర్-న్యూట్రల్, స్థిరమైన స్ట్రీట్‌వేర్‌ను రూపొండిస్తాము.", "દા.ત., અમે શહેરી સ્થાપત્યથી પ્રેરિત લિંગ-તટસ્થ, ટકાઉ સ્ટ્રીટવેર બનાવીએ છીએ."),
    },
    q1_2: {
      text: addTranslations("What is the name of your brand?", "आपके ब्रांड का नाम क्या है?", "உங்கள் பிராண்டின் பெயர் என்ன?", "మీ బ్రాండ్ పేరు ఏమిటి?", "તમારી બ્રાન્ડનું નામ શું છે?"),
      placeholder: addTranslations("e.g., Urban Aura", "उदा., अर्बन ऑरा", "எ.கா., அர்பன் ஆரா", "ఉదా., అర్బన్ ఆరా", "દા.ત., અર્બન ઓરા"),
    },
    q1_3: {
      text: addTranslations("Which of your brands/collections do you want to advertise?", "आप अपने किस ब्रांड/कलेक्शन का विज्ञापन करना चाहते हैं?", "உங்கள் பிராண்டுகள்/சேகரிப்புகளில் எதை விளம்பரப்படுத்த விரும்புகிறீர்கள்?", "మీ బ్రాండ్లు/కలెక్షన్లలో దేనిని ప్రచారం చేయాలనుకుంటున్నారు?", "તમે તમારી કઈ બ્રાન્ડ/સંગ્રહની જાહેરાત કરવા માંગો છો?"),
      placeholder: addTranslations("e.g., Summer Spirit Collection", "उदा., समर स्पिरिट कलेक्शन", "எ.கா., சம்மர் ஸ்பிரிட் கலெக்ஷன்", "ఉదా., సమ్మర్ స్పిరిట్ కలెక్షన్", "દા.ત., સમર સ્પિરિટ કલેક્શન"),
    },
    q1_4: {
      text: addTranslations("Product name / category", "उत्पाद का नाम / श्रेणी", "தயாரிப்பு பெயர் / வகை", "ఉత్పత్తి పేరు / వర్గం", "ઉત્પાદનનું નામ / શ્રેણી"),
      placeholder: addTranslations("e.g., Linen Shirts, Denim Jackets, Ethnic Wear", "उदा., लिनेन शर्ट, डेनिम जैकेट, एथनिक वियर", "எ.கா., லினன் சட்டைகள், டெனிம் ஜாக்கெட்டுகள், இன உடை", "ఉదా., లినన్ షర్టులు, డెనిమ్ జాకెట్లు, ఎత్నిక్ వేర్", "દા.ત., લિનન શર્ટ, ડેનિમ જેકેટ, એથનિક વેર"),
    },
    q1_5: {
      text: addTranslations("How is the product sold?", "उत्पाद कैसे बेचा जाता है?", "தயாரிப்பு எப்படி விற்கப்படுகிறது?", "ఉత్పత్తి ఎలా విక్రయించబడుతుంది?", "ઉત્પાદન કેવી રીતે વેચાય છે?"),
    },
    q1_6: {
      text: addTranslations("What is special about your brand?", "आपके ब्रांड में क्या खास है?", "உங்கள் பிராண்டில் என்ன சிறப்பு?", "మీ బ్రాండ్‌లో విశేషం ఏమిటి?", "તમારી બ્રાન્ડમાં શું ખાસ છે?"),
      placeholder: addTranslations("e.g., Handcrafted with love...", "उदा., प्यार से हस्तशिल्प...", "எ.கா., அன்புடன் கையால் வடிவமைக்கப்பட்டது...", "ఉదా., ప్రేమతో చేతితో తయారు చేయబడింది...", "દા.ત., પ્રેમથી હસ્તકલા..."),
    },
    packImages: {
      text: addTranslations("Product / Lookbook Images", "उत्पाद / लुकबुक छवियां", "தயாரிப்பு / லுக்புக் படங்கள்", "ఉత్పత్తి / లు‌కుబుక్ చిత్రాలు", "ઉત્પાદન / લુકબુક છબીઓ"),
      subtext: addTranslations("Upload images showing the product or collection style", "उत्पाद या संग्रह शैली दिखाने वाली छवियां अपलोड करें", "தயாரிப்பு அல்லது சேகரிப்பு பாணியைக் காட்டும் படங்களை பதிவேற்றவும்", "ఉత్పత్తి లేదా సేకరణ శైలిని చూపే చిత్రాలను అప్‌లోడ్ చేయండి", "ઉત્પાદન અથવા સંગ્રહ શૈલી દર્શાવતી છબીઓ અપલોડ કરો"),
    }
  },
  section2: {
    title: addTranslations("Origin and Heritage", "उत्पत्ति और विरासत", "தோற்றம் மற்றும் பாரம்பரியம்", "మూలం మరియు వారసత్వం", "મૂળ અને વારસો"),
    q2_1: {
      text: addTranslations("How old is the brand, and who started it?", "ब्रांड कितना पुराना है और इसे किसने शुरू किया?", "பிராண்ட் எவ்வளவு பழமையானது, அதை யார் தொடங்கினார்கள்?", "బ్రాండ్ ఎంత పాతది, మరియు దానిని ఎవరు ప్రారంభించారు?", "બ્રાન્ડ કેટલી જૂની છે, અને તેની શરૂઆત કોણે કરી?"),
      founder: addTranslations("Founder(s)", "संस्थापक", "நிறுவனர்(கள்)", "వ్యవస్థాపకుడు(లు)", "સ્થાપક(ઓ)"),
      placeholder_founder: addTranslations("Founder’s full name(s)", "संस्थापक का पूरा नाम", "நிறுவனர் முழுப் பெயர்(கள்)", "వ్యవస్థాపకుని పూర్తి పేరు(లు)", "સ્થાપકનું પૂરું નામ(ઓ)"),
      placeholder_year: addTranslations("YYYY", "YYYY", "YYYY", "YYYY", "YYYY"),
      year: addTranslations("Founded Year", "स्थापना वर्ष", "தொடங்கப்பட்ட ஆண்டு", "వ్యవస్థాపక సంవత్సరం", "સ્થાપના વર્ષ"),
      regions: addTranslations("Primary regions where the brand is sold", "ब्रांड मुख्य रूप से किन क्षेत्रों में बेचा जाता है", "பிராண்ட் முதன்மையாக விற்கப்படும் பகுதிகள்", "బ్రాండ్ ప్రధానంగా విక్రయించబడే ప్రాంతాలు", "બ્રાન્ડ મુખ્યત્વે જ્યાં વેચાય છે તે પ્રદેશો"),
      regions_label: addTranslations("Primary regions where the brand is sold:", "ब्रांड मुख्य रूप से किन क्षेत्रों में बेचा जाता है:", "பிராண்ட் முதன்மையாக விற்கப்படும் பகுதிகள்:", "బ్రాండ్ ప్రధానంగా విక్రయించబడే ప్రాంతాలు:", "બ્રાન્ડ મુખ્યત્વે જ્યાં વેચાય છે તે પ્રદેશો:"),
      placeholder_regions: addTranslations("e.g., Major metro cities, Tier-1 towns", "उदा., प्रमुख मेट्रो शहर, टियर-1 शहर", "எ.கா., முக்கிய மெட்ரோ நகரங்கள், அடுக்கு-1 நகரங்கள்", "உதா., ప్రధాన మెట్రో నగరాలు, టైర్-1 పట్టణాలు", "દા.ત., મુખ્ય મેટ્રો શહેરો, ટાયર-1 નગરો"),
    },
    q2_2: {
      text: addTranslations("What are the key attributes of the product?", "उत्पाद की प्रमुख विशेषताएं क्या हैं?", "தயாரிப்பின் முக்கிய பண்புகள் என்ன?", "ఉత్పత్తి యొక్క ప్రధాన లక్షణాలు ఏమిటి?", "ઉત્પાદનના મુખ્ય લક્ષણો શું છે?"),
      options: {
        style: addTranslations("Look / Style / Silhouette", "दिखावट / शैली / सिल्हूट", "தோற்றம் / பாணி / நிழல்", "రూபம் / శైలి / సిల్હౌట్", "દેખાવ / શૈલી / સિલુએટ"),
        fabric: addTranslations("Fabric / Material quality", "कपड़ा / सामग्री की गुणवत्ता", "துணி / பொருள் தரம்", "ఫ్యాబ్రిక్ / మెటీరియల్ నాణ్యత", "ફેબ્રિક / સામગ્રી ગુણવત્તા"),
        fit: addTranslations("Fit / Comfort", "फिट / आराम", "பொருத்தம் / ஆறுதல்", "ఫిట్ / కంఫర్ట్", "ફિટ / આરામ"),
        craftsmanship: addTranslations("Craftsmanship / Detailing", "शिल्प कौशल / विवरण", "கைவினைத்திறன் / விவரம்", "కళానైపుణ్యం / డిటైలింగ్", "કારીગરી / વિગત"),
      }
    },
    q2_3: {
      text: addTranslations("Are there any specific certifications or ethical standards?", "क्या कोई विशिष्ट प्रमाणन या नैतिक मानक हैं?", "ஏதேனும் குறிப்பிட்ட சான்றிதழ்கள் அல்லது நெறிமுறை தரநிலைகள் உள்ளதா?", "ఏవైనా నిర్దిష్ట ధృవీకరణలు లేదా నైతిక ప్రమాణాలు ఉన్నాయా?", "શું કોઈ ચોક્કસ પ્રમાણપત્રો અથવા નૈતિક ધોરણો છે?"),
      placeholder: addTranslations("e.g., GOTS certified organic cotton, Fair Trade, Vegan-friendly", "उदा., GOTS प्रमाणित जैविक कपास, फेयर ट्रेड, वेगन-फ्रेंडली", "எ.கா., GOTS சான்றளிக்கப்பட்ட ஆர்கானிக் பருத்தி, நியாயமான வர்த்தகம், சைவ-நட்பு", "ఉదా., GOTS సర్టిఫైడ్ ఆర్గానిక్ కాటన్, ఫెయిర్ ట్రేడ్, వీగన్-ఫ్రెండ్లీ", "દા.ત., GOTS પ્રમાણિત કાર્બનિક કપાસ, ફેર ટ્રેડ, વેગન-ફ્રેન્ડલી"),
    }
  },
  section3: {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    q3_1: {
      text: addTranslations("Who is the primary audience for these apparels?", "इन कपड़ों के लिए प्राथमिक दर्शक कौन हैं?", "இந்த ஆடைகளுக்கான முதன்மை பார்வையாளர்கள் யார்?", "ఈ దుస్తుల ప్రాథమిక ప్రేక్షకులు ఎవరు?", "આ વસ્ત્રો માટે પ્રાથમિક પ્રેક્ષકો કોણ છે?"),
    },
    ageOptions: {
      "15-25": addTranslations("15–25", "15–25", "15–25", "15–25", "15–25"),
      "26-35": addTranslations("26–35", "26–35", "26–35", "26–35", "26–35"),
      "36-50": addTranslations("36–50", "36–50", "36–50", "36–50", "36–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    genderOptions: {
      "male": addTranslations("Male", "पुरुष", "ஆண்", "పురుషుడు", "પુરુષ"),
      "female": addTranslations("Female", "महिला", "பெண்", "స్త్రీ", "સ્ત્રી"),
      "both": addTranslations("Both", "दोनों", "இருவரும்", "ఇద్దరూ", "બંને"),
    },
    incomeOptions: {
      "lower": addTranslations("Lower", "निम्न", "குறைந்த", "తక్కువ", "નીચું"),
      "middle": addTranslations("Middle", "मध्यम", "நடுத்தர", "మధ్యతరగతి", "મધ્યમ"),
      "upper-middle": addTranslations("Upper-middle", "उच्च-मध्यम", "உயர்-நடுத்தர", "ఎగువ-మధ్యతరగతి", "ઉચ્ચ-મધ્યમ"),
      "high": addTranslations("High", "उच्च", "உயர்", "అధిక", "ઉચ્ચ"),
    },
    geoOptions: {
      "big": addTranslations("Big city", "बड़ा शहर", "பெரிய நகரம்", "పెద్ద నగరం", "મોટું શહેર"),
      "small": addTranslations("Smaller town", "छोटा शहर", "சிறிய நகரம்", "చిన్న పట్టణం", "નાનું શહેર"),
      "rural": addTranslations("Rural", "ग्रामीण", "கிராமப்புற", "గ్రామీణ", "ગ્રામીણ"),
      "all": addTranslations("All", "सभी", "அனைத்தும்", "అన్నీ", "બધા"),
    },
    q3_2: {
      text: addTranslations("What is the core consumer problem or aspiration your brand addresses?", "आपका ब्रांड उपभोक्ता की किस मुख्य समस्या या आकांक्षा का समाधान करता है?", "உங்கள் பிராண்ட் தீர்க்கும் முக்கிய நுகர்வோர் சிக்கல் அல்லது அபிலாசை என்ன?", "మీ బ్రాండ్ పరిష్కరించే ప్రధాన వినియోగదారు సమస్య లేదా ఆకాంక్ష ఏమిటి?", "તમારી બ્રાન્ડ ઉપભોક્તાની કઈ મુખ્ય સમસ્યા અથવા આકાંક્ષાનું નિરાકરણ કરે છે?"),
      placeholder: addTranslations("e.g., Need for office wear that is also breathable for Indian summers.", "उदा., कार्यालय के कपड़ों की आवश्यकता जो भारतीय गर्मियों के लिए सांस लेने योग्य भी हो।", "எ.கா., இந்திய கோடைகாலத்திற்கு ஏற்ற, சுவாசிக்கக்கூடிய அலுவலக உடைகளின் தேவை.", "ఉదా., భారతీయ వేసవి కాలానికి అనుకూలమైన ఆఫీస్ వేర్ అవసరం.", "દા.ત., ભારતીય ઉનાળા માટે શ્વાસ લેવા યોગ્ય ઓફિસ વેરની જરૂરિયાત."),
    },
    psychographicOptionsTitle: addTranslations("What defines their approach to fashion?", "फैशन के प्रति उनके दृष्टिकोण को क्या परिभाषित करता है?", "ஃபேஷன் மீதான அவர்களின் அணுகுமுறையை எது வரையறுக்கிறது?", "ఫ్యాషన్ పట్ల వారి దృక్పథాన్ని ఏది నిర్వచిస్తుంది?", "ફેશન પ્રત્યેના તેમના અભિગમને શું વ્યાખ્યાયિત કરે છે?"),
    psychographicOptions: {
      "traditional": addTranslations("Traditional & Conservative", "पारंपरिक और रूढ़िवादी", "பாரம்பரியம் மற்றும் பழமைவாதம்", "సాంప్రదాయ & సాంప్రదాయిక", "પરંપરાગત અને રૂઢિચુસ્ત"),
      "modern": addTranslations("Modern & Trend-conscious", "आधुनिक और ट्रेंड-सचेत", "நவீன மற்றும் டிரெண்ட்-பிரக்ஞை", "ఆధునిక & ట్రెండ్-కాన్షియస్", "આધુનિક અને ટ્રેન્ડ-સભાન"),
      "aspirational": addTranslations("Aspirational & Status-driven", "आकांक्षी और स्थिति-संचालित", "அபிலாசை மற்றும் அந்தஸ்து சார்ந்த", "ఆకాంక్షాత్మక & హోదా-ఆధారిత", "આકાંક્ષાત્મક અને સ્ટેટસ-સંચાલિત"),
      "comfort": addTranslations("Comfort-first & Practical", "आराम-पहले और व्यावहारिक", "ஆறுதலுக்கு முன்னுரிமை மற்றும் நடைமுறை", "కంఫర్ట్-ఫస్ట్ & ప్రాక్టికల్", "કમ્ફર્ટ-ફર્સ્ટ અને પ્રેક્ટિકલ"),
      "bold": addTranslations("Bold & Expressive", "साहसी और अभिव्यंजक", "தைரியமான மற்றும் வெளிப்படையான", "బోల్డ్ & ఎక్స్‌ప్రెసివ్", "બોલ્ડ અને અભિવ્યક્ત"),
    },
    q3_4: {
      text: addTranslations("Who influences their fashion choices?", "उनके फैशन विकल्पों को कौन प्रभावित करता है?", "அவர்களின் ஃபேஷன் தேர்வுகளை யார் பாதிக்கிறார்கள்?", "వారి ఫ్యాషన్ ఎంపికలను ఎవరు ప్రభావితం చేస్తారు?", "તેમની ફેશન પસંદગીઓને કોણ પ્રભાવિત કરે છે?"),
      placeholder: addTranslations("e.g., Social media influencers, Celebrities, Family traditions, Corporate culture", "उदा., सोशल मीडिया प्रभावशाली व्यक्ति, मशहूर हस्तियां, पारिवारिक परंपराएं, कॉर्पोरेट संस्कृति", "எ.கா., சமூக ஊடக செல்வாக்கு செலுத்துபவர்கள், பிரபலங்கள், குடும்ப மரபுகள், கார்ப்பரேட் கலாச்சாரம்", "ఉదా., సోషల్ మీడియా ఇన్‌ఫ్లుయెన్సర్లు, ప్రముఖులు, కుటుంబ సంప్రదాయాలు, కార్పొరేట్ సంస్కృతి", "દા.ત., સોશિયલ મીડિયા પ્રભાવકો, સેલિબ્રિટીઓ, કૌટુંબિક પરંપરાઓ, કોર્પોરેટ સંસ્કૃતિ"),
    }
  },
  section4: {
    title: addTranslations("Brand Usage", "ब्रांड उपयोग", "பிராண்ட் பயன்பாடு", "బ్రాండ్ వాడకం", "બ્રાન્ડ વપરાશ"),
    q4_1: {
      text: addTranslations("When and where do consumers wear your products?", "उपभोक्ता आपके उत्पादों को कब और कहां पहनते हैं?", "நுகர்வோர் உங்கள் தயாரிப்புகளை எப்போது, எங்கே அணிகிறார்கள்?", "వినియోగదారులు మీ ఉత్పత్తులను ఎప్పుడు మరియు ఎక్కడ ధరిస్తారు?", "ગ્રાહકો તમારા ઉત્પાદનો ક્યારે અને ક્યાં પહેરે છે?"),
      placeholder: addTranslations("e.g., Daily office wear, Grand weddings, Sports & Fitness, Weekend outings", "उदा., दैनिक कार्यालय पहनने के कपड़े, भव्य शादियां, खेल और फिटनेस, सप्ताहांत की सैर", "எ.கா., தினசரி அலுவலக உடைகள், பிரமாண்ட திருமணங்கள், விளையாட்டு மற்றும் உடற்பயிற்சி, வார இறுதி வெளியூர்ப் பயணங்கள்", "ఉదా., డైలీ ఆఫీస్ వేర్, గ్రాండ్ వెడ్డింగ్స్, స్పోర్ట్స్ & ఫిట్‌నెస్, వీకెండ్ ఔటింగ్‌లు", "દા.ત., દૈનિક ઓફિસ વેર, ભવ્ય લગ્ન, રમતગમત અને ફિટનેસ, સપ્તાહના અંતે આઉટિંગ્સ"),
    }
  },
  section5: {
    title: addTranslations("Benefit and Experience", "लाभ और अनुभव", "பயன் மற்றும் அனுபவம்", "ప్రయోజనం & అనుభవం", "લાભ અને અનુભવ"),
    q5_1: {
      text: addTranslations("What are the core benefits of your apparel?", "आपके कपड़ों के मुख्य लाभ क्या हैं?", "உங்கள் ஆடைகளின் முக்கிய நன்மைகள் யாவை?", "మీ దుస్తుల యొక్క ప్రధాన ప్రయోజనాలు ఏమిటి?", "તમારા વસ્ત્રોના મુખ્ય ફાયદા શું છે?"),
      placeholder: addTranslations("e.g., Wrinkle-free, Breathable, High-stretch, Premium feel, Durable color", "उदा., शिकन रहित, सांस लेने योग्य, उच्च खिंचाव, प्रीमियम अहसास, टिकाऊ रंग", "எ.கா., சுருக்கம் இல்லாதது, சுவாசிக்கக்கூடியது, அதிக நீட்டிக்கக்கூடியது, பிரீமியம் உணர்வு, நீடித்த நிறம்", "ఉదా., ముడతలు లేనివి, శ్వాసించదగినవి, అధిక-స్ట్రెచ్, ప్రీమియం అనుభూతి, మన్నికైన రంగు", "દા.ત., કરચલી-મુક્ત, શ્વાસ લઈ શકાય તેવું, ઉચ્ચ-ખેંચાણ, પ્રીમિયમ અનુભૂતિ, ટકાઉ રંગ"),
    },
    q5_2: {
      text: addTranslations("What makes these benefits standout from others?", "ये लाभ दूसरों से अलग क्या बनाते हैं?", "இந்த நன்மைகளை மற்றவர்களிடமிருந்து வேறுபடுத்துவது எது?", "ఈ ప్రయోజనాలలో ఏది మీ పోటీదారుల నుండి భిన్నంగా ఉంటుంది?", "આમાંના કયા લાભો તમારા સ્પર્ધકોથી અલગ છે?"),
      placeholder: addTranslations("e.g., Tailored fit at mass prices, Ethical production, Unique artisan prints", "उदा., बड़े पैमाने पर कीमतों पर अनुरूप फिट, नैतिक उत्पादन, अद्वितीय कारीगर प्रिंट", "எ.கா., வெகுஜன விலையில் தையல் பொருத்தம், நெறிமுறை உற்பத்தி, தனித்துவமான கைவினைஞர் அச்சிட்டுகள்", "ఉదా., మాస్ ధరల్లో టైలర్డ్ ఫిట్, నైతిక ఉత్పత్తి, ప్రత్యేకమైన కళాకారుల ప్రింట్లు", "દા.ત., સામૂહિક ભાવે અનુરૂપ ફિટ, નૈતિક ઉત્પાદન, અનન્ય કારીગરી પ્રિન્ટ્સ"),
    },
    q5_3: {
      text: addTranslations("How does the consumer feel wearing your brand?", "आपके ब्रांड को पहनकर उपभोक्ता को कैसा महसूस होता है?", "உங்கள் பிராண்டை அணிந்திருக்கும் போது நுகர்வோர் எப்படி உணருகிறார்கள்?", "మీ బ్రాండ్‌ను ధరించినప్పుడు వినియోగదారు ఎలా భావిస్తారు?", "તમારી બ્રાન્ડ પહેરીને ગ્રાહકને કેવું લાગે છે?"),
      options: {
        confident: addTranslations("I feel confident", "मैं आत्मविश्वास महसूस करता हूँ", "நான் நம்பிக்கையாக உணர்கிறேன்", "నేను ఆత్మవిశ్వాసంతో ఉన్నాను", "હું આત્મવિશ્વાસ અનુભવું છું"),
        comfortable: addTranslations("I feel extremely comfortable", "मैं बेहद सहज महसूस करता हूँ", "நான் மிகவும் வசதியாக உணர்கிறேன்", "నేను చాలా సౌకర్యవంతంగా భావిస్తున్నాను", "હું અત્યંત આરામદાયક અનુભવું છું"),
        empowered: addTranslations("I feel empowered", "मैं सशक्त महसूस करता हूँ", "நான் அதிகாரம் பெற்றவனாக உணர்கிறேன்", "నేను సాధિકારత పొందినట్లు భావిస్తున్నాను", "હું સશક્ત અનુભવું છું"),
        attractive: addTranslations("I feel attractive and stylish", "मैं आकर्षक और स्टाइलिश महसूस करता हूँ", "நான் கவர்ச்சியாகவும் ஸ்டைலாகவும் உணர்கிறேன்", "నేను ఆకర్షణీయంగా మరియు స్టైలిష్‌గా ఉన్నాను", "હું આકર્ષક અને સ્ટાઇલિશ અનુભવું છું"),
        respected: addTranslations("I feel respected", "मैं सम्मानित महसूस करता हूँ", "நான் மதிக்கப்படுவதாக உணர்கிறேன்", "నేను గౌరవించబడినట్లు భావిస్తున్నాను", "હું સન્માનિત અનુભવું છું"),
      }
    }
  },
  section6: {
    title: addTranslations("Competition", "प्रतिस्पर्धा", "போட்டி", "పోటీ", "સ્પર્ધા"),
    q6_1: {
      text: addTranslations("Who are your main competitor brands?", "आपके मुख्य प्रतियोगी ब्रांड कौन हैं?", "உங்கள் முக்கிய போட்டியாளர் பிராண்டுகள் யார்?", "మీ ప్రధాన పోటీదారులు ఎవరు?", "તમારી મુખ્ય સ્પર્ધક બ્રાન્ડ્સ કોણ છે?"),
      placeholder: addTranslations("List 2–3 brands or stores...", "2-3 ब्रांड या स्टोर की सूची बनाएं...", "2-3 பிராண்டுகள் அல்லது கடைகளைப் பட்டியலிடுங்கள்...", "2-3 బ్రాండ్లు లేదా దుకాణాలను జాబితా చేయండి...", "2-3 બ્રાન્ડ્સ અથવા સ્ટોર્સની સૂચિ બનાવો..."),
    }
  },
  section7: {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కోరదగిన అవగాహన మరియు ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાત ઉદ્દેશ્યો"),
    q7_1: {
      text: addTranslations("Imagery — How should consumers perceive the brand?", "इमेजरी — उपभोक्ताओं को ब्रांड को कैसे समझना चाहिए?", "பிம்பம் - நுகர்வோர் பிராண்டை எப்படி உணர வேண்டும்?", "చిత్రణ - వినియోగదారులు బ్రాండ్‌ను ఎలా గ్రహించాలి?", "ઇમેજરી - ગ્રાહકોએ બ્રાન્ડને કેવી રીતે જોવી જોઈએ?"),
      category_tone: addTranslations("Communication Tone", "संचार का टोन", "தொடர்பு தொனி", "కమ్యూనికేషన్ టోన్", "સંચાર ટોન"),
      options_tone: {
        "Youthful": addTranslations("Youthful", "युवा", "இளமை", "యువతరం", "યુવાન"),
        "Mature": addTranslations("Mature", "परिपक्व", "முதிர்ந்த", "పరిપక్వ", "પરિપક્વ"),
        "Minimal": addTranslations("Minimal", "न्यूनतम", "குறைந்தபட்ச", "మినిమల్", "ન્યૂનતમ"),
        "Bold": addTranslations("Bold", "बोल्ड", "தைரியமான", "బోల్డ్", "બોલ્ડ"),
      },
      category_world: addTranslations("Brand World", "ब्रांड की दुनिया", "பிராண்ட் உலகம்", "బ్రాండ్ ప్రపంచం", "બ્રાండ్ વર્લ્ડ"),
      options_world: {
        "Premium": addTranslations("Premium", "प्रीमियम", "பிரீமியம்", "ప్రీమియం", "પ્રીમિયમ"),
        "AffordablePremium": addTranslations("Affordable Premium", "वहनीय प्रीमियम", "மக்களுக்கு எட்டக்கூடிய பிரீமியம்", "సరసమైన ప్రీమియం", "પોસાય તેવા પ્રીમિયમ"),
        "Mass": addTranslations("Mass Market", "बड़े पैमाने पर बाजार", "வெகுஜன சந்தை", "வெகுஜன சந்தை", "માસ માર્કેટ"),
        "International": addTranslations("International", "अंतर्राष्ट्रीय", "சர்வதேச", "అంతర్జాతీయ", "આંતરરાષ્ટ్రీય"),
      }
    },
    q7_2: {
      text: addTranslations("Brand Personality: If your brand was a person, who would they be?", "ब्रांड व्यक्तित्व: यदि आपका ब्रांड एक व्यक्ति होता, तो वे कौन होते?", "பிராண்ட் ஆளுமை: உங்கள் பிராண்ட் ஒரு நபராக இருந்தால், அவர்கள் யாராக இருப்பார்கள்?", "బ్రాండ్ వ్యక్తిత్వం: మీ బ్రాండ్ ఒక వ్యక్తి అయితే, వారు ఎలా ఉంటారు?", "બ્રાન્ડ વ્યક્તિત્વ: જો તમારી બ્રાન્ડ એક વ્યક્તિ હોત, તો તેઓ કોણ હોત?"),
      options: {
        "trendsetter": addTranslations("Trendsetter", "ट्रेंडसेटर", "டிரெண்ட்செட்டர்", "ట్రెండ్‌సెట్టర్", "ટ્રેન્ડસેટર"),
        "classic": addTranslations("The Classicist", "क्लासिकिस्ट", "பாரம்பரியமானவர்", "క్లాసిసిస్ట్", "ક્લાસિકિસ્ટ"),
        "rebel": addTranslations("The Rebel", "विद्रोही", "கிளர்ச்சியாளர்", "రెబెల్", "બળવાખોર"),
        "caretaker": addTranslations("The Caretaker (Comfort focus)", "देखभाल करने वाला (आराम पर ध्यान)", "கவனிப்பவர் (ஆறுதலில் கவனம்)", "కేర్ టేకర్ (కంఫర్ట్ ఫోకస్)", "કેરટેકર (આરામ પર ધ્યાન)"),
        "minimalist": addTranslations("The Minimalist", "मिनिमलिस्ट", "குறைந்தபட்சவாதி", "మినిమలిస్ట్", "મિનિમલિસ્ટ"),
      }
    },
    q7_3: {
      text: addTranslations("What is the primary objective of this ad?", "इस विज्ञापन का प्राथमिक उद्देश्य क्या है?", "இந்த விளம்பரத்தின் முதன்மை நோக்கம் என்ன?", "ఈ ప్రకటన యొక్క ప్రాథమిక లక్ష్యం ఏమిటి?", "ఆ జాહેરાతనో ప్రాథమిక ఉద్దేశ్యమేమిటి?"),
      options: {
        "awareness": addTranslations("Build Awareness (make my brand top of mind)", "जागरूकता बनाएँ (मेरे ब्रांड को शीर्ष पर रखें)", "விழிப்புணர்வை உருவாக்கு (என் பிராண்டை மனதில் முதன்மையாக வை)", "అవగాహన కల్పించండి (నా బ్రాండ్‌ను అగ్రస్థానంలో ఉంచండి)", "જાગૃતિ બનાવો (મારી બ્રાન્ડને ટોચ પર રાખો)"),
        "consideration": addTranslations("Drive Brand Choice (show why my brand is the right choice)", "ब्रांड पसंद को बढ़ावा दें (दिखाएं कि मेरा ब्रांड सही विकल्प क्यों है)", "பிராண்ட் விருப்பத்தை ஊக்குவி (என் பிராண்ட் ஏன் சரியான தேர்வு என்பதைக் காட்டு)", "బ్రాండ్ ఎంపికను పెంచండి (నా బ్రాండ్ ఎందుకు సరైన ఎంపికో చూపండి)", "બ્રાન્ડ પસંદગીને પ્રોત્સાહન આપો (બતાવો કે મારી બ્રાન્ડ શા માટે સાચી પસંદગી છે)"),
        "emotions": addTranslations("Build Image/Emotions (connect with the user on an emotional level)", "छवि/भावनाएं बनाएँ (उपयोगकर्ता के साथ भावनात्मक स्तर पर जुड़ें)", "பிம்பம்/உணர்வுகளை உருவாக்கு (பயனருடன் உணர்ச்சி மட்டத்தில் இணை)", "చిత్రం/భావోద్వేగాలను నిర్మించండి (వినియోగదారుతో భావోద్వేగ స్థాయిలో కనెక్ట్ అవ్వండి)", "છબી/લાગણીઓ બનાવો (વપરાશકર્તા સાથે ભાવનાત્મક સ્તરે જોડાઓ)"),
        "newLaunch": addTranslations("New Launch (introduce a new product/variant)", "नया लॉन्च (एक नया उत्पाद/संस्करण पेश करें)", "புதிய வெளியீடு (ஒரு புதிய தயாரிப்பு/வகையை அறிமுகப்படுத்து)", "కొత్త ప్రయోగం (కొత్త ఉత్పత్తి/వేరియెంట్‌ను పరిచయం చేయండి)", "નવી લોન્ચ (નવું ઉત્પાદન/વેરિઅન્ટ રજૂ કરો)"),
        "other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_3_details_placeholders: {
      "awareness": addTranslations("e.g., Target new audiences", "उदा., नए दर्शकों को लक्षित करें", "எ.கா., புதிய பார்வையாளர்களை இலக்கு வைக்கவும்", "ఉదా., కొత్త ప్రేక్షకులను లక్ష్యం చేసుకోండి", "દા.ત., નવા પ્રેક્ષકોને લક્ષ્ય બનાવો"),
      "consideration": addTranslations("e.g., Highlight our perfect fit", "उदा., हमारे सही फिट को हाइलाइट करें", "எ.கா., எங்கள் சரியான பொருத்தத்தை முன்னிலைப்படுத்தவும்", "ఉదా., మా పర్ఫెక్ట్ ఫిట్‌ను హైలైట్ చేయండి", "દા.ત., અમારો પરફેક્ટ ફિટ હાઇલાઇટ કરો"),
      "emotions": addTranslations("e.g., Connect through special moments", "उदा., विशेष क्षणों के माध्यम से जुड़ें", "எ.கா., சிறப்புத் தருணங்கள் மூலம் இணையுங்கள்", "ఉదా., ప్రత్యేక క్షణాల ద్వారా కనెక్ట్ అవ్వండి", "દા.ત., વિશેષ ક્ષણો દ્વારા જોડાઓ"),
      "newLaunch": addTranslations("e.g., Introduce our eco-friendly line", "उदा., हमारी पर्यावरण-अनुकूल लाइन पेश करें", "எ.கா., எங்கள் சூழல் நட்பு தயாரிப்புகளை அறிமுகப்படுத்துங்கள்", "ఉదా., మా పర్యావరణ అనుకూల ఉత్పత్తులను పరిచయం చేయండి", "દા.ત., અમારી ઇકો-ફ્રેન્ડલી લાઇન રજૂ કરો"),
      "other": addTranslations("Please specify your objective...", "कृपया अपना उद्देश्य निर्दिष्ट करें...", "உங்கள் நோக்கத்தைக் குறிப்பிடவும்...", "దయచేసి మీ లక్ష్యాన్ని పేర్కొనండి...", "કૃપા કરીને તમારો ઉદ્દેશ્ય સ્પષ્ટ કરો..."),
    },
    q7_4: {
      text: addTranslations("What should be the main spotlight of the ad?", "विज्ञापन का मुख्य ध्यान क्या होना चाहिए?", "விளம்பரத்தின் முக்கிய அம்சம் எதுவாக இருக்க வேண்டும்?", "ప్రకటన యొక్క ప్రధాన స్పాట్‌లైట్ ఏది ఉండాలి?", "જાહેરાતમાં મુખ્ય આકર્ષણ શું હોવું જોઈએ?"),
      options: {
        "fit": addTranslations("Perfect Fit", "सही फिट", "சரியான பொருத்தம்", "పర్ఫెక్ట్ ఫిట్", "પરફેક્ટ ફિટ"),
        "fabric": addTranslations("Fabric Quality", "कपड़े की गुणवत्ता", "துணி தரம்", "ఫ్యాబ్రిక్ నాణ్యత", "ફેબ્રિક ગુણવત્તા"),
        "style": addTranslations("Style / Design", "शैली / डिजाइन", "பாணி / வடிவமைப்பு", "శైలి / డిజైన్", "શૈલી / ડિઝાઇન"),
        "versatility": addTranslations("Versatility", "बहुमुखी प्रतिभा", "பன்முகத்தன்மை", "వర్సటైలిటీ", "వૈવિધ్యతా"),
        "identity": addTranslations("Brand Identity", "ब्रांड पहचान", "பிராண்ட் पहचान அடையாளம்", "బ్రాండ్ గుర్తింపు", "બ્રાండ్ ઓળખ"),
      }
    }
  }
};

export const industrialFormTranslations = {
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొనండి...", "કૃપા કરીને સ્પષ્ટ કરો..."),
  audio: { ...formTranslations.audio }, // Reuse FMCG audio translations
  salespersonSection: { ...formTranslations.salespersonSection },
  section1: {
    title: addTranslations("Product Showcase", "उत्पाद प्रदर्शन", "தயாரிப்பு காட்சி", "ఉత్పత్తి ప్రదర్శన", "ઉત્પાદન પ્રદર્શન"),
    q1_1: {
      text: addTranslations("Tell us something about your brand and your company.", "हमें अपने ब्रांड और अपनी कंपनी के बारे में कुछ बताएं।", "உங்கள் பிராண்ட் மற்றும் உங்கள் நிறுவனத்தைப் பற்றி எங்களிடம் கூறுங்கள்.", "మీ బ్రాండ్ మరియు మీ కంపెనీ గురించి మాకు ఏదో చెప్పండి.", "તમારી બ્રાન્ડ અને તમારી કંપની વિશે અમને કંઈક કહો."),
      hint: addTranslations("Write 2–3 concise lines about your brand’s core values, strengths, and differentiation.", "अपने ब्रांड के मूल मूल्यों, शक्तियों और भिन्नता के बारे में 2-3 संक्षिप्त पंक्तियाँ लिखें।", "உங்கள் பிராண்டின் முக்கிய மதிப்புகள், பலம் மற்றும் வேறுபாடு பற்றி 2-3 சுருக்கமான வரிகளை எழுதுங்கள்.", "మీ బ్రాండ్ యొక్క ప్రధాన విలువలు, బలాలు మరియు భేదం గురించి 2-3 సంక్షిప్త పంక్తులు వ్రాయండి.", "તમારી બ્રાન્ડના મુખ્ય મૂલ્યો, શક્તિઓ અને ભિન્નતા વિશે 2-3 સંક્ષિપ્ત પంક્તિઓ લખો."),
      placeholder: addTranslations("e.g., We provide the most durable UPVC doors with a 20-year warranty and a certified installer network.", "उदा., हम 20 साल की वारंटी और एक प्रमाणित इंस्टॉलर नेटवर्क के साथ सबसे टिकाऊ UPVC दरवाजे प्रदान करते हैं।", "எ.கா., நாங்கள் 20 வருட உத்தரவாதத்துடன் மற்றும் சான்றளிக்கப்பட்ட நிறுவி நெட்வொர்க்குடன் மிகவும் நீடித்த UPVC கதவுகளை வழங்குகிறோம்.", "ఉదా., మేము 20 సంవత్సరాల వారంటీ మరియు ధృవీకరించబడిన ఇన్‌స్టాలర్ నెట్‌వర్క్‌తో అత్యంత మన్నికైన UPVC తలుపులను అందిస్తాము.", "દા.ત., અમે 20-વર્ષની વોરંટી અને પ્રમાણિત ઇન્સ્ટોલર નેટવર્ક સાથે સૌથી ટકાઉ UPVC દરવાજા પ્રદાન કરીએ છીએ."),
    },

    q1_3: {
      text: addTranslations("Which of your brands/products do you want to advertise?", "आप अपने किस ब्रांड/उत्पाद का विज्ञापन करना चाहते हैं?", "உங்கள் பிராண்டுகள்/தயாரிப்புகளில் எதை விளம்பரப்படுத்த விரும்புகிறீர்கள்?", "మీ బ్రాండ్లు/ఉత్పత్తులలో దేనిని ప్రచారం చేయాలనుకుంటున్నారు?", "તમે તમારી કઈ બ્રાન્ડ/ઉત્પાદનોની જાહેરાત કરવા માંગો છો?"),
      placeholder: addTranslations("e.g., Prakom UPVC Doors", "उदा., प्राकॉम UPVC दरवाजे", "எ.கா., பிரகோம் UPVC கதவுகள்", "ఉదా., ప్రాకోమ్ UPVC డోర్స్", "દા.ત., પ્રાકોમ યુપીવીસી ડોર્સ"),
    },
    q1_4: {
      text: addTranslations("Product name / category", "उत्पाद का नाम / श्रेणी", "தயாரிப்பு பெயர் / வகை", "ఉత్పత్తి పేరు / వర్గం", "ઉત્પાદનનું નામ / શ્રેણી"),
      placeholder: addTranslations("e.g., UPVC Windows, TMT Bars, Wall Paint, Tiles", "उदा., UPVC विंडोज, TMT बार, वॉल पेंट, टाइल्स", "எ.கா., UPVC விண்டோஸ், TMT பார்கள், வால் பெயிண்ட், டைல்ஸ்", "ఉదా., UPVC విండోస్, TMT బార్స్, వాల్ పెయింట్, టైల్స్", "દા.ત., યુપીવીસી વિન્ડોઝ, ટીએમટી બાર્સ, વોલ પેઇન્ટ, ટાઇલ્સ"),
      packImages: {
        title: addTranslations("Product / Pack Images", "उत्पाद / पैक छवियाँ", "தயாரிப்பு / பேக் படங்கள்", "ఉత్పత్తి / ప్యాక్ చిత్రాలు", "ઉત્પાદન / પેક છબીઓ"),
      }
    }
  },
  section2: {
    title: addTranslations("Origin and Heritage", "उत्पत्ति और विरासत", "தோற்றம் மற்றும் பாரம்பரியம்", "మూలం మరియు వారసత్వం", "મૂળ અને વારસો"),
    q2_1: {
      text: addTranslations("How old is the brand, and who started it?", "ब्रांड कितना पुराना है और इसे किसने शुरू किया?", "பிராண்ட் எவ்வளவு பழமையானது, அதை யார் தொடங்கினார்கள்?", "బ్రాండ్ ఎంత పాతది, మరియు దానిని ఎవరు ప్రారంభించారు?", "બ્રાન્ડ કેટલી જૂની છે, અને તેની શરૂઆત કોણે કરી?"),
      placeholder_founder: addTranslations("Founder’s full name(s)", "संस्थापक का पूरा नाम", "நிறுவனர் முழுப் பெயர்(கள்)", "వ్యవస్థాపకుని పూర్తి పేరు(లు)", "સ્થાપકનું પૂરું નામ(ઓ)"),
      placeholder_year: addTranslations("YYYY", "YYYY", "YYYY", "YYYY", "YYYY"),
      regions_label: addTranslations("Primary regions where the brand is sold / installed:", "ब्रांड मुख्य रूप से किन क्षेत्रों में बेचा/स्थापित किया जाता है:", "பிராண்ட் முதன்மையாக விற்கப்படும் / நிறுவப்பட்ட பகுதிகள்:", "బ్రాండ్ ప్రధానంగా విక్రయించబడే / వ్యవస్థాపించబడిన ప్రాంతాలు:", "બ્રાન્ડ મુખ્યત્વે જ્યાં વેચાય છે / ઇન્સ્ટોલ થાય છે તે પ્રદેશો:"),
      placeholder_regions: addTranslations("e.g., South India, Metro cities, Tier-2 towns", "उदा., दक्षिण भारत, मेट्रो शहर, टियर-2 शहर", "எ.கா., தென்னிந்தியா, மெட்ரோ நகரங்கள், அடுக்கு-2 நகரங்கள்", "ఉదా., దక్షిణ భారతదేశం, మెట్రో నగరాలు, టైర్-2 పట్టణాలు", "દા.ત., દક્ષિણ ભારત, મેટ્રો શહેરો, ટાયર-2 નગરો"),
    },
    q2_2: {
      text: addTranslations("What are some special aspects of your product?", "आपके उत्पाद के कुछ विशेष पहलू क्या हैं?", "உங்கள் தயாரிப்பின் சில சிறப்பு அம்சங்கள் யாவை?", "మీ ఉత్పత్తి యొక్క కొన్ని ప్రత్యేక అంశాలు ఏమిటి?", "તમારા ઉત્પાદનના કેટલાક વિશેષ પાસાઓ શું છે?"),
      placeholder: addTranslations("Describe in 1-2 keywords", "1-2 कीवर्ड में वर्णन करें", "1-2 முக்கிய வார்த்தைகளில் விவரிக்கவும்", "1-2 కీలకపదాలలో వివరించండి", "1-2 કીવર્ડ્સમાં વર્ણન કરો"),
      options: {
        look: addTranslations("Look / Design / Finish", "दिखावट / डिजाइन / फिनिश", "தோற்றம் / வடிவமைப்பு / பூச்சு", "రూపం / డిజైన్ / ఫినిష్", "દેખાવ / ડિઝાઇન / ફિનિશ"),
        // feel: removed
        materials: addTranslations("Unique raw materials used", "प्रयुक्त अद्वितीय कच्चा माल", "பயன்படுத்தப்படும் தனித்துவமான மூலப்பொருட்கள்", "ఉపయోగించిన ప్రత్యేకమైన ముడి పదార్థాలు", "વપરાયેલ અનન્ય કાચો માલ"),
        tech: addTranslations("Technology / Machinery / Equipment / Manufacturing Process / Techniques", "प्रौद्योगिकी / मशीनरी / उपकरण / विनिर्माण प्रक्रिया / तकनीकें", "தொழில்நுட்பம் / இயந்திரங்கள் / உபகரணங்கள் / உற்பத்தி செயல்முறை / நுட்பங்கள்", "సాంకేతికత / యంత్రాలు / పరికరాలు / తయారీ ప్రక్రియ / పద్ధతులు", "ટેકનોલોજી / મશીનરી / સાધનો / ઉત્પાદન પ્રક્રિયા / તકનીકો"),
        skill: addTranslations("Talent or expertise of your team", "आपकी टीम की प्रतिभा या विशेषज्ञता", "உங்கள் குழுவின் திறமை அல்லது நிபுணத்துவம்", "మీ బృందం యొక్క ప్రతిభ లేదా నైపుణ్యం", "તમારી ટીમની પ્રતિભા અથવા કુશળતા"),
      }
    },
    q2_3: {
      text: addTranslations("Other than ISO, which certifications or validations would matter to your customers?", "ISO के अलावा, आपके ग्राहकों के लिए कौन से प्रमाणन या सत्यापन मायने रखेंगे?", "ISO தவிர, உங்கள் வாடிக்கையாளர்களுக்கு எந்தச் சான்றிதழ்கள் அல்லது சரிபார்ப்புகள் முக்கியமானவை?", "ISO కాకుండా, ఏ ధృవీకరణలు లేదా ధ్రువీకరణలు మీ కస్టమర్‌లకు ముఖ్యమైనవి?", "ISO સિવાય, કયા પ્રમાણપત્રો અથવા માન્યતાઓ તમારા ગ્રાહકો માટે મહત્વપૂર્ણ છે?"),
      placeholder: addTranslations("e.g., BIS, IGBC, Lead-free, Certified installer network, Patent", "उदा., BIS, IGBC, सीसा-मुक्त, प्रमाणित इंस्टॉलर नेटवर्क, पेटेंट", "எ.கா., BIS, IGBC, ஈயம் இல்லாத, சான்றளிக்கப்பட்ட நிறுவி நெட்வொர்க், காப்புரிமை", "ఉదా., BIS, IGBC, సీసం-రహిత, ధృవీకరించబడిన ఇన్‌స్టాలర్ నెట్‌వర్క్, పేటెంట్", "દા.ત., BIS, IGBC, લીડ-ફ્રી, સર્ટિફાઇડ ઇન્સ્ટોલર નેટવર્ક, પેટન્ટ"),
    }
  },
  section3: {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    q3a1: {
      text: addTranslations("Primary Consumer (end-user who uses the product)", "प्राथमिक उपभोक्ता (उत्पाद का उपयोग करने वाला अंतिम-उपयोगकर्ता)", "முதன்மை நுகர்வோர் (தயாரிப்பைப் பயன்படுத்தும் இறுதிப் பயனர்)", "ప్రాథమిక వినియోగదారు (ఉత్పత్తిని ఉపయోగించే తుది వినియోగదారు)", "પ્રાથમિક ઉપભોક્તા (ઉત્પાદનનો ઉપયોગ કરનાર અંતિમ-વપરાશકર્તા)"),
    },
    ageOptionsTitle: addTranslations("Age group:", "आयु समूह:", "வயதுக் குழு:", "వయస్సు వర్గం:", "વય જૂથ:"),
    ageOptions: { "15-25": addTranslations("15–25", "15–25", "15–25", "15–25", "15–25"), "26-35": addTranslations("26–35", "26–35", "26–35", "26–35", "26–35"), "36-50": addTranslations("36–50", "36–50", "36–50", "36–50", "36–50"), "50+": addTranslations("50+", "50+", "50+", "50+", "50+"), },
    genderOptionsTitle: addTranslations("Gender:", "लिंग:", "பாலினம்:", "లింగం:", "લિંગ:"),
    genderOptions: { "male": addTranslations("Male", "पुरुष", "ஆண்", "పురుషుడు", "પુરુષ"), "female": addTranslations("Female", "महिला", "பெண்", "స్త్రీ", "સ્ત્રી"), "both": addTranslations("Both", "दोनों", "இருவரும்", "ఇద్దరూ", "બંને"), },
    incomeOptionsTitle: addTranslations("Income:", "आय:", "வருமானம்:", "ఆదాయం:", "આવક:"),
    incomeOptions: { "lower": addTranslations("Lower", "निम्न", "குறைந்த", "తక్కువ", "નીચું"), "middle": addTranslations("Middle", "मध्यम", "நடுத்தர", "మధ్యతరగతి", "મધ્યમ"), "upper-middle": addTranslations("Upper-middle", "उच्च-मध्यम", "உயர்-நடுத்தர", "ఎగువ-మధ్యతరగతి", "ઉચ્ચ-મધ્યમ"), "high": addTranslations("High", "उच्च", "உயர்", "అధిక", "ઉચ્ચ"), },
    geoOptionsTitle: addTranslations("City / Location:", "शहर / स्थान:", "நகரம் / இடம்:", "నగరం / ప్రదేశం:", "શહેર / સ્થાન:"),
    geoOptions: { "big": addTranslations("Big city", "बड़ा शहर", "பெரிய நகரம்", "పెద్ద నగరం", "મોટું શહેર"), "small": addTranslations("Smaller town", "छोटा शहर", "சிறிய நகரம்", "చిన్న పట్టణం", "નાનું શહેર"), "rural": addTranslations("Rural", "ग्रामीण", "கிராமப்புற", "గ్రామీణ", "ગ્રામીણ"), "all": addTranslations("All", "सभी", "அனைத்தும்", "అన్నీ", "બધા"), },
    psychographicOptionsTitle: addTranslations("What does their typical lifestyle and beliefs look like? (select up to 2 options)", "उनकी सामान्य जीवनशैली और विश्वास कैसे दिखते हैं? (अधिकतम 2 विकल्प चुनें)", "அவர்களின் பொதுவான வாழ்க்கை முறை மற்றும் நம்பிக்கைகள் எப்படி இருக்கும்? (அதிகபட்சம் 2 விருப்பங்களைத் தேர்ந்தெடுக்கவும்)", "వారి సాధారణ జీవనశైలి మరియు నమ్మకాలు ఎలా ఉంటాయి? (గరిష్టంగా 2 ఎంపికలను ఎంచుకోండి)", "તેમની સામાન્ય જીવનશૈલી અને માન્યતાઓ કેવી દેખાય છે? (2 વિકલ્પો સુધી પસંદ કરો)"),
    psychographicOptions: {
      "trad_man": addTranslations("Traditional family (man as key decision maker)", "पारंपरिक परिवार (पुरुष मुख्य निर्णयकर्ता)", "பாரம்பரிய குடும்பம் (ஆண் முக்கிய முடிவெடுப்பவர்)", "సాంప్రదాయ కుటుంబం (పురుషుడు కీలక నిర్ణయాధికారి)", "પરંપરાગત કુટુંબ (પુરુષ મુખ્ય નિર્ણયકર્તા)"),
      "trad_equal": addTranslations("Traditional family (all equal say)", "पारंपरिक परिवार (सभी की समान राय)", "பாரம்பரிய குடும்பம் (அனைவருக்கும் சம உரிமை)", "సాంప్రదాయ కుటుంబం (అందరికీ సమాన వాటా)", "પરંપરાગત કુટુંબ (બધાને સમાન અધિકાર)"),
      "mod_man": addTranslations("Modern family (man as key decision maker)", "आधुनिक परिवार (पुरुष मुख्य निर्णयकर्ता)", "நவீன குடும்பம் (ஆண் முக்கிய முடிவெடுப்பவர்)", "ఆధునిక కుటుంబం (పురుషుడు కీలక నిర్ణయాధికారి)", "આધુનિક કુટુંબ (પુરુષ મુખ્ય નિર્ણયકર્તા)"),
      "mod_equal": addTranslations("Modern family (all equal say)", "आधुनिक परिवार (सभी की समान राय)", "நவீன குடும்பம் (அனைவருக்கும் சம உரிமை)", "ఆధునిక కుటుంబం (అందరికీ సమాన వాటా)", "આધુનિક કુટુંબ (બધાને સમાન અધિકાર)"),
    },
    q3a2: {
      text: addTranslations("What is the core consumer problem your brand solves?", "आपका ब्रांड उपभोक्ता की किस मुख्य समस्या का समाधान करता है?", "உங்கள் பிராண்ட் தீர்க்கும் முக்கிய நுகர்வோர் சிக்கல் என்ன?", "మీ బ్రాండ్ ఏ ప్రధాన వినియోగదారు సమస్యను పరిష్కరిస్తుంది?", "તમારી બ્રાન્ડ ઉપભોક્તાની કઈ મુખ્ય સમસ્યાનું નિરાકરણ કરે છે?"),
      hint: addTranslations("Describe the key issue or need your brand addresses — e.g., durability, reliability, aesthetics, speed of delivery, after-sales service, installation ease, etc.", "अपने ब्रांड द्वारा संबोधित मुख्य मुद्दे या आवश्यकता का वर्णन करें - जैसे, स्थायित्व, विश्वसनीयता, सौंदर्यशास्त्र, वितरण की गति, बिक्री के बाद की सेवा, स्थापना में आसानी, आदि।", "உங்கள் பிராண்ட் நிவர்த்தி செய்யும் முக்கிய சிக்கல் அல்லது தேவையை விவரிக்கவும் — எ.கா., நீடித்துழைப்பு, நம்பகத்தன்மை, அழகியல், விநியோக வேகம், விற்பனைக்குப் பிந்தைய சேவை, நிறுவல் எளிமை போன்றவை.", "మీ బ్రాండ్ పరిష్కరించే కీలక సమస్య లేదా అవసరాన్ని వివరించండి — ఉదా., మన్నిక, విశ్వసనీయత, సౌందర్యం, డెలివరీ వేగం, అమ్మకాల తర్వాత సేవ, ఇన్‌స్టాలేషన్ సౌలభ్యం మొదలైనవి.", "તમારી બ્રાન્ડ દ્વારા સંબોધિત મુખ્ય મુદ્દો અથવા જરૂરિયાતનું વર્ણન કરો — દા.ત., ટકાઉપણું, વિશ્વસનીયતા, સૌંદર્ય શાસ્ત્ર, ડિલિવરીની ગતિ, વેચાણ પછીની સેવા, ઇન્સ્ટોલેશનની સરળતા, વગેરે."),
      placeholder: addTranslations("e.g., provides waterproof doors for coastal homes", "उदा., तटीय घरों के लिए वाटरप्रूफ दरवाजे प्रदान करता है", "எ.கா., கடலோர வீடுகளுக்கு நீர்ப்புகா கதவுகளை வழங்குகிறது", "ఉదా., తీరప్రాంత గృహాలకు జలనిరోధిత తలుపులను అందిస్తుంది", "દા.ત., દરિયાકાંઠાના ઘરો માટે વોટરપ્રૂફ દરવાજા પૂરા પાડે છે"),
    },
    q3b1: {
      text: addTranslations("Primary Customer / Influencer (person who buys or influences purchase)", "प्राथमिक ग्राहक / प्रभावक (व्यक्ति जो खरीदता है या खरीद को प्रभावित करता है)", "முதன்மை வாடிக்கையாளர் / செல்வாக்கு செலுத்துபவர் (வாங்கும் அல்லது வாங்குதலில் செல்வாக்கு செலுத்தும் நபர்)", "ప్రాథమిక కస్టమర్ / ఇన్‌ఫ్లుయెన్సర్ (కొనుగోలు చేసే లేదా కొనుగోలును ప్రభావితం చేసే వ్యక్తి)", "પ્રાથમિક ગ્રાહક / પ્રભાવક (જે વ્યક્તિ ખરીદે છે અથવા ખરીદીને પ્રભાવિત કરે છે)"),
      placeholder: addTranslations("Describe who this person is (plumber, painter, architect, etc.)", "वर्णन करें कि यह व्यक्ति कौन है (प्लंबर, पेंटर, वास्तुकार, आदि)", "இந்த நபர் யார் என்பதை விவரிக்கவும் (பிளம்பர், பெயிண்டர், கட்டிடக் கலைஞர், முதலியன)", "ఈ వ్యక్తి ఎవరో వివరించండి (ప్లంబర్, పెయింటర్, ఆర్కిటెక్ట్, మొదలైనవి)", "આ વ્યક્તિ કોણ છે તેનું વર્ણન કરો (પ્લમ્બર, પેઇન્ટર, આર્કિટેક્ટ, વગેરે)"),
      follow_up: addTranslations("Is this person a freelancer or a large enterprise / corporate?", "क्या यह व्यक्ति एक फ्रीलांसर है या एक बड़ा उद्यम / कॉर्पोरेट?", "இந்த நபர் ஒரு பகுதி நேர பணியாளரா அல்லது ஒரு பெரிய நிறுவனமா / கார்ப்பரேட்டா?", "ఈ వ్యక్తి ఫ్రీలాన్సర్ లేదా పెద్ద సంస్థ / కార్పొరేట్?", "શું આ વ્યક્તિ ફ્રીલાન્સર છે અથવા મોટું ઉદ્યોગ / કોર્પોરેટ છે?"),
    },
    influencerTypeOptions: {
      freelancer: addTranslations("Freelancer", "फ्रीलांसर", "ஃப்ரீலான்ஸர்", "ఫ్రీలాన్సర్", "ફ્રીલાન્સર"),
      enterprise: addTranslations("Large Enterprise / Corporate", "बड़ा उद्यम / कॉर्पोरेट", "பெரிய நிறுவனம் / கார்ப்பரேட்", "పెద్ద సంస్థ / కార్పొరేట్", "મોટું ઉદ્યોગ / કોર્પોરેટ"),
    },
  },
  section4: {
    title: addTranslations("Brand Usage", "ब्रांड उपयोग", "பிராண்ட் பயன்பாடு", "బ్రాండ్ వాడకం", "બ્રાન્ડ વપરાશ"),
    q4_1: {
      text: addTranslations("When and how do consumers use or install your product?", "उपभोक्ता आपके उत्पाद का उपयोग या स्थापना कब और कैसे करते हैं?", "நுகர்வோர் உங்கள் தயாரிப்பை எப்போது, எப்படிப் பயன்படுத்துகிறார்கள் அல்லது நிறுவுகிறார்கள்?", "వినియోగదారులు మీ ఉత్పత్తిని ఎప్పుడు మరియు ఎలా ఉపయోగిస్తారు లేదా ఇన్‌స్టాల్ చేస్తారు?", "ગ્રાહકો તમારા ઉત્પાદનનો ઉપયોગ અથવા ઇન્સ્ટોલ ક્યારે અને કેવી રીતે કરે છે?"),
      hint: addTranslations("Describe the typical usage occasion — e.g., home construction, renovation, industrial project, regular maintenance, festival repainting, etc.", "विशिष्ट उपयोग अवसर का वर्णन करें - जैसे, घर निर्माण, नवीनीकरण, औद्योगिक परियोजना, नियमित रखरखाव, त्योहार पर पुनर्पेंटिंग, आदि।", "வழக்கமான பயன்பாட்டு சந்தர்ப்பத்தை விவரிக்கவும் — எ.கா., வீட்டுக் கட்டுமானம், புதுப்பித்தல், தொழில்துறைத் திட்டம், வழக்கமான பராமரிப்பு, பண்டிகைக் காலப் புனரமைப்பு போன்றவை.", "సాధారణ వినియోగ సందర్భాన్ని వివరించండి — ఉదా., గృహ నిర్మాణం, పునరుద్ధరణ, పారిశ్రామిక ప్రాజెక్ట్, సాధారణ నిర్వహణ, పండుగ పెయింటింగ్ మొదలైనవి.", "વિશિષ્ટ વપરાશના પ્રસંગનું વર્ણન કરો — દા.ત., ઘર બાંધકામ, નવીનીકરણ, ઔદ્યોગિક પ્રોજેક્ટ, નિયમિત જાળવણી, તહેવાર પર પુનઃપેઇન્ટિંગ, વગેરે."),
      placeholder: addTranslations("e.g., During new home construction, for plastering and roofing.", "उदा., नए घर के निर्माण के दौरान, प्लास्टरिंग और छत के लिए।", "எ.கா., புதிய வீடு கட்டும் போது, பூச்சு மற்றும் கூரைக்கு.", "ఉదా., కొత్త గృహ నిర్మాణం సమయంలో, ప్లాస్టరింగ్ మరియు పైకప్పు కోసం.", "દા.ત., નવા ઘરના બાંધકામ દરમિયાન, પ્લાસ્ટરિંગ અને છત માટે."),
    },
  },
  section5: {
    title: addTranslations("Benefit and Experience", "लाभ और अनुभव", "பயன் மற்றும் அனுபவம்", "ప్రయోజనం & అనుభవం", "લાભ અને અનુભવ"),
    q5_1: {
      text: addTranslations("What are the benefits your brand offers?", "आपका ब्रांड कौन से लाभ प्रदान करता है?", "உங்கள் பிராண்ட் வழங்கும் நன்மைகள் என்ன?", "మీ బ్రాండ్ అందించే ప్రయోజనాలు ఏమిటి?", "તમારી બ્રાન્ડ કયા લાભો પ્રદાન કરે છે?"),
      placeholder: addTranslations("e.g., stronger build, better finish, weather resistance, long-lasting shine, termite protection, energy saving, faster installation", "उदा., मजबूत निर्माण, बेहतर फिनिश, मौसम प्रतिरोध, लंबे समय तक चलने वाली चमक, दीमक संरक्षण, ऊर्जा की बचत, तेजी से स्थापना", "எ.கா., வலுவான உருவாக்கம், சிறந்த பூச்சு, வானிலை எதிர்ப்பு, நீண்ட கால பிரகாசம், கரையான் பாதுகாப்பு, ஆற்றல் சேமிப்பு, விரைவான நிறுவல்", "ఉదా., బలమైన నిర్మాణం, మెరుగైన ముగింపు, వాతావరణ నిరోధకత, దీర్ఘకాల మెరుపు, చెదలు రక్షణ, ఇంధన ఆదా, వేగవంతమైన సంస్థాపన", "દા.ત., મજબૂત બાંધકામ, બહેતર ફિનિશ, હવામાન પ્રતિકાર, લાંબા સમય સુધી ચાલતી ચમક, ઉધઈ રક્ષણ, ઉર્જા બચત, ઝડપી ઇન્સ્ટોલેશન"),
    },
    q5_2: {
      text: addTranslations("Which of these benefits are different from your competitors?", "इनमें से कौन से लाभ आपके प्रतिस्पर्धियों से अलग हैं?", "இந்த நன்மைகளில் எது உங்கள் போட்டியாளர்களிடமிருந்து வேறுபட்டது?", "ఈ ప్రయోజనాలలో ఏది మీ పోటీదారుల నుండి భిన్నంగా ఉంటుంది?", "આમાંના કયા લાભો તમારા સ્પર્ધકોથી અલગ છે?"),
      placeholder: addTranslations("e.g., faster delivery, patented process, premium finish, certified material", "उदा., तेजी से वितरण, पेटेंट प्रक्रिया, प्रीमियम फिनिश, प्रमाणित सामग्री", "எ.கா., வேகமான விநியோகம், காப்புரிமை பெற்ற செயல்முறை, பிரீமியம் பூச்சு, சான்றளிக்கப்பட்ட பொருள்", "ఉదా., వేగవంతమైన డెలివరీ, పేటెంట్ పొందిన ప్రక్రియ, ప్రీమియం ఫినిష్, ధృవీకరించబడిన మెటీరియల్", "દા.ત., ઝડપી ડિલિવરી, પેટન્ટ પ્રક્રિયા, પ્રીમિયમ ફિનિશ, પ્રમાણિત સામગ્રી"),
    },
    q5_3: {
      text: addTranslations("How does the consumer feel after using your brand?", "आपके ब्रांड का उपयोग करने के बाद उपभोक्ता को कैसा महसूस होता है?", "உங்கள் பிராண்டைப் பயன்படுத்திய பிறகு நுகர்வோர் எப்படி உணருகிறார்கள்?", "మీ బ్రాండ్‌ను ఉపయోగించిన తర్వాత వినియోగదారు ఎలా భావిస్తారు?", "તમારી બ્રાન્ડનો ઉપયોગ કર્યા પછી ગ્રાહકને કેવું લાગે છે?"),
      placeholder: addTranslations("Describe the emotional outcome or feeling...", "भावनात्मक परिणाम या भावना का वर्णन करें...", "உணர்ச்சிவசமான விளைவு அல்லது உணர்வை விவரிக்கவும்...", "భావోద్వేగ ఫలితం లేదా అనుభూతిని వివరించండి...", "ભાવનાત્મક પરિણામ અથવા લાગણીનું વર્ણન કરો..."),
      options: {
        safe: addTranslations("I feel safe and secure", "मैं सुरक्षित और संरक्षित महसूस करता हूँ", "நான் பாதுகாப்பாகவும் பத்திரமாகவும் உணர்கிறேன்", "నేను సురక్షితంగా మరియు భద్రంగా ఉన్నాను", "હું સુરક્ષિત અને સલામત અનુભવું છું"),
        smart: addTranslations("I feel I’ve made a smart choice", "मुझे लगता है कि मैंने एक स्मार्ट विकल्प चुना है", "நான் ஒரு புத்திசாலித்தனமான தேர்வைச் செய்துள்ளேன் என்று உணர்கிறேன்", "నేను ఒక తెలివైన ఎంపిక చేసుకున్నానని భావిస్తున్నాను", "મને લાગે છે કે મેં એક સ્માર્ટ પસંદગી કરી છે"),
        admired: addTranslations("I feel admired by all", "मुझे सभी द्वारा प्रशंसित महसूस होता है", "நான் அனைவராலும் பாராட்டப்படுவதாக உணர்கிறேன்", "నేను అందరిచేత ప్రశంసించబడినట్లు భావిస్తున్నాను", "હું સૌ દ્વારા પ્રશંસિત અનુભવું છું"),
        status: addTranslations("I feel my status has gone up", "मुझे लगता है कि मेरा दर्जा बढ़ गया है", "என் நிலை உயர்ந்துவிட்டதாக உணர்கிறேன்", "నా హోదా పెరిగిందని నేను భావిస్తున్నాను", "મને લાગે છે કે મારું સ્ટેટસ વધી ગયું છે"),
        elevated: addTranslations("I feel elevated", "मुझे ऊंचा महसूस होता है", "நான் உயர்ந்ததாக உணர்கிறேன்", "నేను ఉన్నతంగా భావిస్తున్నాను", "હું ઉન્નત અનુભવું છું"),
        premium: addTranslations("I feel I belong to a more premium world", "मुझे लगता है कि मैं एक अधिक प्रीमियम दुनिया से संबंधित हूँ", "நான் ஒரு பிரீமியம் உலகத்தைச் சேர்ந்தவன் என்று உணர்கிறேன்", "నేను మరింత ప్రీమియం ప్రపంచానికి చెందినవాడిని అని భావిస్తున్నాను", "મને લાગે છે કે હું વધુ પ્રીમિયમ દુનિયાનો છું"),
      }
    }
  },
  section6: {
    title: addTranslations("Competition", "प्रतिस्पर्धा", "போட்டி", "పోటీ", "સ્પર્ધા"),
    q6_1: {
      text: addTranslations("Who are your main competitors?", "आपके मुख्य प्रतियोगी कौन हैं?", "உங்கள் முக்கிய போட்டியாளர்கள் யார்?", "మీ ప్రధాన పోటీదారులు ఎవరు?", "તમારા મુખ્ય સ્પર્ધકો કોણ છે?"),
      placeholder: addTranslations("List 2–3 competitor brands or substitute materials.", "2-3 प्रतियोगी ब्रांड या स्थानापन्न सामग्री की सूची बनाएं।", "2-3 போட்டியாளர் பிராண்டுகள் அல்லது மாற்றுப் பொருட்களைப் பட்டியலிடுங்கள்.", "2-3 పోటీదారు బ్రాండ్లు లేదా ప్రత్యామ్నాయ పదార్థాలను జాబితా చేయండి.", "2-3 સ્પર્ધક બ્રાન્ડ્સ અથવા અવેજી સામગ્રીની સૂચિ બનાવો."),
    }
  },
  section7: {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కోరదగిన అవగాహన మరియు ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાત ઉદ્દેશ્યો"),
    q7_1: {
      text: addTranslations("Imagery — How would you like your consumers to view the brand?", "इमेजरी — आप अपने उपभोक्ताओं को ब्रांड को कैसे देखना चाहेंगे?", "பிம்பம் - உங்கள் நுகர்வோர் பிராண்டை எப்படிப் பார்க்க வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", "చిత్రణ - మీ వినియోగదారులు బ్రాండ్‌ను ఎలా చూడాలని మీరు కోరుకుంటున్నారు?", "ઇમેજરી - તમે તમારા ગ્રાહકોને બ્રાન્ડને કેવી રીતે જોવા માંગો છો?"),
      category_tone: addTranslations("The feel of the communication (Tone)", "संचार का अहसास (टोन)", "தொடர்புகளின் உணர்வு (டோன்)", "కమ్యూనికేషన్ యొక్క అనుభూతి (టోన్)", "સંચારની લાગણી (ટોન)"),
      options_tone: {
        "Youthful": addTranslations("Youthful", "युवा", "இளமை", "యువతరం", "યુવાન"),
        "Mature": addTranslations("Mature", "परिपक्व", "முதிர்ந்த", "పరిపక్వ", "પરિપક્વ"),
        "Light-hearted": addTranslations("Light-hearted", "हल्के-फुल्के", "இலகுவான", "తేలికైన", "હળવા દિલનું"),
        "Serious": addTranslations("Serious", "गंभीर", "தீவிரமான", "తీవ్రమైన", "ગંભીર"),
      },
      category_world: addTranslations("Brand World", "ब्रांड की दुनिया", "பிராண்ட் உலகம்", "బ్రాండ్ ప్రపంచం", "બ્રાન્ડ વર્લ્ડ"),
      options_world: {
        "Premium": addTranslations("Premium", "प्रीमियम", "பிரீமியம்", "ప్రీమియం", "પ્રીમિયમ"),
        "Luxury": addTranslations("Luxury", "लक्ज़री", "ஆடம்பர", "విలాసవంతమైన", "લક્ઝરી"),
        "MassPopular": addTranslations("Mass / Popular", "मास / लोकप्रिय", "மாஸ் / பிரபலமான", "మాస్ / ప్రసిద్ధ", "માસ / લોકપ્રિય"),
        "Desi": addTranslations("Desi", "देसी", "தேசி", "దేశీ", "દેશી"),
        "International": addTranslations("International", "अंतर्राष्ट्रीय", "சர்வதேச", "అంతర్జాతీయ", "આંતરરાષ્ટ્રીય"),
      },
      // category_attributes removed
      // options_attributes removed
    },
    q7_2: {
      text: addTranslations("If the brand were a person, how would it be perceived?", "यदि ब्रांड एक व्यक्ति होता, तो उसे कैसे माना जाता?", "பிராண்ட் ஒரு நபராக இருந்தால், அது எப்படி உணரப்படும்?", "బ్రాండ్ ఒక వ్యక్తి అయితే, దానిని ఎలా గ్రహించవచ్చు?", "જો બ્રાન્ડ એક વ્યક્તિ હોત, તો તેને કેવી રીતે જોવામાં આવશે?"),
      options: {
        "friend": addTranslations("Friend", "दोस्त", "நண்பர்", "స్నేహితుడు", "મિત્ર"),
        "expert": addTranslations("Expert / Professional", "विशेषज्ञ / पेशेवर", "நிபுணர் / தொழில்முறை", "నిపుణుడు / వృత్తిపరుడు", "નિષ્ણાત / વ્યાવસાયિક"),
        "mentor": addTranslations("Mentor / Guide", "गुरु / मार्गदर्शक", "ஆலோசகர் / வழிகாட்டி", "గురువు / మార్గదర్శి", "માર્ગદર્શક / માર્ગદર્શક"),
        "innovator": addTranslations("Innovator / Pioneer", "अन्वेषक / अग्रणी", "புதுமைப்பித்தன் / முன்னோடி", "ఆవిష్కర్త / మార్గదర్శకుడు", "નવીન / અગ્રણી"),
        "superhuman": addTranslations("Superhuman / Protector", "सुपरह्यूमन / रक्षक", "சூப்பர்மேன் / பாதுகாவலர்", "సూపర్ హ్యూమన్ / రక్షకుడు", "સુપરહ્યુમન / રક્ષક"),
        "spouse": addTranslations("Spouse", "जीवनसाथी", "வாழ்க்கைத்துணை", "జీవిత భాగస్వామి", "જીવનસાથી"),
        "other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_3: {
      text: addTranslations("What is the primary objective of this ad?", "इस विज्ञापन का प्राथमिक उद्देश्य क्या है?", "இந்த விளம்பரத்தின் முதன்மை நோக்கம் என்ன?", "ఈ ప్రకటన యొక్క ప్రాథమిక లక్ష్యం ఏమిటి?", "આ જાહેરાતનો પ્રાથમિક ઉદ્દેશ્ય શું છે?"),
      options: {
        "awareness": addTranslations("Build Awareness (make my brand top of mind)", "जागरूकता बनाएँ (मेरे ब्रांड को शीर्ष पर रखें)", "விழிப்புணர்வை உருவாக்கு (என் பிராண்டை மனதில் முதன்மையாக வை)", "అవగాహన కల్పించండి (నా బ్రాండ్‌ను అగ్రస్థానంలో ఉంచండి)", "જાગૃતિ બનાવો (મારી બ્રાન્ડને ટોચ પર રાખો)"),
        "consideration": addTranslations("Drive Brand Choice (show why my brand is the right choice)", "ब्रांड पसंद को बढ़ावा दें (दिखाएं कि मेरा ब्रांड सही विकल्प क्यों है)", "பிராண்ட் விருப்பத்தை ஊக்குவி (என் பிராண்ட் ஏன் சரியான தேர்வு என்பதைக் காட்டு)", "బ్రాండ్ ఎంపికను పెంచండి (నా బ్రాండ్ ఎందుకు సరైన ఎంపికో చూపండి)", "બ્રાન્ડ પસંદગીને પ્રોત્સાહન આપો (બતાવો કે મારી બ્રાન્ડ શા માટે સાચી પસંદગી છે)"),
        "emotions": addTranslations("Build Image/Emotions (connect with the user on an emotional level)", "छवि/भावनाएं बनाएँ (उपयोगकर्ता के साथ भावनात्मक स्तर पर जुड़ें)", "பிம்பம்/உணர்வுகளை உருவாக்கு (பயனருடன் உணர்ச்சி மட்டத்தில் இணை)", "చిత్రం/భావోద్వేగాలను నిర్మించండి (వినియోగదారుతో భావోద్వేగ స్థాయిలో కనెక్ట్ అవ్వండి)", "છબી/લાગણીઓ બનાવો (વપરાશકર્તા સાથે ભાવનાત્મક સ્તરે જોડાઓ)"),
        "newLaunch": addTranslations("New Launch (introduce a new product/variant)", "नया लॉन्च (एक नया उत्पाद/संस्करण पेश करें)", "புதிய வெளியீடு (ஒரு புதிய தயாரிப்பு/வகையை அறிமுகப்படுத்து)", "కొత్త ప్రయోగం (కొత్త ఉత్పత్తి/వేరియెంట్‌ను పరిచయం చేయండి)", "નવી લોન્ચ (નવું ઉત્પાદન/વેરિઅન્ટ રજૂ કરો)"),
        "other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_3_details_placeholders: {
      "awareness": addTranslations("e.g., Target architects in a new city", "उदा., एक नए शहर में वास्तुकारों को लक्षित करें", "எ.கா., ஒரு புதிய நகரத்தில் கட்டிடக் கலைஞர்களை இலக்கு வைக்கவும்", "ఉదా., కొత్త నగరంలో ఆర్కిటెక్ట్‌లను లక్ష్యం చేసుకోండి", "દા.ત., નવા શહેરમાં આર્કિટેક્ટ્સને લક્ષ્ય બનાવો"),
      "consideration": addTranslations("e.g., Showcase our 20-year warranty feature", "उदा., हमारी 20-वर्षीय वारंटी सुविधा का प्रदर्शन करें", "எ.கா., எங்கள் 20 வருட உத்தரவாத அம்சத்தைக் காட்சிப்படுத்தவும்", "ఉదా., మా 20 సంవత్సరాల వారంటీ ఫీచర్‌ను ప్రదర్శించండి", "દા.ત., અમારી 20-વર્ષની વોરંટી સુવિધા પ્રદર્શિત કરો"),
      "emotions": addTranslations("e.g., Showcase the pride of building one's own home", "उदा., अपना घर बनाने के गौरव को प्रदर्शित करें", "எ.கா., சொந்த வீடு கட்டுவதில் பெருமையைக் காட்டுங்கள்", "ఉదా., సొంత ఇల్లు కట్టుకోవడంలో గర్వాన్ని ప్రదర్శించండి", "દા.ત., પોતાનું ઘર બનાવવાનો ગર્વ પ્રદર્શિત કરો"),
      "newLaunch": addTranslations("e.g., Highlight our new eco-friendly paint range", "उदा., हमारी नई पर्यावरण-अनुकूल पेंट रेंज को हाइलाइट करें", "எ.கா., எங்கள் புதிய சூழல் நட்பு வண்ணப்பூச்சு வரம்பை முன்னிலைப்படுத்தவும்", "ఉదా., మా కొత్త పర్యావరణ అనుకూల పెయింట్ శ్రేణిని హైలైట్ చేయండి", "દા.ત., અમારી નવી ઇકો-ફ્રેન્ડલી પેઇન્ટ રેન્જને હાઇલાઇટ કરો"),
      "other": addTranslations("Please specify your objective...", "कृपया अपना उद्देश्य निर्दिष्ट करें...", "உங்கள் நோக்கத்தைக் குறிப்பிடவும்...", "దయచేసి మీ లక్ష్యాన్ని పేర్కొనండి...", "કૃપા કરીને તમારો ઉદ્દેશ્ય સ્પષ્ટ કરો..."),
    },
    q7_4: {
      text: addTranslations("What is the most important thing the ad should communicate?", "विज्ञापन में सबसे महत्वपूर्ण बात क्या है जिसका संचार किया जाना चाहिए?", "விளம்பரம் தொடர்புகொள்ள வேண்டிய மிக முக்கியமான விஷயம் என்ன?", "ప్రకటన కమ్యూనికేట్ చేయవలసిన అత్యంత ముఖ్యమైన విషయం ఏమిటి?", "જાહેરાત શું વાતચીત કરવી જોઈએ તે સૌથી મહત્વપૂર્ણ બાબત શું છે?"),
      options: {
        "benefit": addTranslations("Product Benefit", "उत्पाद लाभ", "தயாரிப்பு நன்மை", "ఉత్పత్తి ప్రయోజనం", "ઉત્પાદન લાભ"),
        "differentiator": addTranslations("Unique Differentiator", "अद्वितीय विभेदक", "தனித்துவமான வேறுபடுத்தி", "ప్రత్యేకమైన భేదం", "અનન્ય વિભેદક"),
        "heritage": addTranslations("Brand Heritage / Trust", "ब्रांड विरासत / विश्वास", "பிராண்ட் பாரம்பரியம் / நம்பிக்கை", "బ్రాండ్ వారసత్వం / నమ్మకం", "બ્રાન્ડ વારસો / વિશ્વાસ"),
        "visuals": addTranslations("Product Visuals / Aesthetics", "उत्पाद दृश्य / सौंदर्यशास्त्र", "தயாரிப்பு காட்சிகள் / அழகியல்", "ఉత్పత్తి విజువల్స్ / సౌందర్యం", "ઉત્પાદન દ્રશ્યો / સૌંદર્ય શાસ્ત્ર"),
        "other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    },
    q7_4_details_placeholders: {
      "benefit": addTranslations("e.g., Emphasize the '20-year warranty'", "उदा., '20-वर्षीय वारंटी' पर जोर दें", "எ.கா., '20-வருட உத்தரவாதத்தை' வலியுறுத்துங்கள்", "ఉదా., '20 సంవత్సరాల వారంటీ'ని నొక్కి చెప్పండి", "દા.ત., '20-વર્ષની વોરંટી' પર ભાર મૂકો"),
      "differentiator": addTranslations("e.g., Highlight our German technology", "उदा., हमारी जर्मन तकनीक को हाइलाइट करें", "எ.கா., எங்கள் ஜெர்மன் தொழில்நுட்பத்தை முன்னிலைப்படுத்தவும்", "ఉదా., మా జర్మన్ సాంకేతికతను హైలైట్ చేయండి", "દા.ત., અમારી જર્મન ટેકનોલોજીને હાઇલાઇટ કરો"),
      "heritage": addTranslations("e.g., Showcase our 25 years of experience", "उदा., हमारे 25 वर्षों के अनुभव का प्रदर्शन करें", "எ.கா., எங்கள் 25 வருட அனுபவத்தைக் காட்சிப்படுத்தவும்", "ఉదా., మా 25 సంవత్సరాల అనుభవాన్ని ప్రదర్శించండి", "દા.ત., અમારા 25 વર્ષનો અનુભવ પ્રદર્શિત કરો"),
      "visuals": addTranslations("e.g., Show the sleek finish of our doors in a modern home", "उदा., एक आधुनिक घर में हमारे दरवाजों की आकर्षक फिनिश दिखाएं", "எ.கா., ஒரு நவீன வீட்டில் எங்கள் கதவுகளின் நேர்த்தியான பூச்சைக் காட்டுங்கள்", "ఉదా., ఆధునిక ఇంట్లో మా తలుపుల యొక్క సొగసైన ముగింపును చూపండి", "દા.ત., આધુનિક ઘરમાં અમારા દરવાજાઓની આકર્ષક ફિનિશ બતાવો"),
      "other": addTranslations("Please specify your ad focus...", "कृपया अपना विज्ञापन फोकस निर्दिष्ट करें...", "உங்கள் விளம்பரக் கவனத்தைக் குறிப்பிடவும்...", "దయచేసి మీ ప్రకటన ఫోకస్‌ను పేర్కొనండి...", "કૃપા કરીને તમારું જાહેરાત ફોકસ સ્પષ્ટ કરો..."),
    },
    showInfluencerQuestion: addTranslations("Is it important to show the influencer (contractor/architect/plumber/etc.) in the ad?", "Is it important to show the influencer (contractor/architect/plumber/etc.) in the ad?", "Is it important to show the influencer (contractor/architect/plumber/etc.) in the ad?", "Is it important to show the influencer (contractor/architect/plumber/etc.) in the ad?", "Is it important to show the influencer (contractor/architect/plumber/etc.) in the ad?"),
    yes: addTranslations("Yes", "हाँ", "ஆம்", "అవును", "હા"),
    no: addTranslations("No", "नहीं", "இல்லை", "కాదు", "ના"),
  },
  section8: {
    title: addTranslations("Product Representation & Packaging", "उत्पाद प्रतिनिधित्व और पैकेजिंग", "தயாரிப்பு பிரதிநிதித்துவம் & பேக்கேஜிங்", "ఉత్పత్తి ప్రాతినిధ్యం & ప్యాకేజింగ్", "ઉત્પાદન પ્રતિનિધિત્વ અને પેકેજિંગ"),

    q8_2: {
      text: addTranslations("How should the product appear in the ad?", "विज्ञापन में उत्पाद कैसा दिखना चाहिए?", "விளம்பரத்தில் தயாரிப்பு எப்படி தோன்ற வேண்டும்?", "ప్రకటనలో ఉత్పత్తి ఎలా కనిపించాలి?", "જાહેરાતમાં ઉત્પાદન કેવું દેખાવું જોઈએ?"),
      placeholder: addTranslations("e.g., Show the product being installed, show a close-up of the finish, show it in a beautiful home.", "उदा., उत्पाद को स्थापित होते हुए दिखाएं, फिनिश का क्लोज-अप दिखाएं, इसे एक सुंदर घर में दिखाएं।", "எ.கா., தயாரிப்பு நிறுவப்படுவதைக் காட்டுங்கள், பூச்சின் நெருக்கமான காட்சியைக் காட்டுங்கள், அதை ஒரு அழகான வீட்டில் காட்டுங்கள்.", "ఉదా., ఉత్పత్తిని ఇన్‌స్టాల్ చేయడాన్ని చూపండి, ముగింపు యొక్క క్లోజప్ చూపండి, దానిని అందమైన ఇంట్లో చూపండి.", "દા.ત., ઉત્પાદનને ઇન્સ્ટોલ થતું બતાવો, ફિનિશનો ક્લોઝ-અપ બતાવો, તેને સુંદર ઘરમાં બતાવો."),
    },
  },
};