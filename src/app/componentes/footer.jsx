export default function Footer() {
  return (
    <>
      <footer className="bg-[#FE3776] ">
        <div className="mx-auto w-full max-w-screen-xl ">
          <div className="grid grid-cols-2 gap-8  px-4 py-6 lg:py-18 md:grid-cols-4 text-white">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Sobre Nosotros
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <a href="#" className=" hover:underline">
                    Nosotros
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Nuestras tiendas
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Formas de pago
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Formas de envío
                  </a>
                </li>
              </ul>
              <img
                src="images/metodospago/Frame_9.png"
                className="h-20 w-80"
                alt="Flowbite Logo"
              />
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Atención al cliente
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contáctenos
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Preguntas frecuentes
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Libro de Reclamaciones
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Políticas de la empresa
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Política de garantía
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Política de devolución o cambio
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Política de privacidad
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terminos y condiciones Legales
                  </a>
                </li>
              </ul>
              <img
                src="images/metodospago/image_2.png"
                className="h-20 w-30"
                alt="Flowbite Logo"
              />
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Horario de atención al Cliente y Ventas Whatsapp: 
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <p href="#">
                    Lun a Vie 9:00 am. a 6:00 pm. Sáb y Dom de 9:00 am. a 2:00
                    pm.
                  </p>
                </li>

                <li className="mb-4 flex space-x-4 bg-[#FE3776] p-2 rounded-full w-max">
                  {/*   <!-- Facebook --> */}
                  <a
                    href="#"
                    className="text-white hover:text-[#FFD6DC] transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82V14.708h-3.356v-3.622h3.356V8.413c0-3.325 2.032-5.135 5.003-5.135 1.422 0 2.642.106 2.994.154v3.474h-2.057c-1.615 0-1.926.767-1.926 1.89v2.48h3.85l-.502 3.622h-3.348V24h6.567c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
                    </svg>
                  </a>

                  {/*   <!-- Instagram --> */}
                  <a
                    href="#"
                    className="text-white hover:text-[#FFD6DC] transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.342 3.608 1.316.975.975 1.254 2.242 1.316 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.342 2.633-1.316 3.608-.975.975-2.242 1.254-3.608 1.316-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.342-3.608-1.316-.975-.975-1.254-2.242-1.316-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.849c.062-1.366.342-2.633 1.316-3.608.975-.975 2.242-1.254 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.773.131 4.631.385 3.678 1.338 2.725 2.291 2.471 3.433 2.412 4.712.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.279.313 2.421 1.266 3.374.953.953 2.095 1.207 3.374 1.266C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.279-.059 2.421-.313 3.374-1.266.953-.953 1.207-2.095 1.266-3.374.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.279-.313-2.421-1.266-3.374C19.368.385 18.226.131 16.948.072 15.668.013 15.259 0 12 0z" />
                      <path d="M12 5.838a6.162 6.162 0 1 0 6.162 6.162A6.169 6.169 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                  </a>

                  {/*   <!-- WhatsApp --> */}
                  <a
                    href="#"
                    className="text-white hover:text-[#FFD6DC] transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.52 3.48A11.942 11.942 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.094 1.602 5.813L0 24l6.394-1.588A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.21-1.253-6.254-3.48-8.52zM12 22a10 10 0 0 1-5.31-1.498l-.38-.227-3.8.944.995-3.695-.248-.38A10 10 0 1 1 12 22zm5.678-7.836c-.247-.124-1.46-.723-1.687-.806-.226-.082-.39-.124-.554.124-.164.247-.63.806-.773.973-.143.164-.286.185-.533.062-.247-.124-1.042-.384-1.985-1.22-.733-.654-1.228-1.462-1.374-1.709-.143-.247-.015-.381.108-.505.112-.111.247-.286.37-.429.124-.143.164-.247.247-.412.082-.165.041-.31-.02-.434-.062-.124-.554-1.33-.758-1.82-.199-.484-.403-.418-.554-.426-.143-.007-.31-.009-.477-.009s-.434.062-.662.31c-.226.247-.862.844-.862 2.062 0 1.218.882 2.396 1.005 2.563.124.165 1.737 2.645 4.21 3.706.588.254 1.045.406 1.402.518.588.187 1.123.161 1.546.098.471-.068 1.46-.595 1.666-1.17.206-.576.206-1.07.144-1.17-.062-.101-.226-.164-.474-.288z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
