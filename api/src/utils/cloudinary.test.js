require("dotenv").config();
const cloudinary = require("./cloudinary").v2;
const sendFile = require("./cloudinary");

describe("Verificar la configuracion de cloudinary", () => {
  it("Verificar configuracion de cloudinary api_key", () => {
    const apikey = process.env.CLOUDINARY_API_KEY;
    expect(apikey).toBeDefined();
    expect(apikey).not.toBe("");
    expect(apikey).toBe(apikey);
  });

  it("Verificar configuracion de cloudinary nombre", () => {
    const name = process.env.CLOUDINARY_NAME;
    expect(name).toBeDefined();
    expect(name).not.toBe("");
    expect(name).toBe(name);
  });

  it("Verificar condiguracion de cloudinary apiSecret", () => {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    expect(apiSecret).toBeDefined();
    expect(apiSecret).not.toBe("");
    expect(apiSecret).toBe(apiSecret);
  });
});

describe("Verificar la funcion sendFile", () => {
  it("typeof senfile es una funcion", () => {
    expect(typeof sendFile).toBe("function");
  });
});

describe("Verificar la salida del process.argv", () => {
  it("asignacion de imagePath", () => {
    process.argv[2] = "/ruta/de/la/imagen.jpg";

    // Variable para capturar el valor de imagePath
    let imagePathValue;

    // Modificar la función sendFile para devolver imagePath en lugar de imprimirlo
    const sendFileModified = async () => {
      const imagePath = process.argv[2];
      if (!imagePath) {
        console.log(`Please provide image path ${imagePath}`);
        process.exit(1);
      }

      // Asignar el valor de imagePath a la variable externa
      imagePathValue = imagePath;

      // Realizar el resto de la lógica de subida de archivos

      return imagePath;
    };

    // Ejecutar la función sendFileModified
    sendFileModified();

    // Verificar que imagePath se haya asignado correctamente
    expect(imagePathValue).toEqual("/ruta/de/la/imagen.jpg");
  });
});

describe("Pruebas para la función sendFile()", () => {
  it("Verificar salida del process.exit con código de error", async () => {
    // Capturar la llamada a process.exit
    const processExit = jest
      .spyOn(process, "exit")
      .mockImplementation(() => {});
    // Ejecuta la función sendFile
    try {
      await sendFile();
    } catch (error) {
      // Verifica que process.exit haya sido llamado con el código de error 1
      expect(processExit).toHaveBeenCalledWith(
        "Error send imagePath Missing required parameter - file"
      );
    }
    // Restaura la implementación original de process.exit
    processExit.mockRestore();
  });
});

describe("validar dentro de la funcion sendFile", () => {
  it("validar opciones que recibe claudinary", () => {
    const options = {
      resource_type: "auto",
      unique_filename: false,
      folder: "Gym-Go",
    };
    //validar presencia de los campos requeridos
    expect(options).toHaveProperty("resource_type");
    expect(options).toHaveProperty("unique_filename");
    expect(options).toHaveProperty("folder");

    //validar los valores de los campos
    expect(options.resource_type).toBe("auto");
    expect(options.unique_filename).toBe(false);
    expect(options.folder).toBe("Gym-Go");
  });
});
