# Base de Datos - AutoParts Pro
# Recomendación: MongoDB con Mongoose (Node.js) o Prisma con PostgreSQL

## ¿Por qué MongoDB?
- Flexible para catálogos de productos con atributos variables
- Excelente para datos de ubicación (geoespatial queries)
- Escalabilidad horizontal
- Ideal para un sistema de marketplace

## ¿Por qué PostgreSQL?
- Transacciones más robustas para pagos
- Relaciones complejas entre usuarios, pedidos y productos
- Mejor integridad de datos
- Excelente para sistemas financieros

## Recomendación Final:
Usar **MongoDB** para el catálogo de productos y perfiles,
y **PostgreSQL** para transacciones y pedidos (si se requiere máxima integridad).

Alternativa simple: Solo **MongoDB** con transacciones multi-documento.
