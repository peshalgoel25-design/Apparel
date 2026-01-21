const urls = [
    'https://i.ibb.co/mVRwwf59/Traditional-and-Male-Decision.png',
    'https://i.postimg.cc/vDNfqRsP/Man-1.jpg'
];
Promise.all(urls.map(url => fetch(url).then(r => [url, r.status]).catch(e => [url, e.message])))
    .then(console.log);
