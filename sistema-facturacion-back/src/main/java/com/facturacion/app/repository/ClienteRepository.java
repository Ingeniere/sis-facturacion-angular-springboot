package com.facturacion.app.repository;

import com.facturacion.app.entity.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Integer> {

    @Query(value = "SELECT count(nit_ci) as ruc_dni FROM sis_facturacion.cliente where nit_ci = :ruc_dni", nativeQuery = true)
    public String verificarSiExiteCliente(@Param("ruc_dni") String ruc_dni);
}
