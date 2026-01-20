/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: "hsl(262, 83%, 58%)",
              foreground: "hsl(0, 0%, 100%)",
            },
          },
          keyframes: {
            "aurora": {
              "from": {
                "background-position": "50% 50%, 50% 50%"
              },
              "to": {
                "background-position": "350% 50%, 350% 50%"
              }
            }
          },
          animation: {
            "aurora": "aurora 60s linear infinite"
          }
        },
      },
      plugins: [],
    }