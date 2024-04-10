(function() {
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');
    let idCliente;

    document.addEventListener('DOMContentLoaded', () => {
        concectarDB();

        //Actualiza el registro
        formulario.addEventListener('submit', actualizarCliente)

        //Verficar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search);

        idCliente = parametrosURL.get('id');

        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);

        }
    });



    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm2'], 'readwrite');
        const objectStore = transaction.objectStore('crm2');

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;

            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(cliente) {
        const { nombre, email, telefono, empresa } = cliente;

        nombreInput.value = nombre;
        emailInput.value = email
        telefonoInput.value = telefono;
        empresaInput.value = empresa;

    }

    function actualizarCliente(e) {
        e.preventDefault();

        if (nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        //Actualizar clientes
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        };

        const transaction = DB.transaction(['crm2'], 'readwrite');
        const objectStore = transaction.objectStore('crm2');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = () => {
            imprimirAlerta('cliente actualizado correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        };

        transaction.onerror = (e) => {
            imprimirAlerta('Hubo un error: ' + e.target.error, 'error');
        }

    }

})();