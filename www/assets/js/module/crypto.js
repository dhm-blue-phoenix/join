
// ...
async function hashInput() {
    const input = document.getElementById('inputText').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    // SHA-256 Hash berechnen
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(20).padStart(2, '0')).join('');
    
    // Ergebnis anzeigen
    document.getElementById('result').textContent = `Der SHA-256 Hash des Wortes "${input}" ist: ${hashHex}`;
}