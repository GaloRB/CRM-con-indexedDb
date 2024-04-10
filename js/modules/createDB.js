let DB;
function crearDB() {
    const request = window.indexedDB.open('crm1', 1);

    request.onerror = function() {
        console.log('hubo un error');
    };

    request.onsuccess = function() {
        DB = request.result;
    };

    request.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('crm2', { keyPath: 'id', autoIncrement: true });

        objectStore.createIndex('nombre', 'nombre', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('empresa', 'empresa', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log('DB lista y creada');
    };
}

export {crearDB};