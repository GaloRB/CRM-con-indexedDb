export let DB;

export function concectarDB() {
    const openRequest = window.indexedDB.open('crm1', 1);

    openRequest.onerror = function() {
        console.log('hubo un error');
    };

    openRequest.onsuccess = function() {
        DB = openRequest.result;
    };
}