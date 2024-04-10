import { listadoClientes } from "./selectors.js";

let DB;
let nombreCliente;


function obtenerClientes() {
    const openRequest = window.indexedDB.open('crm1', 1);

    openRequest.onerror = () => {
        console.log('hubo error al abrir la conexión');
    }

    openRequest.onsuccess = () => {
        DB = openRequest.result;

        const objectStore = DB.transaction('crm2').objectStore('crm2');

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;

            if (cursor) {
                const { nombre, email, telefono, empresa, id } = cursor.value;
                nombreCliente = nombre;
                listadoClientes.innerHTML += `<tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>
                    </tr>`;
                cursor.continue();
            } else {
                console.log('no hay más registros');
            }
        }
    }
}

function eliminarCliente(e) {
    if (e.target.classList.contains('eliminar')) {
        const idEliminar = Number(e.target.dataset.cliente);
        const confirmar = confirm(`Seguro que desea eliminar a el cliente ${nombreCliente}`);

        if (confirmar) {
            const transaction = DB.transaction(['crm2'], 'readwrite');
            const objectStore = transaction.objectStore('crm2');

            objectStore.delete(idEliminar);

            transaction.oncomplete = () => {
                console.log('Eliminado...')

                e.target.parentElement.parentElement.remove();
            }

            transaction.onerror = () => {
                console.log('Hubo un error');
            }
        }

    }
}


export {obtenerClientes, eliminarCliente, listadoClientes};