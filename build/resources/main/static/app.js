const messageElement = document.getElementById('message');

function showSection(sectionId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === sectionId);
    });
}

function showMessage(text, isError = false) {
    messageElement.textContent = text;
    messageElement.style.background = isError ? '#fde8e8' : '#eef2ff';
    messageElement.style.color = isError ? '#b91c1c' : '#1d4ed8';
}

async function fetchJson(url, options = {}) {
    const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(errorText || 'Error en la petición');
    }
    return resp.json();
}

async function loadClientes() {
    const clientes = await fetchJson('/clientes');
    const list = document.getElementById('cliente-list');
    const select = document.getElementById('pedido-cliente');
    list.innerHTML = '';
    select.innerHTML = '<option value="">Seleccione cliente</option>';
    clientes.forEach(cliente => {
        const item = document.createElement('li');
        item.textContent = `${cliente.id} · ${cliente.nombre} • ${cliente.email}`;
        list.appendChild(item);
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.id} - ${cliente.nombre}`;
        select.appendChild(option);
    });
}

async function loadProductos() {
    const productos = await fetchJson('/productos');
    const list = document.getElementById('producto-list');
    const select = document.getElementById('pedido-producto');
    list.innerHTML = '';
    select.innerHTML = '<option value="">Seleccione producto</option>';
    productos.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `${producto.id} · ${producto.nombre} - $${producto.precio.toFixed(2)} · stock ${producto.stock}`;
        list.appendChild(item);
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.id} - ${producto.nombre}`;
        select.appendChild(option);
    });
}

async function loadPedidos() {
    const pedidos = await fetchJson('/pedidos');
    const list = document.getElementById('pedido-list');
    list.innerHTML = '';
    pedidos.forEach(pedido => {
        const item = document.createElement('li');
        const cliente = pedido.cliente ? pedido.cliente.nombre : 'Cliente no asignado';
        const producto = pedido.producto ? pedido.producto.nombre : 'Producto no asignado';
        item.innerHTML = `<strong>#${pedido.id}</strong> • ${cliente} • ${producto} • Cantidad: ${pedido.cantidad} • Total: $${pedido.total?.toFixed(2) || '0.00'} • Estado: ${pedido.estado}`;
        list.appendChild(item);
    });
}

async function init() {
    try {
        await Promise.all([loadClientes(), loadProductos(), loadPedidos()]);
        showMessage('Bienvenido a Gestore. Usa los formularios para administrar tu tienda.');
    } catch (error) {
        showMessage(error.message, true);
    }
}

document.getElementById('cliente-form').addEventListener('submit', async event => {
    event.preventDefault();
    const cliente = {
        nombre: document.getElementById('cliente-nombre').value,
        email: document.getElementById('cliente-email').value,
        telefono: document.getElementById('cliente-telefono').value,
        direccion: document.getElementById('cliente-direccion').value,
    };
    try {
        await fetchJson('/clientes', {
            method: 'POST',
            body: JSON.stringify(cliente),
        });
        document.getElementById('cliente-form').reset();
        await loadClientes();
        showMessage('Cliente creado con éxito.');
    } catch (error) {
        showMessage(error.message, true);
    }
});

document.getElementById('producto-form').addEventListener('submit', async event => {
    event.preventDefault();
    const producto = {
        nombre: document.getElementById('producto-nombre').value,
        descripcion: document.getElementById('producto-descripcion').value,
        precio: parseFloat(document.getElementById('producto-precio').value),
        stock: parseInt(document.getElementById('producto-stock').value, 10),
    };
    try {
        await fetchJson('/productos', {
            method: 'POST',
            body: JSON.stringify(producto),
        });
        document.getElementById('producto-form').reset();
        await Promise.all([loadProductos(), loadPedidos()]);
        showMessage('Producto creado con éxito.');
    } catch (error) {
        showMessage(error.message, true);
    }
});

document.getElementById('pedido-form').addEventListener('submit', async event => {
    event.preventDefault();
    const pedido = {
        cliente: { id: parseInt(document.getElementById('pedido-cliente').value, 10) },
        producto: { id: parseInt(document.getElementById('pedido-producto').value, 10) },
        cantidad: parseInt(document.getElementById('pedido-cantidad').value, 10),
        direccionEntrega: document.getElementById('pedido-direccion').value,
    };
    try {
        await fetchJson('/pedidos', {
            method: 'POST',
            body: JSON.stringify(pedido),
        });
        document.getElementById('pedido-form').reset();
        await Promise.all([loadProductos(), loadPedidos()]);
        showMessage('Pedido creado con éxito.');
    } catch (error) {
        showMessage(error.message, true);
    }
});

window.addEventListener('load', init);
