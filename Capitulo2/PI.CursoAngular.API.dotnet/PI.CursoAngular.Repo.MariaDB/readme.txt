Comandos de dotnet para hacer ing. inversa de la base al .net
 - <GenerateRuntimeConfigurationFiles>true</GenerateRuntimeConfigurationFiles>
 - dotnet tool install --global dotnet-ef --version 3.1.0
 - dotnet-ef dbcontext scaffold "Server=localhost;Database=curso_angular;User=usrangular;Password=.usrangular.;" "Pomelo.EntityFrameworkCore.MySql" -o DBModel
