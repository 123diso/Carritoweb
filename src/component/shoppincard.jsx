import { useState } from "react";

export const ShoppingCart = () => {
  const productosDisponibles = [
    { id: 1, nombre: "Manzana", precio: 0.5 },
    { id: 2, nombre: "Pan", precio: 2.0 },
    { id: 3, nombre: "Leche", precio: 1.2 },
    { id: 4, nombre: "Huevos", precio: 2.5 },
  ];

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const incrementarCantidad = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
      ),
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item,
      ),
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const totalProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );
  const precioTotal = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );

  return (
    <div>
      <h2> Carrito de Compras</h2>

      <div>
        <h3>Productos Disponibles:</h3>
        <div>
          {productosDisponibles.map((producto) => (
            <div key={producto.id}>
              <p>
                <strong>{producto.nombre}</strong>
              </p>
              <p> ${producto.precio.toFixed(2)}</p>
              <button onClick={() => agregarAlCarrito(producto)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Tu Carrito:</h3>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            <div>
              <p>
                <strong>Total productos:</strong> {totalProductos}
              </p>
              <p>
                <strong>Precio total:</strong> ${precioTotal.toFixed(2)}
              </p>
            </div>

            {carrito.map((item) => (
              <div key={item.id}>
                <div>
                  <strong>{item.nombre}</strong>
                </div>
                <div>${item.precio.toFixed(2)} c/u</div>
                <div>Cantidad: {item.cantidad}</div>
                <div>
                  <button onClick={() => incrementarCantidad(item.id)}>
                    mas
                  </button>
                  <button onClick={() => disminuirCantidad(item.id)}>
                    menos
                  </button>
                  <button onClick={() => eliminarDelCarrito(item.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
