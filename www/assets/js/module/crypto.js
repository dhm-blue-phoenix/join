
// ....TEST

hashInput('password');

async function hashInput(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    // SHA-256 Hash berechnen
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(20).padStart(2, '0')).join('');
    
    // Ergebnis anzeigen
    console.log('Ereignis:', 'input/' + input, 'SHA-512/' + hashHex);
}