---
title: 'Configuración SSH Keys'
description: 'Guia para realizar la configuración SSH Keys'
---

## Generar par de claves SSH (en tu máquina local)
```powershell
# Si no tienes OpenSSH, instalarlo:
Add-WindowsCapability -Online -Name OpenSSH.Client

# Generar claves:
ssh-keygen -t ed25519 -C "desarrollo@mi-email.com"

# Guardar en:
Enter file in which to save the key (C:\Users\tu-usuario\.ssh\id_ed25519): C:\Users\tu-usuario\.ssh\id_ed25519_contabo
```

### Verificar claves
```powershell
# Listar archivos SSH
ls -la ~/.ssh/

# Deberías ver:
id_ed25519_contabo     # Clave privada (NUNCA compartir)
id_ed25519_contabo.pub # Clave pública (esta se copia al servidor)
```

## Copiar clave pública al servidor
### Ver la clave pública
```powershell
# Mostrar contenido de la clave pública
cat ~/.ssh/id_ed25519_contabo.pub

# Output será algo como:
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAbCdEfGhIjKlMnOpQrStUvWxYz desarrollo@mi-email.com
```

### Copiar al servidor
```powershell
# Conectar al servidor con contraseña (primera y última vez)
ssh developer@tu-vps-ip

# En el servidor, crear directorio SSH si no existe
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Agregar tu clave pública al archivo authorized_keys
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAbCdEfGhIjKlMnOpQrStUvWxYz desarrollo@mi-email.com" >> ~/.ssh/authorized_keys

# Configurar permisos correctos
chmod 600 ~/.ssh/authorized_keys

# Verificar contenido
cat ~/.ssh/authorized_keys

# Salir del servidor
exit
```

## Configurar archivo SSH config (local)
### Crear/editar archivo de configuración SSH
```powershell
code C:\Users\tu-usuario\.ssh\config
```

### Contenido del archivo config
```bash
# VPS Contabo - Desarrollo
Host contabo-dev
    HostName tu-vps-ip-aqui
    User developer
    IdentityFile ~/.ssh/tu_id_ssh
    Port 22
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ForwardAgent yes

# Alias alternativo para túneles
Host contabo-tunnel
    HostName tu-vps-ip-aqui
    User developer
    IdentityFile ~/.ssh/tu_id_ssh
    LocalForward 8080 localhost:8080
    LocalForward 8081 localhost:8081
    LocalForward 5432 localhost:5432
    LocalForward 9000 localhost:9000

# Para usar como jump host (si necesitas en el futuro)
Host contabo-jump
    HostName tu-vps-ip-aqui
    User developer
    IdentityFile ~/.ssh/tu_id_ssh
    ProxyJump contabo-dev
```

## Configuración `Windows Terminal`
```json
// En settings.json de Windows Terminal
{
    "profiles": {
        "list": [
            {
                "name": "Contabo Ubuntu VPS",
                "commandline": "ssh contabo-dev",
                "icon": "🐧",
                "colorScheme": "Ubuntu"
            }
        ]
    }
}
```

## Configuración `Intellij IDEA`
```
Tools → Deployment → Configuration
Type: SFTP

SSH Configuration:
  Host: TU-IP-SERVIDOR
  Port: 22
  User name: developer
  Auth type: Key pair (OpenSSH or PuTTY)
  Private key file: C:\Users\TU-USUARIO\.ssh\id_ed25519_contabo
  
Test Connection → Should work!
```

## Configuración `MobaXterm`
```
Session → SSH
Remote host: TU-IP-SERVIDOR
Specify username: developer

Advanced SSH settings:
✅ Use private key
Private key: C:\Users\TU-USUARIO\.ssh\tu_id_ssh
```