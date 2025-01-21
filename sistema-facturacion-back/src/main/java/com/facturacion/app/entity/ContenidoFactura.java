package com.facturacion.app.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cont_factura")
public class ContenidoFactura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_factura")
    private Integer idFcatura;
    @Column(name = "num_factura")
    private Integer numeroFactura;
    @Column(name = "ci_cliente")
    private String ciCliente;

    @Column(name = "subtotal", columnDefinition = "DECIMAL(10,2)")
    private String subtotal;
    @Column(name = "iva", columnDefinition = "DECIMAL(10,2)")
    private String iva;
    @Column(name = "total", columnDefinition = "DECIMAL(10,2)")
    private String total;


    @JsonManagedReference
    @OneToMany(mappedBy = "pkContFactura", cascade = CascadeType.ALL)
    private List<Detallefactura> detalleFactura;

    public Integer getIdFcatura() {
        return idFcatura;
    }

    public void setIdFcatura(Integer idFcatura) {
        this.idFcatura = idFcatura;
    }

    public Integer getNumeroFactura() {
        return numeroFactura;
    }

    public void setNumeroFactura(Integer numeroFactura) {
        this.numeroFactura = numeroFactura;
    }

    public String getCiCliente() {
        return ciCliente;
    }

    public void setCiCliente(String ciCliente) {
        this.ciCliente = ciCliente;
    }

    public String getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(String subtotal) {
        this.subtotal = subtotal;
    }

    public String getIva() {
        return iva;
    }

    public void setIva(String iva) {
        this.iva = iva;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public List<Detallefactura> getDetalleFactura() {
        return detalleFactura;
    }

    public void setDetalleFactura(List<Detallefactura> detalleFactura) {
        this.detalleFactura = detalleFactura;
    }
}
