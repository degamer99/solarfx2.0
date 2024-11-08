// components/ParticlesBackground.js
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    // Make sure to use `await` to properly load all required components
    await loadFull(engine);
  };
 particlesInit()
  return (
    <Particles
      init={loadFull}
      options={{
        background: {
          color: {
            value: "#ffffff",
          },
        },
        particles: {
          number: {
            value: 50,
          },
          color: {
            value: "#00FF00", // Set the color of the dollar sign
          },
          shape: {
            type: "char",
            character: {
              value: "$",
              font: "Verdana",
              style: "",
              weight: "bold",
              fill: true,
            },
          },
          opacity: {
            value: 0.8,
          },
          size: {
            value: 16,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outMode: "bounce",
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
