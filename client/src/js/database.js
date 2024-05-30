import { openDB } from 'idb';

const initdb = async () =>
  openDB('tewa', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('tewa')) {
        console.log('tewa database already exists');
        return;
      }
      db.createObjectStore('tewa', { keyPath: 'id', autoIncrement: true });
      console.log('tewa database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PutDb not implemented');

  // Creates a connection to the tewa database and version.
  const tewaDb = await openDB('tewa', 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = tewaDb.transaction('tewa', 'readwrite');

  // Opens up the desired object store.
  const store = tx.objectStore('tewa');

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;

  if (result !== undefined) {
    console.log('Data saved to the database, ID:', result);

    // Fetch the newly inserted data to confirm it was saved correctly.
    const savedData = await store.get(result);
    console.log('Saved data:', savedData.value);
    return savedData.value;
  } else {
    console.log(
      "It wasn't saved to the database"
    );
    return null;
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { console.error('getDb not implemented');

  // Creates a connection to the tewa database and version.
  const tewaDb = await openDB("tewa", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = tewaDb.transaction("tewa", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("tewa");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("No notes found in database");
  return result?.value;
};

initdb();
