

export default (color="black",weight="0")=>`data:image/svg+xml;base64,${btoa(`
<svg fill="${color}" width="24px" height="24px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
    <path stroke-width="${weight}" d="M18,28A12,12,0,1,0,6,16v6.2L2.4,18.6,1,20l6,6,6-6-1.4-1.4L8,22.2V16H8A10,10,0,1,1,18,26Z"/>
</svg>
`)}`;