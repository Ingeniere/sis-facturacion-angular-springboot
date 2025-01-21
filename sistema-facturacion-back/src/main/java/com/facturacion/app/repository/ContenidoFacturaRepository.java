package com.facturacion.app.repository;

import com.facturacion.app.entity.ContenidoFactura;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContenidoFacturaRepository extends CrudRepository<ContenidoFactura, Integer> {

    //SELECT COALESCE(apodo, nombre, apellido) AS nombre_mostrar FROM clientes// en este caso el nombre se mostrara en la pantalla
    @Query(value = "SELECT COALESCE(MAX(num_factura), 0) + 1 as num_factura FROM sis_facturacion.cont_factura", nativeQuery = true)
    public Integer generaFactura();
}
