/**
* Löscht den Kontakt mit der angegebenen E-Mail-Adresse.
* ====================================================================================================
* func loadContactsId() - findet man in der dataResponse.js
* func deletContactById() - findet man in der dataResponse.js
* ====================================================================================================
* @async
* @param {string} email Die E-Mail-Adresse des Kontakts.
* @returns {Promise<void>}
* ====================================================================================================
*/
export async function delContact(email) {
   try {
       return console.log('delContat');
       const contactId = await loadContactsId(`users/${userID}/`, email);
       await deletContactById(`users/${userID}/contacts/${contactId[0]}`);
       await initCard();
       dnonePersionCard();
   } catch (err) {
       console.error(`Es ist ein Schwerwigender Fehler aufgetreten! ${err}`);
   }
}