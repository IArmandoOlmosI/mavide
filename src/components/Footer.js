export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 gap-4">

        {/* Izquierda */}
        <div className="text-left">
          <p>Tel: 5521316945</p>
          <p>Email: miguel@mavide.com.mx</p>
        </div>

        {/* Centro */}
        <div className="text-center text-lg font-semibold">
          Publicidad sin límites
        </div>

        {/* Derecha */}
        <div className="text-right">
          Todos los derechos reservados © Grupo MAVIDE
        </div>

      </div>
    </footer>
  );
}
