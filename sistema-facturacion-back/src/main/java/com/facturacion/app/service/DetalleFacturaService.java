package com.facturacion.app.service;

import com.facturacion.app.dto.DetalleFacturaDTO;
import com.facturacion.app.repository.ContenidoFacturaRepository;
import com.facturacion.app.repository.DetalleFacturaRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleFacturaService {

    private static  final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(DetalleFacturaService.class);
    private final DetalleFacturaRepository detalleFacturaRepository;

    private final ContenidoFacturaRepository contenidoFacturaRepository;

    public DetalleFacturaService(DetalleFacturaRepository detalleFacturaRepository, ContenidoFacturaRepository contenidoFacturaRepository) {
        this.detalleFacturaRepository = detalleFacturaRepository;
        this.contenidoFacturaRepository = contenidoFacturaRepository;
    }

    @Transactional
    public void insertarFacturas(List<DetalleFacturaDTO> detFacturaDTOs) {
        for (DetalleFacturaDTO detFacturaDTO : detFacturaDTOs) {
            this.detalleFacturaRepository.insertarFactura(  detFacturaDTO.getCodigoProducto(),
                    detFacturaDTO.getCantidad(),
                    detFacturaDTO.getPkContFactura()
            );
        }
    }
}
