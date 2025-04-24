import React, { useState, useEffect } from "react";
import axios from "axios";

const FormVehiculo = () => {
  const [formData, setFormData] = useState({
    placa: "",
    numerochasis: "",
    numeromotor: "",
    tipovehiculo: "",
    anio: "",
    ciudadmatricula: "",
    fechaMatricula: "",
    marca: "",
    modelo: "",
    cilindrada: "",
    color: "",
    tipoCombustible: "",
    clasevehiculo: "",
    tipocarroceria: "",
    categoria: "",
    doble_trailer: false,
    tiene_tanque_liquidos: false,
    tiene_tanque_agua: false,
    capacidadPasajeros: "",
    capacidadToneladas: "",
    tipocabina: "",
    tiporemolque: "",
    peso: "",
    longitud: "",
    ancho: "",
    alto: "",
    ejes: "",
    total_llantas: "",
    distanciaentreejes: "",
    quintarueda: "",
    caballosdefuerza: "",
    velociadades: "",
    tipoTraccion: "",
    propietario: "",
    empresa: "",
    estado: 1,
    observaciones: "",
    numeroPuertas: ""
  });

  const [listas, setListas] = useState({});

  useEffect(() => {
    const tablas = [
      "tipocombustible",
      "clasevehiculo",
      "tipocarroceria",
      "tiporemolque",
      "categoriavehiculo",
      "tipocabina",
      "tiporemolque",
      "propietarios",
      "empresas"
    ];
    tablas.forEach(tabla => {
      axios
        .get(`https://kentwork.onrender.com/db_kentwork/${tabla}`)
        .then(res => setListas(prev => ({ ...prev, [tabla]: res.data })))
        .catch(err => console.error(`Error cargando ${tabla}`, err));
    });
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://kentwork.onrender.com/vehiculos", formData)
      .then(() => alert("Vehículo registrado"))
      .catch(() => alert("Error al registrar vehículo"));
  };

  const renderSelect = (name, label) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Seleccione</option>
        {(listas[name.replace(/([A-Z])/g, '_$1').toLowerCase()] || []).map(item => (
          <option key={item.id} value={item.id}>{item.nombre}</option>
        ))}
      </select>
    </div>
  );

  const renderInput = (name, label, type = "text") => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  const renderCheckbox = (name, label) => (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        checked={formData[name]}
        onChange={handleChange}
      />
      <label className="text-sm">{label}</label>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Registro de Vehículo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput("placa", "Placa")}
        {renderInput("numero_chasis", "Número de Chasis")}
        {renderInput("numero_motor", "Número de Motor")}
        {renderInput("anio", "Año", "number")}
        {renderInput("ciudadmatricula", "Ciudad Matrícula")}
        {renderInput("fechaMatricula", "Fecha Matrícula", "date")}
        {renderInput("marca", "Marca")}
        {renderInput("modelo", "Modelo")}
        {renderInput("cilindrada", "Cilindrada")}
        {renderInput("color", "Color")}
        {renderInput("capacidadPasajeros", "Capacidad Pasajeros", "number")}
        {renderInput("capacidadToneladas", "Capacidad Toneladas", "number")}
        {renderInput("peso", "Peso", "number")}
        {renderInput("longitud", "Longitud", "number")}
        {renderInput("ancho", "Ancho", "number")}
        {renderInput("alto", "Alto", "number")}
        {renderInput("ejes", "Ejes", "number")}
        {renderInput("total_llantas", "Total de Llantas", "number")}
        {renderInput("distanciaentreejes", "Distancia entre Ejes", "number")}
        {renderInput("quintarueda", "Quinta Rueda", "number")}
        {renderInput("caballosdefuerza", "Caballos de Fuerza", "number")}
        {renderInput("velociadades", "Velocidades", "number")}
        {renderInput("tipotraccion", "Tipo de Tracción")}
        {renderInput("numeropuertas", "Número de Puertas", "number")}

        {renderSelect("tipoVehiculo", "Tipo de Vehículo")}
        {renderSelect("tipoCombustible", "Tipo de Combustible")}
        {renderSelect("claseVehiculo", "Clase de Vehículo")}
        {renderSelect("tipo_carroceria", "Tipo de Carrocería")}
        {renderSelect("categoria", "Categoría del Vehículo")}
        {renderSelect("tipocabina", "Tipo de Cabina")}
        {renderSelect("tiporemolque", "Tipo de Remolque")}
        {renderSelect("propietario", "Propietario")}
        {renderSelect("empresa", "Empresa")}

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Observaciones</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-6 mt-2">
          {renderCheckbox("doble_trailer", "Doble Trailer")}
          {renderCheckbox("tiene_tanque_liquidos", "Tanque de Líquidos")}
          {renderCheckbox("tiene_tanque_agua", "Tanque de Agua")}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Registrar Vehículo
        </button>
      </div>
    </form>
  );
};

export default FormVehiculo;

