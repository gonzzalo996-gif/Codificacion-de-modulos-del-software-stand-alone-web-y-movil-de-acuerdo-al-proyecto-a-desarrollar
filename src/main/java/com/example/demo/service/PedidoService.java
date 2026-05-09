package com.example.demo.service;

import com.example.demo.model.Cliente;
import com.example.demo.model.Pedido;
import com.example.demo.model.Producto;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.PedidoRepository;
import com.example.demo.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido createPedido(Pedido pedido) {
        if (pedido.getCliente() == null || pedido.getCliente().getId() == null) {
            throw new IllegalArgumentException("Cliente inválido");
        }
        if (pedido.getProducto() == null || pedido.getProducto().getId() == null) {
            throw new IllegalArgumentException("Producto inválido");
        }

        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
        Producto producto = productoRepository.findById(pedido.getProducto().getId())
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        if (pedido.getCantidad() == null || pedido.getCantidad() < 1) {
            pedido.setCantidad(1);
        }
        if (producto.getStock() < pedido.getCantidad()) {
            throw new IllegalArgumentException("Stock insuficiente");
        }

        producto.setStock(producto.getStock() - pedido.getCantidad());
        productoRepository.save(producto);

        pedido.setCliente(cliente);
        pedido.setProducto(producto);
        if (pedido.getFechaPedido() == null) {
            pedido.setFechaPedido(LocalDateTime.now());
        }
        pedido.setTotal(producto.getPrecio() * pedido.getCantidad());
        if (pedido.getEstado() == null) {
            pedido.setEstado("Por procesar");
        }

        return pedidoRepository.save(pedido);
    }
}
