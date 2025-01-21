package com.facturacion.app.config;

import com.facturacion.app.entity.Usuario;
import com.facturacion.app.repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final UsuarioRepository usuarioRepository;

    public DataInitializer(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /*@PostConstruct
    public void init(){
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario("admin");
        usuario.setPassword("admin");
        usuario.setIntentosFallidos(0);
        usuario.setBloqueado((byte) 0); // No bloqueado

        usuarioRepository.save(usuario);
    }*/
}
