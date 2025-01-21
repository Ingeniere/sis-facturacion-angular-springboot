package com.facturacion.app.repository;

import com.facturacion.app.entity.Detallefactura;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleFacturaRepository extends CrudRepository<Detallefactura, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO detallefactura (codigo_producto, cantidad, pk_cont_factura) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void insertarFactura(Integer codigoProducto, Integer cantidad, Integer pkContFactura);
}
