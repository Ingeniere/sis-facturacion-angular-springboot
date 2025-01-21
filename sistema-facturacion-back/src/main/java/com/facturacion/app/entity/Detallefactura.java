package com.facturacion.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Detallefactura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "codigo_producto")
    private Integer codigoProducto;

    private Integer cantidad;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "pk_cont_factura")
    private ContenidoFactura pkContFactura;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(Integer codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public ContenidoFactura getPkContFactura() {
        return pkContFactura;
    }

    public void setPkContFactura(ContenidoFactura pkContFactura) {
        this.pkContFactura = pkContFactura;
    }
}
