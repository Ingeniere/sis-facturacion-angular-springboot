package com.facturacion.app.controller;

import com.facturacion.app.entity.ContenidoFactura;
import com.facturacion.app.service.ContenidoFacturaService;
import com.facturacion.app.util.RespuestaMensaje;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cont-factura")
public class ContenidoFacturaController {

    private final ContenidoFacturaService contenidoFacturaService;

    public ContenidoFacturaController(ContenidoFacturaService contenidoFacturaService) {
        this.contenidoFacturaService = contenidoFacturaService;
    }

    @GetMapping
    public ResponseEntity<List<ContenidoFactura>> obtenerTodasCabeceras() {
        List<ContenidoFactura> cabeceras = contenidoFacturaService.obtenerTodas();
        return new ResponseEntity<>(cabeceras, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContenidoFactura> obtenerFacturaPorId(@PathVariable("id") Integer id) {
        return contenidoFacturaService.obtenerPorId(id)
                .map(factura -> new ResponseEntity<>(factura, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<ContenidoFactura> guardarFactura(@RequestBody ContenidoFactura cabFactura) {
        ContenidoFactura facturaGuardada = contenidoFacturaService.guardarCabFactura(cabFactura);
        return new ResponseEntity<>(facturaGuardada, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFacturaPorId(@PathVariable("id") Integer id) {
        contenidoFacturaService.eliminarPorId(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/genera-factura")
    public ResponseEntity<RespuestaMensaje> generaFactura() {
        return ResponseEntity.ok(new RespuestaMensaje(200, this.contenidoFacturaService.generaFactura()));
    }
}
