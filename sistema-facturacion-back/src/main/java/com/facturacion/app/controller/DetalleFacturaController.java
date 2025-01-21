package com.facturacion.app.controller;

import com.facturacion.app.dto.DetalleFacturaDTO;
import com.facturacion.app.service.DetalleFacturaService;
import com.facturacion.app.util.RespuestaMensaje;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/detalle-factura")
public class DetalleFacturaController {

    private final DetalleFacturaService detalleFacturaService;

    public DetalleFacturaController(DetalleFacturaService detalleFacturaService) {
        this.detalleFacturaService = detalleFacturaService;
    }

    @PostMapping("/guardar")
    public ResponseEntity<RespuestaMensaje> guardarDetallesFactura(@RequestBody List<DetalleFacturaDTO> detallesFacturaDTO) {
        detalleFacturaService.insertarFacturas(detallesFacturaDTO);
        return ResponseEntity.ok(new RespuestaMensaje(200, "Detalles de factura guardados exitosamente"));
    }
}
