import { formulario } from "./modules/selectors.js";
import { DB,concectarDB } from "./modules/conectDB.js";
import { imprimirAlerta } from "./modules/ui.js";
 

    document.addEventListener('DOMContentLoaded', () => {

        concectarDB();

        formulario.addEventListener('submit', validarCliente);

    });


    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // Crear el objeto cliente con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        cliente.id = Date.now();
        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm2'], 'readwrite');

        const objectStore = transaction.objectStore('crm2');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error', 'error');
        }
        transaction.oncomplete = function() {
            imprimirAlerta('cliente agregado correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }


