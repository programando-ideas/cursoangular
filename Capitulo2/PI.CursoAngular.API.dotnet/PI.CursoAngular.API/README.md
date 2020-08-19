# WebApi Asp.Net Core - Proyecto Angular

Para agregar la configuración del sitio webapi se deben seguir los siguientes pasos:

- Click con el derecho sobre el proyecto
- Ir a la opción "Manage User Secrets"
- ![](https://raw.githubusercontent.com/programando-ideas/cursoangular/master/imagenes/api_secrets.png)
- Agregar la siguiente configuración y setear el connectionString de acuerdo a la configuración local
```json
{
  "connectionString": "server=localhost;database=curso_angular;user=usrangular;password=.usrangular.",
  "ApiAuth": {
    "Audience": "aspnetcore",
    "Issuer": "http://localhost:50000",
    "SecretKey": "xf23SLasd3dfdSsa11AAASsdkdjXds1jE55/d+kf!G$#skds"
  },
  "Serilog": {
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "File",
        "Args": {
          "path": ".\\LOGs\\log_webapi.txt",
          "rollingInterval": "Day",
          "rollOnFileSizeLimit": "true",
          "fileSizeLimitBytes": "10485760"
        }
      }
    ]
  }
}
```
