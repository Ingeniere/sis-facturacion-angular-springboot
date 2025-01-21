package com.facturacion.app.service;

import com.facturacion.app.entity.ContenidoFactura;
import com.facturacion.app.repository.ContenidoFacturaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContenidoFacturaService {

    private final ContenidoFacturaRepository contenidoFacturaRepository;

    public ContenidoFacturaService(ContenidoFacturaRepository contenidoFacturaRepository) {
        this.contenidoFacturaRepository = contenidoFacturaRepository;
    }

    public ContenidoFactura guardarCabFactura(ContenidoFactura cabFactura) {
        return this.contenidoFacturaRepository.save(cabFactura);
    }

    public List<ContenidoFactura> obtenerTodas( ) {
        Iterable<ContenidoFactura> cabFacturas = this.contenidoFacturaRepository.findAll();
        List<ContenidoFactura> listaCabFacturas = new ArrayList<>();
        cabFacturas.forEach(listaCabFacturas::add);
        return listaCabFacturas;
    }

    public Optional<ContenidoFactura> obtenerPorId(Integer id) {
        return this.contenidoFacturaRepository.findById(id);
    }

    public void eliminarPorId(Integer id) {
        this.contenidoFacturaRepository.deleteById(id);
    }



    public Integer generaFactura() {
        return this.contenidoFacturaRepository.generaFactura();
    }
}
