package com.facturacion.app.controller;

import com.facturacion.app.service.UsuarioService;
import com.facturacion.app.util.RespuestaMensaje;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/facturacion")
public class UsuarioController {

    private final Logger LOGGER = LoggerFactory.getLogger(UsuarioService.class);
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/login")
    public ResponseEntity<RespuestaMensaje> login(@RequestParam String nombreUsuario, @RequestParam String password) {
        if (nombreUsuario != null && password != null) {
            // Verificar si el usuario está bloqueado
            if (this.usuarioService.estaBloqueado(nombreUsuario)) {
                return ResponseEntity.ok(new RespuestaMensaje(HttpStatus.FORBIDDEN.value(), "Usuario bloqueado"));
            }

            Optional<Object[]> usuarioAutenticado = this.usuarioService.buscarPorUsuarioYContrasenia(nombreUsuario, password);
            if (usuarioAutenticado.isPresent() && usuarioAutenticado.get().length > 0) {
                return ResponseEntity.ok(new RespuestaMensaje(HttpStatus.OK.value(), "Usuario autenticado exitosamente"));
            } else {
                LOGGER.info("Credenciales incorrectas para el usuario: {}", nombreUsuario);
                int intentosFallidos = this.usuarioService.obtenerIntentosFallidos(nombreUsuario).orElse(0);
                if (intentosFallidos >= 3) {
                    LOGGER.info("Usuario bloqueado debido a múltiples intentos fallidos: {}", nombreUsuario);
                    this.usuarioService.bloquearUsuario(nombreUsuario);
                    return ResponseEntity.ok(new RespuestaMensaje(HttpStatus.UNAUTHORIZED.value(), "Usuario bloqueado: superó los intentos permitidos"));
                } else {
                    LOGGER.info("Incrementando intentos fallidos para el usuario: {}", nombreUsuario);
                    this.usuarioService.incrementarIntentosFallidos(nombreUsuario);
                }
                return ResponseEntity.ok(new RespuestaMensaje(HttpStatus.UNAUTHORIZED.value(), "Credenciales incorrectas"));

            }
        } else {
            // Falta el usuario o la contraseña
            LOGGER.info("Falta el usuario o la contraseña");
            return ResponseEntity.badRequest().body(new RespuestaMensaje(HttpStatus.BAD_REQUEST.value(), "Falta el usuario o la contraseña"));
        }
    }
}
