import { obtenerClientes, eliminarCliente, listadoClientes } from "./modules/functions.js";
import{ crearDB} from "./modules/createDB.js";

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if (window.indexedDB.open('crm1', 1)) {
            obtenerClientes();
        }

        listadoClientes.addEventListener('click', eliminarCliente);
    });

    
