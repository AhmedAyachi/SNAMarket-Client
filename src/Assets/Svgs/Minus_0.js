

export default (color="black",weight="2")=>`data:image/svg+xml;base64,${btoa(`
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="${weight}" stroke="${color}" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 12l14 0"></path>
</svg>
`)}`;
