

export default (color="black",weight=2)=>`data:image/svg+xml;base64,${btoa(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background:transparent; display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="9" cy="50" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="0s" repeatCount="indefinite"></animate>
    </circle><circle cx="18" cy="59.404564036679574" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.1s" repeatCount="indefinite"></animate>
    </circle><circle cx="27" cy="65.21690426072246" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.2s" repeatCount="indefinite"></animate>
    </circle><circle cx="36" cy="65.21690426072246" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.3s" repeatCount="indefinite"></animate>
    </circle><circle cx="45" cy="59.404564036679574" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.4s" repeatCount="indefinite"></animate>
    </circle><circle cx="54" cy="50" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.5s" repeatCount="indefinite"></animate>
    </circle><circle cx="63" cy="40.59543596332043" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.6s" repeatCount="indefinite"></animate>
    </circle><circle cx="72" cy="34.78309573927754" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.7s" repeatCount="indefinite"></animate>
    </circle><circle cx="81" cy="34.78309573927754" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.8s" repeatCount="indefinite"></animate>
    </circle><circle cx="90" cy="40.595435963320426" r="4" fill="${color}">
      <animate attributeName="cy" values="34;66;34" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.9s" repeatCount="indefinite"></animate>
    </circle>
</svg>
`)}`
