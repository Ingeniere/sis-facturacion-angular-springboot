package com.facturacion.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class DetalleFacturaDTO {

    private Integer codigoProducto;
    private Integer cantidad;
    private Integer pkContFactura;

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

    public Integer getPkContFactura() {
        return pkContFactura;
    }

    public void setPkContFactura(Integer pkContFactura) {
        this.pkContFactura = pkContFactura;
    }
}
